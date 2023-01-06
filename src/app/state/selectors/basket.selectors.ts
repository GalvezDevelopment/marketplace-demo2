import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Product } from "../../core/models/product";

const featureSelector = createFeatureSelector<{ basket: Product[] }>('basket');

export const selectInBasketProducts = createSelector(featureSelector, state => {
  return state.basket;
});

export const selectBasketCount = createSelector(featureSelector, state => {
  return state.basket.length;
});

export const selectBasketTotal = createSelector(featureSelector, state => {
  return state.basket.reduce((prev, curr) => prev + curr.price, 0);
});
