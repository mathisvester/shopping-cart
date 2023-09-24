import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductsListComponent } from './products-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideState, provideStore } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { cartFeature } from '../cart/+state/cart/cart.reducer';

describe('ProductsListComponent', () => {
  let component: ProductsListComponent;
  let fixture: ComponentFixture<ProductsListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ProductsListComponent,
        RouterTestingModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
      ],
      providers: [provideStore(), provideState(cartFeature)],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
