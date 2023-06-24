import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: 'cart',
    loadComponent: () =>
      import('./cart/cart.component').then((m) => m.CartComponent),
  },
  {
    path: 'checkout',
    loadComponent: () =>
      import('./checkout/checkout.component').then((m) => m.CheckoutComponent),
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./products/products-list.component').then(
        (m) => m.ProductsListComponent
      ),
  },
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
];
