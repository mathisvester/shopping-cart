import { Component } from '@angular/core';
import { mergeAll, Observable, scan, shareReplay } from 'rxjs';
import { CartItem } from '../_models/cart-item.model';
import { ShoppingCartFacade } from '../_services/shopping-cart.facade';

@Component({
  selector: 'app-shopping-checkout',
  templateUrl: './shopping-checkout.component.html',
  styleUrls: ['./shopping-checkout.component.scss'],
})
export class ShoppingCheckoutComponent {
  readonly cartItems$: Observable<CartItem[]> =
    this.shoppingCartFacade.cartItems$.pipe(
      shareReplay({ refCount: true, bufferSize: 1 })
    );
  readonly totalCosts$: Observable<number> = this.cartItems$.pipe(
    mergeAll(),
    scan((acc, value) => acc + value.quantity * value.product.price, 0)
  );

  constructor(private readonly shoppingCartFacade: ShoppingCartFacade) {}
}
