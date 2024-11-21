import { Component, inject, Input, OnInit } from '@angular/core';
import { Favorite } from '../../interfaces/favorite';
import { CommonModule } from '@angular/common';
import { MealService } from '../../services/meal.service';
import { FavoriteService } from '../../services/favorite.service';
import { FormsModule } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserTryService } from '../../services/user-try.service';


@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})

export class FavoritesComponent implements OnInit {
  favorites: any[] = [];
  filteredFavorites: any[] = [];
  categories: string[] = [];
  selectedCategory: string = '';

  constructor(
    private favoriteService: FavoriteService,
    private mealService: MealService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // Obtener el perfil del usuario y luego cargar los favoritos y las categorías
    this.favoriteService.getUserProfile().subscribe(user => {
      this.userService.getUserProfile().subscribe(() => {
        this.mealService.getCategories().subscribe(categories => {
          this.categories = categories.map(cat => cat.strCategory);
        });

        this.favoriteService.getFavorites().subscribe(favorites => {
          console.log("Favorites obtained:", favorites);
          this.favorites = favorites;
          this.filteredFavorites = favorites;
        });
      });
    });
  }

  // Filtrar favoritos basados en la categoría seleccionada
  filterFavorites(): void {
    console.log("Selected category:", this.selectedCategory);
    console.log("Favorites before filtering:", this.favorites);

    // Verifica si la categoría está vacía para mostrar todos los favoritos
    if (this.selectedCategory === '') {
      this.filteredFavorites = this.favorites;
    } else {
      this.filteredFavorites = this.favorites.filter(
        fav => fav.category === this.selectedCategory
      );
    }

    console.log("Filtered recipes:", this.filteredFavorites);
  }

  // Eliminar un favorito
  removeFavorite(idMeal: string): void {
    // Encontrar el id correspondiente
    const favorite = this.favorites.find(fav => fav.idMeal === idMeal);
    if (favorite) {
      this.favoriteService.removeFavorite(favorite.id).subscribe(() => {
        this.favorites = this.favorites.filter(fav => fav.idMeal !== idMeal);
        this.filterFavorites();
      });
    }
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

      this.router.navigate(['/plan-basico/recipe-details', id]);
    });
  }
}
