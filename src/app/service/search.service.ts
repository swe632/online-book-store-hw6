import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Book } from "../models/book.model";

@Injectable({
  providedIn: "root",
})
export class SearchService {
  private searchResultsSource = new BehaviorSubject<Book[]>([]);
  searchResults = this.searchResultsSource.asObservable();

  searchBooks(results: Book[]) {
    this.searchResultsSource.next(results);
  }
}
