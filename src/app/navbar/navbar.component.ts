import { Component, Input } from "@angular/core";
import { SearchService } from "../service/search.service";
import { Book } from "../models/book.model";
import { ProductService } from "../service/product.service";
import { NavigationEnd, Router } from "@angular/router";
import { CartService } from "../service/cart.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent {
  cart: Book[] = [];
  searchTerm: string = "";
  @Input() filteredBooks: Book[] = [];
  books: Book[] = [];

  constructor(
    private searchService: SearchService,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((product) => {
      this.books = product || [];
      this.filteredBooks = this.books;
      this.checkItemsInCart();
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Clear searchTerm on navigation end
        this.searchTerm = "";
      }
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

  getTotalItemsInCart(): number {
    return this.cart.reduce((total, book) => total + book.inCart, 0);
  }

  search() {
    this.checkItemsInCart();
    if (this.searchTerm.trim() === "") {
      this.filteredBooks = this.books;
    } else {
      const keywords = this.searchTerm.toLowerCase().split(/\s+/);
  
      this.filteredBooks = this.books?.filter((book) =>
        keywords.every((keyword) =>
          book.title.toLowerCase().includes(keyword)
        )
      );
    }
    this.searchService.searchBooks(this.filteredBooks);
  }
  
}
