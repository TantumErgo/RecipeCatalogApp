import { Component, EventEmitter, Output } from '@angular/core';
import { DataStorageService } from '../../data-storage.service';
import { Response } from '@angular/http';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    //output decorator enables us to listen to the event
    //from the parent component (i.e. app-component because it adds app-header)
    
    constructor(private dataStorageService: DataStorageService) {}

    onSaveData() { //does using response here work with using the httpclient elsewhere?
        this.dataStorageService.StoreRecipesTest()
            .subscribe(
                (response: Response) => {
                    console.log(response);
                }
            );
    }

    onFetchData() {
        this.dataStorageService.FetchRecipesTest();
    }
    
}