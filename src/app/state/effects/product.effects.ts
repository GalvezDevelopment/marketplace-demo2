import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { productActions } from "../actions/product.actions";
import { catchError, map, switchMap, take, tap, throwError } from "rxjs";
import { ApiResponse } from "../../core/models/api-response";
import { Product } from "../../core/models/product";
import { ProductsApiService } from "../../core/services/products/products-api.service";
import { loaderActions } from "../actions/loader.actions";
import { selectInBasketSkusAndTotal } from "../selectors/basket.selectors";
import { Router } from "@angular/router";
import { basketActions } from "../actions/basket.actions";
import { walletActions } from "../actions/wallet.actions";

@Injectable()
export class ProductEffects {
  productList$ = createEffect(() => this.actions$.pipe(
    ofType(productActions.loadList),
    tap(() => this.store.dispatch(loaderActions.add({ action: productActions.loadList }))),
    switchMap(() => this.productSrv.getProducts().pipe(
      tap(() => this.store.dispatch(loaderActions.remove({ action: productActions.loadList }))),
      map((response: ApiResponse<Product[]>) => {
        return { type: productActions.loadedList.type, products: response.data };
      })
    ))
  ));

  purchase$ = createEffect(() => this.actions$.pipe(
    ofType(productActions.purchase),
    switchMap(() => this.store.select(selectInBasketSkusAndTotal).pipe(take(1))),
    tap(() => this.store.dispatch(loaderActions.add({ action: productActions.purchase }))),
    switchMap(({ skus, total }) => this.productSrv.purchase(skus).pipe(
      tap(() => {
        this.router.navigate(['checkout/purchase']);
        this.store.dispatch(walletActions.withdraw({ amount: total }))
        this.store.dispatch(basketActions.empty());
        this.store.dispatch(loaderActions.remove({ action: productActions.purchase }));
      }),
      catchError(err => {
        this.store.dispatch(loaderActions.remove({ action: productActions.purchase }));
        return throwError(err)
      })
    ))
  ), { dispatch: false });

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store,
    private readonly productSrv: ProductsApiService,
    private readonly router: Router) {
  }
}
