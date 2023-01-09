import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { ApiResponse } from "../../models/api-response";
import { Product } from "../../models/product";

@Injectable()
export abstract class ProductsService {
  abstract readonly ENDPOINT: string;

  abstract getProducts(): Observable<ApiResponse<Product[]>>;
  abstract purchase(productsSkus: string[]): Observable<ApiResponse<[]>>;
}
