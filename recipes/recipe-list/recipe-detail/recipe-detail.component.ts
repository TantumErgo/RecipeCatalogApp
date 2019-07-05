import { Component, OnInit, Input } from '@angular/core';
import { RecipeItem } from 'src/app/recipe-item'; 
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/recipes/recipe.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipeToDisplay: RecipeItem; //This component simply receives a RecipeItem object through this property and displays it
  recipe: RecipeItem;
  id: number;
  ingredients: string[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private recipeService: RecipeService,
              private location: Location) { }

  ngOnInit() {
    this.GetRecipeForDetails();
    this.route.params
      .subscribe( (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeService.GetRecipeNew(this.id);
      })
  }

  GetRecipeForDetails(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.recipeService./*Fetch*/GetRecipe(id)
      .subscribe( (fetchedRecipe) => this.recipeToDisplay = fetchedRecipe);
  }

  GoBack(): void {
    this.location.back();
  }

  Save(): void {
    this.recipeService.UpdateRecipe(this.recipeToDisplay)
      .subscribe( () => this.GoBack());
  }

  OnAddToShoppingList() {
    this.recipeService.AddIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.recipeService.DeleteRecipeNew(this.id);
    this.router.navigate(['/recipes']);
  }

}
