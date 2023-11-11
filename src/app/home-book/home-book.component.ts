import { Component } from "@angular/core";
import { Book } from "../models/book.model";
import { CartService } from "../service/cart.service";
import { Router } from "@angular/router";
import { ProductService } from "../service/product.service";
import { Observable } from "rxjs";
import { SearchService } from "../service/search.service";

@Component({
  selector: "app-home-book",
  templateUrl: "./home-book.component.html",
  styleUrls: ["./home-book.component.css"],
})
export class HomeBookComponent {
  message: string = "";
  showMessage: boolean = false;
  books: Book[] = [];
  filteredBooks: Book[] = [];
  cart: Book[] = [];
  searchResults: Observable<Book[]> | undefined;

  constructor(
    private cartService: CartService,
    private router: Router,
    private productService: ProductService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {

    //searching books
    this.searchResults = this.searchService.searchResults;
    this.searchResults.subscribe((results) => (this.filteredBooks = results));

    //normal flow of showing books
    this.productService.getProducts().subscribe((product) => {
      this.books = product || [];
      this.filteredBooks = this.books;
      this.cart = this.cartService.getCart();
      this.checkItemsInCart();
    });
  }

  checkItemsInCart() {
    this.cart = this.cartService.getCart();
    this.filteredBooks.forEach((book: Book) => {
      const bookInCart = this.cart.find((cartBook: Book) => {
        return cartBook.id == book.id;
      });
      if (bookInCart) {
        book.inCart = bookInCart.quantity;
      }
    });
  }

  increaseQuantity(book: Book) {
    this.addBookToCart(book);
  }

  addToCart(book: Book): void {
    this.addBookToCart(book);
    this.router.navigateByUrl("/cart");
    this.checkItemsInCart();

    // After a few seconds, hide the message
    // setTimeout(() => {
    //   this.showMessage = false;
    // }, 3000);
  }

  addBookToCart(book: Book) {
    book.inCart += 1;
    this.cartService.addToCart(book);
    // this.showMessage = true;
    // this.message = `${book.title} added to cart.`;
  }

  viewProductDetails(id: number) {
    this.router.navigateByUrl("/product/" + id);
  }

  removeFromCart(book: Book): void {
    book.inCart -= 1;
    this.cartService.removeFromCart(book);
    this.cart = this.cartService.getCart(); // Update the cart data after removal
  }
}
