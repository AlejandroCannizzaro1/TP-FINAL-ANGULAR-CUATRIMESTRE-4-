import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrl = 'http://localhost:3002/meals';

  constructor(private http: HttpClient) {}

  // Método para obtener recetas por usuario
  getRecipesByUser(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?userId=${userId}`);
  }

  // Método para crear una receta
  createRecipe(recipe: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, recipe);
  }

  // Método para actualizar una receta
  updateRecipe(recipeId: string, recipe: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${recipeId}`, recipe);
  }

  // Método para eliminar una receta
  deleteRecipe(recipeId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${recipeId}`);
  }

  // Método para obtener categorías
  getCategories(): Observable<any[]> {
    return this.http.get<any>('https://www.themealdb.com/api/json/v1/1/categories.php')
      .pipe(map(response => response.categories || []));
  }

  // Método para obtener todas las recetas
  getAllRecipes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl); // Devuelve todas las recetas sin filtrar
  }

  getRecipesByCategory(category :string): Observable<any | null> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((recipes)=> recipes.filter((r)=> r.strCategory === category)),
      catchError(error=> {
        console.error("Error fetching meals", error);
        return of([])
      })
    )
  }

  // Método para obtener detalles de una receta específica
  getRecipeDetails(recipeId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${recipeId}`);
  }

// Método para obtener receta específica por id
getRecipeById(id: string): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/${id}`);
}

// Método para obtener los detalles de una receta por idMeal
getRecipeDetailsByIdMeal(idMeal: string): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}?idMeal=${idMeal}`);
}

}
