import { Component } from '@angular/core';
import {
  CartItem,
  ShoppingCartService,
} from '../_services/shopping-cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent {
  readonly cartItems$: Observable<CartItem[]> =
    this.shoppingCartService.cartItems$;

  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  update(productId: number, quantity: number) {
    this.shoppingCartService.updateCartItemQuantity(productId, quantity);
  }
}
