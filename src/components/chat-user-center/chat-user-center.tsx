import { Component, Host, h, EventEmitter, Prop, Event, State } from '@stencil/core';

@Component({
  tag: 'chat-user-center',
  styleUrl: 'chat-user-center.css',
  shadow: true,
})
export class ChatUserCenter {
  contentList = [];
  message: string = "";
  element: any;
  input: any;
  tempUsers: any;
  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55IjoiaW5kaWd5LmNvLixsdGQiLCJwbGF0Zm9ybSI6Imh1bWFudGl4IiwiZGVwYXJ0bWVudCI6ImRpZ2l0YWwgJiBhaSBidXNpbmVzcyJ9.igJkMC25k0kHxF9jXXJkhxv9_Xt8g0cno6A9P5ti2Og';
  companyCode = 'TEST-W10001';
  @Prop() data: any;
  @Event() closeMessageBox: EventEmitter<any>;
  @Event() selectUser: EventEmitter;
  @State() users: any[] = [];
  render() {
    return (
      <Host>
        <div class='chat-content'>
          <div class='chat-header'>
            <div class='chat-user-name'>
              New Message
            </div>
            <div class='chat-user-action'>
              <div class='chat-user-action-close' onClick={() => this.onClose(this.data)}>
                <div class="action-close"></div>
              </div>
            </div>
          </div>
          <div class='chat-header'>
            <div class="search-users">
              To: <input class="search" value={this.message} onKeyUp={(e) => this.onSearch(e)} ref={el => this.input = el as HTMLInputElement}></input>
            </div>
          </div>
          <div class='chat-list' id="chatList" ref={el => this.element = el as HTMLInputElement}>
            {
              this.users.map((e: any) => {
                return <chat-users-panel onClick={() => { this.onSelectUser(e) }} data={e}></chat-users-panel>
              })
            }
          </div>

        </div>

      </Host>
    );
  }
  componentDidRender() {


  }
  componentWillLoad() {
    this.getAllUser();
  }
  onSubmitMessage() {

  }
  onEnter(e) {

  }
  onSelectUser(e) {
    this.selectUser.emit(e);
  }
  onClose(e: any) {
    this.closeMessageBox.emit(e);
  }
  onSearch(e) {

    if (this.input.value !== '') {

      if (e.keyCode === 8) {
        this.users = this.tempUsers;
      }
      this.users = this.users.filter(t => {
        return (t.FullName.toLowerCase().indexOf(this.input.value.toLowerCase()) > -1) || (t.NickName !== null && t.NickName.toLowerCase().indexOf(this.input.value.toLowerCase()) > -1) || (t.Position.toLowerCase().indexOf(this.input.value.toLowerCase()) > -1)
      });
    } else {

    }



  }

  async getAllUser() {
    if (this.users.length > 0) {
      return null;
    }
    let response = await fetch("https://workplus-test-api.humantix.cloud/TEST-W10001/api/v1/Directory/GetAllMemberChat?companycode=" + this.companyCode, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'basic ' + this.token
      }
    });
    let json = await response.json();
    this.users = [...this.users, ...json.Results];
    this.tempUsers = this.users
  }


}
