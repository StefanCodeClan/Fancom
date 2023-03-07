import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {IBook} from '../../../utils/types/book.types';

export const BOOKS_STORE_TOKEN = 'Books';

export const adapter: EntityAdapter<IBook> = createEntityAdapter<IBook>();
export const initialState: EntityState<IBook> = adapter.getInitialState();
