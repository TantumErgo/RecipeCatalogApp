import { Directive, HostListener, HostBinding } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})

export class DropdownDirective {
    @HostBinding('class.open') isOpen = false;
    //allows us to bind to properties of the element that the directive is placed on 

    @HostListener('click') toggleOpen() {
        this.isOpen = !this.isOpen;
    }
}