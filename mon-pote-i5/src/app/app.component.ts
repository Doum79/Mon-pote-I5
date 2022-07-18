import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './service/api-service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform, private splashScreen: SplashScreen, private statusBar: StatusBar,
    public storage: Storage, public auth: AuthenticationService,  public router: Router) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString('#7e287e');
      this.splashScreen.hide();
      this.auth.getINstrage();
      this.redirection()
    });
  }

  async redirection(){
    let pf: any = await this.storage.get("pf")
    if(pf){
      this.router.navigate(['login'])
    }else{
      this.router.navigate(['slide'])
    }
  }



}
