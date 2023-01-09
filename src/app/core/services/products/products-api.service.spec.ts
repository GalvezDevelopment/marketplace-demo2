import { TestBed } from '@angular/core/testing';

import { ProductsApiService } from './products-api.service';
import { Product } from "../../models/product";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { ApiResponse } from "../../models/api-response";
import SpyObj = jasmine.SpyObj;

const testScheduler = new TestScheduler((actual, expected) => {
  expect(actual).toEqual(expected);
});

describe('ProductsApiService', () => {
  let service: ProductsApiService;
  let mockedProductsApiService: SpyObj<ProductsApiService>;
  const mockedProduct: Product = { title: 'Product 1', brand: 'Brand 1', price: 59.99, sku: '73526212', stock: 1 };
  const mockedResponse: ApiResponse<Product[]> = { data: [mockedProduct], success: true };
  const mockedPurchaseResponse: ApiResponse<[]> = { data: [], success: true };

  beforeEach(() => {
    mockedProductsApiService = jasmine.createSpyObj(ProductsApiService, ['getProducts', 'purchase']);
    mockedProductsApiService.getProducts.and.returnValue(of(mockedResponse));
    mockedProductsApiService.purchase.and.returnValue(of(mockedPurchaseResponse));

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        {
          provide: ProductsApiService,
          useValue: mockedProductsApiService
        }
      ]
    });
    service = TestBed.inject(ProductsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a list of products', () => {
    testScheduler.run(({hot, expectObservable}) => {
      const expected = hot('(a|)', { a: mockedResponse });
      expectObservable(service.getProducts()).toEqual(expected);
    });
  });

  it('should purchase a product', () => {
    testScheduler.run(({hot, expectObservable}) => {
      const expected = hot('(a|)', { a: mockedPurchaseResponse });
      expectObservable(service.purchase([mockedProduct.sku])).toEqual(expected);
    });
  });
});
