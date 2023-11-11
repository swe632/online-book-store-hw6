import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, filter, map, of } from 'rxjs';
import { Book } from '../models/book.model';


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsUrl = 'assets/books.json';

  constructor(private http: HttpClient) {}

  // Fetch a list of products from the backend
  getProducts(): Observable<Book[]> {
    return this.http.get<Book[]>(this.productsUrl).pipe(
      catchError((error) => {
        console.error('Error loading products from JSON file:', error);
        return of([]); // Return an empty array in case of an error
      })
    );
  }

  // Fetch details of a specific product by its ID
  getProductById(productId: number): Observable<Book> {
    return this.getProducts().pipe(
      map((products: any[]) =>
        products.find((product) => product.id === productId)
      )
    );
  }

  // Add a product to the shopping cart
  addToCart(product: Book): void {
    // Implement cart logic here
  }

  // Other methods for updating and managing products
}
