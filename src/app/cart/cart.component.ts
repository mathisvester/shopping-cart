import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CartFacade } from './_facades/cart.facade';
import { RouterLink } from '@angular/router';
import { QuantitySelectorComponent } from '../shared/quantity-selector/quantity-selector.component';
import { CurrencyPipe, NgFor } from '@angular/common';
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
    CurrencyPipe,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  readonly cartFacade: CartFacade = inject(CartFacade);
}
