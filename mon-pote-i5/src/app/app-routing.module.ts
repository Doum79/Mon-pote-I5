import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './service/IoginApp-gard';
import { LoginGuardService } from './service/outApp-gard';

const routes: Routes = [
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },

  { path: 'login',  loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'register/:number',  loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'number',  loadChildren: './pages/number/number.module#NumberPageModule' },
  { path: 'verif/:number',  loadChildren: './pages/verif/verif.module#VerifPageModule' },
  { path: 'loign-marchand',  loadChildren: './pages/loign-marchand/loign-marchand.module#LoignMarchandPageModule' },

  { path: 'home-marchand',  loadChildren: './pages/home-marchand/home-marchand.module#HomeMarchandPageModule' },
  { path: 'donner-monnaie',  loadChildren: './pages/donner-monnaie/donner-monnaie.module#DonnerMonnaiePageModule' },
  { path: 'historique-marchand',  loadChildren: './pages/historique-marchand/historique-marchand.module#HistoriqueMarchandPageModule' },

  { path: 'tabs', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
  { path: 'paye', loadChildren: './pages/paye/paye.module#PayePageModule' },
  { path: 'recharge', loadChildren: './pages/recharge/recharge.module#RechargePageModule' },
  { path: 'monney', loadChildren: './pages/monney/monney.module#MonneyPageModule' },
  { path: 'facture', loadChildren: './pages/facture/facture.module#FacturePageModule' },

  { path: 'tab1', loadChildren: './pages/tab1/tab1.module#Tab1PageModule' },
  { path: 'tab2', loadChildren: './pages/tab2/tab2.module#Tab2PageModule' },
  { path: 'tab3', loadChildren: './pages/tab3/tab3.module#Tab3PageModule' },
  { path: 'tab4', loadChildren: './pages/tab4/tab4.module#Tab4PageModule' },
  { path: 'tab5', loadChildren: './pages/tab5/tab5.module#Tab5PageModule' },
  { path: 'shop/:IdCategorie', loadChildren: './pages/ecommerces/shop/shop.module#ShopPageModule' },
  { path: 'shop', loadChildren: './pages/ecommerces/shop/shop.module#ShopPageModule' },
  
  //ECOMMERCE ROUTE
  { path: 'product', loadChildren: './pages/ecommerces/product/product.module#ProductPageModule' },
  { path: 'cart', loadChildren: './pages/ecommerces/cart/cart.module#CartPageModule' },
  { path: 'checkout', loadChildren: './pages/ecommerces/checkout/checkout.module#CheckoutPageModule' },
  { path: 'filter', loadChildren: './pages/ecommerces/filter-shop/filter-shop.module#FilterShopPageModule' },

  //trader
  { path: 'gerant', loadChildren: './pages/gerant/gerant.module#GerantPageModule' },
  { path: 'add-caissiere', loadChildren: './pages/add-caissiere/add-caissiere.module#AddCaissierePageModule' },
  { path: 'add-caisse', loadChildren: './pages/add-caisse/add-caisse.module#AddCaissePageModule' },
  { path: 'add-caisse/:casseId', loadChildren: './pages/add-caisse/add-caisse.module#AddCaissePageModule' },
  { path: 'historique-caisse/:casseId', loadChildren: './pages/historique-caisse/historique-caisse.module#HistoriqueCaissePageModule' },


  
  { path: 'help', loadChildren: './pages/help/help.module#HelpPageModule' },
  { path: 'slide', loadChildren: './pages/slide/slide.module#SlidePageModule' },
  {
    path: 'choix',
    loadChildren: () => import('./pages/choix/choix.module').then( m => m.ChoixPageModule)
  },
];

@NgModule({
  imports: [
  RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
