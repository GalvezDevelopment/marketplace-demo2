import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from "../../../core/models/product";
import { ProductViews } from "../../../core/enums/product-views";

@Component({
  selector: 'app-product-showcase',
  templateUrl: './product-showcase.component.html',
  styleUrls: ['./product-showcase.component.scss']
})
export class ProductShowcaseComponent {
  public readonly PRODUCT_VIEWS = ProductViews;

  @Input() product: Product | undefined;
  @Input() view: ProductViews = ProductViews.default;
  @Output() click = new EventEmitter<Product>();
  @Output() remove = new EventEmitter<Product>();

  select(event: any): void {
    event.stopPropagation();
    this.click.emit(this.product);
  }

  removeFromBasket(): void {
    this.remove.emit(this.product);
  }
}
