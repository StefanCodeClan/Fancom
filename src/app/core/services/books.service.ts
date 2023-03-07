import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {APIURL} from '../../utils/tokens/api-url.token';
import {IBook} from '../../utils/types/book.types';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(@Inject(APIURL) private url: string, private http: HttpClient) {}

  getBooks(): Observable<IBook[]> {
    return this.http.get<IBook[]>(`${this.url}/books`, {responseType: 'json'});
  }

  addBook(book: Partial<IBook>): Observable<IBook> {
    return this.http.post<IBook>(`${this.url}/books`, book);
  }
}
