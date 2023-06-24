import { Component } from '@angular/core';
import { map, Observable, startWith, switchMap } from 'rxjs';
import { Product, ProductsApiService } from './_services/products-api.service';
import { Category, CategoryApiService } from './_services/category-api.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CartFacade } from '../cart/_services/cart.facade';
import { ProductListItemComponent } from './product-list-item/product-list-item.component';
import { NgFor, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    RouterLink,
    ReactiveFormsModule,
    NgFor,
    ProductListItemComponent,
    AsyncPipe,
  ],
})
export class ProductsListComponent {
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
        this.productsApiService.getProducts().pipe(
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

  readonly cartItemsCounter$ = this.cartFacade.cartItemsCounter$;

  constructor(
    private readonly fb: FormBuilder,
    private readonly productsApiService: ProductsApiService,
    private readonly categoryApiService: CategoryApiService,
    private readonly cartFacade: CartFacade
  ) {}

  add(product: Product) {
    this.cartFacade.addCartItem(product);
  }

  update(productId: number, quantity: number) {
    this.cartFacade.updateCartItemQuantity(productId, quantity);
  }
}
