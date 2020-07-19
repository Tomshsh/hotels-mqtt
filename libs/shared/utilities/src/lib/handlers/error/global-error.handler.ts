import { ErrorHandler } from '@angular/core';
import { AuthSessionService } from '@my-tray/shared/client/auth';
import { ParseError } from '@my-tray/api-interfaces/entities';

export class GlobalErrorHandler implements ErrorHandler {
  constructor(private readonly authService: AuthSessionService) {
  }

  handleError(error: any): void {
    if (error.hasOwnProperty('message') && error.hasOwnProperty('code')) {
      console.error('There was an Parse error.', (error as ParseError).message,
        'Status code:', (error as ParseError).code);
      switch (error.code) {
        case 119:
        case 209:
        case 400:
        case 401:
        case 403:
          this.authService.logOut();
          location.reload();
          break;
      }
    } else {
      console.error(error);
    }
  }
}
