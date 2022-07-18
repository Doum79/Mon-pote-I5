import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-verif',
  templateUrl: './verif.page.html',
  styleUrls: ['./verif.page.scss'],
})
export class VerifPage implements OnInit {

  number: any;
  constructor(public route: ActivatedRoute, public nav: NavController ) { 

      this.route.params.subscribe( params => {
      console.log("objet mis en parametre",params.number)
      this.number = params.number
    })

  }

  gotToRegister(){
    this.nav.navigateRoot(["register", this.number])
  }

  ngOnInit() {
  }

}
