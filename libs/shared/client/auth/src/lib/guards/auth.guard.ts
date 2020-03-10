import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AuthSessionQuery } from '../state/queries/auth-user-state-query';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private readonly router: Router, private readonly authSessionQuery: AuthSessionQuery) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot):
    Observable<boolean | UrlTree> |
    Promise<boolean | UrlTree> |
    boolean |
    UrlTree {
    return this.authSessionQuery.isLoggedIn$.pipe(
      take(1),
      switchMap((isLoggedIn: boolean) => {
        if (!isLoggedIn) {
          this.router.navigate(['auth/login'], { queryParams: { returnUrl: state.url } });
        }
        return of(isLoggedIn);
      })
    );
  }
}
