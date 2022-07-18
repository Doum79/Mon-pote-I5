import { NavController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from '../../../service/api-service';

@Component({
  selector: 'app-filter-shop',
  templateUrl: './filter-shop.page.html',
  styleUrls: ['./filter-shop.page.scss'],
})
export class FilterShopPage implements OnInit {

  data:any = [];
  title:any;
  categories: any = [];
  isLoading = false;
  isNotResult

  constructor(
    private route: ActivatedRoute, private navCtrl : NavController,
    public toastCtrl: ToastController, private storage: Storage,
    private api: AuthenticationService, public router: Router
    ) { }

  ngOnInit() {

    this.getCategories();

    // this.params = this.route.snapshot.params;
    // console.log(this.params);

    // if(this.params.param == "1"){
    //   this.title = "Liste des Gammes";
    //   this.getGamme();
    // }else{
    //   this.title = "Liste des Marques";
    //   this.getMarque();
    // }

  }

  getCategories(){
    this.isLoading = true
    this.api.Ecommerce_recupererLesCategorie().then( res => {
      console.log("categorie categorie categorie%%%%%%%%",res)
      this.categories = res
      this.isLoading = false
      if (this.categories.length == 0) {
        this.isNotResult = true;
      } else {
        this.isNotResult = false;
      }
    });

    // this.data = [
    //   {
    //   "id": 2,
    //   "libelle": "Sans gamme",
    //   "description": "Sans distinction aucune",
    //   "status": 1,
    //   "created_at": null,
    //   "updated_at": null,
    //   "picture": "https://ziaou.com/uploads/gamme/1557582023.png"
    //   },
    //   {
    //   "id": 14,
    //   "libelle": "Brosse",
    //   "description": "Gamme de brosse",
    //   "status": 1,
    //   "created_at": null,
    //   "updated_at": null,
    //   "picture": "https://ziaou.com/uploads/gamme/1557828635.jpeg"
    //   },
    //   {
    //   "id": 15,
    //   "libelle": "Crème",
    //   "description": "Gamme de crème",
    //   "status": 1,
    //   "created_at": null,
    //   "updated_at": null,
    //   "picture": "https://ziaou.com/uploads/gamme/1557828685.png"
    //   },
    //   {
    //   "id": 16,
    //   "libelle": "Elastique",
    //   "description": "Gamme elastique",
    //   "status": 1,
    //   "created_at": null,
    //   "updated_at": null,
    //   "picture": "https://ziaou.com/uploads/gamme/1557828970.png"
    //   },
    //   {
    //   "id": 17,
    //   "libelle": "Huile",
    //   "description": "Gamme d'huile",
    //   "status": 1,
    //   "created_at": null,
    //   "updated_at": null,
    //   "picture": "https://ziaou.com/uploads/gamme/1557829038.png"
    //   },
    //   {
    //   "id": 18,
    //   "libelle": "Gel",
    //   "description": "Gamme de gel",
    //   "status": 1,
    //   "created_at": null,
    //   "updated_at": null,
    //   "picture": "https://ziaou.com/uploads/gamme/1557829252.png"
    //   },
    //   {
    //   "id": 19,
    //   "libelle": "Lait",
    //   "description": "Gamme de lait",
    //   "status": 1,
    //   "created_at": null,
    //   "updated_at": null,
    //   "picture": "https://ziaou.com/uploads/gamme/1557829299.png"
    //   },
    //   {
    //   "id": 20,
    //   "libelle": "Lotion",
    //   "description": "Gamme de lotion",
    //   "status": 1,
    //   "created_at": null,
    //   "updated_at": null,
    //   "picture": "https://ziaou.com/uploads/gamme/1557829348.png"
    //   }
    //   ];
    // this.api.getGamme().then(data =>{
    //   let d:any = data;
    //   this.data = d.gamme;

    //   if(this.data.length > 0){
    //     console.log("data :", data);
    //     console.log("gammes :", this.data);
        
    //   }else{
    //     this.showT('Aucune gamme disponible pour le moment !');
    //   }
      
    // }).catch(error => {
    //   console.log('error:' + error);
    //   this.showT('Pas de connexion internet !');
    // });
  }

  getMarque(){

    this.data = [
      {
      "id": 2,
      "libelle": "Sans marque",
      "description": "Sans aucune marque en particulier",
      "status": 1,
      "created_at": null,
      "updated_at": null,
      "picture": "https://ziaou.com/uploads/marque/1557581963.png"
      },
      {
      "id": 3,
      "libelle": "CRAZY POUSS AFRONATUREL",
      "description": "UNE MARQUE FRANCAISE  A BASE DE PRODUITS NATURELS",
      "status": 1,
      "created_at": null,
      "updated_at": null,
      "picture": "https://afro-naturel.com/wp-content/uploads/2017/01/Logo-Afronaturel-Crazy-PoussOK.png"
      },
      {
      "id": 5,
      "libelle": "Les secrets de Loly",
      "description": "Marque française de produits cosmétiques",
      "status": 1,
      "created_at": null,
      "updated_at": null,
      "picture": "https://ziaou.com/uploads/marque/1557996419.jpg"
      },
      {
      "id": 6,
      "libelle": "Avlon kera Care",
      "description": "La meilleure marque",
      "status": 1,
      "created_at": null,
      "updated_at": null,
      "picture": "https://ziaou.com/uploads/marque/1562089500.png"
      },
      {
      "id": 7,
      "libelle": "Asiam",
      "description": "Asiam",
      "status": 1,
      "created_at": null,
      "updated_at": null,
      "picture": "https://ziaou.com/uploads/marque/1562090025.jpg"
      },
      {
      "id": 8,
      "libelle": "Design essentials",
      "description": "Design essentials",
      "status": 1,
      "created_at": null,
      "updated_at": null,
      "picture": "https://ziaou.com/uploads/marque/1562090362.jpg"
      },
      {
      "id": 9,
      "libelle": "Shea moisture",
      "description": "Shea moisture",
      "status": 1,
      "created_at": null,
      "updated_at": null,
      "picture": "https://ziaou.com/uploads/marque/1562090538.jpg"
      },
      {
      "id": 10,
      "libelle": "Les secrets de loly",
      "description": "Les secrets de loly",
      "status": 1,
      "created_at": null,
      "updated_at": null,
      "picture": "https://ziaou.com/uploads/marque/1562090691.jpg"
      },
      {
      "id": 11,
      "libelle": "Carolina-b",
      "description": "Carolina-b",
      "status": 1,
      "created_at": null,
      "updated_at": null,
      "picture": "https://ziaou.com/uploads/marque/1562090808.png"
      },
      {
      "id": 12,
      "libelle": "Eco",
      "description": "Eco",
      "status": 1,
      "created_at": null,
      "updated_at": null,
      "picture": "https://ziaou.com/uploads/marque/1562090946.jpg"
      },
      {
      "id": 13,
      "libelle": "Miss antilles",
      "description": "Miss antilles",
      "status": 1,
      "created_at": null,
      "updated_at": null,
      "picture": "https://ziaou.com/uploads/marque/1562091168.jpg"
      },
      {
      "id": 14,
      "libelle": "Activilong",
      "description": "Activilong",
      "status": 1,
      "created_at": null,
      "updated_at": null,
      "picture": "https://ziaou.com/uploads/marque/1562091348.png"
      },
      {
      "id": 15,
      "libelle": "Henné color",
      "description": "Henné color",
      "status": 1,
      "created_at": null,
      "updated_at": null,
      "picture": "https://ziaou.com/uploads/marque/1562091515.jpg"
      },
      {
      "id": 16,
      "libelle": "Adore",
      "description": "Adore",
      "status": 1,
      "created_at": null,
      "updated_at": null,
      "picture": "https://ziaou.com/uploads/marque/1562091674.png"
      },
      {
      "id": 17,
      "libelle": "Revlon",
      "description": "Revlon",
      "status": 1,
      "created_at": null,
      "updated_at": null,
      "picture": "https://ziaou.com/uploads/marque/1562091868.png"
      },
      {
      "id": 18,
      "libelle": "Color rebel",
      "description": "Color rebel",
      "status": 1,
      "created_at": null,
      "updated_at": null,
      "picture": "https://ziaou.com/uploads/marque/1562092112.jpg"
      },
      {
      "id": 19,
      "libelle": "Bigen- mens",
      "description": "Bigen- mens",
      "status": 1,
      "created_at": null,
      "updated_at": null,
      "picture": "https://ziaou.com/uploads/marque/1562092228.jpg"
      },
      {
      "id": 20,
      "libelle": "IC-hair polisher",
      "description": "IC-hair polisher",
      "status": 1,
      "created_at": null,
      "updated_at": null,
      "picture": "https://ziaou.com/uploads/marque/1562092471.jpg"
      },
      {
      "id": 21,
      "libelle": "Motions",
      "description": "Motions",
      "status": 1,
      "created_at": null,
      "updated_at": null,
      "picture": "https://ziaou.com/uploads/marque/1562093111.jpg"
      },
      {
      "id": 22,
      "libelle": "Luster’s pink",
      "description": "Luster’s pink",
      "status": 1,
      "created_at": null,
      "updated_at": null,
      "picture": "https://ziaou.com/uploads/marque/1562104693.png"
      },
      {
      "id": 23,
      "libelle": "Dark and lovely",
      "description": "Dark and lovely",
      "status": 1,
      "created_at": null,
      "updated_at": null,
      "picture": "https://ziaou.com/uploads/marque/1562105503.jpg"
      },
      {
      "id": 24,
      "libelle": "Queen helene",
      "description": "Queen helene",
      "status": 1,
      "created_at": null,
      "updated_at": null,
      "picture": "https://ziaou.com/uploads/marque/1562105719.png"
      },
      {
      "id": 25,
      "libelle": "Showlime",
      "description": "Showlime",
      "status": 1,
      "created_at": null,
      "updated_at": null,
      "picture": "https://ziaou.com/uploads/marque/1562106326.jpg"
      },
      {
      "id": 26,
      "libelle": "Rinju",
      "description": "Rinju",
      "status": 1,
      "created_at": null,
      "updated_at": null,
      "picture": "https://ziaou.com/uploads/marque/1562106764.jpg"
      }
      ];
    // this.api.getMarque().then(data =>{
    //   let d:any = data;
    //   this.data = d.marque;

    //   if(this.data.length > 0){
    //     console.log("data :", data);
    //     console.log("marque :", this.data);
        
    //   }else{
    //     this.showT('Aucune gamme disponible pour le moment !');
    //   }
      
    // }).catch(error => {
    //   console.log('error:' + error);
    //   this.showT('Pas de connexion internet !');
    // });
  }


  selectItem(item){
    // (this.params.param == "1" )? item.type = "Gamme" : item.type = "Marque" ;
    console.log(item);
    this.storage.set('filter',item).then(()=>{
      this.router.navigate(['/tabs/shop/', item.id]);
    })
  }


  async showT(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

}
