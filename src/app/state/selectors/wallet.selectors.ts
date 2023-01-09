import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectBasketTotal } from "./basket.selectors";
import { formatCurrency } from "@angular/common";

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

export const selectFormattedWalletAmount = createSelector(
  selectWalletAmount,
  amount => formatCurrency(amount, 'en-US', '$')
)
