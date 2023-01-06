import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { SharedModule } from "../../shared/shared.module";
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: ProductsListComponent
      },
      {
        path: 'basket',
        loadChildren: () => import('../../features/basket/basket.module').then(m => m.BasketModule)
      }
    ]
  }
];

@NgModule({
  declarations: [
    ProductsListComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class HomeModule { }
