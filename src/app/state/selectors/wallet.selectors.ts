import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectBasketTotal } from "./basket.selectors";

const featureSelector = createFeatureSelector<{ amount: number }>('wallet');

export const selectWalletAmount = createSelector(featureSelector, state => {
  return state.amount;
});

export const selectWalletVsBasket = createSelector(
  selectWalletAmount,
  selectBasketTotal,
  (amount, productsTotal) => {
    return productsTotal <= amount;
  }
)
