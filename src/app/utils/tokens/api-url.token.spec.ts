import {TestBed} from '@angular/core/testing';
import {APIURL} from './api-url.token';

describe('ApiUrl Token', () => {
  const VALUE = 'TEST';
  let token: string;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: APIURL,
          useValue: VALUE,
        },
      ],
    });
    token = TestBed.inject(APIURL);
  });
  it(`shoud has '${VALUE}' as value`, () => {
    expect(token).toBe(VALUE);
  });
});
