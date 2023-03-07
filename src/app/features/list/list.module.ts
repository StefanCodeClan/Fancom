import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {RouterModule} from '@angular/router';
import {StoreModule} from '@ngrx/store';
import {ContainerComponent} from './components/container/container.component';
import {ViewComponent} from './components/view/view.component';

@NgModule({
  declarations: [ContainerComponent, ViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ContainerComponent,
      },
    ]),
    StoreModule,
    MatCardModule,
  ],
})
export class ListModule {}
