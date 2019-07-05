import { Injectable } from '@angular/core';
import { RecipeService } from './recipes/recipe.service';
import { HttpClient } from '@angular/common/http';
import { RecipeItem } from './recipe-item';
//import 'rxjs/Rx';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  private recipesUrl = 'api/recipes';

  constructor(private httpClient: HttpClient,
              private recipeService: RecipeService) { }

  // StoreRecipes() {
  //   this.http.put(); //put overwrites old data in Firebase (may not in other backends)
  // }

  // StoreRecipes(recipeToUpdate: RecipeItem) {
  //   return this.httpClient.put(this.recipesUrl, recipeToUpdate, httpOptions).pipe(
  //     tap( _ => console.log(`Updated Recipe with ID = ${recipeToUpdate.id}`)),
  //     catchError(this.HandleError<any>('UpdateRecipe'))
  //   );
  // }

  StoreRecipesTest() {
    return this.httpClient.put(this.recipesUrl, this.recipeService.getRecipesNew());
  }

  FetchRecipesTest() {
    this.httpClient.get<RecipeItem[]>(this.recipesUrl)
      .pipe(map(
        (recipes) => {
          for (let recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe["ingredients"] = [];
            }
          }
          return recipes;
        }
      ))
      .subscribe(
        (recipes: RecipeItem[]) => {
          this.recipeService.SetRecipes(recipes);
        }
      );
  }

}


