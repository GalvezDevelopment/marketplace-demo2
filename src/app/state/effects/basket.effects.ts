import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { productActions } from "../actions/product.actions";
import { basketActions } from "../actions/basket.actions";
import { map, switchMap } from "rxjs";
import { selectInBasketProducts } from "../selectors/basket.selectors";
import { Product } from "../../core/models/product";

@Injectable()
export class BasketEffects {
  addProductBasket$ = createEffect(() => this.actions$.pipe(
    ofType(basketActions.addProduct),
    switchMap(() => this.store.select(selectInBasketProducts).pipe(
      map((basket: Product[]) => {
        return { type: productActions.updateList.type, products: basket };
      })
    ))
  ));

  constructor(private readonly actions$: Actions, private readonly store: Store) {
  }
}
