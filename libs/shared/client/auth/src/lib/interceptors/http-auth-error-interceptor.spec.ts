import { TestBed } from '@angular/core/testing';

import { HttpAuthErrorInterceptor } from './http-auth-error.interceptor';

describe('HttpAuthErrorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpAuthErrorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpAuthErrorInterceptor = TestBed.inject(HttpAuthErrorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
