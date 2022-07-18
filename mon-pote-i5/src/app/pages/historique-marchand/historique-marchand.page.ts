import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../service/api-service';
import { AlertController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-historique-marchand',
  templateUrl: './historique-marchand.page.html',
  styleUrls: ['./historique-marchand.page.scss'],
})
export class HistoriqueMarchandPage implements OnInit {
  histo: any;
  // dataHistorique: any = {};
  dataHistorique1: any = [];
  caissiereData: any = {};
  resultatRecherche: any = {};
  total: number = 0;
  totalC: number = 0;
  accountEntier: number;

  constructor(public auth: AuthenticationService, public alert: AlertController, public loading: LoadingController, public storage: Storage, private datePipe: DatePipe) { 
  

    this.storage.get("caissiereData").then(res =>{
      this.caissiereData = res
      console.log("Caissiere data",this.caissiereData)
      this.getHistoCaisse()
      this.getBalanceJournalière()
    })
    
  }

  ngOnInit() {
  }

  getHistoCaisse(){
    this.loading.create({mode:"ios"}).then(a => {a.present()})
    this.auth.getHistoriqueCaisse(this.caissiereData.data.caisse.id).then(res =>{
      console.log(res)
      this.dataHistorique1 = res
      // this.histo = res
      // this.dataHistorique = this.histo.data

      // var dataArondi = new Array;
      // for(let bb of this.dataHistorique){
      //   bb.account = parseInt(bb.account);
      //   bb.account = Math.round(bb.account)
      //   dataArondi.push(bb)
      // }
      // this.dataHistorique1 = dataArondi
      // this.dataHistorique1.reverse()
      // console.log("data historique 1",this.dataHistorique1)
      this.loading.dismiss()
    })
    .catch(err=>{
      this.loading.dismiss()
      console.log(err)
      // this.alerta("AUCUNE TRANSACTION TROUVEE")
    })
  }

  getBalanceJournalière(){

  let Today_date = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
  console.log("date d'aujourd'hui", Today_date)
  // let Today_date = "15-10-2019"

  this.auth.recherchetransactionBYdate(this.caissiereData.data.caisse.id, Today_date, Today_date).then(res=>{
    console.log("resultat de la recherche",res)
    this.resultatRecherche = res
      for( let a of this.resultatRecherche){
       this.accountEntier = parseInt(a.account);
        console.log("aaaaaaaaaaaaaaaaaaaaa", a.account)
        if(a.type == "DEBIT"){ this.total = this.total + this.accountEntier; console.log("a.acount a.acount a.acount", this.total)}
        if(a.type == "CREDIT"){ this.totalC = this.totalC + this.accountEntier; console.log("a.acount a.acount a.acount", this.totalC)}
      }
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
