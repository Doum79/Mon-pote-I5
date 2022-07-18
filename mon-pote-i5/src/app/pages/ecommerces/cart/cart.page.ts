//import { CONSTANT } from 'src/app/utils/constant';
//import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cartItems: any[] = [];
  total: any = 0.0;
  livraison: any;
  showEmptyCartMessage: boolean = false;

  constructor(
    private storage: Storage,
    public toastCtrl: ToastController,
    //public api: ApiService,
    //public constant :CONSTANT
  ) {
    //this.livraison = this.constant.TAXTLIVRAISON ;
    this.livraison = 7 ;
   }

  ngOnInit() {
    this.init();
  }

  init(){
    this.storage.get("cart").then( (data)=>{
      this.cartItems = data;

      if(this.cartItems != null && this.cartItems.length > 0){
        this.cartItems.forEach( (item, index)=> {
          this.total = this.total + (item.product.price_promo * item.qty)
        })
      } else {
          this.showEmptyCartMessage = true;
      }

    })
  }

  removeFromCart(item, i){

    let price;

    price = item.product.price_promo;

    let qty = item.qty;

    this.cartItems.splice(i, 1);

    this.storage.set("cart", this.cartItems).then( ()=> {

      this.total = this.total - (price * qty);

    });

    if(this.cartItems.length == 0){
      this.showEmptyCartMessage = true;
    }


  }

  changeQty(item, i, change){

    let price;

    price = item.product.price_promo;

    let  qty = item.qty;

    if(change < 0 && item.qty == 1){
      return;
    }

    qty = qty + change;
    item.qty = qty;
    item.amount = qty * price;

    this.cartItems[i] = item;

    this.storage.set("cart", this.cartItems).then( ()=> {

      this.showT("Panier mis a jour.")

    });

    this.total = (parseFloat(this.total.toString()) + (parseFloat(price.toString()) * change));
  }

  async showT(message) {
    const toast = await this.toastCtrl.create({
      message: message,

      duration: 3000
    });
    toast.present();
  }
}
