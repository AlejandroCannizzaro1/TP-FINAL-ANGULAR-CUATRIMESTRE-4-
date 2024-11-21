// recipe.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Recipe} from '../interfaces/recipe.interface';

@Injectable({
  providedIn: 'root'
})

export class RecipeService2 {
  private apiUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

  constructor(private http: HttpClient) {}

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<{ meals: Recipe[] }>(this.apiUrl).pipe(
      map(response => response.meals || [])
    );
  }


}
