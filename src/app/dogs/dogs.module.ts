import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';

import { DogsComponent } from './dogs.component';
import { DogsRoutingModule } from './dogs-routing.module';

@NgModule({
  declarations: [
    DogsComponent
  ],
  imports: [
    DogsRoutingModule,
    SharedModule
  ]
})
export class DogsModule { }
