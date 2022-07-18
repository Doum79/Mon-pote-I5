import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, LoadingController } from '@ionic/angular';
import { AuthenticationService } from '../../service/api-service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gerant',
  templateUrl: './gerant.page.html',
  styleUrls: ['./gerant.page.scss'],
})
export class GerantPage implements OnInit {

  resStorage: any;
  resultatGetCaisse: any;
  message: any;

  constructor(public alert: AlertController, public nav: NavController, 
    public api: AuthenticationService, public storage: Storage,
    public loading: LoadingController, public router: Router) {


    this.storage.get("marchandData").then(res =>{
      console.log("resutat dnas le storage",res)
      this.resStorage = res
      this.getCaisse()
    })

   }

  ngOnInit() {
  }

  async alertSuppression(a,id){
    const alert = await this.alert.create({
      message: 'Voulez-vous vraiment supprimer cette caisse "'+a+'" ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
        },
        {
          text: 'Confirmer',
          handler: () => {
            this.deleteCaisse(id)
          }
        }
      ]
    });
   await alert.present();
  }

  async alertDeconnexion(){
    const alert = await this.alert.create({
      message: 'Voulez-vous vous déconnectez ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
        },
        {
          text: 'Confirmer',
          handler: () => {
            this.gotologin()
          }
        }
      ]
    });
   await alert.present();
  }

 addCaisse(){
  this.nav.navigateRoot("add-caisse")
 }

 addCaissiere(){
  this.nav.navigateRoot("add-caissiere")
}

gotologin(){
  this.nav.navigateRoot("login")
  this.storage.clear()
}

getCaisse(){
  this.loading.create({mode:"ios"}).then(a => {a.present()})
  this.api.getCaisse(this.resStorage.data.trader.id).then(res=>{
    this.resultatGetCaisse = res
    console.log("this.resultatGetCaisse", this.resultatGetCaisse)
    this.loading.dismiss()
  }).catch(res=>{
    this.message = res.error.message
    this.loading.dismiss()
  })
}

deleteCaisse(id){
  this.api.deleteCaisse(id).then(res=>{
    this.resultatGetCaisse = res
    console.log("this.resultatGetCaisse", this.resultatGetCaisse)
    this.getCaisse()
  }).catch(()=>{
    this.alertErreurSuppression()
  })
}

async alertErreurSuppression(){
  const alert = await this.alert.create({
    message: 'erreur de suppression',
    buttons: [
      {
        text: 'OK',
        role: 'cancel'
      }
    ]
  });
 await alert.present();
}

editCaisse(id){
  this.nav.navigateRoot(["add-caisse", id])
}

historiqueCaisse(id){
  this.nav.navigateForward(["historique-caisse", id])
}

}
