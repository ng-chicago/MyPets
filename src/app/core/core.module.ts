import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from '../shared.module';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from '../app-routing.module';

import { SpreadsheetDS } from '../data/spreadsheet-data.service';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  exports: [
    AppRoutingModule
  ],
  providers: [
    SpreadsheetDS
  ]
})
export class CoreModule { }
