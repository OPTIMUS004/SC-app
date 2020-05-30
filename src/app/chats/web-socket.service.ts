import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import * as io from 'socket.io-client';

import { AuthService } from '../sc-folder/services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  socket: any;
  readonly url : string = "https://sc-chat-api.herokuapp.com";

  constructor( private authService: AuthService ) { 
    this.socket = io(this.url);
  }
  sendMessage(message){
    let date = new Date().toLocaleTimeString();
    let messanger = {
      user: this.authService.currentUser.username,
      message: message,
      dateStamp: `${date}`
    };
    if (messanger.message === ' ' || messanger.message === '') {
      return;
    }else{
      this.socket.emit("newMessage", messanger)
    }
  }
  getMessages = () => {
      return Observable.create((observer) => {
        this.socket.on('newMessage', (message) => {
          console.log(message);
          observer.next(message)
        })
      })
    }

  }

