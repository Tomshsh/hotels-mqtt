import { Injectable } from '@angular/core';
import { AuthSessionStore } from '../../stores/auth-user-state-store';
import { UsersService } from '../../../services';
import { Credentials } from '@my-tray/api-interfaces';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthSessionService {
  constructor(private readonly authStore: AuthSessionStore,
              private readonly usersDataService: UsersService) {
  }

  logIn(credentials: Credentials) {
    return this.usersDataService.logIn(credentials)
      .pipe(
        tap(session => {
          this.authStore.logIn(session);
        })
      );
  }


  logOut() {
    this.usersDataService.logOut().then(() => {
      this.authStore.logOut();
    });
  }
}
