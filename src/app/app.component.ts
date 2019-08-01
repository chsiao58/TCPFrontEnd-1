import { Component } from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private title = 'WebSockets chat';
  private stompClient = null;


  constructor() {
  }

setConnected(connected) {
      (document.getElementById('disconnect') as HTMLInputElement).disabled = !connected;
      document.getElementById('conversationDiv').style.visibility
        = connected ? 'visible' : 'hidden';
      document.getElementById('response').innerHTML = '';
  }

connect() {
      let socket = new SockJS('http://localhost:8080/spring-mvc-java/chat');
      this.stompClient = Stomp.over(socket);
      this.stompClient.connect({}, function(frame) {
          this.setConnected(true);
          console.log('Connected: ' + frame);
          this.stompClient.subscribe('/topic/messages', function(messageOutput) {
              this.showMessageOutput(JSON.parse(messageOutput.body));
          });
      });
  }

disconnect() {
      if (this.stompClient != null) {
          this.stompClient.disconnect();
      }
      this.setConnected(false);
      console.log('Disconnected');
  }

sendMessage() {
      let from = (document.getElementById('from') as HTMLInputElement).value;
      let text = (document.getElementById('text')as HTMLInputElement).value;
      this.stompClient.send('/app/chat', {},
        JSON.stringify({from: from, text: text}));
  }

showMessageOutput(messageOutput) {
      let response = document.getElementById('response');
      let p = document.createElement('p');
      p.style.wordWrap = 'break-word';
      p.appendChild(document.createTextNode(messageOutput.from + ': '
        + messageOutput.text + ' (' + messageOutput.time + ')'));
      response.appendChild(p);
  }

}
