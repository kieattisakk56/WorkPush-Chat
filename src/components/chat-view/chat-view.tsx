import { Component, Host, h, State, Prop } from '@stencil/core';

@Component({
  tag: 'chat-view',
  styleUrl: 'chat-view.css',
  shadow: true,
})
export class ChatView {

  @Prop() clientid: any;

  render() {
    window.localStorage.setItem('userId', this.clientid);
    return (
      <Host>
        <chat-directory ></chat-directory>
      </Host>
    );
  }




}
