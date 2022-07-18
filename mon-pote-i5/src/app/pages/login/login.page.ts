import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, LoadingController, ToastController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from '../../service/api-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  public loginForm: FormGroup;
  data:any;
  resStorage: any;
  email: any;
  retourServe: any = {};

  images = ['image1', 'image2', 'image3'];
  image = 'image1';
  isloadSlide: boolean;
  typePassword: string;

  constructor(public route: ActivatedRoute,public alertController: AlertController,public loading: LoadingController,
    private toast:ToastController ,public router: Router, public auth: AuthenticationService,
    public formBuilder: FormBuilder, public navCtrl: NavController, public storage: Storage) {

    this.typePassword = "password"

    this.loginForm = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.storage.get("userdata").then((res:any) =>{
      console.log("resutat dnas le storage",res)
      this.resStorage = res
      if(this.resStorage){
        this.loginForm.value.email = res.data.email
        this.email = res.data.email
      }
    })
    
   }

   ionViewDidEnter() {
    this.isloadSlide = true;
    this.slideImage();
  }

  slideImage(index = 0) {

    this.image = this.images[index];

    index++;

    //console.log(index);
    //console.log(this.image) ;
    if (this.isloadSlide) setTimeout(() => { this.slideImage((index == 3) ? 0 : index) }, 4000)
  }

   login() {
      this.loading.create({mode:"ios"}).then(a => {a.present()})
      console.log("this.loginForm.value",this.loginForm.value)
      this.auth.loginClient(this.loginForm.value).then(res => {
        this.retourServe = res
        console.log("resultat for login",res)
        if(this.retourServe.role == 'USER'){
          this.stokdata(res)
        }else if(this.retourServe.role  == 'CASE'){
          this.stokdataCaissiere(res)
        }else {
          this.stokdataMarchand(res)
        }
        console.log("retourServe.data.user.role.name", this.retourServe.role)
      
        this.loading.dismiss()
        this.showTO("Connexion avec succès !");
      }).catch(res => {console.log(res); this.showT("Email ou mot de passe incorrect !"); this.loading.dismiss() })
    }

    forgetPwd(data){
      
    }
  
  //navigué sans retour
  gotoNUmber(){
    this.router.navigate(['/number']);
  }


stokdata(data){
  this.storage.set("userdata", data).then(res =>{
    this.setInheader(data)
  })
}

stokdataMarchand(data){
  this.storage.set("marchandData", data).then(res =>{
    this.setInheader(data)
  })
}

stokdataCaissiere(data){
  this.storage.set("caissiereData", data).then(res =>{
    this.setInheader(data)
  })
}

setInheader(res){
  this.auth.getINstrage()
    if(this.retourServe.role == 'USER'){
      this.navCtrl.navigateRoot("tabs")
    }else if(this.retourServe.role  == 'CASE'){
      this.navCtrl.navigateRoot("home-marchand")
    }else {
      this.navCtrl.navigateRoot("gerant")
    }
}


  //prompte for forget login
    async forgetForm() {
      const alert = await this.alertController.create({
        header: 'Mot de passe oublié',
        inputs: [
          {
            name: 'email',
            type: 'text',
            placeholder: 'Email'
          }
        ],
        buttons: [
          {
            text: 'Annuler',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel');
            }
          }, {
            text: 'Envoyer',
            handler: (x) => {
              //console.log('Confirm Ok',x);
              this.forgetPwd(x)
            }
          }
        ]
      });
  
      await alert.present();
    }
  
   //Toaste funtion ou notification function
    async showT(message) {
      const toast = await this.toast.create({
        message: message,
        mode:"ios",
        duration: 5000
      });
      toast.present();
    }
  
    async showTO(message) {
      const toast = await this.toast.create({
        message: message,
        duration: 3000,
        //showCloseButton: true,
        position: 'bottom',
        //closeButtonText: 'Ok'
      });
      toast.present();
    } 

    changeTypePassxord(){
      (this.typePassword == "password")? this.typePassword = "text": this.typePassword = "password"
    }

}
