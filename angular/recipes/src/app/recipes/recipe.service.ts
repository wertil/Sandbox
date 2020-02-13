import { EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';

export class RecipeService {

    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe('Test Recipe 1', 'Just a test', 'http://placekitten.com/200/300'),
        new Recipe('Test Recipe 2', 'Just a test', 'http://placekitten.com/300/300')
      ];

      getRecipes() {
          return this.recipes.slice(); // slice creates a copy of the array
      }
 
}