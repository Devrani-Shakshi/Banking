// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-login-component',
//   imports: [],
//   templateUrl: './login-component.html',
//   styleUrl: './login-component.css',
// })
// export class LoginComponent {

// }


import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth';

@Component({
    selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
// export class LoginComponent {
//   email = '';
//   error = '';
//   private auth = inject(AuthService);
//   private router = inject(Router);

//   handleLogin() {
//     const success = this.auth.login(this.email);
//     if (success) {
//       const role = this.auth.getUserRole();
//       if (role === 'admin') this.router.navigate(['/admin-panel']);
//       else this.router.navigate(['/dashboard']);
//     } else {
//       this.error = 'Invalid User! Use admin@test.com or user@test.com';
//     }
//   }
// }

export class LoginComponent {
  loginData = { email: '', password: '' };
  private authService = inject(AuthService);
  private router = inject(Router);

//   onLogin() {
//     debugger;
//     this.authService.login(this.loginData).subscribe({
//       next: (res) => {
//         debugger ;
//         if (res.role === 'admin') this.router.navigate(['/admin-panel']);
//         else this.router.navigate(['/dashboard']);
//       },
//       error: (err) => alert('Login Failed: ' + err.error.message)
//     });
//   }
// }

onLogin() {
  this.authService.login(this.loginData).subscribe({
    next: (res) => {
      // Role based smart redirect
      if (res.role === 'admin') {
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/dashboard']);
      }
    },
    error: (err) => {
      const msg = err?.error?.message || 'Invalid Credentials';
      alert(msg);
    }
  });
}

}
