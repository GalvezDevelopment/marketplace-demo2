import { TestBed } from '@angular/core/testing';

import { CheckoutGuard } from './checkout-guard.service';
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { selectBasketTotal } from "../../../state/selectors/basket.selectors";
import { TestScheduler } from "rxjs/testing";

const testScheduler = new TestScheduler((actual, expected) => {
  expect(actual).toEqual(expected);
});

describe('CheckoutGuardService', () => {
  let service: CheckoutGuard;
  let mockStore: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RouterTestingModule,
        provideMockStore({
          selectors: [
            {
              selector: selectBasketTotal,
              value: 0
            }
          ]
        })
      ]
    });

    mockStore = TestBed.inject(MockStore);
    service = TestBed.inject(CheckoutGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should avoid to enter to checkout form', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const expected = cold('a', { a: false });
      expectObservable(service.canActivate()).toEqual(expected);
    });
  });

  it('should allow to enter to checkout form', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      mockStore.overrideSelector(selectBasketTotal, 9.99);
      const expected = cold('a', { a: true });
      expectObservable(service.canActivate()).toEqual(expected);
    });
  });
});
