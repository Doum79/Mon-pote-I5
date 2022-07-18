//import { PayPal, PayPalConfiguration, PayPalPayment } from '@ionic-native/paypal/ngx';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastController, AlertController, NavController, LoadingController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/service/api-service';
import { Storage } from '@ionic/storage';
//import { CONSTANT } from 'src/app/utils/constant';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  newOrder: any = {};
  paymentMethods: any[];
  paymentMethod: any = {};
  billing_shipping_same: boolean;
  paymentData: any = {};
  adresse1: any;
  adresse2: any;
  new: boolean;
  me: boolean;
  user: any = {};
  client: any ;
  check: any= [
    { val: 'Payer à la livraison', isChecked: false, id: 1 },
    { val: 'Payer avec portefeuille mon pote', isChecked: true, id: 2 },
  ];
  commentaire: any;
  cartItem: any = [];
  total: any = 0.0;
  line_items: string = '';
  responseComande: any = {};

  constructor(
    private storage: Storage,
    private router: NavController,
    public toast: ToastController,
    public api: AuthenticationService,
    //private payPal: PayPal,
    public alertController: AlertController,
    //private constant : CONSTANT,
    public loading: LoadingController
  ) { }

  async ngOnInit() {
    let data = await this.storage.get("userdata");
    this.user = data.data;
    this.cartItem = await this.storage.get("cart");
    console.log('this.cartItem this.cartItem', this.cartItem)
  }

  ischeked(eventData) {
    console.log('eventData eventData eventData',eventData)
    if (eventData.id == 1 || eventData.isChecked == true) {
      this.check[1].isChecked = false
    } else if (eventData.id == 2 || eventData.isChecked == true) {
      this.check[0].isChecked = false
    }
  }



  init(){

    this.newOrder.billing = {};
    this.newOrder.shipping = {};

    this.paymentMethods = [
      { method_id: "PayPal", method_title: "PayPal" }
    ];

    this.storage.get('user').then(dat => {
      let user : any = dat ;
      user = dat ;
      this.client = user;
      this.user = user.user;

      this.paymentData.firstname = this.user.firstname;
      this.paymentData.lastname = this.user.lastname;
      this.paymentData.email = this.user.email;
      this.paymentData.contact = this.user.phone;

      console.log('initialisation user', this.user)
      console.log('initialisation payment data', this.paymentData)
    })
  }

  Commander() {
    this.cartItem.forEach( (item, index)=> {
      this.total = this.total + (item.product.price_promo * item.qty)
      if(index !== 0) {
        this.line_items += ','; 
      }
      this.line_items += `${item.product.id}:${item.qty}`;
    })

    for (let a of this.check) {
      if(a.isChecked == true) {
        this.paymentMethod = a
      }
    }

    const data = {
      payment_method: this.paymentMethod.val,
      address: 'null',
      name: this.user.name,
      email: this.user.email,
      set_paid: this.total,
      billing: "null",
      shipping: this.paymentData.address,
      customer_id: this.user.id,
      line_items: this.line_items,
      total: this.total,
      contact: this.user.phone,
      commentaire: this.commentaire
    }

    console.log('data a envoyé data a envoyé ', data)

    if(this.paymentData.address != undefined && this.paymentData.address != '') {
      this.loading.create({mode:"ios"}).then(a => {a.present()})
      this.api.Ecommerce_passer_commande(data).then( (response: any) => {
        this.loading.dismiss()
        this.responseComande = response
        this.storage.remove("cart")
        console.log("response response", response)
        this.presenteAlert('Votre comande a bien été prise en compte')
        this.router.navigateRoot('/tabs/shop')
      }).catch(err => {
        this.presenteAlert("Nous avons rencontré une erreur lors de l'enregistrment");
        this.loading.dismiss();
      });
    } else {
      this.presenteAlert('Veillez entrer l\'adresse de livraison')
    }

  }

  placeOrder() {

    // let data: any = {};

    // if(!this.paymentData.address){
    //   this.showT("Erreur: Veuillez entrer une adresse de livraison.")
    //   return
    // }
   

    // data = {
    //   "payment_method": 'PayPal',
    //   "address": this.paymentData.address,
    //   "firstname": this.paymentData.firstname,
    //   "lastname": this.paymentData.lastname,
    //   "email": this.paymentData.email,
    //   "contact": this.paymentData.contact,
    //   "set_paid": true,
    //   "billing": "billing",
    //   "shipping": "shipping",
    //   "customer_id": this.user.id,
    // };
    // console.log('data storage', this.user)

   

    // this.storage.get("cart").then((cart) => {

    //     let total = 0.00;
    //     let str2 = "";

    //     cart.forEach((element, index) => {
    //       str2 = str2 + element.product.id + ':' + element.qty + ',';
    //       total = total + (element.product.price_promo * element.qty);
    //     });

    //     data.line_items = str2;
    //     data.total = total + this.constant.TAXTLIVRAISON;

    //     let orderData: any = {};
    //     orderData.order = data;

    //     console.log("val :",data);

    //     this.payPal.init({
    //       PayPalEnvironmentProduction: this.constant.PRODUCTIONKEY,
    //       PayPalEnvironmentSandbox: this.constant.SANDBOXKEY
    //     }).then(() => {
    //       // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
    //       this.payPal.prepareToRender(this.constant.ENVIRONEMENT, new PayPalConfiguration({
    //         // Only needed if you get an "Internal Service Error" after PayPal login!
    //         //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
    //       })).then(() => {
    //         let payment = new PayPalPayment(String(data.total), 'EUR', 'Description', 'sale');
    //         this.payPal.renderSinglePaymentUI(payment).then((pay) => {
    //           // Successfully paid
    //           console.log('// Successfully paid',data)
    //           this.loading.create({ mode: "ios" }).then(a => { a.present() });
    //           setTimeout(() => { this.loading.dismiss() }, 10000)

    //           this.api.checkout(data).then((data) =>{
    //             this.loading.dismiss()
    //             console.log('_data commande',data)
    //             this.storage.set("cart", []).then(() => {});
    //             this.presenteAlert("Votre achat a été effectué avec succès !");
    //             this.router.navigateBack('/main/shop');

    //           }).catch(err => {
    //             //en cas d'erreur de réccupération prendre info du cache
    //             this.presenteAlert(err);
    //             this.router.navigateBack('/main/shop');
    //             console.log('error',err.message)

    //           });
    //         }, (err) => {
    //           // Error or render dialog closed without being successful
    //           this.showT(err);
    //           console.log('error', err)
    //         });
    //       }, (conf) => {
    //         // Error in configuration
    //         console.log('Config', conf)
    //         this.showT(conf);
    
    //       });
    //     }, (init) => {
    //       // Error in initialization, maybe PayPal isn't supported or something else
    //       console.log('init', init)
    //       this.showT(init);
    
    //     });

    //    });
      

  }

  async showT(message) {
    const toast = await this.toast.create({
      message: message,
      position: "bottom",
      duration: 3000
    });
    toast.present();
  }


  async presenteAlert(message){
    const alert = await this.alertController.create({
      header: 'MON POTE',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

}
