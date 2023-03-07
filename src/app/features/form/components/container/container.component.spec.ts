import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {Store} from '@ngrx/store';
import {CreateBook} from '../../../../core/stores/books/books.actions';
import {IBook} from '../../../../utils/types/book.types';

import {ContainerComponent} from './container.component';

describe('ContainerComponent', () => {
  let component: ContainerComponent;
  let fixture: ComponentFixture<ContainerComponent>;
  let router: Router;
  const store = {
    dispatch: jest.fn(),
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContainerComponent],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
      ],
      providers: [
        {
          provide: Store,
          useValue: store,
        },
        MatDatepickerModule,
        MatNativeDateModule,
        FormBuilder,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(ContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('form', () => {
    beforeEach(() => {
      component.ngOnInit();
      fixture.detectChanges();
    });
    it('should create a form', () => {
      expect(component.form).toBeDefined();
    });
    it('invalid when empty', () => {
      expect(component.form.valid).toBeFalsy();
    });
  });
  describe('submit', () => {
    let navigateSpy;
    beforeEach(() => {
      navigateSpy = jest.spyOn(router, 'navigate');
      component.ngOnInit();
      component.submit();
      fixture.detectChanges();
    });
    it('should dispatch', () => {
      expect(store.dispatch).toBeCalledWith(CreateBook({data: component.form.value as IBook}));
    });
    it('should navigate', () => {
      expect(navigateSpy).toBeCalledWith(['/']);
    });
  });
});
