import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders,HttpHeaderResponse} from '@angular/common/http';
import {Message} from '../classes/message';
import {Observable} from 'rxjs';
import { Channel } from '../classes/Channel';

const httpOptions={
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'Content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class CmChatService {
  channel:Channel = null;
  address = 'http://localhost:8080/channel/';
  messages: Observable<Message[]>;
  constructor(private http: HttpClient) { }
  getData() {
    return this.http.get<Message[]>(this.address + this.channel.channel_id);
  }
  postMessage(fromId: number, message: string) {
    const toSend = new Message();
    toSend.userId = fromId;
    toSend.message = message;
    this.http.post(this.address + this.channel.channel_id, toSend, httpOptions).subscribe(response => console.log(response));
  }
}
