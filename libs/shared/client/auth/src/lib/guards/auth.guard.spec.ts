import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  const routerMock = { navigate: jasmine.createSpy('navigate') };

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [AuthGuard, { provide: Router, useValue: routerMock }],
      imports: [HttpClientTestingModule]
    });

    guard = TestBed.inject(AuthGuard);
  });

  describe('canActivate()', () => {
    it('should be defined', () => {
      expect(guard).toBeDefined();
    });
  });
});
//https://keepgrowing.in/angular/how-to-test-angular-authguard-examples-for-the-canactivate-interface/
//https://atom-morgan.github.io/how-to-test-angular-canactivate-guards/
