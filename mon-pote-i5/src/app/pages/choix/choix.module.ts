import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChoixPageRoutingModule } from './choix-routing.module';

import { ChoixPage } from './choix.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChoixPageRoutingModule
  ],
  declarations: [ChoixPage]
})
export class ChoixPageModule {}
