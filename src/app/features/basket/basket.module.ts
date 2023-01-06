import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketProductsComponent } from './pages/basket-products/basket-products.component';
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../../shared/shared.module";

const routes: Routes = [
  {
    path: '',
    component: BasketProductsComponent
  }
];

@NgModule({
  declarations: [
    BasketProductsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [RouterModule]
})
export class BasketModule {
}
