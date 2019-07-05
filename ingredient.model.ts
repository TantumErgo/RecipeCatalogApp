export class Ingredient {
    name: string;
    amount: number;

    constructor(public ingredientName: string, public ingredientAmount: number) {
        this.name = ingredientName;
        this.amount = ingredientAmount;
    }
}