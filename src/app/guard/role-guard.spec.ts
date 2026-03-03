// import { TestBed } from '@angular/core/testing';
// import { CanActivateFn } from '@angular/router';

// import { roleGuard } from './role-guard';

// describe('roleGuard', () => {
//   const executeGuard: CanActivateFn = (...guardParameters) => 
//       TestBed.runInInjectionContext(() => roleGuard(...guardParameters));

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//   });

//   it('should be created', () => {
//     expect(executeGuard).toBeTruthy();
//   });
// });

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const expectedRoles: string[] = route.data['roles'];
  const userRole = authService.getUserRole();

  if (authService.isLoggedIn() && userRole && expectedRoles.includes(userRole)) {
    return true;
  }

  return router.parseUrl('/login');
};
