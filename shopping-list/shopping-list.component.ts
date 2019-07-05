import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private subscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.GetIngredients();
    this.subscription = this.shoppingListService.ingredientsChanged
      .subscribe( (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      );
  }

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

//TODO:
// - same ingredient name should have a running tally of amount when clicked from separate recipes
//    ex/ if two recipes call for apples, each time apples is clicked on each indiv recipe, the shopping list will not populate separate entries
        //but instead will add a running total to the amount. should be case insensitive
// - 