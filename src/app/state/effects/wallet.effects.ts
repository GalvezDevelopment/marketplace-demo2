import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { walletActions } from "../actions/wallet.actions";
import { map } from "rxjs";

@Injectable()
export class WalletEffects {
  walletAmount$ = this.actions$.pipe(
    ofType(walletActions.load),
    map(() => {
      return { type: walletActions.loaded, amount: 100 };
    })
  );

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store) {
  }
}
