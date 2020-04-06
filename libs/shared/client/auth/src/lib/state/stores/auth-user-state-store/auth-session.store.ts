import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { AuthSessionState, createInitialAuthSessionsState } from './auth-session.state';
import * as store from '../../../core/utils';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'auth-session' })
export class AuthSessionStore extends Store<AuthSessionState> {
  constructor() {
    super(createInitialAuthSessionsState());
  }

  logIn(session: AuthSessionState) {
    this.update(session);
    store.saveSession(session);
  }

  logOut() {
    store.clearSession();
    this.update(createInitialAuthSessionsState());
  }
}
