import { Component } from '@angular/core';
import { map, Observable, startWith, switchMap } from 'rxjs';
import { Product, ShoppingApiService } from '../_services/shopping-api.service';
import { ShoppingCartService } from '../_services/shopping-cart.service';
import {
  Category,
  CategoryApiService,
} from '../_services/category-api.service';
import { FormBuilder } from '@angular/forms';

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

  readonly cartItemsCounter$ = this.shoppingCartService.cartItemsCounter$;

  constructor(
    private readonly fb: FormBuilder,
    private readonly shoppingApiService: ShoppingApiService,
    private readonly categoryApiService: CategoryApiService,
    private readonly shoppingCartService: ShoppingCartService
  ) {}

  add(product: Product) {
    this.shoppingCartService.addCartItem(product);
  }

  update(productId: number, quantity: number) {
    this.shoppingCartService.updateCartItemQuantity(productId, quantity);
  }
}
