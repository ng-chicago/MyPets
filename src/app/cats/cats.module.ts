import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';

import { CatsComponent } from './cats.component';
import { CatsRoutingModule } from './cats-routing.module';

@NgModule({
  declarations: [
    CatsComponent
  ],
  imports: [
    CatsRoutingModule,
    SharedModule
  ]
})
export class CatsModule { }
