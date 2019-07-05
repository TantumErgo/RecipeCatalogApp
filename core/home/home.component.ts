import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

//This component will be the Start Page
//It will have 5 buttons: Entrees, Sides, Desserts, All, Favorites
//When clicking a button, the Recipes component is loaded but displays different data depending on the button
//The Recipes navbar heading displays the same as clicking the All button
//Consider making a Favorites component that is separate from the Recipes component