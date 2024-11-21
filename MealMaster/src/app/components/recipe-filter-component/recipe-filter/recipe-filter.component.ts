import { RecipeFilterService } from '../../../services/recipe-filter.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Recipe } from '../../../interfaces/recipe.interface';
import { UserService } from '../../../services/user.service';
import { UserTryService } from '../../../services/user-try.service';

@Component({
  selector: 'app-recipe-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recipe-filter.component.html',
  styleUrls: ['./recipe-filter.component.css']
})
export class RecipeFilterComponent {
  ingredients: string = '';
  recipes: Recipe[] = [];
  errorMessage: string = '';

  constructor(private RecipeFilterService: RecipeFilterService, private router: Router,private userService: UserService) {}

  searchRecipes(): void {
    if (!this.ingredients.trim()) {
      this.errorMessage = 'Please enter an ingredient.';
      return;
    }

    this.errorMessage = ''; // Limpiar el mensaje de error

    // Usamos el servicio para obtener recetas por ingrediente
    this.RecipeFilterService.getRecipesByIngredient(this.ingredients.trim()).subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
        if (this.recipes.length === 0) {
          this.errorMessage = 'No recipes were found with that ingredient.';
        }
      },
      (error: any) => {
        console.error('Error al buscar recetas:', error);
        this.errorMessage = 'There was an error searching for recipes. Please try again.';
      }
    );
  }

  getAllRecipes(): void {
    this.RecipeFilterService.getAllRecipes().subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
        if (this.recipes.length === 0) {
          this.errorMessage = 'No recipes found.';
        }
      },
      (error: any) => {
        console.error('Error getting all recipes:', error);
        this.errorMessage = 'There was an error fetching all recipes.';
      }
    );
  }

  // Navegar a la página de detalles de la receta
  viewRecipeDetails(id: string): void {
    // Verifica si el usuario ya está cargado
    this.userService.getUserProfile().subscribe(user => {
      // Verifica el plan del usuario y navega según corresponda
      if (user.userPlan === 'premium') {
        this.router.navigate(['/plan-premium/recipe-details', id]); // Ruta para usuarios premium
      } else {
        this.router.navigate(['/plan-basico/recipe-details', id]); // Ruta para usuarios básicos
      }
    }, error => {
      console.error('Error getting user profile:', error);
      // Si hay un error al cargar el perfil, puedes redirigir a una ruta predeterminada
      this.router.navigate(['/plan-basico/recipe-details', id]);
    });
  }
}
