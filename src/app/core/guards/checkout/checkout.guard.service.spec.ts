import { TestBed } from '@angular/core/testing';

import { CheckoutGuard } from './checkout-guard.service';

describe('CheckoutGuardService', () => {
  let service: CheckoutGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckoutGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
