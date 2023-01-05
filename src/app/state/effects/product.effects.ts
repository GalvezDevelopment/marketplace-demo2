import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { productActions } from "../actions/product.actions";
import { map, switchMap, tap } from "rxjs";
import { ApiResponse } from "../../core/models/api-response";
import { Product } from "../../core/models/product";
import { ProductsApiService } from "../../core/services/products/products-api.service";

@Injectable({
  providedIn: 'root'
})
export class ProductEffects {
  productList$ = createEffect(() => this.actions$.pipe(
    ofType(productActions.loadList),
    switchMap(() => this.productSrv.getProducts().pipe(
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
