import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {getBooksIds} from '../../../../core/stores/books/books.selectors';

@Component({
  selector: 'app-list-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent {
  ids$: Observable<string[]> = this.store.select(getBooksIds);
  constructor(private store: Store) {}
}
