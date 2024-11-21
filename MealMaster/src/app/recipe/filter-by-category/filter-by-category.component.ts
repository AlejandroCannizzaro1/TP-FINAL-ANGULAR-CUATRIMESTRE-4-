import { Category } from '../../interfaces/category';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { Recipe } from '../../interfaces/recipe.interface';
import { FilterByCategoryService } from '../../services/filter-by-category.service';
import { RecipeService } from '../../services/recipe-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { UserTryService } from '../../services/user-try.service';

@Component({
  selector: 'app-filter-by-category',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-by-category.component.html',
  styleUrls: ['./filter-by-category.component.css']
})
export class FilterByCategoryComponent {

  categoryList: Category[] = [];
  recipeFromCategoryList: Recipe[] = [];
  recipe: Recipe | null = null;

  selectedCategory:string ="";
  selectedIdFromRecipe: string ="";

  constructor(private filterByCategoryService: FilterByCategoryService,
    private router: Router,
    private userService: UserService,
  private recipeService: RecipeService){}

  ngOnInit() {
    // Cargar todas las categorias al renderizar la plantilla
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.filterByCategoryService.getAllCategorys().subscribe((data: Category[]) =>{
      console.log("Categories received:", data);
      this.categoryList = data;
    })
  }



getRecipeFromCategory(){
  this.filterByCategoryService.getRecipeFromCategory(this.selectedIdFromRecipe).subscribe((data: Recipe | null)=>{
    this.recipe = data;
  })

}

addRecipesToCategoryFromJsonAndApi(category: string){
 this.recipeService.getRecipesByCategory(category).subscribe(
  (data: Recipe[] | null) => {
    if(data){
      this.recipeFromCategoryList = data;

    // Llamamos a la segunda funcion para que concatene los datos de la API
    this.getRecipeFromCategory();
    }
  }
)
}

getRecipesFromCategory(){
  this.filterByCategoryService.getAllRecipesFromCategory(this.selectedCategory).subscribe((data: Recipe[]) =>{
    // Combinamos los datos del Json con la APi
    this.recipeFromCategoryList = [...this.recipeFromCategoryList, ...data]
  })
}

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
