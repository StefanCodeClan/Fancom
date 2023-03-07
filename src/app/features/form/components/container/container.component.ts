import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {CreateBook} from '../../../../core/stores/books/books.actions';
import {IBook} from '../../../../utils/types/book.types';

@Component({
  selector: 'app-form-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder, private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: this.fb.control(String, Validators.required),
      author: this.fb.control(String, Validators.required),
      publicationDate: this.fb.control(Date, Validators.required),
      description: this.fb.control(String, Validators.required),
      image: this.fb.control(String),
    });
  }

  submit(): void {
    const data: IBook = this.form.value;
    this.store.dispatch(CreateBook({data}));
    this.router.navigate(['/']);
  }

  readUrl({files}: HTMLInputElement): void {
    const file: File = files![0];
    const reader: FileReader = new FileReader();
    reader.onload = () => {
      const control: AbstractControl<string> = this.form.get('image')!;
      control.patchValue(reader.result as string);
    };
    !!file ? reader.readAsDataURL(file) : null;
  }
}
