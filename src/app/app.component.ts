import { Component } from '@angular/core';
//import * as income from './models/income/incomeModel';
import * as constants from './models/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pages = null;
  constructor() { }

  ngOnInit() {
    this.pages = constants.pages
  }

  //TODO REDO
  //deleteLocal() {
  //  localStorage.clear();
  //  window.location.reload();
  //}

  //saveCalcs() {
  //  localStorage.setItem('incomeCalcs', JSON.stringify(income.saveIncomeCalcs()));
  //  console.log(localStorage);
  //}
}
