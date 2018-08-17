import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';

import { PageNotFoundComponent } from './page-not-found.component';
import { PageNotFoundRoutingModule } from './page-not-found-routing.module';

@NgModule({
  declarations: [
    PageNotFoundComponent
  ],
  imports: [
    PageNotFoundRoutingModule,
    SharedModule
  ]
})
export class PageNotFoundModule { }
