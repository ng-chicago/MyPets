import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DogsComponent } from './dogs.component';

const dogsRoutes: Routes = [
  { path: '', component: DogsComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(dogsRoutes)
  ],
  exports: [RouterModule]
})
export class DogsRoutingModule {}
