import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthenticationService } from '../../service/api-service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {

  params: Params;
  histo: any;
  dataHistorique: any;
  dataHistorique1:any =[];
  nombre: any;

  constructor(private route: ActivatedRoute, public auth: AuthenticationService, public alert: AlertController, public loading: LoadingController) {
    this.getHistoClient()
   }

  ngOnInit() {

  }

  getHistoClient(){
    this.loading.create({mode:"ios"}).then(a => {a.present()})
    this.auth.getHistoriqueClient().then(res =>{
      this.loading.dismiss()
      console.log(res)
      this.histo = res
      this.dataHistorique = this.histo.data

      var dataArondi = new Array;
      for(let bb of this.dataHistorique){
        bb.account = parseInt(bb.account);
        bb.account = Math.round(bb.account)
        dataArondi.push(bb)
      }

      this.dataHistorique1 = dataArondi
      this.dataHistorique1.reverse()
      console.log("resulttzt", this.dataHistorique1)
      this.nombre = this.dataHistorique1.length
    })
  }
  



}
