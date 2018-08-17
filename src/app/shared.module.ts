import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    MaterialModule
  ]
})
export class SharedModule { }
