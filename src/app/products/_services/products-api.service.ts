import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: number;
  image?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductsApiService {
  private readonly apiUrl = '/api/products';

  constructor(private readonly httpClient: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.httpClient
      .get<Product[]>(this.apiUrl)
      .pipe(catchError(() => of([])));
  }
}
