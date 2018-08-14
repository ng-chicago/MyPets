import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatsComponent } from './cats.component';

const catsRoutes: Routes = [
  { path: '', component: CatsComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(catsRoutes)
  ],
  exports: [RouterModule]
})
export class CatsRoutingModule {}
