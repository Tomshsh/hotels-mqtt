import { ErrorHandler } from '@angular/core';
import { AuthSessionQuery, AuthSessionService } from '@my-tray/shared/client/auth';

export class GlobalErrorHandler implements ErrorHandler {
  constructor(private readonly authService: AuthSessionService,
              private readonly authQuery: AuthSessionQuery) {
  }

  handleError(error: any): void {
    console.error(error);
    if (error.code === 209 || error >= 400) {
      this.authService.logOut();
      location.href = 'auth/logout';
    }
  }
}
