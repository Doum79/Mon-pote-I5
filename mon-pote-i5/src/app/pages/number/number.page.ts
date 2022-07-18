import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-number',
  templateUrl: './number.page.html',
  styleUrls: ['./number.page.scss'],
})
export class NumberPage implements OnInit {
  
  number: number;

  constructor(public nav: NavController) { }

  ngOnInit() {
  }

  gottonumber(){
  this.nav.navigateRoot(["verif", this.number])
}

}
