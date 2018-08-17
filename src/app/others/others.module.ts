import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';

import { OthersComponent } from './others.component';
import { OthersRoutingModule } from './others-routing.module';

@NgModule({
  declarations: [
    OthersComponent
  ],
  imports: [
    OthersRoutingModule,
    SharedModule
  ]
})
export class OthersModule { }
