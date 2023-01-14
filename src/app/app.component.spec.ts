import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SharedModule } from "./shared/shared.module";
import { provideMockStore } from "@ngrx/store/testing";
import { CoreModule } from "./core/core.module";
import { RouterTestingModule } from "@angular/router/testing";

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        provideMockStore()
      ],
      imports: [RouterTestingModule, CoreModule, SharedModule]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
