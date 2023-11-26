import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-quantity-selector',
  templateUrl: './quantity-selector.component.html',
  styleUrls: ['./quantity-selector.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
