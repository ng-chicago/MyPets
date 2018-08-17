import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatTableModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTableModule
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTableModule
  ]
})
export class MaterialModule {}
