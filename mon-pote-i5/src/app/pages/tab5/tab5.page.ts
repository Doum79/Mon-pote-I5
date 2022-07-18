import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from '../../service/api-service';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {

  user: any = {};

  constructor(public storage: Storage, public auth: AuthenticationService, 
    public loading: LoadingController, public alertController: AlertController) { 

    this.storage.get("userdata").then(res =>{
      this.user = res.data
      console.log(this.user)
    })

  }

  ngOnInit() {
  }

  updateUser(){
    this.loading.create({mode:"ios"}).then(a => {a.present()})
    this.auth.updateClient({email:this.user.email, phone:this.user.phone, password:this.user.password, name:this.user.name}).then(res =>{
      console.log("retour de update",res)
      this.loading.dismiss()
      this.storeUpdateData(res)
    })
  }

  storeUpdateData(data){
    this.storage.set("userdata", data)
  }


    //prompte for forget login
    async motdepasse() {
      const alert = await this.alertController.create({
        header: 'Changer mot de passe',
        inputs: [
          {
            name: 'email',
            type: 'text',
            placeholder: 'Ancien mot de passe'
          },
          {
            name: 'email',
            type: 'text',
            placeholder: 'Nouveau mot de passe'
          },
          {
            name: 'email',
            type: 'text',
            placeholder: 'Confirmer mot de passe'
          },
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
              // this.forgetPwd(x)
            }
          }
        ]
      });
  
      await alert.present();
    }

}
