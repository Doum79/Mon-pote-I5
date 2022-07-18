import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
 
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
 
    baseUrl = 'https://monpote.armeltissi.com/' ;
    // baseUrl = 'http://192.168.43.180/';
    apiClientUrl = this.baseUrl + 'api/user';
    apiMarchandUrl = this.baseUrl + 'api/trader';
    user:any;
    token: any;
    httpOptionsMarchand:any;
  idClinet: any;
  idMarchand: any;
  idCaissiere: any;

  soldeClient: any;
    
  constructor(public http: HttpClient, public storage: Storage) {}

  getINstrage(){

    this.storage.get("marchandData").then((res:any) =>{
      if(res != null){
        console.log("resultat dans marchant",res)
        this.token = res.data.user.api_token
        this.idMarchand = res.data.trader.id
        this.httpOptionsMarchand = {
          headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.token})
        };
      }
    })

    this.storage.get("userdata").then((res:any) =>{
      if(res!= null){
        console.log("resultat dans user",res)
        this.token = res.data.api_token
        this.idClinet = res.data.id
        this.httpOptionsMarchand = {
          headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.token})
        };
      }
    })

    this.storage.get("caissiereData").then((res:any) =>{
      if(res != null){
        console.log("resultat dans caissiereData",res)
        this.token = res.data.user.api_token
        this.idCaissiere = res.data.user.id
        this.httpOptionsMarchand = {
          headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.token})
        };
      
      }
    })
  }

  // getForceInStorage(){
  //  let ab = setInterval(() => { 
  //     this.getINstrage();
  //     if(this.token){
  //       this.getINstrage(); 
  //       clearInterval(ab);
  //     }
  //  }, 2000);
  // }


  ///////////////////// PARTIE CLIENT

  registerClient(data){
    console.log("DATA MIS EN PARAM",data)
    return new Promise((resolve, reject) => {
      this.http.post(this.apiClientUrl+'/register', data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
 
  loginClient(data){
    return new Promise((resolve, reject) => {
      this.http.post(this.apiClientUrl+'/login', data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getCompteClient(data){
    return new Promise((resolve, reject) => {
      this.http.get(this.apiClientUrl+'/compte/id_user/'+ data,this.httpOptionsMarchand)
        .subscribe((res:any) => {
          resolve(res);
          this.soldeClient = res.data.sold_account
          console.log("resultat du solde dans le service", this.soldeClient)
        }, (err) => {
          reject(err);
        });
    });
  }

  updateClient(data){
    return new Promise((resolve, reject) => {
      this.http.post(this.apiClientUrl+'/update', data, this.httpOptionsMarchand)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  ClientTransf(data){
    return new Promise((resolve, reject) => {
      this.http.post(this.apiClientUrl+'/scanne',data, this.httpOptionsMarchand)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getHistoriqueClient(){
    return new Promise((resolve, reject) => {
      this.http.get(this.apiClientUrl+'/transaction/id_user/'+ this.idClinet,this.httpOptionsMarchand)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }



  /////////////////////PARTIE CAISSIERE

 

  loginMarchand(data){
    return new Promise((resolve, reject) => {
      this.http.post(this.apiMarchandUrl+'/login', data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getCompteMarchand(data){

    return new Promise((resolve, reject) => {
      this.http.get(this.apiMarchandUrl+'/compte/id_trader/'+data, this.httpOptionsMarchand)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  MarchandDonneMonnaie(data){
    console.log("token mis en parametre",this.token)
    return new Promise((resolve, reject) => {
      this.http.post(this.apiMarchandUrl+'/scanne',data, this.httpOptionsMarchand)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getHistoriqueCaisse(id){
    
    return new Promise((resolve, reject) => {
      this.http.get(this.apiMarchandUrl+'/caisse/transaction/id_caisse/'+id, this.httpOptionsMarchand)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }




  //////////////////////PARTIE GERANT

  CreateCaisse(data){
    return new Promise((resolve, reject) => {
      this.http.post(this.apiMarchandUrl+'/caisse_create', data, this.httpOptionsMarchand)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getCaisse(id){
    console.log("this.httpOptionsMarchand", this.httpOptionsMarchand)
    console.log("this.httpOptionsMarchand", this.token )
    return new Promise((resolve, reject) => {
      this.http.get(this.apiMarchandUrl+'/caisse/id_trader/'+id, this.httpOptionsMarchand)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getCaisseBYidCaisse(id){
    return new Promise((resolve, reject) => {
      this.http.get(this.apiMarchandUrl+'/caisse/id_caisse/'+id, this.httpOptionsMarchand)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  deleteCaisse(idCaisse){
    console.log("this.httpOptionsMarchand", this.httpOptionsMarchand)
    return new Promise((resolve, reject) => {
      this.http.get(this.apiMarchandUrl+'/caisse_delete/'+idCaisse, this.httpOptionsMarchand)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  updateCaisse(data){
    return new Promise((resolve, reject) => {
      this.http.post(this.apiMarchandUrl+'/caisse_update', data, this.httpOptionsMarchand)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }



  getCaissiere(id){
    console.log("this.httpOptionsMarchand", this.httpOptionsMarchand)
    return new Promise((resolve, reject) => {
      this.http.get(this.apiMarchandUrl+'/caissiere/id_trader/'+id, this.httpOptionsMarchand)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  CreateCaissiere(data){
    return new Promise((resolve, reject) => {
      this.http.post(this.apiMarchandUrl+'/caissiere_create', data, this.httpOptionsMarchand)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  UpdateCaissiere(data){
    return new Promise((resolve, reject) => {
      this.http.post(this.apiMarchandUrl+'/caissiere_update', data, this.httpOptionsMarchand)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  deleteCaissiere(id){
    return new Promise((resolve, reject) => {
      this.http.get(this.apiMarchandUrl+'/caissiere_delete/'+id, this.httpOptionsMarchand)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getTransactionCaissiere(id){
    return new Promise((resolve, reject) => {
      this.http.get(this.apiMarchandUrl+'/caisse/transaction/id_caisse/'+id, this.httpOptionsMarchand)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  recherchetransactionBYdate(idcaisse,debut,fin){
    return new Promise((resolve, reject) => {
      this.http.get(this.apiMarchandUrl+'/caisse/transaction/filter/'+idcaisse+'/'+debut+'/'+fin, this.httpOptionsMarchand)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }


  //////////LES API E-COMMERCE

  Ecommerce_recupererLesCategorie(){
    return new Promise((resolve, reject) => {
      this.http.get(this.apiClientUrl+'/categories', this.httpOptionsMarchand)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  Ecommerce_recupererToutLesProduits(){
    return new Promise((resolve, reject) => {
      this.http.get(this.apiClientUrl+'/produits', this.httpOptionsMarchand)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
 
  Ecommerce_recupererLesProduitsParCategorie(id){
    return new Promise((resolve, reject) => {
      this.http.get(this.apiClientUrl+'/produits/id_categorie/'+id, this.httpOptionsMarchand)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  Ecommerce_recherche_produit(searchKey){
    return new Promise((resolve, reject) => {
      this.http.get(this.apiClientUrl+'/produits/search/'+searchKey, this.httpOptionsMarchand)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  Ecommerce_recherche_produit_par_categorie(id){
    return new Promise((resolve, reject) => {
      this.http.get(this.apiClientUrl+'/produits/id_categorie/'+id, this.httpOptionsMarchand)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  Ecommerce_passer_commande(data){
    return new Promise((resolve, reject) => {
      this.http.post(this.apiClientUrl+'/commande', data, this.httpOptionsMarchand)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

}
