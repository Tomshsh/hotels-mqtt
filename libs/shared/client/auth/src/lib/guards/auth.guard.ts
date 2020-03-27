import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AuthSessionQuery } from '../state/queries/auth-user-state-query';
import { AuthSessionService } from '../state/services/auth-user-state-service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private readonly router: Router,
              private readonly authSessionQuery: AuthSessionQuery,
              private readonly authService: AuthSessionService) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authUser(state);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authUser(state);
  }


  private authUser(state: RouterStateSnapshot) {
    return this.authSessionQuery.isLoggedIn$.pipe(
      take(1),
      switchMap((isLoggedIn: boolean) => {
        if (!isLoggedIn) {
          this.authService.logOut();
          this.router.navigate(['auth/login'], { queryParams: { returnUrl: state.url } });
        }
        return of(isLoggedIn);
      })
    );
  }
}
