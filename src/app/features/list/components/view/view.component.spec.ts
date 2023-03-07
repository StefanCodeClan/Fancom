import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {BOOKS_TEST_STATE, TEST_BOOKS} from '../../../../utils/testing/books.test.util';

import {ViewComponent} from './view.component';

describe('ViewComponent', () => {
  let component: ViewComponent;
  let fixture: ComponentFixture<ViewComponent>;
  let store: MockStore;
  const initialState = {...BOOKS_TEST_STATE};

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewComponent],
      providers: [provideMockStore({initialState})],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    component.id = TEST_BOOKS[0].id;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should get an entity from the state', done => {
    component.book$.subscribe(({id}) => {
      expect(id).toEqual(TEST_BOOKS[0].id);
      done();
    });
  });
});
