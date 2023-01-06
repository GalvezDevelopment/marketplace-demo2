import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { ProductShowcaseComponent } from './components/product-showcase/product-showcase.component';
import { SpinnerComponent } from './components/spinner/spinner.component';



@NgModule({
  declarations: [
    ProductShowcaseComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    MatIconModule,
    MatButtonModule,
    ProductShowcaseComponent,
    SpinnerComponent
  ]
})
export class SharedModule { }
