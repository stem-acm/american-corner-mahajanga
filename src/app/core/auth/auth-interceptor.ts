import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Auth } from './auth';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const auth = inject(Auth);
  const router = inject(Router);
  const isApi = request.url.startsWith('/api/');
  const token = auth.token;
  const authenticated = isApi && !!token && request.url !== '/api/auth/login';
  return next(
    authenticated ? request.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : request,
  ).pipe(
    catchError((error: HttpErrorResponse) => {
      if (authenticated && error.status === 401) {
        auth.logout();
        void router.navigateByUrl('/auth');
      }
      return throwError(() => error);
    }),
  );
};
