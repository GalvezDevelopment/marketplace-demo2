import { createAction, props } from '@ngrx/store';
import { Product } from "../../core/models/product";

export namespace basketActions {
  export const load = createAction('[Basket] Load');
  export const addProduct = createAction('[Basket] Add product', props<{ product: Product }>());
  export const removeProduct = createAction('[Basket] Remove product', props<{ productSku: string }>());
}
