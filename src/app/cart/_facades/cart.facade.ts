import { inject, Injectable, Signal } from '@angular/core';
import { Product } from '../../products/_services/products-api.service';
import { v4 as uuidv4 } from 'uuid';
import { CartItem } from '../_models/cart-item.model';
import { CartStore } from '../+state/cart.store';

@Injectable({
  providedIn: 'root',
})
export class CartFacade {
  readonly cartItems: Signal<CartItem[]>;
  readonly cartItemsCounter: Signal<number>;
  readonly cartItemsTotalCosts: Signal<number>;

  private readonly store = inject(CartStore);

  constructor() {
    this.cartItems = this.store.cartItems;
    this.cartItemsCounter = this.store.cartItemsCounter;
    this.cartItemsTotalCosts = this.store.cartItemsTotalCosts;
  }

  addCartItem(product: Product) {
    const cartItem: CartItem = {
      id: uuidv4(),
      product,
      quantity: 1,
    };

    this.store.addItem(cartItem);
  }

  updateCartItemQuantity(productId: number, quantity: number) {
    if (quantity === 0) {
      this.removeCartItem(productId);
    } else {
      this.store.updateQuantity(productId, quantity);
    }
  }

  removeCartItem(productId: number) {
    this.store.removeItem(productId);
  }
}
