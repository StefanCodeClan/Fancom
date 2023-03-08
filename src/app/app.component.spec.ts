import {TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should navigate to /add', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const href = fixture.debugElement.query(By.css('a.add')).nativeElement.getAttribute('href');
    expect(href).toEqual('/add');
  });
});
