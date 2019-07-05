import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { RecipeItem } from '../../recipe-item';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false; //initially assume creating new recpie; not in edit mode
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe( (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null; //id will only be present in edit mode
        this.initForm();
      });
  }

  onSubmit() {
    // const newRecipe = new RecipeItem( //may cause bugs
    //   this.recipeForm.value['id'],
    //   this.recipeForm.value['name'], 
    //   this.recipeForm.value['category'],
    //   this.recipeForm.value['ingredients'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    // );
    if (this.editMode) {
      this.recipeService.UpdateRecipeNew(this.id, this.recipeForm.value);
    } else {
      this.recipeService.AddRecipeNew(this.recipeForm.value);
    }
    this.onCancel();
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
    })
  );
}

onDeleteIngredient(index: number) {
  (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
}

onCancel() {
  this.router.navigate(['../'], {relativeTo: this.route});
}

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = ';'
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.GetRecipeNew(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

}
