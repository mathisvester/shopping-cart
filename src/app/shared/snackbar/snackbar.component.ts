import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatSnackBar,
  MatSnackBarModule,
  MatSnackBarRef,
  TextOnlySnackBar,
} from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [CommonModule, MatSnackBarModule],
  template: '',
  styles: [''],
})
export class SnackbarComponent implements OnDestroy {
  @Input() set open(open: boolean | null) {
    this._open = open;

    if (this._open) {
      this._snackbarRef = this._snackbar.open(this.message, this.action, {
        duration: 2000,
      });
    } else if (!!this._snackbarRef) {
      this._snackbar.dismiss();
    }

    if (!!this._snackbarRef) {
      this._snackbarRef
        .afterDismissed()
        .pipe(takeUntil(this.onDestroy$$))
        .subscribe(() => {
          this._snackbarRef = undefined;
          this._open = false;

          setTimeout(() => {
            this.openChange.emit(false);
          });
        });
    }
  }

  get open(): boolean | null {
    return this._open;
  }

  @Output() openChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() message = '';
  @Input() action?: string | undefined;

  private _open: boolean | null = false;
  private _snackbarRef: MatSnackBarRef<TextOnlySnackBar> | undefined;

  private readonly onDestroy$$: Subject<void> = new Subject<void>();
  private readonly _snackbar: MatSnackBar = inject(MatSnackBar);

  ngOnDestroy() {
    this.onDestroy$$.next();
    this.onDestroy$$.complete();
  }
}
