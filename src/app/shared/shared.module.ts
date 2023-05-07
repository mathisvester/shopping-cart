import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuantitySelectorComponent } from './quantity-selector/quantity-selector.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [QuantitySelectorComponent],
  imports: [CommonModule, IonicModule],
  exports: [QuantitySelectorComponent],
})
export class SharedModule {}
