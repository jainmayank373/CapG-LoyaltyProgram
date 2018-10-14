import { TestBed, inject } from '@angular/core/testing';

import { Authentication.InterceptorService } from './authentication.interceptor.service';

describe('Authentication.InterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Authentication.InterceptorService]
    });
  });

  it('should be created', inject([Authentication.InterceptorService], (service: Authentication.InterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
