import { Component, ViewChild } from '@angular/core';
import { CartService } from '../service/cart.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  
  cart: any[] = []; // Replace with your cart data structure
  name: string = '';
  email: string = '';
  phone: string = '';
  address: string = '';
  totalPrice: number = 0;
  message: string = '';
  showMessage: boolean = false;
  orderForm: FormGroup;
  @ViewChild('modalClose') modalClose: any;

  
  constructor(
    private cartService: CartService, 
    private router: Router,
    private formBuilder: FormBuilder) {
    // Initialize the cart from your cart service
    this.cart = this.cartService.getCart();
    this.orderForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required]
    });
  }
  
  ngOnInit(): void {
    this.calculateTotalPrice();
  }
  
  goBackToCart() {
    this.router.navigateByUrl('/cart');
  }

  placeOrder() {
    if (this.orderForm.valid) {
      this.cart = [];
      this.cartService.deleteAllFromCart();
      this.totalPrice = 0;
      this.showMessage = true;
      this.message = 'Thank you for shopping.';
    } else {
      this.showMessage = true;
      this.message = 'The form is not valid, check the values u entered.';
    }
    // After a few seconds, hide the message
    setTimeout(() => {
      this.showMessage = false;
      this.message = '';
      if (this.orderForm.valid) {
        this.modalClose.nativeElement.click();
        this.router.navigateByUrl("/home");
      }
    }, 1500);
  }

  calculateTotalPrice(): void {
    // Calculate the total price of items in the cart
    this.totalPrice = this.cart.reduce(
      (total, book) => total + book.price * book.quantity,
      0
    );
  }
}
