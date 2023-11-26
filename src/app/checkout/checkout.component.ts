import {
  ChangeDetectionStrategy,
  Component,
  computed,
  Signal,
} from '@angular/core';
import { CartItem } from '../cart/_models/cart-item.model';
import { CartFacade } from '../cart/_facades/cart.facade';
import { CurrencyPipe, NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  standalone: true,
  imports: [
    NgFor,
    CurrencyPipe,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    RouterLink,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutComponent {
  readonly cartItems: Signal<CartItem[]> = toSignal(
    this.cartFacade.cartItems$,
    { initialValue: [] },
  );
  readonly totalCosts: Signal<number> = computed(() =>
    this.cartItems().reduce(
      (acc, value) => acc + value.quantity * value.product.price,
      0,
    ),
  );

  constructor(private readonly cartFacade: CartFacade) {}
}
