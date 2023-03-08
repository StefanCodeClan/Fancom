import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {EntityState} from '@ngrx/entity';
import {Action} from '@ngrx/store';
import {provideMockStore} from '@ngrx/store/testing';
import {Observable, of} from 'rxjs';
import {TEST_BOOK, TEST_BOOKS} from '../../../utils/test/books.test.util';
import {IBook} from '../../../utils/types/book.types';
import {BooksService} from '../../services/books.service';
import {AddBook, CreateBook, GetBooks, SetBooks} from './books.actions';
import {BooksEffects} from './books.effects';
import {adapter, initialState} from './books.model';
import {BooksReducer} from './books.reducer';
import {getBookById, getBooksIds} from './books.selectors';

describe('BooksStore', () => {
  let effects: BooksEffects;
  let actions$ = new Observable<Action>();
  const booksServiceSpy = {
    getBooks: jest.fn(),
    addBook: jest.fn(),
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        // any modules needed
      ],
      providers: [
        provideMockStore(),
        provideMockActions(() => actions$),
        {
          provide: BooksService,
          useValue: booksServiceSpy,
        },
        BooksEffects,
      ],
    });
  });

  describe('selectors', () => {
    let state: EntityState<IBook>;
    beforeEach(() => {
      state = adapter.setAll(TEST_BOOKS, adapter.getInitialState());
    });
    it('should list all books ids', () => {
      const result = getBooksIds.projector(state);
      expect(result.length).toEqual(TEST_BOOKS.length);
    });
    it('should get a single book entity', () => {
      const result = getBookById(TEST_BOOKS[0].id).projector(state);
      expect(result).toEqual(TEST_BOOKS[0]);
      expect(result).not.toEqual(TEST_BOOKS[1]);
    });
  });
  describe('reducer', () => {
    describe('Set All', () => {
      it('should retrieve all books and update the state', () => {
        const action = SetBooks({data: TEST_BOOKS});
        const state = BooksReducer(initialState, action);
        const result = Object.keys(state.entities);
        expect(result).toContain(TEST_BOOKS[0].id);
        expect(result).toContain(TEST_BOOKS[1].id);
        expect(state).not.toBe(initialState);
      });
    });
    describe('Add Book', () => {
      const book = {
        id: '3',
        title: 'title 3',
        author: 'author 3',
        description: '',
        publicationDate: '',
        image: '',
      };
      const action = AddBook({data: book});
      const state = BooksReducer(initialState, action);
      const result = Object.keys(state.entities);
      expect(result).toContain(book.id);
      expect(state).not.toBe(initialState);
    });
  });
  describe('effects', () => {
    beforeEach(() => {
      effects = TestBed.inject<BooksEffects>(BooksEffects);
    });
    describe(SetBooks.type, () => {
      beforeEach(() => {
        booksServiceSpy.getBooks.mockReturnValue(of(TEST_BOOKS));
      });
      it('should call the api on dispatch', done => {
        actions$ = of({type: GetBooks.type});
        effects.getBooks$.subscribe(action => {
          expect(action).toEqual({
            type: SetBooks.type,
            data: TEST_BOOKS,
          });
          done();
        });
      });
    });
    describe(CreateBook.type, () => {
      beforeEach(() => {
        booksServiceSpy.addBook.mockImplementation(() => of(TEST_BOOK));
      });
      it('should call add book in service', done => {
        actions$ = of(CreateBook({data: TEST_BOOK}));
        effects.createBook$.subscribe(action => {
          expect(action).toEqual({type: AddBook.type, data: TEST_BOOK});
          done();
        });
      });
    });
    afterEach(() => {
      jest.clearAllMocks();
    });
  });
});
