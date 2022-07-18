import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-monney',
  templateUrl: './monney.page.html',
  styleUrls: ['./monney.page.scss'],
})
export class MonneyPage implements OnInit {

  constructor(public alertController: AlertController) { }

  ngOnInit() {
  }

  async presentAlertPrompt(rz) {
    const alert = await this.alertController.create({
      header: rz,
      inputs: [
        {
          name: 'numero',
          type: 'text',
          placeholder: 'numéro'
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
          text: 'Valider',
          cssClass: 'primary',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }

}
