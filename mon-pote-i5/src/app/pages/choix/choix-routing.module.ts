import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChoixPage } from './choix.page';

const routes: Routes = [
  {
    path: '',
    component: ChoixPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChoixPageRoutingModule {}
