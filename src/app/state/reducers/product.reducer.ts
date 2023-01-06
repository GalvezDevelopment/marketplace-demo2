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
  }),
  on(productActions.updateList, (state, { products }) => {
    const clonedProducts = state.products.clone() as Product[];
    const clonedBasketProducts = products.clone() as Product[];
    clonedBasketProducts.forEach(p => {
      const productIndex = state.products.findIndex(existingProduct => existingProduct.sku === p.sku);
      if (productIndex > -1) {
        clonedProducts[productIndex] = p.clone() as Product;
      }
    });
    console.log(clonedProducts);
    return { ...state, products: clonedProducts };
  })
);
