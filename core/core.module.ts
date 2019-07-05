import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { SharedModule } from "../shared/shared.module";
import { AppRoutingModule } from "../app-routing.module";
//import { RecipeSearchComponent } from "../recipe-search/recipe-search.component";

@NgModule({
    declarations: [
        HeaderComponent,
        HomeComponent,
        //RecipeSearchComponent
    ],
    imports: [
        SharedModule,
        AppRoutingModule
    ],
    exports: [
        AppRoutingModule,
        HeaderComponent,
        //RecipeSearchComponent
    ]
})
export class CoreModule {}