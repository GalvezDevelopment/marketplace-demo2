import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { provideMockStore } from "@ngrx/store/testing";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { RouterTestingModule } from "@angular/router/testing";
import { MatBadgeModule } from "@angular/material/badge";
import { selectFormattedWalletAmount } from "../../../state/selectors/wallet.selectors";
import { selectBasketCount } from "../../../state/selectors/basket.selectors";
import { TestScheduler } from "rxjs/testing";

const testScheduler = new TestScheduler((actual, expected) => {
  expect(actual).toEqual(expected);
});

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      providers: [provideMockStore({
        selectors: [
          {
            selector: selectFormattedWalletAmount,
            value: '$100'
          },
          {
            selector: selectBasketCount,
            value: 2
          }
        ]
      })],
      imports: [MatToolbarModule, MatIconModule, RouterTestingModule, MatBadgeModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the wallet available funds', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const expected = cold('a', { a: '$100' });
      expectObservable(component.wallet$).toEqual(expected);
    });
  });
});
