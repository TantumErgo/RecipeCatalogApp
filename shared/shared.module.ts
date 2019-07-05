import { NgModule } from "@angular/core";
import { DropdownDirective } from "../dropdown.directive";
import { CommonModule } from "@angular/common";
import { RecipeSearchComponent } from "../recipe-search/recipe-search.component";


@NgModule({
    declarations: [
        DropdownDirective,
        RecipeSearchComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        CommonModule,
        DropdownDirective,
        RecipeSearchComponent
    ]
})
export class SharedModule {}