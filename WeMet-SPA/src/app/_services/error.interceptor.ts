import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

// angular catches 400, 500 server errors from API
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            return throwError(error.statusText);
          }
          const applicationError = error.headers.get('Application-Error');
          if (applicationError) {
            return throwError(applicationError);
          }
          const serverError = error.error;
          let modalStateErrors = '';
          // for server errors, build array of msgs
          if (serverError.errors && typeof serverError.errors === 'object') {
            for (const key in serverError.errors) {
              // sq brkts = "object notation"
              if (serverError.errors[key]) {
                // build array of error msgs, \n for new line if multiple msgs.
                modalStateErrors += serverError.error[key] + '\n';
              }
            }
          }
          // return modal state & server errors (or 'Unknown Server Error' that should be investigated).
          return throwError(modalStateErrors || serverError || 'Unknown Server Error');
        }
      })
    );
  }
}
// ""multi" because class can provide multiple HTTP_INTERCEPTORS error interceptors
export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
};
