import { TestBed } from '@angular/core/testing';

import { CartFacade } from './cart.facade';

describe('CartFacade', () => {
  let facade: CartFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    facade = TestBed.inject(CartFacade);
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });
});
