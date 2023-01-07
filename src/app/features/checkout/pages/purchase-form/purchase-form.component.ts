import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { selectBasketTotal } from "../../../../state/selectors/basket.selectors";

@Component({
  selector: 'app-purchase-form',
  templateUrl: './purchase-form.component.html',
  styleUrls: ['./purchase-form.component.scss']
})
export class PurchaseFormComponent {
  productsTotal$ = this.store.select(selectBasketTotal);

  purchaseForm = this.formBuilder.group({
    name: this.formBuilder.group({
      first: this.formBuilder.control('', Validators.required),
      last: this.formBuilder.control('', Validators.required)
    }),
    address: this.formBuilder.group({
      street: this.formBuilder.control('', Validators.required),
      city: this.formBuilder.control('', Validators.required),
      state: this.formBuilder.control('', Validators.required)
    }),
    email: this.formBuilder.control('', Validators.required)
  });

  constructor(private readonly formBuilder: FormBuilder, private readonly store: Store) {
  }
}
