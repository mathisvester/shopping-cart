import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListItemComponent } from './product-list-item.component';
import { provideState, provideStore } from '@ngrx/store';
import { cartFeature } from '../../cart/+state/cart/cart.reducer';

describe('ProductListItemComponent', () => {
  let component: ProductListItemComponent;
  let fixture: ComponentFixture<ProductListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListItemComponent],
      providers: [provideStore(), provideState(cartFeature)],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
