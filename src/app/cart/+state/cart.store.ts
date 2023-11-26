import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { computed } from '@angular/core';
import { CartItem } from '../_models/cart-item.model';

export interface CartState {
  cartItems: CartItem[];
}

export const initialState: CartState = {
  cartItems: [],
};

export const CartStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ cartItems }) => ({
    cartItemsCounter: computed(() =>
      cartItems().reduce((acc, cur) => acc + cur.quantity, 0),
    ),
    cartItemsTotalCosts: computed(() =>
      cartItems().reduce(
        (acc, value) => acc + value.quantity * value.product.price,
        0,
      ),
    ),
  })),
  withMethods(({ cartItems, ...store }) => ({
    addItem(cartItem: CartItem) {
      patchState(store, { cartItems: [...cartItems(), cartItem] });
    },
    removeItem(productId: number) {
      patchState(store, {
        cartItems: cartItems().filter(
          (cartItem) => cartItem.product.id !== productId,
        ),
      });
    },
    updateQuantity(productId: number, quantity: number) {
      patchState(store, {
        cartItems: cartItems().map((cartItem) => {
          if (cartItem.product.id === productId) {
            return { ...cartItem, quantity: quantity };
          } else {
            return cartItem;
          }
        }),
      });
    },
  })),
);
