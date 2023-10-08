import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Category {
  title: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryApiService {
  constructor(private readonly httpClient: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.httpClient
      .get<string[]>('https://fakestoreapi.com/products/categories')
      .pipe(
        map((categories) =>
          categories.map((category) => ({ title: category } as Category))
        ),
        catchError(() => of([]))
      );
  }
}
