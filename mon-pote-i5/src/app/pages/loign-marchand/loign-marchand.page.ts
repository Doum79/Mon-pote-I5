import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ToastController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from '../../service/api-service';

@Component({
  selector: 'app-loign-marchand',
  templateUrl: './loign-marchand.page.html',
  styleUrls: ['./loign-marchand.page.scss'],
})
export class LoignMarchandPage implements OnInit {
 

  public loginForm: FormGroup;
  data:any;
  resStorage: any;
  email: any;

  constructor(public route: ActivatedRoute,public alertController: AlertController,
              public loading: LoadingController,private toast:ToastController,
              public router: Router, public formBuilder: FormBuilder,
              public auth: AuthenticationService, public navCtrl: NavController, public storage: Storage) {

      this.loginForm = formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
      });

      this.storage.get("marchandData").then(res =>{
        console.log("resutat dnas le storage",res)
        this.resStorage = res
        if(this.resStorage){
          this.loginForm.value.email = res.data.user.email
          this.email = res.data.user.email
        }
      })
    
   }
   ngOnInit(): void {
  }
  
   login() {
       //loading
      this.loading.create({mode:"ios"}).then(a => {a.present()})
      this.auth.loginMarchand(this.loginForm.value).then(res => {
        console.log("resultat for login",res)
        this.stokdata(res)
        this.loading.dismiss()
        this.showT("Connexion avec succès !");
      }).catch(res => {console.log(res); this.showT("Email ou mot de passe incorrect !"); this.loading.dismiss() })
        
    }

    stokdata(data){
      this.storage.set("marchandData", data).then(res =>{
        this.navCtrl.navigateRoot("home-marchand")
      })
    }

    forgetPwd(data){
      
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

}
