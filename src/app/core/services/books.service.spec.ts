import {TestBed} from '@angular/core/testing';

import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TEST_BOOK, TEST_BOOKS} from '../../utils/test/books.test.util';
import {APIURL} from '../../utils/tokens/api-url.token';
import {BooksService} from './books.service';

describe('BooksService', () => {
  let service: BooksService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{provide: APIURL, useValue: ''}],
    });
    service = TestBed.inject(BooksService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getBooks', () => {
    it('should return an Observable<IBooks[]>', () => {
      service.getBooks().subscribe(books => {
        expect(books.length).toBe(2);
        expect(books).toEqual(TEST_BOOKS);
      });

      const req = httpMock.expectOne(`${service['url']}/books`);
      expect(req.request.method).toBe('GET');
      req.flush(TEST_BOOKS);
    });
  });

  describe('addBook', () => {
    it('should return an Observable<IBook>', () => {
      const res = {id: 'test', ...TEST_BOOK};
      service.addBook(TEST_BOOK).subscribe(book => {
        expect(book).toEqual(res);
      });

      const req = httpMock.expectOne(`${service['url']}/books`);
      expect(req.request.method).toBe('POST');
      req.flush(res);
    });
  });
  afterEach(() => {
    httpMock.verify();
  });
});
