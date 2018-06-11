import { Component } from '@angular/core';
//import * as income from './models/income/incomeModel';
import * as constants from './models/constants';
import { saveAs } from 'file-saver'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pages = null;
  editMode = null;
  fileData = null;
  constructor() { }

  ngOnInit() {
    this.pages = constants.pages;
    this.editMode = this.editMode === null ? constants.editMode : false;
  }

  toggle() {
    constants.toggleEdit();
  }

  save() {
    var calcs = constants.calcs;
    var models = constants.models;
    var pages = constants.pages;
    var save = {calcs: calcs, models: models, pages: pages}
    var file = new File([JSON.stringify(save)], "settings.txt", { type: "text/plain;charset=utf-8" });
    saveAs(file);
  }

  setup($event) {
    var input = $event.target;

    var reader = new FileReader();
    reader.onload = function () {
      var text = reader.result;
      localStorage.fileData = text;
    };
    reader.readAsText(input.files[0]);
    this.fileData = reader.result;
  }

  load() {
    console.log(localStorage.fileData);
    console.log(JSON.parse(localStorage.fileData));
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
