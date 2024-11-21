import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe-service.service';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-recipes-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-recipes-component.component.html',
  styleUrl: './user-recipes-component.component.css'
})
export class UserRecipesComponentComponent implements OnInit {
  recipes: any[] = [];

  constructor(
    private recipeService: RecipeService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const currentUserId = this.userService.getCurrentUserId();
    if (currentUserId) {
      this.recipeService.getRecipesByUser(currentUserId).subscribe(recipes => {
        this.recipes = recipes;
      });
    }
  }

  deleteRecipe(recipeId: string): void {
    this.recipeService.deleteRecipe(recipeId).subscribe(() => {
      this.recipes = this.recipes.filter(recipe => recipe.id !== recipeId);
    });
  }

  // Método para ver los detalles de la receta
  viewRecipeDetails(recipeId: string): void {
    this.router.navigate(['/plan-premium//recipe-details', recipeId]);
  }
}
