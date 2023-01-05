import { Injectable } from '@angular/core';
import { ProductsService } from "./products.service";
import { Observable, of } from "rxjs";
import { ApiResponse } from "../../models/api-response";
import { Product } from "../../models/product";

@Injectable({
  providedIn: 'root'
})
export class MockedProductsApiService implements ProductsService {
  readonly ENDPOINT = '';
  private products: Product[] = [
    { title: 'Product 1', brand: 'Brand 1', price: 59.99, sku: '73526212', stock: 1 },
    { title: 'Product 2', brand: 'Brand 2', price: 49.99, sku: '73526213', stock: 1 },
    { title: 'Product 3', brand: 'Brand 3', price: 79.99, sku: '73526214', stock: 1 },
    { title: 'Product 4', brand: 'Brand 4', price: 89.99, sku: '73526215', stock: 1 },
    { title: 'Product 5', brand: 'Brand 5', price: 99.99, sku: '73526216', stock: 1 },
    { title: 'Product 6', brand: 'Brand 6', price: 39.99, sku: '73526217', stock: 1 },
  ];

  getProducts(): Observable<ApiResponse<Product[]>> {
    return of({ success: true, data: this.products });
  }

  purchase(products: Product[]): Observable<ApiResponse<[]>> {
    const clonedProducts = products.clone() as Product[];
    products.forEach(product => {
      const productFound = clonedProducts.find(p => p.sku === product.sku);
      if (productFound) {
        productFound.stock -= 1;
      }
    });
    this.products = clonedProducts;
    return of({ success: true, data: [] });
  }

}
