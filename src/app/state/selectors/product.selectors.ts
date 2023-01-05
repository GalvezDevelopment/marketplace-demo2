import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Product } from "../../core/models/product";

const featureSelector = createFeatureSelector<{ products: Product[] }>('products');

export const selectProducts = createSelector(featureSelector, state => {
  return state.products;
});
