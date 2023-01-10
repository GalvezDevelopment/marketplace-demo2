import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { BasketProductsComponent } from './basket-products.component';
import { TestScheduler } from "rxjs/testing";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { BasketState } from "../../../../state/reducers/basket.reducer";
import { SharedModule } from "../../../../shared/shared.module";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import {
  selectBasketCount,
  selectBasketTotal,
  selectInBasketProducts
} from "../../../../state/selectors/basket.selectors";
import { By } from "@angular/platform-browser";
import { Product } from "../../../../core/models/product";
import { selectWalletVsBasket } from "../../../../state/selectors/wallet.selectors";
import { ProductShowcaseComponent } from "../../../../shared/components/product-showcase/product-showcase.component";
import { DebugElement } from "@angular/core";
import { basketActions } from "../../../../state/actions/basket.actions";

const testScheduler = new TestScheduler((actual, expected) => {
  expect(actual).toEqual(expected);
});

describe('BasketProductsComponent', () => {
  let component: BasketProductsComponent;
  let fixture: ComponentFixture<BasketProductsComponent>;
  let mockedStore: MockStore;
  const initialState: BasketState = {
    basket: [
      { title: 'Product 1', brand: 'Brand 1', price: 59.99, sku: '73526212', stock: 1 }
    ]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BasketProductsComponent],
      providers: [
        provideMockStore({
          initialState,
          selectors: [
            {
              selector: selectInBasketProducts,
              value: [...initialState.basket]
            },
            {
              selector: selectBasketCount,
              value: 1
            },
            {
              selector: selectBasketTotal,
              value: 9.99
            },
            {
              selector: selectWalletVsBasket,
              value: true
            }
          ]
        })
      ],
      imports: [
        SharedModule,
        MatButtonModule,
        MatIconModule
      ]
    })
      .compileComponents();

    mockedStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(BasketProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be the counter greater than zero and with products available', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const expected = cold('a', { a: 1 })
      expectObservable(component.basketCount$).toEqual(expected);
    });
  });

  it('should have at least one product', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const expected = cold('a', { a: initialState.basket as unknown as [] });
      expectObservable(component.basketProducts$).toEqual(expected);
    });
  });

  it('should be the total greater than zero', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const expected = cold('a', { a: 9.99 });
      expectObservable(component.basketTotal$).toEqual(expected);
    });
  });

  it('should allow the checkout button to be enabled', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const expected = cold('a', { a: false });
      expectObservable(component.allowCheckout$).toEqual(expected);
    });
  });

  it('should list at least one product', () => {
    const products = fixture.debugElement.queryAll(By.css('[data-cy=product-item]'));
    expect(products).toHaveSize(1);
  });

  it('should appear a message when no products available', () => {
    mockedStore.overrideSelector(selectBasketCount, 0);
    mockedStore.refreshState();
    fixture.detectChanges();
    const products = fixture.debugElement.queryAll(By.css('[data-cy=product-item]'));
    expect(products).toHaveSize(0);
    const emptySection = fixture.debugElement.query(By.css('.basket-container__empty-basket'));
    expect(emptySection).toBeTruthy();
  });

  it('should remove a product', () => {
    spyOn(component, 'removeFromBasket').and.callThrough();
    spyOn(component.store, 'dispatch').and.callThrough();
    const product = fixture.debugElement.query(By.directive(ProductShowcaseComponent));
    product.triggerEventHandler('remove', initialState.basket[0]);
    expect(component.removeFromBasket).toHaveBeenCalled();
    expect(component.store.dispatch).toHaveBeenCalled();
  });
});
