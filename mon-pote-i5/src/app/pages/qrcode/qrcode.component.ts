import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavParams } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';


@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.scss'],
})
export class QrcodeComponent implements OnInit {
  number: any;

  constructor(public storage: Storage, public navParams:NavParams, public barcodeCtrl: BarcodeScanner) { 

    this.number = this.navParams.get('number')
  }

  ngOnInit() {
    this.goToCreateCode()
  }

  goToCreateCode() {
    this.barcodeCtrl.encode(this.barcodeCtrl.Encode.TEXT_TYPE, this.number).then((encodedData) => {
      console.log('encodedData encodedData',encodedData);
      // this.number = encodedData;
    }, (err) => {
      console.log('Error occured : ' + err);
    });
  }

}
