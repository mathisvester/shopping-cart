import { createFeature, createReducer, on } from '@ngrx/store';
import { cartActions } from './cart.actions';
import { CartItem } from '../../_models/cart-item.model';

export interface CartState {
  cartItems: CartItem[];
}

export const initialState: CartState = {
  cartItems: [],
};

export const cartFeature = createFeature({
  name: 'cart',
  reducer: createReducer(
    initialState,
    on(cartActions.addItemToCart, (state, action) => {
      return { ...state, cartItems: [...state.cartItems, action.cartItem] };
    }),
    on(cartActions.removeItemFromCart, (state, action) => {
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (cartItem) => cartItem.product.id !== action.productId
        ),
      };
    }),
    on(cartActions.updateProductQuantityForItemInCart, (state, action) => {
      return {
        ...state,
        cartItems: state.cartItems.map((cartItem) => {
          if (cartItem.product.id === action.productId) {
            return { ...cartItem, quantity: action.quantity };
          } else {
            return cartItem;
          }
        }),
      };
    })
  ),
});
