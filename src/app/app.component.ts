import { Component } from '@angular/core';
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
  constructor() { }

  ngOnInit() {
    this.pages = constants.pages;
    console.log(this.pages)
    this.editMode = this.editMode === null ? constants.editMode : false;
  }

  addPage() {
    // lazy
    constants.pages[this.pageName] = {};
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
      localStorage.fileData = text;
    };
    reader.readAsText(input.files[0]);
    this.fileData = reader.result;
  }

  load() {
    if (localStorage.fileData) {
      localStorage.settings = localStorage.fileData;
      window.location.reload();
    }
    else console.log("No data");
    //console.log(JSON.parse(localStorage.fileData));
    //console.log(localStorage.settings);
  }
  
  delete() {
    localStorage.clear();
    window.location.reload();
  }
}
