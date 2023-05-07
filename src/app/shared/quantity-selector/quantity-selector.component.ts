import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-quantity-selector',
  templateUrl: './quantity-selector.component.html',
  styleUrls: ['./quantity-selector.component.scss'],
})
export class QuantitySelectorComponent {
  @Input() quantity!: number;
  @Output() quantityChange = new EventEmitter<number>();

  constructor() {}

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
