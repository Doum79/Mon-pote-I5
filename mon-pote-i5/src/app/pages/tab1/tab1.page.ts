import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { AuthenticationService } from '../../service/api-service';
import { Storage } from '@ionic/storage';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { QrcodeService } from 'src/app/service/qrcode.service';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  
  data = [
    {path: 'tab3',},
  ];

  slideOption = {
    slidesPerView : 4,
    spaceBetween : 5
  }

  images = ['image1','image2','image3'];
  image = 'image1';
  isloadSlide = true;
  resStorage: any = {};
  nom: any
  solde: any;
  resultat: any;
  soldeB: any;
  id_onesignal: any;
  number: any;
  
  constructor(public router: Router, public storage: Storage, public auth: AuthenticationService, public nav: NavController, 
              private oneSignal: OneSignal, public alertController: AlertController, public qrcode: QrcodeService) {

    this.storage.get("userdata").then(res =>{
      console.log("resutat dnas le storage",res)
      this.resStorage = res
      this.nom = this.resStorage.data.name
      this.number = res.data.phone
      this.getcompte(res)
      })

  }

  async ngOnInit(){
    this.soldeB = await this.auth.soldeClient

    this.soldeB = await this.auth.soldeClient
    //////////////One signal //////////////
    this.oneSignal.startInit('26e81e78-0ff3-4d31-91f2-093947422f4c', '980472919036'); 
    this.oneSignal.getIds().then((res:any) => {
      console.log('id',res)
      this.id_onesignal = res.userId
      this.updateOneSignaleId()
     });
    this.oneSignal.inFocusDisplaying(2);
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
    this.oneSignal.handleNotificationReceived().subscribe(() => {
    // do something when notification is received
    this.getcompte(this.resStorage)
    });
    this.oneSignal.handleNotificationOpened().subscribe(() => {
      // do something when a notification is opened
    });
    this.oneSignal.endInit();

  }

  updateOneSignaleId(){
    this.auth.updateClient({onesignale_id:this.id_onesignal}).then(res=>{
      console.log("update one signale",res)
    })
  }


  ionViewDidEnter(){
    this.isloadSlide = true;
    this.slideImage();
  }
  
  slideImage(index = 0){
    this.image = this.images[index];
    index++ ;
    if(this.isloadSlide) setTimeout(()=>{this.slideImage((index == 3) ? 0 : index)},3000)
  }

gotopaye(){
  this.router.navigateByUrl("/paye")
}

voirevent(event){
  console.log("event",event)
}

openQR() {
  this.qrcode.goToCreateCode(this.number);
}

getcompte(data){
 
  // console.log("resultat de get compte", data.data.trader.id, data.data.user.api_token)
  this.auth.getCompteClient(data.data.id).then(res =>{
    console.log("resultat de get compte client", res)
    this.resultat = res
    this.soldeB = this.resultat.data.sold_account
    this.soldeB = parseInt(this.soldeB);
    this.soldeB = Math.round(this.soldeB)
    if(this.soldeB == undefined){
      this.soldeB = 0
    }
    console.log("this.soldeB",this.soldeB)
  })

}

gotologin(){
  this.nav.navigateRoot("login")
  this.storage.clear()
}

async voirSolde(){
  if (this.soldeB == undefined) {
    this.soldeB = "'chargement...'";
  }
  const alert = await this.alertController.create({
    header: 'Votre solde est de' + ' ' + this.soldeB + ' ' + 'pts',
    buttons: [
      {
        text: 'OK',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
        }
      }
    ]
  });

  await alert.present();
}
async Deconexionpermission(){
  const alert = await this.alertController.create({
    header: 'Voulez-vous vous déconecter ?',
    buttons: [
      {
        text: 'Annuler',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
        }
      }, {
        text: 'Confirmer',
        cssClass: 'danger',
        handler: (x) => {
          //console.log('Confirm Ok',x);
          this.gotologin()
        }
      }
    ]
  });

  await alert.present();
}

}
