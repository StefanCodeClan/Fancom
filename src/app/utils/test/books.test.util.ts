import {BOOKS_STORE_TOKEN} from '../../core/stores/books/books.model';
import {IBook} from '../types/book.types';

export const TEST_BOOK: IBook = {
  id: '3',
  title: 'title 3',
  author: 'author 3',
  description: '',
  publicationDate: new Date().toISOString(),
  image: '',
};

export const TEST_BOOKS: IBook[] = [
  {
    id: '1',
    title: 'title 1',
    author: 'author 1',
    description: '',
    publicationDate: '',
    image: '',
  },
  {
    id: '2',
    title: 'title 2',
    author: 'author 2',
    description: '',
    publicationDate: '',
    image: '',
  },
];

export const BOOKS_TEST_STATE = {
  [BOOKS_STORE_TOKEN]: {
    ids: TEST_BOOKS.map(({id}) => id),
    entities: TEST_BOOKS.reduce((books, book) => ({[book.id]: book, ...books}), {}),
  },
};
