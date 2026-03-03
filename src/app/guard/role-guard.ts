import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const expectedRoles: string[] = route.data['roles'];
  const userRole = authService.getUserRole(); // returns string | null

  // 1. Check if user is logged in
  // 2. Check if userRole is NOT null
  // 3. Check if userRole is in expectedRoles array
  if (authService.isLoggedIn() && userRole && expectedRoles.includes(userRole)) {
    return true;
  }

  // Agar unauthorized hai toh user ko error page pe bhej do
  if (authService.isLoggedIn()) {
    return router.parseUrl('/unauthorized');
  }

  // Agar logged in hi nahi hai toh login pe bhej do
  return router.parseUrl('/login');
};
