import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const walletActions = createActionGroup({
  source: 'Wallet',
  events: {
    'Load': emptyProps(),
    'Loaded': props<{ amount: number }>(),
    'Withdraw': props<{ amount: number }>()
  }
})
