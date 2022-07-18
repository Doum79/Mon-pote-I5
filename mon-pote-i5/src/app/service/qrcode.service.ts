import { Injectable } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
 
@Injectable({
  providedIn: 'root'
})
export class QrcodeService {
 
  constructor(public barcodeCtrl: BarcodeScanner) {}
 
  goToCreateCode(data: string) {
    this.barcodeCtrl.encode(this.barcodeCtrl.Encode.TEXT_TYPE, data).then((encodedData) => {
    }, (err) => {
      alert('Erreur lors de la génération du qr-code')
    });
  }


}
