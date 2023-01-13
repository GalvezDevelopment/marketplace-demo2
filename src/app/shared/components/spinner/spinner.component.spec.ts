import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerComponent } from './spinner.component';
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { Component } from "@angular/core";
import { selectPendingState } from "../../../state/selectors/loader.selectors";
import { TestScheduler } from "rxjs/testing";

@Component({
  selector: 'app-mock-container',
  template: `
    <app-spinner></app-spinner>
  `
})
class MockContainerComponent {}

const testScheduler = new TestScheduler((actual, expected) => {
  expect(actual).toEqual(expected);
});

describe('SpinnerComponent', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;
  let mockStore: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpinnerComponent ],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: selectPendingState,
              value: true
            }
          ]
        })
      ]
    })
    .compileComponents();

    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the spinner', () => {
    testScheduler.run(({cold, expectObservable}) => {
      const expected = cold('a', { a: true });
      expectObservable(component.loading$).toEqual(expected);
    });
  });

  it('should hide the spinner', () => {
    testScheduler.run(({cold, expectObservable}) => {
      mockStore.overrideSelector(selectPendingState, false);
      const expected = cold('a', { a: false });
      expectObservable(component.loading$).toEqual(expected);
    });
  });
});
