import { TestBed } from '@angular/core/testing';

import { HttpInProgressInterceptor } from './http-in-progress.interceptor';

describe('HttpInProgressInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpInProgressInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpInProgressInterceptor = TestBed.inject(HttpInProgressInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
