// import { Injectable, signal } from '@angular/core';

// @Injectable({ providedIn: 'root' })
// export class AuthService {
//   currentUser = signal<any>(null);
//   private user = signal<any>(null);
//   login(email: string) {
//     let role = '';
//     if (email === 'admin@test.com') {
//       role = 'admin';
//     } else if (email === 'user@test.com') {
//       role = 'user';
//     } 
//     if (role) {
//       const user = { email, role, token: 'mock-jwt-token' };
//       this.currentUser.set(user);
//       localStorage.setItem('token', user.token);
//       return true;
//     }
//     return false; 
//   }
//     getToken(): string | null {
//     return localStorage.getItem('token') || this.user()?.token;
//   }
//   getUserRole() {
//     return this.currentUser()?.role;
//   }

//   isLoggedIn() {
//     return !!this.currentUser();
//   }

//   logout() {
//     this.currentUser.set(null);
//     localStorage.removeItem('token');
//   }
// }

import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { LoginResponse, User } from '../Models/user-model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  router = inject(Router); 
  private apiUrl = environment.loginapiUrl;
  
  // Signal to store user state reactively
  // currentUser = signal<User | null>(null);
   currentUser = signal<{email: string, role: string} | null>(null);

  constructor() {
    const role = localStorage.getItem('role');
    const email = localStorage.getItem('email');
    if (role && email) {
      this.currentUser.set({ email, role });
    }
  }
 
  login(credentials: any) {
    debugger;
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.role);
        localStorage.setItem('email', res.email);
        this.currentUser.set({ email: res.email, role: res.role });
      })
    );
  }

    hasRole(role: string): boolean {
    return this.currentUser()?.role === role;
  }

  getToken() { return localStorage.getItem('token'); }
  getUserRole() { return this.currentUser()?.role || localStorage.getItem('role'); }
  isLoggedIn() { return !!localStorage.getItem('token'); }
  
    logout() {
    localStorage.clear();
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }
}
