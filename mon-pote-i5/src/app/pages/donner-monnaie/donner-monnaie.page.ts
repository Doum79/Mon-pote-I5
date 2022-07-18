import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AuthenticationService } from '../../service/api-service';
import { AlertController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-donner-monnaie',
  templateUrl: './donner-monnaie.page.html',
  styleUrls: ['./donner-monnaie.page.scss'],
})
export class DonnerMonnaiePage implements OnInit {

  number:any
  montant:any
  resStorage: any;

  constructor(private barcodeScanner: BarcodeScanner, public auth: AuthenticationService, public storage: Storage, public alertController: AlertController, public NavController: NavController) { 

    this.storage.get("caissiereData").then(res =>{
      console.log("resutat dnas le storage",res)
      this.resStorage = res
    })
  }

  ngOnInit() {
  }

qrscan(){
  this.barcodeScanner.scan().then(barcodeData => {
    console.log('Barcode data', barcodeData);
    this.getMontant(barcodeData)
   }).catch(err => {
       console.log('Error', err);
   });
}

transfAvoir(number, montant){
  let data = {
    phone: number,
    account: montant,
    traders_id: this.resStorage.data.caisse.traders_id,
    description: "donner monnaie",
    case_id: this.resStorage.data.caisse.id,
  }
  console.log("data mis en parametre",data)
   this.auth.MarchandDonneMonnaie(data).then(res=> {
     console.log(res)
     this.alerta("Transfers effectué avec succès")
     this.NavController.navigateRoot('home-marchand')
   }).catch( res=>{
     console.log(res)
     this.alerta("Erreur de transaction, Veillez vérifier que vous êtes lié(e) a une caisse ou contactez le service technique")
   })
 }

async getMontant(number) {
 const alert = await this.alertController.create({
  
   inputs: [
     {
       name: 'account',
       type: 'number',
       placeholder: 'Entrer le montant'
     },
   ],
   buttons: [
     {
       text: 'Annuler',
       role: 'cancel',
       cssClass: 'danger',
       handler: () => {
         console.log('Confirm Cancel');
       }
     }, {
       text: 'Ok',
       handler:res => {
         this.transfAvoir(number, res.account)
       }
     }
   ]
 });

 await alert.present();
}

async alerta(a){
  const alert = await this.alertController.create({
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
