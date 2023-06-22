import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from '../_models/cart-item.model';
import { ShoppingCartFacade } from '../_services/shopping-cart.facade';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent {
  readonly cartItems$: Observable<CartItem[]> =
    this.shoppingCartFacade.cartItems$;

  constructor(private readonly shoppingCartFacade: ShoppingCartFacade) {}

  update(productId: number, quantity: number) {
    this.shoppingCartFacade.updateCartItemQuantity(productId, quantity);
  }
}
