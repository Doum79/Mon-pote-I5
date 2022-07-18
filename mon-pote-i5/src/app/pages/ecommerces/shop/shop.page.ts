import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastController, NavParams } from '@ionic/angular';
//import { ApiService } from 'src/app/services/api.service';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from 'src/app/service/api-service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {

  cartCount: number = 0;
  search: any = null;
  isLoading: boolean = true;
  message: any = null;
  isNotResult: boolean;

  params: Params;
  // prod: any =  [
  //   {
  //   "id": 5,
  //   "title": "Brosse crazypousse",
  //   "description": "La brosse à cheveux démêlante & coiffante de CRAZY POUSS convient aux cheveux Crépus, Frisés et Défrisés. Elle démêle en douceur les nœuds des cheveux difficiles à coiffer sans les arracher, le brossage est plus rapide et vos cheveux ne sont pas fragilisés. Vous pouvez également coiffer les cheveux de vos enfants sans douleur. Vous apprécierez ses picots souples qui permettent de structurer en douceur votre chevelure. L’une des spécificités de la brosse CRAZY POUSS, celle-ci permet de bien adapter les picots à la forme de votre crâne. La brosse offre un confort ultime et évite d’endommager le cuir chevelu. De plus, sa manche souple permet une manipulation précise et agréable. Enfin, elle deviendra une précieuse alliée pour dompter vos cheveux difficiles à coiffer.",
  //   "price": 20,
  //   "price_promo": 15,
  //   "picture": "http://ziaou.com/uploads/promo/1564595250.png",
  //   "status": 1,
  //   "gamme": "Sans gamme",
  //   "marque": "CRAZY POUSS AFRONATUREL"
  //   },
  //   {
  //   "id": 27,
  //   "title": "GELOCKS CRAZY LOCKS",
  //   "description": "CRAZY LOCKS GELOCKS est une glue végétal 100% naturelle. Ce gel permet de démarrer ou d’entretenir les locks, les twists et les vanilles. Il fixe sans durcir et sans effet collant. Il absorbe l’humidité et n’accumule pas de résidus blancs.\r\nSANS SULFATE, SANS PARABEN, SANS RESIDUS, SANS COLORANTS ET SANS ALCOOL.",
  //   "price": 9.9,
  //   "price_promo": 8.91,
  //   "picture": "http://ziaou.com/uploads/promo/1559912086.jpg",
  //   "status": 1,
  //   "gamme": "Gel",
  //   "marque": "CRAZY POUSS AFRONATUREL"
  //   },
  //   {
  //   "id": 29,
  //   "title": "HUILE 3 EN 1 HUILE DE RICIN HUILE D’AVOCAT HUILE DE COCO HUILE 3 EN 1",
  //   "description": "HUILE 3 EN 1 HUILE DE RICIN HUILE D’AVOCAT HUILE DE COCO HUILE 3 EN 1",
  //   "price": 9.9,
  //   "price_promo": 8.91,
  //   "picture": "http://ziaou.com/uploads/promo/1562963429.jpg",
  //   "status": 1,
  //   "gamme": "Huile",
  //   "marque": "CRAZY POUSS AFRONATUREL"
  //   },
  //   {
  //   "id": 36,
  //   "title": "Huile Locks",
  //   "description": "Huile Locks",
  //   "price": 9.9,
  //   "price_promo": 8.91,
  //   "picture": "http://ziaou.com/uploads/promo/1559912200.jpg",
  //   "status": 1,
  //   "gamme": "Huile",
  //   "marque": "CRAZY POUSS AFRONATUREL"
  //   },
  //   {
  //   "id": 54,
  //   "title": "WASH SHAMPOOING CRAZY LOCKS",
  //   "description": "Le WASH SHAMPOOING est formulé pour nettoyer en douceur et nourrir les cheveux Locksés. Sa formule stimulante aux extraits d’huile de carapate et menthe poivrée, stimule le cuir chevelu, soulage les démangeaisons et enlève les résidus. Nettoie en douceur.",
  //   "price": 9.9,
  //   "price_promo": 8.91,
  //   "picture": "http://ziaou.com/uploads/promo/1559912169.jpg",
  //   "status": 1,
  //   "gamme": "Shampoing",
  //   "marque": "CRAZY POUSS AFRONATUREL"
  //   },
  //   {
  //   "id": 55,
  //   "title": "SPRAY HYDRATANT CRAZY LOCKS",
  //   "description": "Glue végétale 100% Naturel\r\nCRAZY LOCKS GELOCKS est une glue végétal 100% naturelle. Ce gel permet de démarrer ou d’entretenir les locks, les twists et les vanilles.\r\nIl fixe sans durcir et sans effet collant. Il absorbe l’humidité et n’accumule pas de résidus blancs.\r\nSANS SULFATE, SANS PARABEN, SANS RESIDUS, SANS COLORANTS ET SANS ALCOOL.",
  //   "price": 9.9,
  //   "price_promo": 8.91,
  //   "picture": "http://ziaou.com/uploads/promo/1559912242.jpg",
  //   "status": 1,
  //   "gamme": "Sans gamme",
  //   "marque": "CRAZY POUSS AFRONATUREL"
  //   }
  //   ];

  slideOpts = {
    autoplay: true
  }

  prod: any =  [];

  constructor(
    private router: Router,
    public toastCtrl: ToastController,
    private storage: Storage,
    public api: AuthenticationService,
    private route: ActivatedRoute
  ) {
    console.log('constructor')
    this.isNotResult = false;
  }

  ngOnInit() {
    this.timer();
    console.log('ngOnInit')
    let a = this.route.params
    a.subscribe((res: any) => {
      console.log('res res res res', JSON.stringify(res))
      if (JSON.stringify(res) == '{}') {
        this.getProduits()
      } else {
        console.log('exécute avec la catégorie __', res.IdCategorie)
        this.getProductByCategorie(res.IdCategorie)
      }
    })
  }

  getProductByCategorie(id) {
    this.isNotResult = false;
    this.isLoading = true;
    this.api.Ecommerce_recherche_produit_par_categorie(id).then((res: any) => {
      this.prod = res.produits
      this.isLoading = false;
      if(this.prod.length == 0) {
        this.isNotResult = true;
      }
    })
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter')
    // this.manageFilter()
  }
  ionViewWillEnter(){
    console.log('ionViewWillEnter')
  }
  ionViewCanEnter(){
    console.log('ionViewCanEnter')
  }
  ionViewCanLeave(){
    console.log('ionViewCanLeave')
  }
  ionViewDidLoad(){
    console.log('ionViewDidLoad')
  }
  ionViewWillLeave(){
    console.log('ionViewWillLeave')
  }
  ionViewWillUnload(){
    console.log('ionViewWillUnload')
  }

  ionViewDidLeave(){
    console.log('ionViewDidLeave')
  }


  getProduits(){
    this.isNotResult = false;
    this.isLoading = true;
    this.api.Ecommerce_recupererToutLesProduits().then(res => {
      this.prod = res;
      console.log("this.prod this.prod",this.prod)
      this.isLoading = false;
      if(this.prod.length == 0) {
        this.isNotResult = true;
      }
    })
  }


  timer() {
    this.storage.get("cart").then((data) => {
      (!(data == undefined || data.length == 0)) ? this.cartCount = data.length : this.cartCount = 0;

      setTimeout(() => { this.timer(); }, 1000);
    });
  }

  searchProduit() {
    this.isNotResult = false;
    this.isLoading = true;
    if (this.search) {
        this.api.Ecommerce_recherche_produit(this.search).then((resp: any) => {
        this.prod = resp.resultat;
        this.isLoading = false;
        if(this.prod.length == 0) {
          this.isNotResult = true;
        }
      });
    } else {
      this.getProduits()
    }
  }

  addToCart(product) {
    this.storage.get("cart").then((data) => {

      if (data == undefined || data.length == 0) {
        data = [];

        data.push({
          "product": product,
          "qty": 1,
          "amount": parseFloat(product.price_promo)
        });

      } else {

        let alreadyAdded = false;
        let alreadyAddedIndex = -1;

        for (let i = 0; i < data.length; i++) {
          if (data[i].product.id == product.id) { //Product ID matched
            alreadyAdded = true;
            alreadyAddedIndex = i;
            break;
          }
        }

        if (alreadyAdded == true) {
          data[alreadyAddedIndex].qty = parseFloat(data[alreadyAddedIndex].qty) + 1;
          data[alreadyAddedIndex].amount = parseFloat(data[alreadyAddedIndex].amount) + parseFloat(data[alreadyAddedIndex].product.price_promo);
        } else {
          data.push({
            "product": product,
            "qty": 1,
            "amount": parseFloat(product.price_promo)
          })
        }
      }

      this.storage.set("cart", data).then(() => {
        console.log("Cart Updated");
        console.log(data);

        this.showT("Panier mis à jour");

      })

    })

  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.search = "";
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  goToDetail(prod) {
    this.storage.set('product', prod);
    this.router.navigate(['product']);
  }

  goToFilter() {
    this.router.navigateByUrl('filter');
  }

  //Filter Manage $***********************

  async manageFilter() {
    let item = await this.storage.get('filter');
    console.log('manageFilter', item);
    if (item) {
      this.isLoading = true;
      let item = await this.storage.get('filter');

      if (item) {
        console.log('manageFilter', item);
        this.api.Ecommerce_recupererLesProduitsParCategorie(item.id).then(res => {
          this.prod = res;
          console.log('ressultat de recuperation de la categorie', item);
          this.isLoading = false;
        })
      }
    }

    this.storage.set('filter', null);
    // setTimeout(() => {
    //   this.manageFilter();
    // }, 1000);

  }

  productMaque(item) {
    this.isLoading = true;
    // this.api.getPromoMarque(item.id).then(data => {
    //   let d: any = data
    //   this.prod = d.promo;

    //   this.message = item.libelle;
    //   this.isNotResult = false;
    //   this.isLoading = false;


    // }).catch(error => {
    //   console.log('error:', error);
    //   this.message = error.error.msg;
    //   this.isNotResult = true;
    // });

  }

  productGamme(item) {
    this.isLoading = true;
    // this.api.getPromoGame(item.id).then(data => {
    //   let d: any = data

    //   this.prod = d.promo;
    //   this.message = item.libelle;
    //   this.isNotResult = false;
    //   this.isLoading = false;


    // }).catch(error => {
    //   console.log('error:', error);
    //   this.message = error.error.msg;
    //   this.isNotResult = true;
    //   //this.showT("'Aucun produit en promotion pour cette gamme !'");
    // });
  }
  //Filter Manage $***********************

  async showT(message) {
    const toast = await this.toastCtrl.create({
      message: message,

      duration: 3000
    });
    toast.present();
  }

}
