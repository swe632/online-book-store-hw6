import { Component, Input, ViewChild } from '@angular/core';
import { Book } from '../models/book.model';
import { CartService } from '../service/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cart: Book[] = []; // The cart array from your main component
  books: Book[] = [];
  totalPrice: number = 0;
  message: string = '';
  showMessage: boolean = false;
  selectedBooks: Book[] = [];
  removeAll: boolean = false;
  deleteBook!: Book;
  @ViewChild('modalClose') modalClose: any;

  constructor(
    private cartService: CartService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    this.cart.forEach((book: Book) => {
      if (book.selected) {
        this.selectedBooks.push(book);
      }
    });
    this.calculateTotalPrice();
  }

  selectItem(book: any) {
    book.selected = !book.selected;

    if (book.selected) {
      this.selectedBooks.push(book);
    } else {
      this.selectedBooks.splice(this.selectedBooks.indexOf(book), 1);
    }
  }

  removeItemsFromCart() {
    this.selectedBooks.forEach((book: Book) => {
      this.cartService.deleteFromCart(book);
      this.cart = this.cartService.getCart(); // Update the cart data after removal
      this.calculateTotalPrice();
      this.modalClose.nativeElement.click();
    });
    this.selectedBooks = [];
  }

  addToCart(book: Book): void {
    book.inCart += 1;
    this.cartService.addToCart(book);
    this.calculateTotalPrice();
  }

  removeFromCart(book: Book): void {
    book.inCart -= 1;
    this.cartService.removeFromCart(book);
    this.cart = this.cartService.getCart(); // Update the cart data after removal
    this.calculateTotalPrice();
    if (this.cart.length == 0) {
      this.selectedBooks = [];
    }
  }

  deleteFromCart(): void {
    this.cartService.deleteFromCart(this.deleteBook);
    this.cart = this.cartService.getCart(); // Update the cart data after removal
    this.calculateTotalPrice();
    this.modalClose.nativeElement.click();

  }

  calculateTotalPrice(): void {
    // Calculate the total price of items in the cart
    this.totalPrice = this.cart.reduce(
      (total, book) => total + book.price * book.quantity,
      0
    );
  }

  checkout() {
    this.router.navigateByUrl('/checkout');
    // this.cart = [];
    // this.totalPrice = 0;
    // this.showMessage = true;
    // this.message = 'Thank you for shopping.';

    // // After a few seconds, hide the message
    // setTimeout(() => {
    //   this.showMessage = false;
    //   this.message = '';
    // }, 3000);
  }
}
