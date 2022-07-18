import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './service/IoginApp-gard';
import { LoginGuardService } from './service/outApp-gard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'login', canActivate: [LoginGuardService], loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'register', canActivate: [LoginGuardService], loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'number', canActivate: [LoginGuardService], loadChildren: './pages/number/number.module#NumberPageModule' },
  { path: 'verif', canActivate: [LoginGuardService], loadChildren: './pages/verif/verif.module#VerifPageModule' },
  { path: 'loign-marchand', canActivate: [LoginGuardService], loadChildren: './pages/loign-marchand/loign-marchand.module#LoignMarchandPageModule' },

  { path: 'tabs', canActivate: [AuthGuardService], loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
  { path: 'paye', canActivate: [AuthGuardService], loadChildren: './pages/paye/paye.module#PayePageModule' },
  { path: 'recharge', canActivate: [AuthGuardService], loadChildren: './pages/recharge/recharge.module#RechargePageModule' },
  { path: 'monney', canActivate: [AuthGuardService], loadChildren: './pages/monney/monney.module#MonneyPageModule' },
  { path: 'facture', canActivate: [AuthGuardService], loadChildren: './pages/facture/facture.module#FacturePageModule' },
  { path: 'home-marchand', canActivate: [AuthGuardService], loadChildren: './pages/home-marchand/home-marchand.module#HomeMarchandPageModule' },
  { path: 'historique-marchand', canActivate: [AuthGuardService], loadChildren: './pages/historique-marchand/historique-marchand.module#HistoriqueMarchandPageModule' },
  { path: 'donner-monnaie', canActivate: [AuthGuardService], loadChildren: './pages/donner-monnaie/donner-monnaie.module#DonnerMonnaiePageModule' },
];

@NgModule({
  imports: [
  RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
