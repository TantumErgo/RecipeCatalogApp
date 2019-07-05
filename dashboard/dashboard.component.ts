import { Component, OnInit } from '@angular/core';
import { RecipeItem } from '../recipe-item';
import { RecipeService } from '../recipes/recipe.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashboardRecipes: RecipeItem[] = [];

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.GetDashboardRecipes();
  }

  GetDashboardRecipes(): void {
    this.recipeService.GetRecipes()
      .subscribe( (updatedRecipes) => this.dashboardRecipes = updatedRecipes.slice(1, 5));
  }

}
//TODO:
//Make this component into a Featured Recipes Display that shows the a random bunch of 4 or 5 featured recipes
// that are all rated 5 stars and/or favorited
//This component cannot be adequately coded until after the ratings and favorites system is coded