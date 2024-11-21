import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MealService } from '../../services/meal.service';
import { CommonModule } from '@angular/common';
import { FavoriteService } from '../../services/favorite.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommentService } from '../../services/comment-service.service';
import { UserService } from '../../services/user.service';
import { CommentComponent } from '../comment/comment.component';
import { RecipeService } from '../../services/recipe-service.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-recipe-details-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,CommentComponent],
  templateUrl: './recipe-details-component.component.html',
  styleUrl: './recipe-details-component.component.css'
})

export class RecipeDetailsComponent implements OnInit {
  recipeId: string = '';
  recipeDetails: any = {};
  isFavorite: boolean = false;
  comments: any[] = [];
  commentForm: FormGroup;
  userId: number = 0;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mealService: MealService,
    private favoriteService: FavoriteService,
    private commentService: CommentService,
    private fb: FormBuilder,
    private userService: UserService,
    private recipeService: RecipeService,
  ) {
    // Inicializar commentForm en el constructor
    this.commentForm = this.fb.group({
      comment: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  ngOnInit(): void {
    // Obtener el userId del usuario actual
    this.userId = this.userService.getCurrentUserId() || 0;
    // Obtener el ID de la receta de los parámetros de la ruta
    this.recipeId = this.route.snapshot.paramMap.get('id') || '';
    // Llamar al servicio para obtener los detalles de la receta
    this.getRecipeDetails(this.recipeId);
    this.getComments(this.recipeId);
  }

  getRecipeDetails(id: string): void {
    forkJoin([
      this.recipeService.getRecipesByUser(this.userId), // Obtener recetas del JSON Server
      this.mealService.getRecipeDetails(id) // Obtener receta de la API externa
    ]).subscribe(([localRecipes, apiRecipe]) => {
      // Almacena las recetas locales en recipeDetails
      if (localRecipes && localRecipes.length > 0) {
        this.recipeDetails = localRecipes.find(recipe => recipe.idMeal === id) || {};  // Buscar receta específica en local
      }

      // Si hay resultados de la API, actualizamos recipeDetails con la receta de la API
      if (apiRecipe && apiRecipe.meals && apiRecipe.meals.length > 0) {
        this.recipeDetails = apiRecipe.meals[0];  // Tomar la receta de la API
      }

      this.checkIfFavorite();
    });
  }

  getIngredients(): string[] {
    if (this.recipeDetails.ingredients && Array.isArray(this.recipeDetails.ingredients)) {
      // Para las recetas del JSON local, devuelve el array de ingredientes formateado
      return this.recipeDetails.ingredients.map(
        (item: { ingredient: string; measure: string }) => `${item.ingredient} (${item.measure})`
      );
    } else {
      // Para recetas de la API externa, usa el formato original
      const ingredients = [];
      for (let i = 1; i <= 20; i++) {
        const ingredient = this.recipeDetails[`strIngredient${i}`];
        const measure = this.recipeDetails[`strMeasure${i}`];
        if (ingredient) {
          ingredients.push(`${ingredient} (${measure})`);
        }
      }
      return ingredients;
    }
  }

  goBack(): void {
    this.router.navigate(['/favorites']); // Redirige a la ruta de favoritos
  }

   // Verificar si la receta está en favoritos
  checkIfFavorite(): void {
    this.favoriteService.getFavorites().subscribe(favorites => {
      this.isFavorite = favorites.some(fav => fav.idMeal === this.recipeDetails.idMeal);
    });
  }

  // Agregar receta a favoritos
  addToFavorites(): void {
    const favorite = {
      userId: this.userId,
      idMeal: this.recipeDetails.idMeal,
      strMeal: this.recipeDetails.strMeal,
      strMealThumb: this.recipeDetails.strMealThumb,
      category: this.recipeDetails.strCategory,
      id: this.generateId()  // Generar un ID único para el favorito
    };

    this.favoriteService.addFavorite(favorite).subscribe(() => {
      this.isFavorite = true;  // Marcar como favorito
      alert('Recipe added to favorites');
    });
  }

  // Método para generar un ID único (simple ejemplo)
  generateId(): string {
    return Math.random().toString(36).substr(2, 9);  // Genera un ID aleatorio
  }


  // Agregar un comentario
  addComment(): void {
    if (this.commentForm.invalid) {
      return;
    }

    const newComment = {
      userId: this.userId,
      idMeal: this.recipeDetails.idMeal,
      comment: this.commentForm.value.comment,
      date: new Date().toISOString()  // Fecha y hora actuales
    };

    this.commentService.addComment(newComment).subscribe(comment => {
      this.comments.push(comment);  // Agregar el comentario a la lista de comentarios
      this.commentForm.reset();  // Limpiar el formulario
    });
  }

  // Obtener comentarios para la receta
  getComments(id: string): void {
    this.commentService.getCommentsByRecipe(id).subscribe(comments => {
      this.comments = comments;
    });
  }
}
