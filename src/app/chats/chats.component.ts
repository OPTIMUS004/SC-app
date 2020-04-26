import { Component, OnInit } from '@angular/core';
import { WebSocketService } from './web-socket.service';
import { AuthService } from '../sc-folder/services/auth.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit{
  socket: any;
  chatForm: FormGroup;
  message: string;
  messages: string[] = [];
  userName = this.auth.currentUser.username
  constructor( private webSocket: WebSocketService, private auth: AuthService ) { }

  sendChat(){
    this.webSocket.sendMessage(this.message);
    this.message = '';
  }
  ngOnInit() {
    this.webSocket
      .getMessages()
      .subscribe((message:string) => {
        console.log(message);
        this.messages.push(message);
      });
  }
  setSenderStyle(sender) {
    if(sender.user === this.userName){
      return {'background-color': 'white', 'float': 'right'}
  }
}
}