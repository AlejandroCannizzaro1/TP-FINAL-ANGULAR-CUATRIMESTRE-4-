import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe-service.service';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-recipe-component',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './create-recipe-component.component.html',
  styleUrl: './create-recipe-component.component.css'
})
export class CreateRecipeComponentComponent implements OnInit {
  categories: any[] = [];
  recipe = {
    idMeal: '',
    strMeal: '',
    strCategory: '',
    strArea: '',
    strInstructions: '',
    ingredients: [] as { ingredient: string, measure: string }[],
    userId: null as number | null
  };

  areas = [
    'American', 'British', 'Canadian', 'Chinese', 'Croatian', 'Dutch', 'Egyptian',
    'Filipino', 'French', 'Greek', 'Indian', 'Irish', 'Italian', 'Jamaican', 'Japanese',
    'Kenyan', 'Malaysian', 'Mexican', 'Moroccan', 'Polish', 'Portuguese', 'Russian',
    'Spanish', 'Thai', 'Tunisian', 'Turkish', 'Ukrainian', 'Unknown', 'Vietnamese'
  ];

  constructor(
    private recipeService: RecipeService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.recipeService.getCategories().subscribe(categories => {
      this.categories = categories;
    });

    const currentUserId = this.userService.getCurrentUserId();
    if (currentUserId) {
      this.recipe.userId = currentUserId;
    }
  }

  addIngredient() {
    this.recipe.ingredients.push({ ingredient: '', measure: '' });
  }

  removeIngredient(index: number) {
    this.recipe.ingredients.splice(index, 1);
  }

  saveRecipe(): void {
    if (!this.recipe.idMeal) {
      this.recipe.idMeal = this.generateId();
    }
    console.log('Saving recipe:', this.recipe); // Verifica los datos antes de enviarlos
    this.recipeService.createRecipe(this.recipe).subscribe({
      next: () => {
        alert('Recipe saved successfully!');
      },
      error: (err) => {
        console.error('Error saving recipe:', err); // Verifica si hay algún error
      }
    });
  }

  generateId(): string {
    return Math.floor(100000000 + Math.random() * 900000000).toString(); // Genera un número de 9 dígitos
  }
}
