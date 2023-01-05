import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Product } from "../../core/models/product";

const featureSelector = createFeatureSelector<{ basket: Product[] }>('basket');

export const selectInBasketProducts = createSelector(featureSelector, state => {
  return state.basket;
});
