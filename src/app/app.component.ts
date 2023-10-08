import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarComponent } from './shared/snackbar/snackbar.component';
import { BehaviorSubject, Subject } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
    <app-snackbar
      [message]="'Welcome to ' + title"
      [action]="'Close'"
      [open]="snackbarOpen$$ | async"
      (openChange)="snackbarOpen$$.next($event)"
    ></app-snackbar>
    <button mat-flat-button (click)="snackbarOpen$$.next(true)">
      Open Snackbar!
    </button>
    <button mat-flat-button (click)="snackbarOpen$$.next(false)">
      Close Snackbar!
    </button>
  `,
  styles: [''],
  standalone: true,
  imports: [RouterOutlet, SnackbarComponent, MatButtonModule, AsyncPipe],
})
export class AppComponent {
  title = 'shopping-cart';

  readonly snackbarOpen$$: Subject<boolean> = new Subject<boolean>();

  constructor() {}
}
