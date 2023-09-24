import { Component } from '@angular/core';
import { mergeAll, Observable, scan, shareReplay } from 'rxjs';
import { CartItem } from '../cart/_models/cart-item.model';
import { CartFacade } from '../cart/_facades/cart.facade';
import { NgIf, NgFor, AsyncPipe, CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    AsyncPipe,
    CurrencyPipe,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    RouterLink,
  ],
})
export class CheckoutComponent {
  readonly cartItems$: Observable<CartItem[]> = this.cartFacade.cartItems$.pipe(
    shareReplay({ refCount: true, bufferSize: 1 })
  );
  readonly totalCosts$: Observable<number> = this.cartItems$.pipe(
    mergeAll(),
    scan((acc, value) => acc + value.quantity * value.product.price, 0)
  );

  constructor(private readonly cartFacade: CartFacade) {}
}
