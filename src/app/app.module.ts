import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from "./core/core.module";
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import './core/utils/deep-copy';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { productReducer } from "./state/reducers/product.reducer";
import { walletReducer } from "./state/reducers/wallet.reducer";
import { basketReducer } from "./state/reducers/basket.reducer";
import { ProductEffects } from "./state/effects/product.effects";
import { WalletEffects } from "./state/effects/wallet.effects";
import { loaderReducer } from "./state/reducers/loader.reducer";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    CoreModule,
    StoreModule.forRoot({
      loaders: loaderReducer,
      products: productReducer,
      wallet: walletReducer,
      basket: basketReducer
    }),
    EffectsModule.forRoot([ProductEffects, WalletEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
