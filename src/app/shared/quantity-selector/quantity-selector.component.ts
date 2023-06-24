import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-quantity-selector',
  templateUrl: './quantity-selector.component.html',
  styleUrls: ['./quantity-selector.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class QuantitySelectorComponent {
  @Input() quantity!: number;
  @Output() quantityChange = new EventEmitter<number>();

  dec() {
    this.update(-1);
  }
  inc() {
    this.update(+1);
  }

  update(value: number) {
    this.quantity = this.quantity + value;
    this.quantityChange.emit(this.quantity);
  }
}
