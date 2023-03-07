import {createReducer, on} from '@ngrx/store';
import {AddBook, SetBooks} from './books.actions';
import {adapter, initialState} from './books.model';

export const BooksReducer = createReducer(
  initialState,
  on(SetBooks, (state, {data}) => {
    return adapter.setMany(data, state);
  }),
  on(AddBook, (state, {data}) => {
    return adapter.addOne(data, state);
  })
);
