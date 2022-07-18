import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../service/api-service';
import { LoadingController, NavController, AlertController } from '@ionic/angular';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-historique-caisse',
  templateUrl: './historique-caisse.page.html',
  styleUrls: ['./historique-caisse.page.scss'],
})
export class HistoriqueCaissePage implements OnInit {

  casseId: any;
  message: any;
  resultatGetTransaction: any;
  search: boolean;
  date_debut: any;
  date_fin: any;
  resultatRecherche: boolean;
  resultat: any;
  resultatJournalier: any = {};
  accountEntier: number;
  total: any = 0;
  totalC: any = 0;
  transactionDEBIT = [];
  transactionCREDIT: any;
  valueSelect: any;
  activeTrie: boolean;
  param: any;
  az = [];
  SauvegarderesultatDelaRecherche: any;

  constructor(public route: ActivatedRoute, public api: AuthenticationService, public loading: LoadingController, public nav: NavController, private datePipe: DatePipe, public alert: AlertController) { 
    this.route.params.subscribe( params => {
      console.log("objet mis en parametre",params.casseId)
      this.casseId = params.casseId
      this.getTransaction()
      this.getBalanceJournalière()
    })
    this.search = false
    this.resultatRecherche = false
    this.activeTrie = false
  }

  ngOnInit() {
  }

  getTransaction(){
    this.loading.create({mode:"ios"}).then(a => {a.present()})
    this.api.getTransactionCaissiere(this.casseId).then(res=>{
      console.log(res)
      this.resultatGetTransaction = res
      this.loading.dismiss()
    }).catch(res=>{
      this.message = res.error.message
      this.loading.dismiss()
    })
  }

  getTransactionDEBIT(param){
    this.transactionDEBIT.length = 0
    this.param = param
    console.log("zzzzzzzzzzzzzzzzzzzzzzz", param)
    for(let a of this.resultatGetTransaction){
      if(a.type == param){
        this.transactionDEBIT.push(a)
        console.log("aaaaaaaaaaaa",  this.transactionDEBIT)
        this.activeTrie = true
      }
    }
  }

  getTransactionTRIE(param){
    this.resultat.length = 0
    this.param = param
    console.log("zzzzzzzzzzzzzzzzzzzzzzz", param)
    console.log("azertyuiopqsdfghjklmaz ertyuiopqsdfghjklmwxcvbn, azertyuiopqsdfghjk",  this.SauvegarderesultatDelaRecherche)
    for(let a of this.SauvegarderesultatDelaRecherche ){
      if(a.type == param){
        this.resultat.push(a)
        console.log("aaaaaaaaaaaa", this.resultat)
      }
    }
    console.log("la boucke est fini @@@@@@@@")
  }

  gotogerant(){
    this.nav.back()
  }

  focus(){
    this.search = true
  }

  rechercheTransactionParDAte(){
    this.message = null
    this.api.recherchetransactionBYdate(this.casseId,this.date_debut,this.date_fin).then(res=>{
      console.log("resultat de la recherche",res)
      this.resultatRecherche = true
      this.resultat = res
      this.SauvegarderesultatDelaRecherche = res
    }).catch(res=>{
      this.message = res.error.message
      this.resultatRecherche = true
    })
  }

  getBalanceJournalière(){

    let Today_date = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
    console.log("date d'aujourd'hui", Today_date)
  
    this.api.recherchetransactionBYdate(this.casseId, Today_date, Today_date).then(res=>{
      console.log("resultat de la recherche",res)
      this.resultatJournalier= res
        for( let a of this.resultatJournalier){
         this.accountEntier = parseInt(a.account);
          console.log("aaaaaaaaaaaaaaaaaaaaa", a.account)
          if(a.type == "DEBIT"){ this.total = this.total + this.accountEntier; console.log("a.acount a.acount a.acount", this.total)}
          if(a.type == "CREDIT"){ this.totalC = this.totalC + this.accountEntier; console.log("a.acount a.acount a.acount", this.totalC)}
        }
      })
    }

    async dateSearch(){
      const alert = await this.alert.create({

        header: "Recherche par date",

        inputs: [
          {
            name: 'date_debut',
            label: 'Date début',
            type: 'date',
            placeholder: 'Date début'
          },
          {
            name: 'date_fin',
            label: 'Date fin',
            type: 'date',
            placeholder: 'Date fin'
          }
        ],

        buttons: [
          {
            text: 'Annuler',
            role: 'cancel'
          },
          {
            text: 'Chercher',
            role: 'cancel'
          }
        ]
      });
     await alert.present();
    }

    async filtreDebitCredit(){
      const alert = await this.alert.create({
        inputs: [
          {
            name: 'credit',
            label: 'Credit',
            type: 'checkbox',
          },
          {
            name: 'debit',
            label: 'Débit',
            type: 'checkbox',
          }
        ],

        buttons: [
          {
            text: 'Annuler',
            role: 'cancel'
          },
          {
            text: 'Chercher',
            role: 'cancel'
          }
        ]
      });
     await alert.present();
    }

}
