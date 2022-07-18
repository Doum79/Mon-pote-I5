import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { QrcodeComponent } from '../qrcode/qrcode.component';
import { Storage } from '@ionic/storage';
import { QrcodeService } from 'src/app/service/qrcode.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  user: any;
  number: any;


  constructor(private route: ActivatedRoute, public popoverCtrl: PopoverController, 
              public storage: Storage, public router: Router, public qrcode: QrcodeService) { 

    this.storage.get("userdata").then((res: any) =>{
      console.log("resutat dnas le tabs tabs",res)
      this.number = res.data.phone
    })
  }

  ngOnInit() {
  }

  // async openQR() {
  //   const popover = await this.popoverCtrl.create({
  //     component: QrcodeComponent,
  //     translucent: true,
  //     componentProps:{number: this.number},
  //     cssClass: 'popOver',
  //   });
  //   return await popover.present();
  // }

  openQR() {
    this.qrcode.goToCreateCode(this.number);
  }

  goToShop() {
    this.router.navigateByUrl('/tabs/shop')
  }

}
