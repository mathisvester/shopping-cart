import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import { provideStore } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CartComponent, RouterTestingModule],
      providers: [provideStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
