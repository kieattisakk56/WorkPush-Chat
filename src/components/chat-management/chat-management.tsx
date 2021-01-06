import { Component, Host, h, Event, EventEmitter, Prop, State } from '@stencil/core';
import { HttpTransportType, HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { HttpClient } from '@angular/common/http';

@Component({
  tag: 'chat-management',
  styleUrl: 'chat-management.css',
  shadow: true,
})
export class ChatManagement {
  hubConnection3: HubConnection;
  messageList = [];
  rootUrl = 'https://api.humantix.cloud/chatSocket/'
  rootUpload = 'https://api.humantix.cloud/chatSocket/api/upload';

  userId = '7d12b80f-009a-4b66-9671-d48585787888';
  roomName = '7d12b80f-009a-4b66-9671-d48585787888|c583082f-13a4-40d1-95fb-bcd77f685233';
  companyCode = 'TEST-W10001';

  @Event() openDirectory: EventEmitter;
  @Event() openUser: EventEmitter;
  @State() users: any[] = [];
  open() {
    this.openUser.emit(true);
  }
  render() {

    return (
      <Host>
        <chat-info>
          <div class="edit" onClick={() => this.open()}></div>
          <ul class="last-chat">
            {/* {
              this.users.map(element => {
                return <li class="users" onClick={() => { this.onOpenChat(element) }}><img class="chat-avatar-user" src='https://scontent.fbkk12-3.fna.fbcdn.net/v/t1.0-1/p100x100/123087207_3668227359867923_2632228284691846577_o.jpg?_nc_cat=102&ccb=2&_nc_sid=7206a8&_nc_eui2=AeHqA8Fd_hBW2rmyBBfOJSwLWVogUxRAiX1ZWiBTFECJfRaYi0Z9igfKm7_yEpjsQcwmyKezT4fpfN9gcvoX2YyB&_nc_ohc=0hWY5eBrrvMAX9m3_Vh&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fbkk12-3.fna&tp=6&oh=fd3e5c0d26a8009ce148483b330ec3bb&oe=60113751' />
                </li>
              })
            } */}
          </ul>
        </chat-info>
      </Host>
    );
  }

  componentDidRender() {
  }
  componentWillLoad() {
    this.users = [...this.users, 7, 8, 9]
  }
  onOpenChat(item: any) {
    this.openDirectory.emit(item);
    console.log(item)
    this.users = this.users.filter(element => {
      return element !== item;
    })
  }


}
