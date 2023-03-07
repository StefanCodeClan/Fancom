import {createAction, props} from '@ngrx/store';
import {IBook} from '../../../utils/types/book.types';
import {BOOKS_STORE_TOKEN} from './books.model';

export const GetBooks = createAction(`[${BOOKS_STORE_TOKEN}] Get Books`);
export const SetBooks = createAction(`[${BOOKS_STORE_TOKEN}] Set Books`, props<{data: IBook[]}>());
export const CreateBook = createAction(
  `[${BOOKS_STORE_TOKEN}] Create Book`,
  props<{data: IBook}>()
);
export const AddBook = createAction(`[${BOOKS_STORE_TOKEN}] Add Book`, props<{data: IBook}>());
