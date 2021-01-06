import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'chat-users-panel',
  styleUrl: 'chat-users-panel.css',
  shadow: true,
})
export class ChatUsersPanel {
  @Prop() data: any;
  avartar: any;
  render() {
    const nickname = this.data.NickName ? ` (${this.data.NickName})` : '';
    const dsplay = this.data.ImageFileURL ? `` : '';
    return (

      <Host>
        <div class="users-panel">
          <div class='users-avartar' >
            {
              this.data.ImageFileURL && this.data.ImageFileURL !== '' ? <img class="users-image" src={this.data.ImageFileURL} /> : ''
            }
          </div>
          <div>
            <p class="users-name">
              {this.data.FullName}
              {nickname}
            </p>
            <p class="users-positon"> {this.data.Position}</p>
          </div>
        </div>
      </Host>
    );
  }
  componentDidLoad() {

    // if (this.data.ImageFileURL) {
    //   this.avartar.style.backgroundImage = `url('${this.data.ImageFileURL}')`;
    // }
    // this.avartar.style.backgroundSize = "contain";
  }
}
