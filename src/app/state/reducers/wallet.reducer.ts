import { createReducer, on } from '@ngrx/store';
import { walletActions } from "../actions/wallet.actions";

export interface WalletState {
  amount: number;
}

const initialState: WalletState = { amount: 0 };

export const walletReducer = createReducer(
  initialState,
  on(walletActions.load, state => {
    return { ...state };
  }),
  on(walletActions.loaded, (state, { amount }) => {
    return { ...state, amount };
  }),
  on(walletActions.withdraw, (state, {amount}) => {
    return { ...state, amount: state.amount - amount}
  })
)
