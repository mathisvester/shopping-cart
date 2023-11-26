import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CartFacade } from '../cart/_facades/cart.facade';
import { CurrencyPipe, NgFor } from '@angular/common';
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
  readonly cartFacade: CartFacade = inject(CartFacade);
}
