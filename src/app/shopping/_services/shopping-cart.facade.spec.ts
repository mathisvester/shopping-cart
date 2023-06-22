import { TestBed } from '@angular/core/testing';

import { ShoppingCartFacade } from './shopping-cart.facade';

describe('ShoppingCartFacade', () => {
  let service: ShoppingCartFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppingCartFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
