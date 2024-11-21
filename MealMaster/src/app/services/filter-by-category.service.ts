import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { Category } from '../interfaces/category';
import { Inject } from '@angular/core';
import { Recipe } from '../interfaces/recipe.interface';
import { RecipeService } from './recipes.service2';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FilterByCategoryService {

  // inyecta httpClient para solicitudes HTTP y
  // el servicio de las pibas, RecipeService
  constructor(private httpClient: HttpClient) {}

// URL base de categorias
  urlBaseCategory = "https://www.themealdb.com/api/json/v1/1/list.php?c=list";
  urlFilterCatergory = "https://www.themealdb.com/api/json/v1/1/filter.php?c=";
    urlRecipes = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";

  // Obtener todas las categorias de la API
  getAllCategorys(): Observable<Category[]> {
    return this.httpClient
    .get<{meals: Category[]}>(this.urlBaseCategory)
    .pipe(
      catchError((error)=> {
        console.log('Error: ', error);
        throw error;
      }),
      map(response => response.meals)
    );
  }
    /* getRecipes(): Observable<Recipe[]> {
    return this.http.get<{ meals: Recipe[] }>(this.apiUrl).pipe(
      map(response => response.meals || []) // Maneja el caso en que `meals` sea null
    );
  } */


  getAllRecipesFromCategory(categoryName: string | null): Observable<Recipe[]> {
    return this.httpClient
      .get<{ meals: Recipe[] }>(`${this.urlFilterCatergory}${categoryName}`)
      .pipe(
        catchError((error) => {
          console.log('Error', error);
          throw error;
        }),
        map(response => response.meals || []) // Extraemos el arreglo de recetas
      );
  }


// Filtra la receta elegida en la susodicha categoria

  getRecipeFromCategory(recipeId: string | null): Observable<Recipe | null> {
    return this.httpClient
    .get<{ meals: Recipe[]}>(`${this.urlRecipes}${recipeId}`)
    .pipe(
      catchError((error)=> {
        console.log('Error', error);
        throw error;
      }),
      map(response => response.meals? response.meals[0] : null ) // Maneja el caso en que `meals` sea null
    );
  }
}







