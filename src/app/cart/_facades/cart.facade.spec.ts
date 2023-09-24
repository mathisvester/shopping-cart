import { TestBed } from '@angular/core/testing';

import { CartFacade } from './cart.facade';
import { provideStore } from '@ngrx/store';

describe('CartFacade', () => {
  let facade: CartFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideStore()],
    });
    facade = TestBed.inject(CartFacade);
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });
});
