import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../_services/products-api.service';
import { map, Observable, startWith, Subject } from 'rxjs';
import { CartFacade } from '../../cart/_services/cart.facade';
import { QuantitySelectorComponent } from '../../shared/quantity-selector/quantity-selector.component';
import { IonicModule } from '@ionic/angular';
import { NgIf, AsyncPipe, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    IonicModule,
    QuantitySelectorComponent,
    AsyncPipe,
    CurrencyPipe,
  ],
})
export class ProductListItemComponent {
  @Input() set product(product: Product | undefined) {
    this._product = product;

    if (this._product?.id) {
      this.loadQuantity$.next(this._product.id);
    }
  }
  get product(): Product | undefined {
    return this._product;
  }
  @Output() add: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() quantityChange: EventEmitter<number> = new EventEmitter<number>();

  readonly quantity$: Observable<number>;

  private readonly loadQuantity$: Subject<number> = new Subject<number>();
  private _product: Product | undefined;

  constructor(private readonly cartFacade: CartFacade) {
    this.quantity$ = this.cartFacade.cartItems$.pipe(
      map((cartItems) => {
        const cartItem = cartItems.find(
          (cartItem) => cartItem.product.id === this.product?.id
        );

        return cartItem?.quantity ?? 0;
      }),
      startWith(0)
    );
  }
}
