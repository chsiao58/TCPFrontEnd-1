import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpHeaderResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginService } from './login.service';
import { Channel } from '../classes/Channel';
import { ChannelPK } from '../classes/ChannelPk';
import {UserChannel} from '../classes/UserChannel';

const httpOptions = {
  headers: new HttpHeaders(
  { 
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'Content-Type': 'application/json'
  }
  )
};

@Injectable({
  providedIn: 'root'
})
export class CmListService {
  channel: Channel;
  address = environment.apiURL + 'channel/';
  uc: UserChannel ;

  constructor(
    private http:HttpClient,
    private loginService:LoginService
    ) {}

    //:Observable<Channel[]>
    getChannelList():Observable<Channel[]>{
      let address = environment.apiURL + "channel/getById/" + this.loginService.currentUser.user_id;
      return this.http.get<Channel[]>(address, httpOptions);
    }

    postChannel(fromId:number,channelName:string,ispublic:boolean)
  {
    const toSend = new Channel(channelName,fromId,ispublic);
      this.http.post<Channel>(this.address,toSend,httpOptions).subscribe(response=>
        {
          this.channel = response;
          this.addAdmin(this.loginService.currentUser.user_id,this.channel);
        });

    }
    
    addUser(user_id:number,channel:Channel){
      this.uc= new UserChannel(user_id,channel.channel_id);
      this.http.post(this.address+"channelusers",this.uc,httpOptions).subscribe(response=>console.log(response));
    }

    addAdmin(fromId:number,channel:Channel){
      this.uc= new UserChannel(fromId,channel.channel_id);
      this.http.post(this.address+"channelusers",this.uc,httpOptions).
      subscribe(response=>console.log(response));
    }
    pushArray(){

    }

    getChannelPKList():Observable<ChannelPK[]>{
      let address:string = environment.apiURL + "channel/userchannels/" + this.loginService.currentUser.user_id;
      return this.http.get<ChannelPK[]>(address, httpOptions);
    }
}
