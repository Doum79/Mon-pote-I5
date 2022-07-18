import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from '../../service/api-service';

@Component({
  selector: 'app-add-caisse',
  templateUrl: './add-caisse.page.html',
  styleUrls: ['./add-caisse.page.scss'],
})
export class AddCaissePage implements OnInit {

  addCaiss: boolean
  casseId: any;
  resStorage: any;
  resultatGetCaisse: any;
  modifcaisse: any = {};
  resultatGetCaissiere: any = [];
  aucuneCaissiere: boolean;
  InfoCaissiere: any = {};
  retourCreationCaissiere: any;

  constructor(public nav: NavController, public route: ActivatedRoute, public api: AuthenticationService,
    public loading: LoadingController, public storage: Storage, public alert: AlertController) {}

  ngOnInit() {
    this.addCaiss = false
    this.route.params.subscribe( params => {
      console.log("objet mis en parametre",params.casseId)
      this.casseId = params.casseId

      if(this.casseId){
        this.getStorage()
      }else{
        this.getCaissiere2()
      }
    })

    
  }

  addNewCaissiere(){
    if(!this.addCaiss ){
      this.addCaiss = true
    }else{
      this.addCaiss = false
    }
  }

  gotogerant(){
    this.nav.navigateRoot("gerant")
  }

  getStorage(){
    this.storage.get("marchandData").then(res =>{
      console.log("resutat dnas le storage",res)
      this.resStorage = res
      this.getCaisse()
      this.getCaissiere()
    })
  }

  getCaisse(){
    this.loading.create({mode:"ios"}).then(a => {a.present()})
    this.api.getCaisse(this.resStorage.data.trader.id).then(res=>{
      this.resultatGetCaisse = res
      console.log("this.resultatGetCaisse", this.resultatGetCaisse)
      this.loading.dismiss()

      for(let a of this.resultatGetCaisse){
        if(a.id == this.casseId){
          parseInt(a.sold_limite);
          Math.round(a.sold_limite)
          this.modifcaisse = a
        }
      }
    })
  }

  getCaissiere(){
    this.api.getCaissiere(this.resStorage.data.trader.id).then(res=>{
      this.resultatGetCaissiere = res
      console.log("this.resultatGetCaissière", this.resultatGetCaissiere)
    }).catch(()=>{
      this.addCaiss = true
      this.aucuneCaissiere = true
    })
  }

  getCaissiere2(){

    this.storage.get("marchandData").then(res =>{
      console.log("resutat dnas le storage",res)
      this.resStorage = res
    
      this.api.getCaissiere(this.resStorage.data.trader.id).then(res=>{
        this.resultatGetCaissiere = res
        console.log("this.resultatGetCaissière", this.resultatGetCaissiere)
      }).catch(()=>{
        this.addCaiss = true
        this.aucuneCaissiere = true
      })

    })

  }

  register(){
    this.loading.create({mode:"ios"}).then(a => {a.present()})
    console.log("aaaaaaaaaaaaaa", this.modifcaisse)
    if(!this.addCaiss){
      console.log("rantre dans le if addCaisee")
      let data = {
        'name': this.modifcaisse.name,
        'users_id': this.modifcaisse.users_id,
        'caisse_id': this.modifcaisse.id,
        'sold_limit': this.modifcaisse.sold_limite,
      }

      if(this.modifcaisse.id == undefined){
        console.log("rantre dans le if modifcaisse.id")
        let CaisseData = {
          'name': this.modifcaisse.name,
          'users_id': this.modifcaisse.users_id,
          'traders_id': this.resStorage.data.trader.id,
          'sold_limit': this.modifcaisse.sold_limite,
        }
        console.log(" CaisseData CaisseData",CaisseData)
        this.api.CreateCaisse(CaisseData).then(res=>{
          this.loading.dismiss()
          console.log("resultatCreate Caisse dans la fonction register",res)
          this.alerta("La caisse a été creé")
          this.modifcaisse = null
          this.InfoCaissiere = null
          this.gotogerant()
        }).catch(res=>{
          this.alerta(res.error.message)
          this.loading.dismiss()
        })
      }else{
        console.log("else")
        this.api.updateCaisse(data).then(res=>{
          this.loading.dismiss()
          this.alertUpdateSucces()
        }).catch(err=>{
          this.alerta("Erreur de plafonement")
          console.log("erruer", err)
          this.loading.dismiss()
        })
      }

      console.log("data a mettre a jpir",data)
    }else{
      console.log("this.Infocaissiere",this.InfoCaissiere)
      this.api.CreateCaissiere(this.InfoCaissiere).then(res=>{
        console.log("resultatCreationCaissiere dans la fonction register",res)
       this.retourCreationCaissiere = res
        let CaisseData = {
          'name': this.modifcaisse.name,
          'users_id': this.retourCreationCaissiere.data.id,
          'traders_id': this.resStorage.data.trader.id,
          'sold_limit': this.modifcaisse.sold_limite,
        }

        this.api.CreateCaisse(CaisseData).then(res=>{
          this.loading.dismiss()
          console.log("resultatCreate Caisse dans la fonction register",res)
          this.alerta("La caisse et la caissière ont été creé")
          this.modifcaisse = null
          this.InfoCaissiere = null
          this.gotogerant()
        })
      })
    }
  }

  updateCaseWithNewCaissiere(){
    this.loading.create({mode:"ios"}).then(a => {a.present()})
    this.api.CreateCaissiere(this.InfoCaissiere).then(res=>{
      console.log("resultatCreationCaissiere dans la fonction register",res)
     this.retourCreationCaissiere = res
      let CaisseData = {
        'name': this.modifcaisse.name,
        'users_id': this.retourCreationCaissiere.data.id,
        'traders_id': this.resStorage.data.trader.id,
        'sold_limit': this.modifcaisse.sold_limite,
      }

      this.api.updateCaisse(CaisseData).then(res=>{
        this.loading.dismiss()
        console.log("resultatCreate Caisse dans la fonction register",res)
        this.alerta("Les informations ont été mis à jour")
        this.modifcaisse = null
        this.InfoCaissiere = null
        this.gotogerant()
      })
    })
  }

  async alertUpdateSucces(){
    const alert = await this.alert.create({
      message: 'La caisse a été mis à jour',
      buttons: [
        {
          text: 'OK',
          role: 'cancel'
        }
      ]
    });
   await alert.present();
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
