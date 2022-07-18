import { Component, OnInit } from '@angular/core';
import { PopoverController, ToastController, LoadingController, NavController, AlertController } from '@ionic/angular';
import { QrcodeComponent } from '../qrcode/qrcode.component';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from '../../service/api-service';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { QrcodeService } from '../../service/qrcode.service';

@Component({
  selector: 'app-home-marchand',
  templateUrl: './home-marchand.page.html',
  styleUrls: ['./home-marchand.page.scss'],
})
export class HomeMarchandPage implements OnInit {
  resStorage: any = {};
  id: any;
  api_token: any;
  solde: any;
  number: any;
  resultat: any = {};
  getcaisseR: any = {};
  id_onesignal: string;

  constructor( public popoverCtrl: PopoverController, public storage: Storage,
               public auth: AuthenticationService, private oneSignal: OneSignal,
               public toast: ToastController,public loading: LoadingController, 
               public nav: NavController, public alertController: AlertController,
               public qrcode: QrcodeService) {

            this.storage.get("caissiereData").then((res: any) =>{
              console.log("resutat dnas le storage",res)
              this.resStorage = res
              this.getSolde()
              this.number = res.data.caisse.code_case
            
            })

   }

  ngOnInit() {
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
    this.getSolde()
    });
    this.oneSignal.handleNotificationOpened().subscribe(() => {
      // do something when a notification is opened
    });
    this.oneSignal.endInit();
  }

  getSolde(){
    this.auth.getCaisseBYidCaisse(this.resStorage.data.caisse.id).then(res=>{
      console.log("resultat ok get caisse by id",res)
      this.getcaisseR = res
    })
  }

  updateOneSignaleId(){
    this.auth.updateClient({onesignale_id:this.id_onesignal}).then(res=>{
      console.log("update one signale",res)
    })
  }

  // getcompte(data){
  //   // console.log("resultat de get compte", data.data.trader.id, data.data.user.api_token)
  //   this.auth.getCompteMarchand(data.data.trader.id).then(res =>{
  //     console.log("resultat de get compte", res)
  //     let resultat: any;
  //     resultat = res
  //     this.solde = resultat.data.sold_account
  //     this.solde = parseInt(this.solde);
  //     this.solde = Math.round(this.solde)
  //     console.log("this.solde",this.solde)
  //   })
  // }
  
  // async openQR() {
  //   const popover = await this.popoverCtrl.create({
  //     component: QrcodeComponent,
  //     animated: true,
  //     showBackdrop: true,
  //     componentProps:{number: this.number}
  //   });
  //   return await popover.present();
  // }

  openQR() {
    this.qrcode.goToCreateCode(this.number);
  }

   //Toaste funtion ou notification function
   async showT(message) {
    const toast = await this.toast.create({
      message: message,
      mode:"ios",
      duration: 5000
    });
    toast.present();
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

  gotologin(){
    this.nav.navigateRoot("login")
    this.storage.clear()
  }
}
