import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { productActions } from "../actions/product.actions";
import { map, switchMap, tap } from "rxjs";
import { ApiResponse } from "../../core/models/api-response";
import { Product } from "../../core/models/product";
import { ProductsApiService } from "../../core/services/products/products-api.service";
import { loaderActions } from "../actions/loader.actions";

@Injectable({
  providedIn: 'root'
})
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

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store,
    private readonly productSrv: ProductsApiService) {
  }
}
