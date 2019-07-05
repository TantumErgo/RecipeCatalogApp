import { Injectable, EventEmitter } from '@angular/core';
import { RecipeItem } from '../recipe-item';
import { Observable, of, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Ingredient } from '../ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<RecipeItem[]>();

  private recipes: RecipeItem[] = [
    new RecipeItem(
      1, 
      'Tasty Schnitzel',
      'Breakfast', 
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ], 
    'This is a test', 
    'Here is where the image goes'),
    new RecipeItem(
      2,
      'Burger', 
      'Dinner', 
      [
        new Ingredient("Meat", 1),
        new Ingredient("Roll", 1)
      ], 
      'This is a test',
      'Here is where the image goes')
  ];

  private recipesUrl = 'api/recipes'; //URL to web api

  constructor(private httpClient: HttpClient, private shoppingListService: ShoppingListService) { }

  SetRecipes(recipes: RecipeItem[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  // GET recipes from the server; rename GetAllRecipes?
  GetRecipes(): Observable<RecipeItem[]> {
    return this.httpClient.get<RecipeItem[]>(this.recipesUrl)
      .pipe(
        tap( (recipes) => console.log('Fetched Recipes')),
        catchError(this.HandleError('GetRecipes', []))
      );
  }

  // GET recipe by id. Will 404 if id not found
  GetRecipe(id: number): Observable<RecipeItem> {
    const url = `${this.recipesUrl}/${id}`;
    return this.httpClient.get<RecipeItem>(url).pipe(
      tap( _ => console.log(`Fetched Recipe with ID = ${id}`)),
      catchError(this.HandleError<RecipeItem>(`GetRecipe with ID = ${id}`))
    );
  }

  // PUT: Update the recipe on the server
  UpdateRecipe(recipeToUpdate: RecipeItem): Observable<any> {
    return this.httpClient.put(this.recipesUrl, recipeToUpdate, httpOptions).pipe(
      tap( _ => console.log(`Updated Recipe with ID = ${recipeToUpdate.id}`)),
      catchError(this.HandleError<any>('UpdateRecipe'))
    );
  }
//TODO: update this function to not use of
//Note: actually....it appears this is replaced by GetRecipe above
  // FetchRecipe(id: number): Observable<RecipeItem> {
  //   return of(RECIPES.find( (foundRecipe) => foundRecipe.id === id ));
  // }

  //Handle HTTP operation that failed
  //Let the app continue
  //operation parameter is name of the operation that failed
  //result parameter is optional value to return as the observable result
  private HandleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      //Log error to console
      console.error(error);

      //Let the app keep running by returning an empty result
      return of(result as T);
    }
  }

  // POST: add a new recipe to the server
  AddRecipe(recipe: RecipeItem): Observable<RecipeItem> {
    return this.httpClient.post<RecipeItem>(this.recipesUrl, recipe, httpOptions).pipe(
      tap((recipe: RecipeItem) => console.log(`Added Recipe with ID = ${recipe.id}`)),
      catchError(this.HandleError<RecipeItem>('AddRecipe'))
    );
  }

  // DELETE: delete the recipe from the server
  DeleteRecipe(recipe: RecipeItem | number): Observable<RecipeItem> {
    const id = typeof recipe === 'number' ? recipe : recipe.id;
    const url = `${this.recipesUrl}/${id}`;

    return this.httpClient.delete<RecipeItem>(url, httpOptions).pipe(
      tap( _ => console.log(`Deleted Recipe with ID = ${id}`)),
      catchError(this.HandleError<RecipeItem>(`DeleteRecipe`))
    );
  }

  // GET recipes whose name contains search term
  SearchRecipes(searchTerm: string): Observable<RecipeItem[]> {
    if (!searchTerm.trim()) {
      //if not search term, return empty recipe array
      return of([]);
    }

    return this.httpClient.get<RecipeItem[]>(`${this.recipesUrl}/?name=${searchTerm}`).pipe( //TODO: does this work?
      tap( _ => console.log(`Found Recipes Matching "${searchTerm}"`)),
      catchError(this.HandleError<RecipeItem[]>('SearchRecipes', []))
    );
  }

  getRecipesNew() {
    return this.recipes.slice();
  }

  AddIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.AddIngredients(ingredients);
  }

  GetRecipeNew(index: number) {
    return this.recipes[index];
  }

  AddRecipeNew(recipe: RecipeItem) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  UpdateRecipeNew(index: number, newRecipe: RecipeItem) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  DeleteRecipeNew(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
