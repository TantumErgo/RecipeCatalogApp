import { Ingredient } from "./ingredient.model";

export class RecipeItem {
    id: number; //use this for sorting, inventory, searching, and indexing
    name: string;
    category: string; //type of food item
    ingredients: Ingredient[];
    description: string;
    imagePath: string; //optional image
//TODO: need instructions? parameter?
    constructor(id: number, name: string, category: string, ingredients: Ingredient[], description: string, imagePath?: string) {
        this.id = id;
        this.name = name;
        this. category = category;
        this.ingredients = ingredients;
        this.description = description;
        this.imagePath = imagePath;
    }
}