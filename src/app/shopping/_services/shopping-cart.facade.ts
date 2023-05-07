import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './shopping-api.service';
import { v4 as uuidv4 } from 'uuid';
import { Store } from '@ngrx/store';
import { cartActions } from '../+state/cart/cart.actions';
import {
  selectCartItems,
  selectCartItemsCounter,
} from '../+state/cart/cart.selectors';
import { CartItem } from '../_models/cart-item.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartFacade {
  readonly cartItems$: Observable<CartItem[]> =
    this.store.select(selectCartItems);
  readonly cartItemsCounter$: Observable<number> = this.store.select(
    selectCartItemsCounter
  );

  constructor(private readonly store: Store) {}

  addCartItem(product: Product) {
    const cartItem: CartItem = {
      id: uuidv4(),
      product,
      quantity: 1,
    };

    this.store.dispatch(cartActions.addItemToCart({ cartItem }));
  }

  updateCartItemQuantity(productId: number, quantity: number) {
    if (quantity === 0) {
      this.removeCartItem(productId);
    } else {
      this.store.dispatch(
        cartActions.updateProductQuantityForItemInCart({ productId, quantity })
      );
    }
  }

  removeCartItem(productId: number) {
    this.store.dispatch(cartActions.removeItemFromCart({ productId }));
  }
}
