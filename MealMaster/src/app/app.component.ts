import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { routes } from './app.routes';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { RecipeDetailsComponent } from './components/recipe-details-component/recipe-details-component.component';
import { Router, NavigationEnd, RouterModule, RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterOutlet,
    RouterLink,
    FavoritesComponent,RecipeDetailsComponent, RouterOutlet, RouterModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showNavbar: boolean = true;

  constructor(private router: Router) {
    this.setNavbarVisibility(this.router.url);

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.setNavbarVisibility(event.urlAfterRedirects);
      }
    });
  }

  private setNavbarVisibility(url: string): void {
    // Muestra la barra de navegacion solo en rutas especificas
    this.showNavbar = !url.startsWith('/plan-basico') && !url.startsWith('/plan-premium');
  }
}



