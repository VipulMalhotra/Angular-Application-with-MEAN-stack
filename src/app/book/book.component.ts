import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {BookService} from '../book.service'
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BookComponent implements OnInit {

  book = {};
  books = [];
  constructor(private http: HttpClient, private router: Router, private bookService: BookService) { }

  ngOnInit() {
    this.bookService.getBooks().subscribe((books) => {
      console.log("books", books)
      if(books.length > 0) {
        this.books = books;
      } else {
        this.http.get('http://localhost:3000/book', this.book)
          .subscribe(res => {
            this.books = res['data'];
            this.bookService.saveBooks(this.books);
          }, (err) => {
            console.log(err);
          }
        );
      }
    });
  }

  saveBook(event) {
    console.log(event);
    //event.target.submit();
    
    this.http.post('http://localhost:3000/book', this.book)
      .subscribe(res => {
          let id = res['data']['_id'];
          this.bookService.addBook(res['data']);
          this.bookService.getBooks().subscribe((books) => {
            this.books = books;
          })
          console.log(id);
          this.router.navigate(['/book-details', id]);
        }, (err) => {
          console.log(err);
        }
      );
  }

}
