import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';
//import * as income from './models/income/incomeModel';
import * as constants from './models/constants';
import { saveAs } from 'file-saver'
import { Local } from 'protractor/built/driverProviders';
import { DependencyHandlerService } from './injectables/dependency-handler.service';

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
  constructor(public snackBar: MatSnackBar, private dependencyHandlerService: DependencyHandlerService) { }

  ngOnInit() {
    this.pages = constants.pages;
    this.editMode = this.editMode === null ? constants.editMode : false;
    this.dependencyHandlerService.init(this.pages);
  }

  clear() {
    // goes into every field and sets to value to be the initial value or a null value
    for (let page in constants.pages) {
      for (let model in constants.pages[page]) {
        if (model === "Page Calcs") continue;
        for (let section in constants.pages[page][model]) {
          for (let field in constants.pages[page][model][section]) {
            // ignore computed fields
            if (!constants.pages[page][model][section][field].calcs) constants.pages[page][model][section][field].value = constants.pages[page][model][section][field].initialValue ? constants.pages[page][model][section][field].initialValue : null;
          }
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
