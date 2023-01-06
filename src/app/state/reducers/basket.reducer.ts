import { createReducer, on } from '@ngrx/store';
import { Product } from "../../core/models/product";
import { basketActions } from "../actions/basket.actions";

export interface BasketState {
  basket: ReadonlyArray<Product>
};

export const initialState: BasketState = { basket: [] };

export const basketReducer = createReducer(
  initialState,
  on(basketActions.addProduct, (state, { product }) => {
    const clonedProduct = product.clone() as Product;
    if (!state.basket.find(p => p.sku === product.sku) && clonedProduct.stock > 0) {
      --clonedProduct.stock;
      return { ...state, basket: [...state.basket, clonedProduct] };
    }
    return { ...state };
  }),
  on(basketActions.removeProduct, (state, { productSku }) => {
    return { ...state, basket: [...state.basket.filter(p => p.sku !== productSku)] };
  })
)
