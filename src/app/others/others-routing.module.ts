import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OthersComponent } from './others.component';

const othersRoutes: Routes = [
  { path: '', component: OthersComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(othersRoutes)
  ],
  exports: [RouterModule]
})
export class OthersRoutingModule {}
