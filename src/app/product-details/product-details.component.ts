import { Component } from '@angular/core';
import { ProductService } from '../service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../service/cart.service';
import { Book } from '../models/book.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  message: string = '';
  showMessage: boolean = false;

  product: Book = {
    id: 0,
    title: '',
    author: '',
    price: 0,
    image: '',
    quantity: 0,
    selected: false
  };

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.getProductById(productId).subscribe((product) => {
      this.product = product;
    });
  }
  addToCart(product: Book) {
    this.cartService.addToCart(product);
    this.showMessage = true;
    this.message = `${product.title} added to cart.`;
    this.router.navigateByUrl('/cart');
    // After a few seconds, hide the message
    setTimeout(() => {
      this.showMessage = false;
      this.message = '';
    }, 3000);
  }

  buyNow(book: Book): void { // Add the selected book to the cart 
    this.addToCart(book); // Redirect the user to the checkout page 
    this.router.navigateByUrl('/checkout'); }
}
