import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType, OnInitEffects} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {catchError, EMPTY, exhaustMap, map, Observable} from 'rxjs';
import {v4 as uuidv4} from 'uuid';
import {IBook} from '../../../utils/types/book.types';
import {BooksService} from '../../services/books.service';
import {AddBook, CreateBook, GetBooks, SetBooks} from './books.actions';

@Injectable()
export class BooksEffects implements OnInitEffects {
  ngrxOnInitEffects() {
    return GetBooks();
  }
  constructor(private actions$: Actions, private booksService: BooksService) {}

  getBooks$ = createEffect(
    (): Observable<Action> =>
      this.actions$.pipe(
        ofType(GetBooks),
        exhaustMap(() =>
          this.booksService.getBooks().pipe(
            map((data: IBook[]) => SetBooks({data})),
            catchError(() => EMPTY)
          )
        )
      )
  );

  createBook$ = createEffect(
    (): Observable<Action> =>
      this.actions$.pipe(
        ofType(CreateBook),
        map(({data}) => ({
          ...data,
          id: uuidv4(),
          publicationDate: new Date(data.publicationDate).toISOString(),
        })),
        exhaustMap(book =>
          this.booksService.addBook(book).pipe(
            map(data => AddBook({data})),
            catchError(() => EMPTY)
          )
        )
      )
  );
}
