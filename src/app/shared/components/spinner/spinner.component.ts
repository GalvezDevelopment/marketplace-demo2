import { Component } from '@angular/core';
import { Store } from "@ngrx/store";
import { selectPendingState } from "../../../state/selectors/loader.selectors";

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  loading$ = this.store.select(selectPendingState);

  constructor(private readonly store: Store) {
  }

}
