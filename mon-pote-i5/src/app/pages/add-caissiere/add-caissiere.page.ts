import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { AuthenticationService } from '../../service/api-service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-add-caissiere',
  templateUrl: './add-caissiere.page.html',
  styleUrls: ['./add-caissiere.page.scss'],
})
export class AddCaissierePage implements OnInit {

  InfoCaissiere: any = {};
  resStorage: any;
  resultatGetCaissiere: unknown;
  activeMisAJour: boolean;

  constructor(public nav: NavController, public alert: AlertController, public api: AuthenticationService,
    public loading: LoadingController, public storage: Storage) { this.getStorage()}

  ngOnInit() {
    this.activeMisAJour = false
  }

  getStorage(){
    this.storage.get("marchandData").then(res =>{
      console.log("resutat dnas le storage",res)
      this.resStorage = res
      this.getCaissiere()
    })
  }

  gotogerant(){
    this.nav.navigateRoot("gerant")
  }

  async alertSuppression(a,id){
    const alert = await this.alert.create({
      message: 'Voulez-vous vraiment supprimer cette caissière "'+a+'" ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
        },
        {
          text: 'Confirmer',
          handler: () => {
            this.deleteCaissiere(id)
          }
        }
      ]
    });
   await alert.present();
  }

  createCaissiere(){
    this.loading.create({mode:"ios"}).then(a => {a.present()})
    console.log("this.InfoCaissiere", this.InfoCaissiere)
    this.api.CreateCaissiere(this.InfoCaissiere).then(res=>{
      this.getCaissiere()
      this.loading.dismiss()
      console.log("resultatCreationCaissiere dans la fonction register",res)
      this.InfoCaissiere.name = null
      this.InfoCaissiere.email = null
      this.InfoCaissiere.phone = null
      this.InfoCaissiere.password = null
      this.alerta("Caissiere crée avec succes")
      this.getCaissiere()
  }).catch(res=>{
    this.alerta(res.error.message)
    this.loading.dismiss()
  })
}

getCaissiere(){
  this.api.getCaissiere(this.resStorage.data.trader.id).then(res=>{
    this.resultatGetCaissiere = res
    console.log("this.resultatGetCaissière", this.resultatGetCaissiere)
  }).catch(()=>{
    this.alerta("Aucune caissière")
    this.loading.dismiss()
  })
}

editeCaissiere(a){
  this.InfoCaissiere = a
  this.activeMisAJour = true
}

updateCaissiere(){
  this.loading.create({mode:"ios"}).then(a => {a.present()})
  let data = {
    'email': this.InfoCaissiere.email,
    'name': this.InfoCaissiere.name,
    'phone': this.InfoCaissiere.phone,
    'caissiere_id': this.InfoCaissiere.id,
  }
  console.log("data a mettre a jour",data)
  this.api.UpdateCaissiere(data).then(res=>{
    this.alerta("Mis à jour avec succes")
    this.loading.dismiss()
  }).catch(()=>{
    this.alerta("erreur de mis à jour")
    this.loading.dismiss()
  })
}

deleteCaissiere(id){
  this.loading.create({mode:"ios"}).then(a => {a.present()})
  this.api.deleteCaissiere(id).then(()=>{
    this.getCaissiere()
    this.loading.dismiss()
    this.alerta("caissiere supprimée avec succes")
  })
}

async alerta(a){
  const alert = await this.alert.create({
    message: a,
    buttons: [
      {
        text: 'OK',
        role: 'cancel'
      }
    ]
  });
 await alert.present();
}

}
