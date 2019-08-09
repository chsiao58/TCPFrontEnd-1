import { Component, OnInit } from '@angular/core';
import { CmListService } from '../../services/cm-list.service';
import { DmListService } from '../../services/dm-list.service';
import { NavService } from '../../services/nav.service';
import { Channel } from 'src/app/classes/Channel';
import { CmChatService } from 'src/app/services/cm-chat.service';
import { DirectMessageService } from 'src/app/services/chat.service';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/User';
import { CurrentUser } from 'src/app/classes/CurrentUser';
import { LoginService } from 'src/app/services/login.service';
import {UserService} from 'src/app/services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  listUsers:CurrentUser[];
  channels:Channel[];
  users: CurrentUser[];
  channel:Channel;
  channelBody:Channel;
  add: Boolean = false;
  show: Boolean = true;
  cname:string;
  cpublics:boolean;
  showSignInModal:boolean;
  showChannelModal:boolean;
  constructor(
    private loginService:LoginService,
    private cmService: CmListService,
    private dmService: DmListService,
    private navService: NavService,
    private cmChatService: CmChatService,
    private dmChatService: DirectMessageService,
    private router:Router,
    private userService:UserService
    //private dialog:MatDialog 
  ) { }


  ngOnInit() {
      this.listChan();
   }

  listChan(){
    this.cmService.getChannelList()
      .subscribe(channels =>
        {
          this.channels = channels;
        }
      );
    this.users = null;
  }
  listDM(){
    this.dmService.getUserList().subscribe(
      users => {
        this.users = users;
      }
    );
    this.channels = null;
  }

  addChannelPop() {
    this.showChannelModal=true;
    if(this.add===false)
    this.add=true;
    else if(this.add===true)
    this.add=false;
  }

  hideButton(){
    this.show = false;
  }
  
  showButton(){
    this.show = true;
  }

  addChannel(){
  this.cmService.postChannel(this.loginService.currentUser.user_id,this.cname,this.cpublics);
  this.changeDisplay();
  }

  channelClick(channel:Channel){
    //inject channelID into the channel service
    this.cmChatService.channel = channel;
    this.router.navigate(['CM']);
  }

  userClick(user: CurrentUser) {
    this.dmChatService.fromUser = user;
    this.router.navigate(['DM']);
  }
  changeDisplay(){
    this.showChannelModal=false;
   }

}
