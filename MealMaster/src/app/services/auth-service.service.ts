import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { LoginCredentials } from '../interfaces/loginCredentials';
import { RegisterData } from '../interfaces/registerData';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  login(credentials: LoginCredentials): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}?email=${credentials.email}&password=${credentials.password}`).pipe(
      map((users) => {
        if (users.length > 0) {
          const user = users[0];
          localStorage.setItem('authUserId', user.id.toString()); // Guardamos el ID del usuario como cadena
          return { message: 'Login successful', user: user };
        } else {
          throw new Error('Invalid email or password');
        }
      }),
      catchError((error) => throwError(() => new Error(error.message || 'Login failed')))
    );
  }
  

  register(userData: RegisterData): Observable<any> {
    const userWithDefaultPlan = { ...userData, userPlan: 'basic' };

    // Primero verificamos si el email ya está registrado
    return this.http.get<User[]>(`${this.apiUrl}?email=${userWithDefaultPlan.email}`).pipe(
      switchMap((users) => {
        if (users.length > 0) {
          // Si el email ya existe, lanzamos un error
          return throwError(() => new Error('Email already registered'));
        } else {
          // Si el email no existe, procedemos a crear el nuevo usuario con el plan 'basic'
          return this.http.post<User>(this.apiUrl, userWithDefaultPlan).pipe(
            map((user) => {
              // Guardamos el ID del usuario y el plan en localStorage
              localStorage.setItem('authUserId', user.id.toString());
              localStorage.setItem('userPlan', user.userPlan);
              return { message: 'Registration successful', user };
            }),
            catchError((error) => throwError(() => new Error(error.message || 'Registration failed')))
          );
        }
      }),
      catchError((error) => throwError(() => new Error(error.message || 'Registration failed')))
    );
  }
  

  logout(): void {
    localStorage.removeItem('authUserId');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userPlan');
  }
  

}