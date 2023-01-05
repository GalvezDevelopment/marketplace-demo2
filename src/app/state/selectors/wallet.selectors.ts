import { createFeatureSelector, createSelector } from '@ngrx/store';

const featureSelector = createFeatureSelector<{ amount: number }>('wallet');

export const selectWalletAmount = createSelector(featureSelector, state => {
  return state.amount;
});
