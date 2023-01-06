import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MatToolbarModule } from "@angular/material/toolbar";
import { SharedModule } from "../shared/shared.module";
import { MatBadgeModule } from "@angular/material/badge";



@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatToolbarModule,
    MatBadgeModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class CoreModule { }
