import { createReducer, on } from '@ngrx/store';
import { walletActions } from "../actions/wallet.actions";

export interface WalletState {
  amount: number;
}

const initialState: WalletState = { amount: 100 };

export const walletReducer = createReducer(
  initialState,
  on(walletActions.loaded, (state, { amount }) => {
    return { ...state, amount };
  })
)
