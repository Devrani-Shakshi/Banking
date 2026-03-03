
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Users } from '../Models/UsersModel';

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseUrl = `${environment.loginapiUrl}`;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<Users[]> {
    debugger;
    return this.http.get<Users[]>(this.baseUrl);
  }

  getUser(id: number): Observable<Users> {
    return this.http.get<Users>(`${this.baseUrl}/${id}`);
  }

  createUser(user: Users): Observable<Users> {
    return this.http.post<Users>(this.baseUrl, user);
  }

  updateUser(id: number, user: Users): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
