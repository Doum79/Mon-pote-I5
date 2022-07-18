
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { ToastController, IonSlides } from '@ionic/angular';
//import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  product:any;
  qte:number;

  slideOpts = {
    initialSlide: 1,
    speed: 2000
  };

  constructor(
    private storage: Storage,
    private router: Router,
    public toastCtrl: ToastController
    //public api: ApiService
  ) { 

    this.storage.get('product').then(u => {
      this.product = u;
      console.log(u);;
    });
  }

  ngOnInit() {
   
  }


  slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
  }


  addToCart(product) {
    this.storage.get("cart").then((data) => {
      
      if(!this.qte) this.qte = 1;

      if (data == undefined || data.length == 0) {
        data = [];

        data.push({
          "product": product,
          "qty": this.qte,
          "amount": parseFloat(product.price_promo) * this.qte
        });

      } else {

        let alreadyAdded = false;
        let alreadyAddedIndex = -1;

        for (let i = 0; i < data.length; i++){
          if(data[i].product.id == product.id){ //Product ID matched
              alreadyAdded = true;
              alreadyAddedIndex = i;
              break;
          }
        }

        if(alreadyAdded == true){
          data[alreadyAddedIndex].qty = parseFloat(data[alreadyAddedIndex].qty) + this.qte;
          data[alreadyAddedIndex].amount = parseFloat(data[alreadyAddedIndex].amount) + (parseFloat(data[alreadyAddedIndex].product.price_promo) * this.qte );
        } else {
          data.push({
              "product": product,
              "qty": this.qte,
              "amount": parseFloat(product.price_promo) * this.qte
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

  async showT(message) {
    const toast = await this.toastCtrl.create({
      message: message,

      duration: 3000
    });
    toast.present();
  }

}
