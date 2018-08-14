import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllOthersComponent } from './allOthers.component';
import { AllOthersRoutingModule } from './allOthers-routing.module';

@NgModule({
  declarations: [
    AllOthersComponent
  ],
  imports: [
    AllOthersRoutingModule,
    CommonModule
  ]
})
export class AllOthersModule { }
