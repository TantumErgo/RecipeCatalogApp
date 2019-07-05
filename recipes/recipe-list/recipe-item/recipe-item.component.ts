import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { RecipeItem } from '../../../recipe-item';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: RecipeItem; //need to get recipe data from outside
  //@Input allows us to bind to recipe data from outside this component
    //here, from the recipe-list component
  
  @Input() index: number;

  //@Output allows us to listen to the event from outside this component
  constructor() { }

  ngOnInit() {
  }

}
