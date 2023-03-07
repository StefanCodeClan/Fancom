import {EntityState} from '@ngrx/entity';
import {IBook} from 'utils/types/book.types';
import {BooksEffects} from './books/books.effects';
import {BOOKS_STORE_TOKEN} from './books/books.model';
import {BooksReducer} from './books/books.reducer';

export const CoreStates = {
  [BOOKS_STORE_TOKEN]: BooksReducer,
};

export interface CoreStatesModel {
  [BOOKS_STORE_TOKEN]: EntityState<IBook>;
}

export const CoreEffects = [BooksEffects];
