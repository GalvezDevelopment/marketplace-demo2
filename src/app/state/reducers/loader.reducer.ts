import { Action, createReducer, on } from '@ngrx/store';
import { loaderActions } from "../actions/loader.actions";

export interface LoaderState {
  loaders: Action[];
}

export const initialState: LoaderState = { loaders: [] };

export const loaderReducer = createReducer(
  initialState,
  on(loaderActions.add, (state, { action }) => {
    return { loaders: [...state.loaders, action] };
  }),
  on(loaderActions.remove, (state, { action }) => {
    const loaders = state.loaders.filter(a => a !== action);
    return { ...state, loaders };
  })
);
