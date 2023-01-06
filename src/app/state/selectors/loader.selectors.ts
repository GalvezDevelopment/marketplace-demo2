import { createSelector, createFeatureSelector, Action } from '@ngrx/store';

const featureSelector = createFeatureSelector<{ loaders: Action[] }>('loaders');

export const selectPendingState = createSelector(featureSelector, state => {
  return !!state.loaders.length;
});
