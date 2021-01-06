import { Component, h, EventEmitter, Event, Prop, State } from '@stencil/core';
import { HttpTransportType, HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { HttpClient } from '@angular/common/http';
import { StringUtils } from 'turbocommons-ts';
@Component({
  tag: 'chat-content-user',
  styleUrl: 'chat-content-user.css',
  shadow: true,
})
export class ChatContentUser {
  contentList = [];
  message: string = "";
  element: any;
  input: any;
  currentPageCount = 0;


  rootUrl = 'https://api.humantix.cloud/chatSocket/'
  rootUpload = 'https://api.humantix.cloud/chatSocket/api/upload';

  companyCode = 'TEST-W10001';
  hubConnection: HubConnection;
  page = 1;
  IsReload = false;
  @Prop() data: any;
  @Event() closeMessageBox: EventEmitter<any>;
  @State() listMessage: any = [];
  avartar: any;
  userId = window.localStorage.getItem('userId');
  roomName = '';
  file: any;
  http: HttpClient;
  render() {
    console.log(this.userId)
    return (
      <div class='chat-content'>
        <div class='chat-header'>
          <div class="chat-avatar" ref={el => this.avartar = el as HTMLInputElement}>

          </div>
          <div class='chat-user-name'>
            {this.data.FullName}
          </div>
          <div class='chat-user-action'>
            <div class='chat-user-action-close' onClick={() => this.onClose(this.data)}>
              <div class="action-close"></div>
            </div>
          </div>
        </div>
        <div class='chat-list' id="chatList" onScroll={(e) => { this.onScroll(e) }} ref={el => this.element = el as HTMLInputElement}>


        </div>
        <div class='chat-action'>
          <div class="chat-upload-image" onClick={() => this.onUploadImage()}><input type="file" id="imgupload" onChange={() => this.onSendImage()} class="file-none" ref={el => this.file = el as HTMLInputElement} /> </div>
          <input class="chat-input" value={this.message} id="message" onKeyUp={(e) => this.onEnter(e)} ref={el => this.input = el as HTMLInputElement}></input>
          <div class="chat-send-message" onClick={() => this.onSubmitMessage()}></div>
        </div>
      </div>

    );
  }
  componentDidRender() {
    this.element.scrollTop = this.element.scrollHeight;
    this.input.focus();
    this.connectLastMessage();

    this.roomName = `${window.localStorage.getItem('userId')}|${this.data.UserId}`;
  }
  onSubmitMessage() {
    this.sendMessage();
  }
  onUploadImage() {
    this.file.click()
  }
  async onSendImage() {
    const uploadData = new FormData();
    uploadData.append('File', this.file.files[0]);
    uploadData.append('RoomName', this.roomName);
    uploadData.append('userId', this.userId);
    uploadData.append('isPrivate', "true");
    uploadData.append('companyCode', this.companyCode);

    let data = {
      RoomName: this.roomName
    }

    let url = this.rootUrl + "api/upload";
    let response = await fetch(url, {
      method: 'POST',
      body: uploadData,
  
    });

    let json = await response.json();
  }
  onEnter(e) {
    if (e.key === "Enter") {
      this.onSubmitMessage();
    }
  }


  componentDidLoad() {
    if (this.data.ImageFileURL) {
      this.avartar.style.backgroundImage = `url('${this.data.ImageFileURL}')`;
    }
    this.avartar.style.backgroundSize = "contain";

  }
  onClose(e: any) {

    this.closeMessageBox.emit(e);
  }


  connectLastMessage() {
    let url = this.rootUrl + 'chathub?userId=' + this.userId + '&companyCode=' + this.companyCode
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(url,
        {
          transport: HttpTransportType.WebSockets,
          skipNegotiation: true
        })
      .build();


    this.hubConnection
      .start()
      .then(() => {
        console.log('Connection started!');
        this.joinRoom();
      })
      .catch(err => console.log('Error while establishing connection :('));

    this.hubConnection.on('newMessage', (messageView: any) => {

      var html = this.messageType(messageView);
      this.element.insertAdjacentHTML('beforeend', html);
      this.element.scrollTop = this.element.scrollHeight;
    });

    this.hubConnection.on('onError', (messageView: any) => {
      console.log(messageView);
    });


  }
  GetMessageHistory(): void {
    this.hubConnection
      .invoke('GetMessageHistory', this.userId, 10, this.page, this.roomName)
      .then((res) => {
        this.currentPageCount = res.length;
        res.reverse().forEach((data, index) => {
          var html = this.messageType(data);
          this.element.insertAdjacentHTML('beforeend', html);
          this.IsReload = true;

          if (index == res.length - 1) {
            this.element.scrollTop = this.element.scrollHeight;
          }
        });

        //   this.mergeMessage(data);
      })
      .catch(err => console.error(err));
  }
  joinRoom(): void {
    this.hubConnection
      .invoke('JoinPrivateRoom', this.roomName, this.userId)
      .then(() => this.GetMessageHistory())
      .catch(err => console.error(err));
  }
  messageType(data) {
    const display = this.data.ImageFileURL == '' ? '../../assets/images/user.png' : this.data.ImageFileURL;
    var message = ''
    if (data.contentType === 'Text') {
      if (!this.validURL(data.content)) {
        message = `<p>${data.content}</p>`;
      } else {
        message = `<a target="_blank" href="${data.content}">${data.content}</a>`;
      }
    } else {
      message = `
            <img class="image-box" src="${data.content}"/>
      `
    }
    if (this.userId.toLowerCase() === data.to.toLowerCase()) {
      const recieved = `
                          <div class="message-row">
                            <div class="message message--recieved">
                              <div class="message-avatar">
                                <img src="${display}" />
                              </div>
                              <div class="message-bubble">
                              ${message}
                              </div>
                            </div>
                          </div>
                    `;
      return recieved;
    } else {
      const sender = `
                        <div class="message-row">
                          <div class="message message--sent">
                            <div class="message-bubble">
                            ${message}
                            </div>
                          </div>
                        </div>
                      `;

      return sender;
    }
  }
  sendMessage(): void {
    this.hubConnection
      .invoke('SendMessage', this.roomName, this.companyCode, this.userId, this.input.value, true)
      .then(() => this.input.value = '')
      .catch(err => console.error(err));
  }
  validURL(str) {
    return StringUtils.isUrl(str);
  }
  onScroll(e) {

    if (e.path[0].scrollTop <= 0 && this.IsReload && this.currentPageCount == 10) {
      this.IsReload = false;
      this.page++;
      this.pageContinue();
    }
  }

  pageContinue() {
    this.hubConnection
      .invoke('GetMessageHistory', this.userId, 10, this.page, this.roomName)
      .then((res) => {
        this.IsReload = true;
        const curScrollPos = this.element.scrollTop;
        const oldScroll = this.element.scrollHeight - this.element.clientHeight;
        setTimeout(() => {
          this.currentPageCount = res.length;
          res.forEach((data, index) => {
            var html = this.messageType(data);
            this.element.insertAdjacentHTML('afterbegin', html);
            if (index == res.length - 1) {
              var newScroll = this.element.scrollHeight - this.element.clientHeight;
              this.element.scrollTop = curScrollPos + (newScroll - oldScroll);
            }
          });

        }, 500);
      })
      .catch(err => console.error(err));
  }
}
