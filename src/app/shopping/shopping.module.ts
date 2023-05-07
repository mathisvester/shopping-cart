import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ShoppingListItemComponent } from './shopping-list/shopping-list-item/shopping-list-item.component';

const routes: Routes = [
  {
    path: '',
    component: ShoppingListComponent,
  },
  {
    path: 'cart',
    component: ShoppingCartComponent,
  },
];

@NgModule({
  declarations: [ShoppingListComponent, ShoppingCartComponent, ShoppingListItemComponent],
  imports: [
    RouterModule.forChild(routes),
    IonicModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
  ],
})
export class ShoppingModule {}
