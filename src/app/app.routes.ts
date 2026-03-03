// import { Routes } from '@angular/router';
// import { roleGuard } from './guard/role-guard';
// import { UserComponent } from './Components/user-component/user-component';
// import { AdminComponent } from './Components/admin-component/admin-component';
// import { UnauthorizedComponent } from './Components/unauthorized-component/unauthorized-component';
// import { LoginComponent } from './Components/login-component/login-component';

// export const routes: Routes = [
//   { path: 'login', component: LoginComponent },
//  { 
//     path: 'admin-panel', 
//     component: AdminComponent, 
//     canActivate: [roleGuard], 
//     data: { roles: ['admin'] } 
//   },
//   { 
//     path: 'dashboard', 
//     component: UserComponent, 
//     canActivate: [roleGuard], 
//     data: { roles: ['admin', 'user'] } 
//   },
//   { path: 'unauthorized', component: UnauthorizedComponent },
//   { path: '', redirectTo: 'login', pathMatch: 'full' }
// ];

import { Routes } from '@angular/router';
import { roleGuard } from './guard/role-guard';
import { UserComponent } from './Components/user-component/user-component';
import { AdminComponent } from './Components/admin-component/admin-component';
import { UnauthorizedComponent } from './Components/unauthorized-component/unauthorized-component';
import { LoginComponent } from './Components/login-component/login-component';
import { Dashboard } from './Components/dashboard/dashboard';
import { TransactionComponents } from './Components/transaction-components/transaction-components';

export const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  

  { path: 'login', component: LoginComponent },


  { 
    path: 'admin-panel', 
    component: AdminComponent, 
    canActivate: [roleGuard], 
    data: { roles: ['admin'] } 
  },

    { 
    path: 'user-panel', 
    component: UserComponent, 
    canActivate: [roleGuard], 
    data: { roles: ['user'] } 
  },

   { 
    path: 'Transaction', 
    component: TransactionComponents, 
    canActivate: [roleGuard], 
    data: { roles: ['user'] } 
  },

   { 
    path: 'Loan', 
    component: UserComponent, 
    canActivate: [roleGuard], 
    data: { roles: ['user'] } 
  },
  
  
  { 
    path: 'dashboard', 
    component: Dashboard, 
    canActivate: [roleGuard], 
    data: { roles: ['admin', 'user'] } 
  },

  { path: 'unauthorized', component: UnauthorizedComponent },
  
  { path: '**', redirectTo: 'login' }
];
