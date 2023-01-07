import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseFormComponent } from './pages/purchase-form/purchase-form.component';
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { SharedModule } from "../../shared/shared.module";
import { PurchaseResultComponent } from './components/purchase-result/purchase-result.component';

const routes: Routes = [
  {
    path: '',
    component: PurchaseFormComponent
  }
]

@NgModule({
  declarations: [
    PurchaseFormComponent,
    PurchaseResultComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CheckoutModule { }
