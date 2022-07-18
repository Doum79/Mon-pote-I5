import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AuthenticationService } from '../../service/api-service';
import { Storage } from '@ionic/storage';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paye',
  templateUrl: './paye.page.html',
  styleUrls: ['./paye.page.scss'],
})
export class PayePage implements OnInit {
  resStorage: any;
  number: any;  
  account: any;

  constructor(public loading: LoadingController, private barcodeScanner: BarcodeScanner, public auth: AuthenticationService, public storage: Storage, public alertController: AlertController, public router: Router) { 

    this.storage.get("userdata").then(res =>{
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

  transfAvoir(number, account){
  this.loading.create({mode:"ios"}).then(a => {a.present()})
   let data = {
     code_caisse: number,
     account: account,
     user_id: this.resStorage.data.id,
     description: "Achat de bien et service"
   }
   console.log("data mis en parametre",data)
    this.auth.ClientTransf(data).then(res=> {
      console.log(res)
      this.ALERTtransfSUCCES("transfers effectué avec succès")
      this.auth.getCompteClient(this.resStorage.data.id)
      console.log("solde du client apres le transfert",this.auth.soldeClient)

      this.router.navigate(["/tabs"])

      this.loading.dismiss()
    }).catch( res=>{
      this.loading.dismiss()
      console.log(res)
      this.ALERTtransfSUCCES(res.error.message)
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

async ALERTtransfSUCCES(a) {
  const alert = await this.alertController.create({
    message: a,
    buttons: [
      {
        text: 'OK',
        role: 'cancel',
        cssClass: 'danger',
        handler: () => {
          console.log('Confirm Cancel');
        }
      }
    ]
  });

  await alert.present();
}

}
