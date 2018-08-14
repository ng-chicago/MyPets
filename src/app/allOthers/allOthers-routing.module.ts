import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllOthersComponent } from './allOthers.component';

const allOthersRoutes: Routes = [
  { path: '', component: AllOthersComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(allOthersRoutes)
  ],
  exports: [RouterModule]
})
export class AllOthersRoutingModule {}
