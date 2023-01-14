import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseResultComponent } from './purchase-result.component';
import { MatIconModule } from "@angular/material/icon";
import { RouterTestingModule } from "@angular/router/testing";

describe('PurchaseResultComponent', () => {
  let component: PurchaseResultComponent;
  let fixture: ComponentFixture<PurchaseResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseResultComponent ],
      imports: [MatIconModule, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
