import { createReducer, on } from '@ngrx/store';
import { Product } from "../../core/models/product";
import { basketActions } from "../actions/basket.actions";

export interface BasketState {
  products: ReadonlyArray<Product>
};

export const initialState: BasketState = { products: [] };

export const basketReducer = createReducer(
  initialState,
  on(basketActions.addProduct, (state, { product }) => {
    if (!state.products.find(p => p.sku === product.sku)) {
      return { ...state, products: [...state.products, product] };
    }
    return { ...state };
  }),
  on(basketActions.removeProduct, (state, { productSku }) => {
    return { ...state, products: [...state.products.filter(p => p.sku !== productSku)] };
  })
)
