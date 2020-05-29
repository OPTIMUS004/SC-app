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
    let date = new Date();
    let hour = date.getHours();
    let minutes = date.getUTCMinutes();
    let periodOfDay = hour < 12 ? 'am' : 'pm';
    this.socket.emit("newMessage", 
    {
      user: this.authService.currentUser.username,
      message: message,
      dateStamp: `${hour}:${minutes} ${periodOfDay}`
    });
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

