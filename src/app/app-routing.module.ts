import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BookComponent} from './book/book.component'
import { BookDetailsComponent } from './book-details/book-details.component'
import { BookEditComponent } from './book-edit/book-edit.component'
const routes: Routes = [{
  path: 'books',
  component: BookComponent,
  data: { title: 'Book List' }
},
{
  path: 'book-details/:id',
  component: BookDetailsComponent,
  data: { title: 'Book Details' }
},
{
  path: 'book-edit/:id',
  component: BookEditComponent,
  data: { title: 'Edit Book' }
},
{ path: '',
  redirectTo: '/books',
  pathMatch: 'full'
}];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
