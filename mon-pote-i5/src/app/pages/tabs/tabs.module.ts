import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children:[
        { path: '', loadChildren: '../tab1/tab1.module#Tab1PageModule' },
        { path: 'tab1', loadChildren: '../tab1/tab1.module#Tab1PageModule' },
        { path: 'tab2', loadChildren: '../tab2/tab2.module#Tab2PageModule' },
        { path: 'tab3', loadChildren: '../tab3/tab3.module#Tab3PageModule' },
        { path: 'tab4', loadChildren: '../tab4/tab4.module#Tab4PageModule' },
        { path: 'tab5', loadChildren: '../tab5/tab5.module#Tab5PageModule' },
        { path: 'shop/:IdCategorie', loadChildren: '../ecommerces/shop/shop.module#ShopPageModule' },
        { path: 'shop', loadChildren: '../ecommerces/shop/shop.module#ShopPageModule' },
    ]
  },
  {
    path:'',
    redirectTo:'tab1',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
