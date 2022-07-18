import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, LoadingController, ToastController, NavController } from '@ionic/angular';
import { AuthenticationService } from '../../service/api-service';
import { Storage } from '@ionic/storage';
import { OneSignal } from '@ionic-native/onesignal/ngx';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  id_onesignal: string;
  
  ngOnInit(): void {
  }

  public registerForm: FormGroup;
  data:any;
  isEnabled: boolean;
  number: any;

  constructor(public route: ActivatedRoute, public alertController: AlertController,
              public loading: LoadingController, private toast:ToastController, 
              public navCtrl: NavController, public auth: AuthenticationService,
              public router: Router, public storage: Storage,
              public formBuilder: FormBuilder, private oneSignal: OneSignal,
              ) {

      this.InitOneSignale()

      this.route.params.subscribe( params => {
        console.log("objet mis en parametre",params.number)
        this.number = params.number
      })
     
      this.registerForm = formBuilder.group({
        nom: ['', Validators.required],
        email: ['', Validators.required],
        number: [''],
        password: ['', Validators.required],
        isChecked: ['', Validators.required],
      });
    
   }

  
   register() {
       //loading
      this.loading.create({mode:"ios"}).then(a => {a.present()})

      this.auth.registerClient({
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        name:  this.registerForm.value.nom,
        phone: this.number,
        onesignale_id:  this.id_onesignal
      }).then(res => {
        console.log("resultat for register",res)
        this.stokdata(res)
        this.navCtrl.navigateRoot("tabs")
        this.loading.dismiss()
      }).catch(res => {console.log(res); this.showT("Erreur d'enregistrement !"); this.loading.dismiss() })
    }

    stokdata(data){
      this.storage.set("userdata", data)
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

    InitOneSignale(){
      //////////////One signal //////////////
      this.oneSignal.startInit('219d398a-754f-469a-afc4-599d7770b404', '557644103234');
      this.oneSignal.getIds().then((id) => {
        console.log('iiiiiiiddddddddddd oooonnnne signale',id)
        this.id_onesignal = id.userId
       });
      this.oneSignal.inFocusDisplaying(2);
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
      this.oneSignal.handleNotificationReceived().subscribe(() => {
      // do something when notification is received
      });
      this.oneSignal.handleNotificationOpened().subscribe(() => {
        // do something when a notification is opened
      });
      this.oneSignal.endInit();
    }

}
