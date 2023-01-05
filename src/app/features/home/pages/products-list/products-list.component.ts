import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { productActions } from "../../../../state/actions/product.actions";
import { selectProducts } from "../../../../state/selectors/product.selectors";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  productList$ = this.store.select(selectProducts);

  constructor(private readonly store: Store) {
  }

  ngOnInit() {
    this.store.dispatch(productActions.loadList());
  }
}
