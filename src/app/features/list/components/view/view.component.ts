import {Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {getBookById} from '../../../../core/stores/books/books.selectors';
import {IBook} from '../../../../utils/types/book.types';

@Component({
  selector: 'app-list-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {
  @Input() id: string;
  book$: Observable<IBook | undefined>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.book$ = this.store.select(getBookById(this.id));
  }
}
