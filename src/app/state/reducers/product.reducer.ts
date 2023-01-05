import { createReducer, on } from '@ngrx/store';
import { Product } from "../../core/models/product";
import { productActions } from "../actions/product.actions";

export interface ProductState {
  products: Product[]
}

export const initialState: ProductState = { products: [] };

export const productReducer = createReducer(
  initialState,
  on(productActions.loadedList, (state, { products }) => {
    return { ...state, products };
  })
);
