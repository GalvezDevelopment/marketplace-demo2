import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { productActions } from "../actions/product.actions";
import { map, switchMap } from "rxjs";
import { ProductsService } from "../../core/services/products/products.service";
import { ApiResponse } from "../../core/models/api-response";
import { Product } from "../../core/models/product";

@Injectable()
export class ProductEffects {
  productList$ = this.actions$.pipe(
    ofType(productActions.loadList),
    switchMap(() => this.productSrv.getProducts().pipe(
      map((response: ApiResponse<Product[]>) => {
        return { type: productActions.loadedList, products: response.data };
      })
    ))
  );

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store,
    private readonly productSrv: ProductsService) {
  }
}
