import { Injectable } from '@angular/core';
import { ProductsService } from "./products.service";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { ApiResponse } from "../../models/api-response";
import { Product } from "../../models/product";
import { MockedProductsApiService } from "./mocked-products-api.service";

@Injectable({
  providedIn: 'root',
  useClass: MockedProductsApiService
})
export class ProductsApiService implements ProductsService {
  readonly ENDPOINT = 'api/products';

  constructor(private readonly httpClientSrv: HttpClient) {
  }


  getProducts(): Observable<ApiResponse<Product[]>> {
    return this.httpClientSrv.get<ApiResponse<Product[]>>(this.ENDPOINT);
  }

  purchase(productsSkus: string[]): Observable<ApiResponse<[]>> {
    return this.httpClientSrv.post<ApiResponse<[]>>(this.ENDPOINT, productsSkus);
  }
}
