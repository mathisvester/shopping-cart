import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from './_models/cart-item.model';
import { CartFacade } from './_facades/cart.facade';
import { RouterLink } from '@angular/router';
import { QuantitySelectorComponent } from '../shared/quantity-selector/quantity-selector.component';
import { NgFor, AsyncPipe, CurrencyPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  standalone: true,
  imports: [
    NgFor,
    QuantitySelectorComponent,
    RouterLink,
    AsyncPipe,
    CurrencyPipe,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  readonly cartItems$: Observable<CartItem[]> = this.cartFacade.cartItems$;

  constructor(private readonly cartFacade: CartFacade) {}

  update(productId: number, quantity: number) {
    this.cartFacade.updateCartItemQuantity(productId, quantity);
  }
}
