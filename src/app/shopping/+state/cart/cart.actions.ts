import { createActionGroup, props } from '@ngrx/store';
import { CartItem } from '../../_models/cart-item.model';

export const cartActions = createActionGroup({
  source: 'Shopping List',
  events: {
    'Add item to cart': props<{ cartItem: CartItem }>(),
    'Remove item from cart': props<{ productId: number }>(),
    'Update product quantity for item in cart': props<{
      productId: number;
      quantity: number;
    }>(),
  },
});
