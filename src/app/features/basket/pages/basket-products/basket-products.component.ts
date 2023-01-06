import { Component } from '@angular/core';
import { Store } from "@ngrx/store";
import {
  selectBasketCount,
  selectBasketTotal,
  selectInBasketProducts
} from "../../../../state/selectors/basket.selectors";
import { ProductViews } from "../../../../core/enums/product-views";
import { Product } from "../../../../core/models/product";
import { basketActions } from "../../../../state/actions/basket.actions";
import { selectWalletVsBasket } from "../../../../state/selectors/wallet.selectors";
import { map } from "rxjs";

@Component({
  selector: 'app-basket-products',
  templateUrl: './basket-products.component.html',
  styleUrls: ['./basket-products.component.scss']
})
export class BasketProductsComponent {
  readonly PRODUCT_VIEWS = ProductViews;
  basketProducts$ = this.store.select(selectInBasketProducts);
  basketCount$ = this.store.select(selectBasketCount);
  basketTotal$ = this.store.select(selectBasketTotal);
  allowCheckout$ = this.store.select(selectWalletVsBasket).pipe(map(state => !state));

  constructor(private readonly store: Store) {
  }

  removeFromBasket({ sku }: Product): void {
    this.store.dispatch(basketActions.removeProduct({ productSku: sku }));
  }
}
