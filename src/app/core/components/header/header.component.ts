import { Component } from '@angular/core';
import { Store } from "@ngrx/store";
import { selectBasketCount } from "../../../state/selectors/basket.selectors";
import { selectWalletAmount } from "../../../state/selectors/wallet.selectors";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  wallet$ = this.store.select(selectWalletAmount);
  basketCounter$ = this.store.select(selectBasketCount);

  constructor(private readonly store: Store) {
  }
}
