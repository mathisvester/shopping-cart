import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Product } from '../_services/products-api.service';
import { map, Observable, startWith } from 'rxjs';
import { CartFacade } from '../../cart/_facades/cart.facade';
import { QuantitySelectorComponent } from '../../shared/quantity-selector/quantity-selector.component';
import { AsyncPipe, CurrencyPipe, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    QuantitySelectorComponent,
    AsyncPipe,
    CurrencyPipe,
    MatCardModule,
    MatButtonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListItemComponent {
  @Input() set product(product: Product | undefined) {
    this._product = product;
  }
  get product(): Product | undefined {
    return this._product;
  }
  @Output() add: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() quantityChange: EventEmitter<number> = new EventEmitter<number>();

  readonly quantity$: Observable<number>;

  private _product: Product | undefined;

  constructor(private readonly cartFacade: CartFacade) {
    this.quantity$ = this.cartFacade.cartItems$.pipe(
      map((cartItems) => {
        const cartItem = cartItems.find(
          (cartItem) => cartItem.product.id === this.product?.id,
        );

        return cartItem?.quantity ?? 0;
      }),
      startWith(0),
    );
  }
}
