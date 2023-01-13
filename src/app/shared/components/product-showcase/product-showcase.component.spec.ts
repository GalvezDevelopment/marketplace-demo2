import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductShowcaseComponent } from './product-showcase.component';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { Product } from "../../../core/models/product";
import { By } from "@angular/platform-browser";
import { ProductViews } from "../../../core/enums/product-views";

describe('ProductShowcaseComponent', () => {
  let component: ProductShowcaseComponent;
  let fixture: ComponentFixture<ProductShowcaseComponent>;
  const mockedProduct: Product = { title: 'Product 1', brand: 'Brand 1', price: 59.99, sku: '73526212', stock: 1 };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductShowcaseComponent ],
      imports: [MatButtonModule, MatIconModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the product name', () => {
    component.product = mockedProduct;
    fixture.detectChanges();
    const productName = fixture.debugElement.query(By.css('.product__title'));
    expect(productName).toBeTruthy();
    expect(productName.nativeElement.innerText).toEqual(mockedProduct.title);
  });

  it('should render the product price', () => {
    component.product = mockedProduct;
    fixture.detectChanges();
    const productPrice = fixture.debugElement.query(By.css('.product__price'));
    expect(productPrice).toBeTruthy();
    expect(productPrice.nativeElement.innerText).toEqual(`$${mockedProduct.price}`);
  });

  it('should render with the default view', () => {
    expect(component.view).toEqual(ProductViews.default);
  });

  it('should hide the "Add to Basket" button when the view specified is Basket', () => {
    component.view = ProductViews.basket;
    fixture.detectChanges();
    const addToBasketBtn = fixture.debugElement.query(By.css('[data-cy=add-product]'));
    const removeFromBasketBtn = fixture.debugElement.query(By.css('[data-cy=remove-product]'));
    expect(removeFromBasketBtn).toBeTruthy();
    expect(addToBasketBtn).not.toBeTruthy();
    expect(component.view).toEqual(ProductViews.basket);
  });

  it('should emit the product when clicking on it on default view', () => {
    const addToBasketBtn = fixture.debugElement.query(By.css('[data-cy=add-product]'));
    spyOn(component, 'select');
    spyOn(component.click, 'emit');
    addToBasketBtn.triggerEventHandler('click');
    expect(component.select).toHaveBeenCalled();
  });
});
