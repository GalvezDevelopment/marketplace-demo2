import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { SharedModule } from "../../shared/shared.module";

const routes: Routes = [
  {
    path: '',
    component: ProductsListComponent
  }
];

@NgModule({
  declarations: [
    ProductsListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class HomeModule { }
