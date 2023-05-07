import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../_services/shopping-api.service';
import { ShoppingCartService } from '../../_services/shopping-cart.service';
import { map, Observable, startWith, Subject } from 'rxjs';

@Component({
  selector: 'app-shopping-list-item',
  templateUrl: './shopping-list-item.component.html',
  styleUrls: ['./shopping-list-item.component.scss'],
})
export class ShoppingListItemComponent {
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

  constructor(private readonly shoppingCartService: ShoppingCartService) {
    this.quantity$ = this.shoppingCartService.cartItems$.pipe(
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
