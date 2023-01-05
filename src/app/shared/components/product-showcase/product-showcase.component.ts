import { Component, Input } from '@angular/core';
import { Product } from "../../../core/models/product";

@Component({
  selector: 'app-product-showcase',
  templateUrl: './product-showcase.component.html',
  styleUrls: ['./product-showcase.component.scss']
})
export class ProductShowcaseComponent {
  @Input() product: Product | undefined;
}
