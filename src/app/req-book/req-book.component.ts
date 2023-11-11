import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-req-book',
  templateUrl: './req-book.component.html',
  styleUrls: ['./req-book.component.css'],
})
export class ReqBookComponent {
  constructor() { }
  reqBook = new FormGroup({
    emailid: new FormControl('', [Validators.required, Validators.email]),
    bookname: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z].*")]),
    bookedition: new FormControl('', [Validators.required, Validators.maxLength(2)]),
  });

  message: boolean = false;
  saveBook(value: any): void {
    console.log(value);
    this.message = true;
    this.reqBook.reset({});
  }
  removeMessage() {
    this.message = false;
  }
  get emailid() {
    return this.reqBook.get('emailid');
  }
  get bookname() {
    return this.reqBook.get('bookname');
  }
  get author() {
    return this.reqBook.get('author');
  }
  get bookedition() {
    return this.reqBook.get('bookedition');
  }
}
