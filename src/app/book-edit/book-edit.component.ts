import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {


    book = {};
  
    constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private bookService: BookService) { }
  
    ngOnInit() {
      this.getBook(this.route.snapshot.params['id']);
    }
  
    getBook(id) {
      this.book = this.bookService.getBookById(id);
      if(!this.book) {
        this.http.get('http://localhost:3000/book/'+id).subscribe(data => {
          this.book = data;
        });
      }
      
    }
  
    updateBook(id, data) {

      this.http.put('http://localhost:3000/book/'+id, this.book)
        .subscribe(res => {
          console.log(res)
            let id = res['data']['_id'];
            this.router.navigate(['/book-details', id]);
            
          }, (err) => {
            console.log(err);
          }
        );
    }
  
  
  }
