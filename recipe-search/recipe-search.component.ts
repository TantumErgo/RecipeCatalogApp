import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { RecipeItem } from '../recipe-item';
import { RecipeService } from '../recipes/recipe.service';

@Component({
  selector: 'app-recipe-search',
  templateUrl: './recipe-search.component.html',
  styleUrls: ['./recipe-search.component.css']
})
export class RecipeSearchComponent implements OnInit {
  recipes$: Observable<RecipeItem[]>;
  private searchTerms = new Subject<string>();
  index: number;

  constructor(private recipeService: RecipeService) { }

  //Push a search term into the observable stream
  Search(searchTerm: string): void {
    this.searchTerms.next(searchTerm);
  }

  ngOnInit(): void {
    this.recipes$ = this.searchTerms.pipe(
      //wait 300ms after each keystroke before considering the term
      debounceTime(300),

      //ignore new term if same as previous term
      distinctUntilChanged(),

      //switch to new search observable each time the term changes
      switchMap((searchTerm: string) => this.recipeService.SearchRecipes(searchTerm)),
    );
  }

}
//TODO:
//Put search funtionality on Home Page and Recipe List page only
//Can't finish coding this until both the above components are finished being coded