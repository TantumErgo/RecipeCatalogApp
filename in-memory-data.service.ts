import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        const recipes = [
            { id: 11, name: 'Steak'},
            { id: 12, name: 'Lobster'},
            { id: 13, name: 'Pumpkin Pie' },
            { id: 14, name: 'Chefs Salad' },
            { id: 15, name: 'Mashed Potatoes' },
            { id: 16, name: 'Cranberries' },
            { id: 17, name: 'Roasted Turkey' },
            { id: 18, name: 'Peas and Carrots' },
            { id: 19, name: 'Sweet Potatoes' },
            { id: 20, name: 'Thanksgiving Sandwich' }
        ];

        return {recipes};
    }
}