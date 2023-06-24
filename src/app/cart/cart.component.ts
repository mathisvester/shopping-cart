import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from './_models/cart-item.model';
import { CartFacade } from './_services/cart.facade';
import { RouterLink } from '@angular/router';
import { QuantitySelectorComponent } from '../shared/quantity-selector/quantity-selector.component';
import { NgFor, AsyncPipe, CurrencyPipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NgFor,
    QuantitySelectorComponent,
    RouterLink,
    AsyncPipe,
    CurrencyPipe,
  ],
})
export class CartComponent {
  readonly cartItems$: Observable<CartItem[]> = this.cartFacade.cartItems$;

  constructor(private readonly cartFacade: CartFacade) {}

  update(productId: number, quantity: number) {
    this.cartFacade.updateCartItemQuantity(productId, quantity);
  }
}
