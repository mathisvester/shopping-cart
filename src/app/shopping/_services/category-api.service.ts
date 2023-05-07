import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Category {
  id: number;
  title: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryApiService {
  private readonly apiUrl = '/api/categories';

  constructor(private readonly httpClient: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.httpClient
      .get<Category[]>(this.apiUrl)
      .pipe(catchError(() => of([])));
  }
}
