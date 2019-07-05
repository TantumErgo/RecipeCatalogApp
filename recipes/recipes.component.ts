import { Component, OnInit } from '@angular/core';
import { RecipeItem } from '../recipe-item';
import { RecipeService } from '../recipes/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {
  recipes: RecipeItem[];

  //selectedRecipe: RecipeItem;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.GetRecipesFromService();

    
  }

  // OnSelect(clickedRecipe: RecipeItem): void {
  //   this.selectedRecipe = clickedRecipe;
  // }

  GetRecipesFromService(): void {
    this.recipeService.GetRecipes()
      .subscribe( (updatedRecipes) => this.recipes = updatedRecipes)
  }

  Add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.recipeService.AddRecipe({ name } as RecipeItem)
      .subscribe( recipe => {
        this.recipes.push(recipe);
      });
  }

  Delete(recipe: RecipeItem): void {
    this.recipes = this.recipes.filter(r => r !== recipe);
    this.recipeService.DeleteRecipe(recipe).subscribe();
  }

}

//TODO: is this used?