import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {

  resStorage: any = {};
  email: any

  constructor(public storage: Storage) {

  
   }

  ngOnInit() {
    this.storage.get("userdata").then(res =>{
      console.log("resutat dnas le storage",res)
      this.resStorage = res
      this.email = this.resStorage.data.email
    })
  }

}
