import { Recipe } from '../interfaces/recipe';
import { Favorite } from '../interfaces/favorite';
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { UserService } from './user.service';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})

export class FavoriteService {
  private apiUrl = 'http://localhost:3002/favorites';  // URL del servidor donde están los favoritos


  private http = inject(HttpClient);
  private userService= inject (UserService);

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>('http://localhost:3000/categories');
  }

   // Obtener favoritos del usuario logueado
   getFavorites(): Observable<any[]> {
    const userId = this.userService.getCurrentUserId()?.toString();
    if (!userId) {
      throw new Error('No hay usuario logueado');
    }
    return this.http.get<any[]>(`${this.apiUrl}?userId=${userId}`);
  }

  removeFavorite(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  addFavorite(favorite: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, favorite);
  }


  getUserProfile(): Observable<User> {
    return this.userService.getUserProfile();
  }
}
