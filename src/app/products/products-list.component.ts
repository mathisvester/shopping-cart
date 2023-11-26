import {
  ChangeDetectionStrategy,
  Component,
  signal,
  WritableSignal,
} from '@angular/core';
import { iif, Observable, switchMap } from 'rxjs';
import { Product, ProductsApiService } from './_services/products-api.service';
import { Category, CategoryApiService } from './_services/category-api.service';
import { FormsModule } from '@angular/forms';
import { CartFacade } from '../cart/_facades/cart.facade';
import { ProductListItemComponent } from './product-list-item/product-list-item.component';
import { AsyncPipe, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    NgFor,
    ProductListItemComponent,
    AsyncPipe,
    MatToolbarModule,
    MatBadgeModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent {
  readonly category: WritableSignal<string> = signal('');

  readonly categories$: Observable<Category[]> =
    this.categoryApiService.getCategories();
  readonly products$: Observable<Product[]> = toObservable(this.category).pipe(
    switchMap((selectedCategory) =>
      iif(
        () => selectedCategory.length === 0,
        this.productsApiService.getProducts(),
        this.productsApiService.getProductsByCategory(selectedCategory),
      ),
    ),
  );

  readonly cartItemsCounter$ = this.cartFacade.cartItemsCounter$;

  constructor(
    private readonly productsApiService: ProductsApiService,
    private readonly categoryApiService: CategoryApiService,
    private readonly cartFacade: CartFacade,
  ) {}

  add(product: Product) {
    this.cartFacade.addCartItem(product);
  }

  update(productId: number, quantity: number) {
    this.cartFacade.updateCartItemQuantity(productId, quantity);
  }

  categoryChange(category: string) {
    this.category.set(category);
  }
}
