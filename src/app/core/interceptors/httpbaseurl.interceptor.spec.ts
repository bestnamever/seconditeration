import { TestBed } from '@angular/core/testing';

import { HttpbaseurlInterceptor } from './httpbaseurl.interceptor';

describe('HttpbaseurlInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpbaseurlInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpbaseurlInterceptor = TestBed.inject(HttpbaseurlInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
