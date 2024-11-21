import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:3002/comments';  // URL del servidor de comentarios

  constructor(private http: HttpClient) {}

  // Obtener comentarios de una receta
  getCommentsByMeal(idMeal: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?idMeal=${idMeal}`);
  }

  // Agregar un comentario a una receta
  addComment(comment: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, comment);
  }

  getCommentsByRecipe(idMeal: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?idMeal=${idMeal}`);
  }

  deleteComment(commentId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${commentId}`);
  }

  // Actualizar un comentario
  updateComment(comment: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${comment.id}`, comment);
  }
}
