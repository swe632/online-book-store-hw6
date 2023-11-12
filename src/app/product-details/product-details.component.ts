import { Component } from "@angular/core";
import { ProductService } from "../service/product.service";
import { ActivatedRoute, Router } from "@angular/router";
import { CartService } from "../service/cart.service";
import { Book } from "../models/book.model";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.css"],
})
export class ProductDetailsComponent {
  cart: Book[] = [];
  message: string = "";
  showMessage: boolean = false;

  product: Book = {
    id: 0,
    title: "",
    author: "",
    price: 0,
    image: "",
    quantity: 0,
    selected: false,
    inCart: 0,
    description:"",
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get("id"));
    this.productService.getProductById(productId).subscribe((product) => {
      this.product = product;
      this.checkItemsInCart();
    });
  }

  checkItemsInCart() {
    this.cart = this.cartService.getCart();
      const bookInCart = this.cart.find((cartBook: Book) => {return cartBook.id == this.product.id});
      if(bookInCart) {
        this.product.inCart = bookInCart.quantity;
      } 
    
  }

  addToCart(product: Book) {
    this.addBookToCart(product);
    this.router.navigateByUrl("/cart");
    this.checkItemsInCart();
    // this.showMessage = true;
    // this.message = `${product.title} added to cart.`;
    // // After a few seconds, hide the message
    // setTimeout(() => {
    //   this.showMessage = false;
    //   this.message = "";
    // }, 3000);
  }
  
  addBookToCart(book: Book) {
    book.inCart += 1;
    this.cartService.addToCart(book);
  }

  buyNow(book: Book): void {
    // Add the selected book to the cart
    this.addToCart(book); // Redirect the user to the checkout page
    this.router.navigateByUrl("/checkout");
  }

  removeFromCart(book: Book): void {
    book.inCart -= 1;
    this.cartService.removeFromCart(book);
    this.cart = this.cartService.getCart(); // Update the cart data after removal
  }

  increaseQuantity(book: Book) {
    this.addBookToCart(book);
  }
}
