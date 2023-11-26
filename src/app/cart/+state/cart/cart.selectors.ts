import { createSelector } from '@ngrx/store';
import { cartFeature } from './cart.reducer';

export const selectCartItems = createSelector(
  cartFeature.selectCartItems,
  (cartItems) => cartItems,
);

export const selectCartItemsCounter = createSelector(
  selectCartItems,
  (cartItems) => cartItems.reduce((acc, cur) => acc + cur.quantity, 0),
);
