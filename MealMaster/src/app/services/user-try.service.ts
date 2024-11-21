import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserTryService {
  private apiUrl = 'http://localhost:3000/users';
  private currentUser: User | null = null;

  constructor(private http: HttpClient) {
    this.loadCurrentUser();
  }

  private loadCurrentUser(): void {
    this.getUserProfile('1').subscribe(user => {
      this.currentUser = user; // Establece el usuario actual
    });
  }

  getUserProfile(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`).pipe(
      tap(user => this.currentUser = user),
      catchError(this.handleError)
    );
  }

  isPremiumUser(): boolean {
    return this.currentUser?.userPlan === 'premium';
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Error en la solicitud:', error);
    return throwError('Hubo un problema con la solicitud. Inténtalo de nuevo más tarde.');
  }
}
