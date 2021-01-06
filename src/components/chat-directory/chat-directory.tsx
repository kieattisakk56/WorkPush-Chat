import { Component, Host, h, Prop, Watch, State } from '@stencil/core';
import { ChatContentUser } from '../chat-content-user/chat-content-user';
import { HttpTransportType, HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { HttpClient } from '@angular/common/http';

@Component({
  tag: 'chat-directory',
  styleUrl: 'chat-directory.css',
  shadow: false,
  scoped: true
})
export class ChatDirectory {

  hubConnection: HubConnection;
  hubConnection2: HubConnection;
  hubConnection3: HubConnection;
  messageList = [];
  rootUrl = 'https://api.humantix.cloud/chatSocket/'
  rootUpload = 'https://api.humantix.cloud/chatSocket/api/upload';

  @State() contents: any[] = [];
  chatbox: any[] = [];

  userId = '7d12b80f-009a-4b66-9671-d48585787888';
  roomName = '7d12b80f-009a-4b66-9671-d48585787888|c583082f-13a4-40d1-95fb-bcd77f685233';
  companyCode = 'TEST-W10001';

  render() {

    return (
      <Host>
        <div class='work-chat-row'>
          <div class='work-chat-flex'>
            <div class='work-chat-tab' id='work-tab'>
              {
                this.contents.map((element, index) => {
                  if (element !== 'directory') {
                    return <chat-content-user data={element} onCloseMessageBox={(e: any) => this.onClose(e)}></chat-content-user>
                  } else {
                    return <chat-user-center onSelectUser={(e: any) => { this.onSelectUser(e) }} data={element} onCloseMessageBox={(e: any) => this.onClose(e)}></chat-user-center>
                  }
                })
              }
            </div>
          </div>
        </div>
        <chat-management onOpenDirectory={(e) => this.onOpen(e)} onOpenUser={(e) => this.openDirectory()}></chat-management>
      </Host>
    );
  }
  onSelectUser(e: any) {

    this.onOpen(e);
  }
  onOpen(e: any) {


    const hasDirect = this.contents.find((e) => {
      return e === 'directory'
    });
    if (hasDirect !== undefined) {
      this.contents = this.contents.filter(element => {
        return element !== 'directory';
      });
    }

    this.contents = [...this.contents, e.detail]


    if (this.contents.length >= 4) {
      this.contents = this.contents.shift()
    }
  }
  onClose(e) {
    this.contents = this.contents.filter(element => {
      return element !== e.detail;
    });

  }

  componentDidRender() {
    let url = this.rootUrl + 'chathub?userId=' + this.userId + '&companyCode=' + this.companyCode;
    

  }
  openDirectory(e: any = null) {
    const hasDirect = this.contents.find((e) => {
      return e === 'directory'
    });

    if (hasDirect == undefined) {
      this.contents = [...this.contents, 'directory']
    }
    if (this.contents.length >= 4) {
      this.contents.shift()
    }
  }

}
