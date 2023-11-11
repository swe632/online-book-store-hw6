import { Component } from '@angular/core';
import { Book } from '../models/book.model';
import { CartService } from '../service/cart.service';
import { Router } from '@angular/router';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-home-book',
  templateUrl: './home-book.component.html',
  styleUrls: ['./home-book.component.css'],
})
export class HomeBookComponent {
  message: string = '';
  showMessage: boolean = false;
  books: Book[] = [];
  searchText: string = ''; 
  filteredBooks: Book[] = [];

  constructor(
    private cartService: CartService,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((product) => {
      this.books = product || [];
      this.filteredBooks = this.books;
    });

  }

  addToCart(book: Book): void {
    this.cartService.addToCart(book);
    this.showMessage = true;
    this.message = `${book.title} added to cart.`;
    this.router.navigateByUrl('/cart');
    // After a few seconds, hide the message
    setTimeout(() => {
      this.showMessage = false;
    }, 3000);
  }

  viewProductDetails(id: number) {
    this.router.navigateByUrl('/product/' + id);
  }

  onSearchChange(): void
   {
    if (this.searchText === '')
     { 
      this.filteredBooks = this.books; 
    }
     else { 
      this.filteredBooks = this.books?.filter((book) => book.title.toLowerCase().includes(this.searchText.toLowerCase()) ); 
    }
     }

}
