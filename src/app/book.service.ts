import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class BookService {

  books = [];
  constructor() { }

  public getBooks(): Observable<any [] >{
    return of (this.books);
  }

  getBookById(id) {
    let index = this.books.findIndex((obj) => obj['_id'] == id)
    return this.books[index];
  }

  saveBooks(books) {
    this.books = books;
  }

  addBook(book) {
    this.books.push(book);
  }
}
