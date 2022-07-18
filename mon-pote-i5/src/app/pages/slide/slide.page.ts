import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.page.html',
  styleUrls: ['./slide.page.scss'],
})
export class SlidePage implements OnInit {

  constructor(public storage: Storage, public router: Router) 
  {
    this.redirection()
  }

  ngOnInit() {
  }

  goToLogin(){
    this.storage.set("pf",true)
    this.router.navigate(['login'])
  }

  async redirection(){
    let pf: any = await this.storage.get("pf")
    if(pf){
      this.router.navigate(['login'])
    }
  }
}
