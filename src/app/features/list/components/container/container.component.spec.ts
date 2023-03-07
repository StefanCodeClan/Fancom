import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {MockComponent} from 'ng-mocks';
import {BOOKS_TEST_STATE, TEST_BOOKS} from '../../../../utils/testing/books.test.util';
import {ViewComponent} from '../view/view.component';
import {ContainerComponent} from './container.component';

fdescribe('ContainerComponent', () => {
  let component: ContainerComponent;
  let fixture: ComponentFixture<ContainerComponent>;
  let store: MockStore;
  const initialState = {...BOOKS_TEST_STATE};

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContainerComponent, MockComponent(ViewComponent)],
      providers: [provideMockStore({initialState})],
    }).compileComponents();

    fixture = TestBed.createComponent(ContainerComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should select ids from store', done => {
    component.ids$.subscribe(ids => {
      expect(ids).toEqual(TEST_BOOKS.map(({id}) => id));
      done();
    });
  });
});
