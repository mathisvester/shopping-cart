import { Component } from '@angular/core';
import { mergeAll, Observable, scan, shareReplay } from 'rxjs';
import { CartItem } from '../cart/_models/cart-item.model';
import { CartFacade } from '../cart/_services/cart.facade';
import { NgIf, NgFor, AsyncPipe, CurrencyPipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  standalone: true,
  imports: [IonicModule, NgIf, NgFor, AsyncPipe, CurrencyPipe],
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
