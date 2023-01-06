import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { productActions } from "../../../../state/actions/product.actions";
import { selectAllProducts } from "../../../../state/selectors/product.selectors";
import { Product } from "../../../../core/models/product";
import { basketActions } from "../../../../state/actions/basket.actions";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  productList$ = this.store.select(selectAllProducts);

  constructor(private readonly store: Store) {
  }

  ngOnInit() {
    this.store.dispatch(productActions.loadList());
  }

  addToBasket(product: Product): void {
    this.store.dispatch(basketActions.addProduct({ product: product }));
  }
}
