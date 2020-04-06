import { Injectable, Injector } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest, HttpResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { AuthSessionQuery, AuthSessionService } from '@my-tray/shared/client/auth';
import { catchError, retry, tap } from 'rxjs/operators';

@Injectable()
export class HttpAuthErrorInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) {
    console.log('Interceptor constructor');
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        if (error.status !== 209) {
          // 401 handled in auth.interceptor
          alert(1)
        }
        return throwError(error);
      })
    );
  }
}
