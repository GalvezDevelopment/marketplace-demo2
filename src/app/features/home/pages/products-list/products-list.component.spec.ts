import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsListComponent } from './products-list.component';
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import '/src/app/core/utils/deep-copy';
import { By } from "@angular/platform-browser";
import { TestScheduler } from "rxjs/testing";
import { ProductState } from "../../../../state/reducers/product.reducer";
import { selectAllProducts } from "../../../../state/selectors/product.selectors";
import { Product } from "../../../../core/models/product";
import { SharedModule } from "../../../../shared/shared.module";
import { ProductShowcaseComponent } from "../../../../shared/components/product-showcase/product-showcase.component";

const testScheduler = new TestScheduler((actual, expected) => {
  expect(actual).toEqual(expected);
});

describe('ProductsListComponent', () => {
  let component: ProductsListComponent;
  let fixture: ComponentFixture<ProductsListComponent>;
  let store: MockStore;
  const initialState: ProductState = { products: [] };
  const mockProduct: Product = { title: 'Product 1', brand: 'Brand 1', price: 59.99, sku: '73526212', stock: 1 };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsListComponent],
      imports: [SharedModule],
      providers: [
        provideMockStore({
          initialState,
          selectors: [
            {
              selector: selectAllProducts,
              value: []
            }
          ]
        })
      ]
    })
      .compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(ProductsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not show any product on component initialization', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const expected = cold('a', { a: [] });
      expectObservable(component.productList$).toEqual(expected);
      const products = fixture.debugElement.queryAll(By.css('[data-cy]'));
      expect(products).toHaveSize(0);
    });
  });

  it('should show at least one product', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      store.overrideSelector(selectAllProducts, [mockProduct]);
      const expected = cold('a', { a: [mockProduct] });
      expectObservable(component.productList$).toEqual(expected);
      store.setState({ products: [mockProduct] });
      fixture.detectChanges();
      const products = fixture.debugElement.queryAll(By.css('[data-cy]'));
      expect(products).toHaveSize(1);
    });
  });

  it('should react to a product item click', () => {
    store.overrideSelector(selectAllProducts, [mockProduct]);
    store.setState({ products: [mockProduct] });
    fixture.detectChanges();
    const product = fixture.debugElement.query(By.directive(ProductShowcaseComponent));
    expect(product).toBeTruthy();
    spyOn(component, 'addToBasket');
    (product.componentInstance as ProductShowcaseComponent).click.emit(mockProduct);
    fixture.detectChanges();
    expect(component.addToBasket).toHaveBeenCalledWith(mockProduct);
  });
});
