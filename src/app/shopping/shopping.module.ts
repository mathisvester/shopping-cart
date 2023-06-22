import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ShoppingListItemComponent } from './shopping-list/shopping-list-item/shopping-list-item.component';
import { ShoppingCheckoutComponent } from './shopping-checkout/shopping-checkout.component';
import { StoreModule } from '@ngrx/store';
import { cartFeature } from './+state/cart/cart.reducer';

const routes: Routes = [
  {
    path: '',
    component: ShoppingListComponent,
  },
  {
    path: 'cart',
    component: ShoppingCartComponent,
  },
  {
    path: 'checkout',
    component: ShoppingCheckoutComponent,
  },
];

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingCartComponent,
    ShoppingListItemComponent,
    ShoppingCheckoutComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    IonicModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    StoreModule.forFeature(cartFeature),
  ],
})
export class ShoppingModule {}
