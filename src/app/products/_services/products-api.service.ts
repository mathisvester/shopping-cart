import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class ProductsApiService {
  constructor(private readonly httpClient: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.httpClient
      .get<Product[]>('https://fakestoreapi.com/products')
      .pipe(catchError(() => of([])));
  }

  getProductsByCategory(categoryTitle: string): Observable<Product[]> {
    return this.httpClient
      .get<Product[]>(
        `https://fakestoreapi.com/products/category/${categoryTitle}`
      )
      .pipe(catchError(() => of([])));
  }
}
