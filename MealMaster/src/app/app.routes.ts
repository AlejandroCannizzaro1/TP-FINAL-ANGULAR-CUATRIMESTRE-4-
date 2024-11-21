import { RouterModule, Routes } from '@angular/router';
import { NgModule, Component } from '@angular/core';
import { HomeComponent } from './page/home/home.component';
import { AuthComponent } from './auth/auth.component';
import { PlanBasicoComponent } from './page/plan-basico/plan-basico.component';
import { PlanPremiumComponent } from './page/plan-premium/plan-premium.component';
import { ProfileComponent } from './profile/profile.component';
import { RecipeListComponent } from './recipe/recipe-list/recipe-list.component';
import { PaginaPrincipalComponent } from './page/pagina-principal/pagina-principal.component';
import { PagPremiumPrincipalComponent } from './page/pag-premium-principal/pag-premium-principal.component';
import { PagBasicoPrincipalComponent } from './page/pag-basico-principal/pag-basico-principal.component';
import { RecipeDetailsComponent } from './components/recipe-details-component/recipe-details-component.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { FilterByCategoryComponent } from './recipe/filter-by-category/filter-by-category.component';
import { UserRecipesComponentComponent } from './components/user-recipes-component/user-recipes-component.component';
import { CreateRecipeComponentComponent } from './components/create-recipe-component/create-recipe-component.component';
import { RecipeFilterComponent } from './components/recipe-filter-component/recipe-filter/recipe-filter.component';
import { BenefitsComponent } from './benefits/benefits.component';
import { PaymentComponent } from './payment/payment.component';


export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: PaginaPrincipalComponent },
      { path: 'recipes', component: RecipeListComponent },
      { path: 'auth', component: AuthComponent },

    ]
  },
  {
    path: 'plan-basico',
    component: PlanBasicoComponent,
    children: [
      {path: '',component: PagBasicoPrincipalComponent},
      {path: 'home',component: PagBasicoPrincipalComponent},
      { path: 'profile', component: ProfileComponent },
      { path: 'Categories', component: FilterByCategoryComponent },
      { path: 'recipe-details/:id', component: RecipeDetailsComponent },
      { path: 'benefits', component: BenefitsComponent }, 
      { path: 'payment', component: PaymentComponent },
      { path: 'favorites', component: FavoritesComponent }

    ]
  },
  {
    path: 'plan-premium',
    component: PlanPremiumComponent,
    children: [
      { path: '', component: PagPremiumPrincipalComponent },
      { path: 'home', component: PagPremiumPrincipalComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'recipes', component: RecipeListComponent },
      { path: 'favorites', component: FavoritesComponent },
      { path: 'recipe-details/:id', component: RecipeDetailsComponent },
      {path: 'Categories', component: FilterByCategoryComponent },
      { path: 'create-recipe', component: CreateRecipeComponentComponent },
      { path: 'your-recipes', component: UserRecipesComponentComponent },
      {path: 'ingredientes', component:RecipeFilterComponent}
    ]
  },
  { path: '**', redirectTo: '' },
];

