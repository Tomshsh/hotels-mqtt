import { Injectable } from '@angular/core';
import { Query, toBoolean } from '@datorama/akita';
import { AuthSessionState, AuthSessionStore } from '../../stores/auth-user-state-store';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthSessionQuery extends Query<AuthSessionState> {
  isLoggedIn$: Observable<boolean> =
    this.select((state: AuthSessionState) => toBoolean(state.token));

  constructor(protected readonly store: AuthSessionStore) {
    super(store);
  }

  isLoggedIn() {
    return toBoolean(this.getValue().token);
  }
}
