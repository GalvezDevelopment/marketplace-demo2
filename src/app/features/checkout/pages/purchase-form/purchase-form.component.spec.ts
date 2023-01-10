import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseFormComponent } from './purchase-form.component';
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButton, MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BasketState } from "../../../../state/reducers/basket.reducer";
import { selectBasketTotal } from "../../../../state/selectors/basket.selectors";
import { TestScheduler } from "rxjs/testing";
import { By } from "@angular/platform-browser";

const testScheduler = new TestScheduler((actual, expected) => {
  expect(actual).toEqual(expected);
});

describe('PurchaseFormComponent', () => {
  let component: PurchaseFormComponent;
  let fixture: ComponentFixture<PurchaseFormComponent>;
  let mockStore: MockStore;
  const initialState: BasketState = {
    basket: [{ title: 'Product 1', brand: 'Brand 1', price: 59.99, sku: '73526212', stock: 1 }]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PurchaseFormComponent],
      providers: [
        provideMockStore({
          initialState,
          selectors: [
            {
              selector: selectBasketTotal,
              value: initialState.basket[0].price
            }
          ]
        })
      ],
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule
      ]
    })
      .compileComponents();

    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(PurchaseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form', () => {
    expect(component.purchaseForm).toBeTruthy();
    expect(component.purchaseForm.get('name')).toBeTruthy();
    expect(component.purchaseForm.get('address')).toBeTruthy();
    expect(component.purchaseForm.get('email')).toBeTruthy();
  });

  it('should have a total greater than zero at the beginning', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const totalProducts = initialState.basket[0].price;
      const expected = cold('a', { a: totalProducts });
      expectObservable(component.productsTotal$).toEqual(expected);

      const total = fixture.debugElement.query(By.css('.form-container__total-price span'));
      expect(total).toBeTruthy();
      expect(total.nativeElement.innerText).toEqual(`$${totalProducts}`);
    });
  });

  it('should allow to pay when form is valid', () => {
    spyOn(component, 'pay').and.callThrough();
    spyOn(component.store, 'dispatch');

    const payForm = fixture.debugElement.query(By.css('.form-container'));
    payForm.triggerEventHandler('submit');
    expect(component.pay).toHaveBeenCalled();
    expect(component.store.dispatch).not.toHaveBeenCalled();

    component.purchaseForm.setValue({
      name: { first: 'Christian', last: 'Galvez' },
      address: { street: 'Unknown', city: 'Guaymas', state: 'Sonora' },
      email: 'unknown@hotmail.com'
    });
    fixture.detectChanges();

    payForm.triggerEventHandler('submit');
    expect(payForm).toBeTruthy();
    expect(component.pay).toHaveBeenCalled();
    expect(component.store.dispatch).toHaveBeenCalled();
  });
});
