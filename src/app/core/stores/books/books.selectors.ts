import {EntityState} from '@ngrx/entity';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {IBook} from '../../../utils/types/book.types';
import {BOOKS_STORE_TOKEN} from './books.model';

const state = createFeatureSelector<EntityState<IBook>>(BOOKS_STORE_TOKEN);

export const getBooksIds = createSelector(state, ({ids}) => ids as string[]);
export const getBookById = (id: string) => createSelector(state, ({entities}) => entities[id]);
