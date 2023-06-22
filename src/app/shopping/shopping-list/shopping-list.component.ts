import { Component } from '@angular/core';
import { map, Observable, startWith, switchMap } from 'rxjs';
import { Product, ShoppingApiService } from '../_services/shopping-api.service';
import {
  Category,
  CategoryApiService,
} from '../_services/category-api.service';
import { FormBuilder } from '@angular/forms';
import { ShoppingCartFacade } from '../_services/shopping-cart.facade';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent {
  readonly filter = this.fb.group({
    category: [0],
  });

  readonly categories$: Observable<Category[]> =
    this.categoryApiService.getCategories();
  readonly products$: Observable<Product[]> =
    this.filter.controls.category.valueChanges.pipe(
      startWith(this.filter.controls.category.value),
      map((categoryId) => Number(categoryId)),
      switchMap((categoryId) =>
        this.shoppingApiService.getProducts().pipe(
          map((products) => {
            if (categoryId) {
              return products.filter(
                (product) => product.category === categoryId
              );
            } else {
              return products;
            }
          })
        )
      )
    );

  readonly cartItemsCounter$ = this.shoppingCartFacade.cartItemsCounter$;

  constructor(
    private readonly fb: FormBuilder,
    private readonly shoppingApiService: ShoppingApiService,
    private readonly categoryApiService: CategoryApiService,
    private readonly shoppingCartFacade: ShoppingCartFacade
  ) {}

  add(product: Product) {
    this.shoppingCartFacade.addCartItem(product);
  }

  update(productId: number, quantity: number) {
    this.shoppingCartFacade.updateCartItemQuantity(productId, quantity);
  }
}
