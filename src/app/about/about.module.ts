import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';

import { AboutComponent } from './about.component';
import { AboutRoutingModule } from './about-routing.module';

@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    AboutRoutingModule,
    SharedModule
  ]
})
export class AboutModule { }
