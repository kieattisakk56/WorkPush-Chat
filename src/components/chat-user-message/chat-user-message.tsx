import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'chat-user-messagechat-user-message',
  styleUrl: 'chat-user-message.css',
  shadow: true,
})
export class ChatUserMessage {
  @Prop() data
  render() {  
    return (
      <Host>
        <slot>


          <div class="message-row">
            <div class="message message--recieved">
              <div class="message-avatar">
                <img src="https://uifaces.co/our-content/donated/gPZwCbdS.jpg" />
              </div>
              <div class="message-bubble">
                <p ></p>
              </div>
            </div>
          </div>


        </slot>
      </Host>
    );
  }

}
