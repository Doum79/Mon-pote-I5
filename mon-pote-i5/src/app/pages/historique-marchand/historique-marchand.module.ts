import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HistoriqueMarchandPage } from './historique-marchand.page';

const routes: Routes = [
  {
    path: '',
    component: HistoriqueMarchandPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HistoriqueMarchandPage]
})
export class HistoriqueMarchandPageModule {}
