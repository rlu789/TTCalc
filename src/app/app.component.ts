import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';
//import * as income from './models/income/incomeModel';
import * as constants from './models/constants';
import { saveAs } from 'file-saver'
import { Local } from 'protractor/built/driverProviders';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pages = null;
  editMode = null;
  fileData = null;

  pageName: string;
  constructor(public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.pages = constants.pages;
    console.log(this.pages)
    this.editMode = this.editMode === null ? constants.editMode : false;
  }

  clear() {
    // goes into every field and sets to value to be the initial value or a null value
    for (let model in constants.models) {
      for (let section in constants.models[model]) {
        for (let field in constants.models[model][section]) {
          // ignore computed fields
          if (!constants.models[model][section][field].calcs) constants.models[model][section][field].value = constants.models[model][section][field].initialValue ? constants.models[model][section][field].initialValue : null;
        }
      }
    }
    this.snackBar.open("Data cleared", "OK", {
      duration: 700,
    });
  }

  addPage() {
    // lazy
    constants.models[this.pageName] = {};
    constants.pages[this.pageName] = constants.models[this.pageName];
    this.pageName = null;
  }

  isEditMode() {
    return constants.editMode;
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
      if (text) {
        localStorage.settings = text;
        window.location.reload();
      }
      else console.log("No data");
    };
    reader.readAsText(input.files[0]);
    this.fileData = reader.result;
  }
  
  delete() {
    localStorage.clear();
    window.location.reload();
  }
}
