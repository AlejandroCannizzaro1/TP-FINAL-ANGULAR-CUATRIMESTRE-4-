import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Favorite } from '../interfaces/favorite';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class MealService {
  private apiUrl = 'https://www.themealdb.com/api/json/v1/1/';


  private http = inject(HttpClient);

  getCategories(): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}categories.php`).pipe(
      map(response => {
        console.log('Categorías:', response); // Verifica la respuesta
        return response.categories;
      }),
      catchError(error => {
        console.error('Error al obtener categorías', error);
        return of([]);  // Devuelve un array vacío en caso de error
      })
    );
  }

  getFilteredRecipes(category: string): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}filter.php?c=${category}`).pipe(
      map(response => {
        console.log('Recetas filtradas:', response); // Verifica la respuesta
        return response.meals;
      }),
      catchError(error => {
        console.error('Error al obtener recetas filtradas', error);
        return of([]);  // Devuelve un array vacío en caso de error
      })
    );
  }

  getRecipeDetails(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}lookup.php?i=${id}`);
  }
}
