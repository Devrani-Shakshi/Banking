import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject, Injector } from '@angular/core'; // Add Injector
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const injector = inject(Injector); // Inject the Injector instead
  const router = inject(Router);
  
  // Retrieve AuthService only when needed
  const authService = injector.get(AuthService); 
  const token = authService.getToken();

  let authReq = req;
  if (token) {
    authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        authService.logout();
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
