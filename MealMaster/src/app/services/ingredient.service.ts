import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  private apiUrl = 'www.themealdb.com/api/json/v1/1/list.php?i=list';

  constructor(private http: HttpClient) {}

  getIngredients(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl);
  }
}

