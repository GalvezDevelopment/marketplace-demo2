import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { selectBasketCount } from "../../../state/selectors/basket.selectors";
import { selectFormattedWalletAmount } from "../../../state/selectors/wallet.selectors";
import { walletActions } from "../../../state/actions/wallet.actions";
import { DesktopSystemService } from "../../services/wallet/desktop-system.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  wallet$ = this.store.select(selectFormattedWalletAmount);
  basketCounter$ = this.store.select(selectBasketCount);
  username$ = this.systemSrv.getSystemInfo();

  constructor(private readonly store: Store, public systemSrv: DesktopSystemService) {
  }

  ngOnInit(): void {
    this.store.dispatch(walletActions.load());
  }
}
