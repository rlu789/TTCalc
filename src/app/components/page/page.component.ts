import { Component, Input } from '@angular/core';
import * as common from '../../models/common';
import * as constants from '../../models/constants';
 
@Component({
  selector: 'page',
  templateUrl: './page.component.html'
})
export class Page {
  //calcs = null;
  data = null;
  @Input('page') page: string;

  modelName: string;
  sectionName: string;
  
  ngOnInit() {
    this.data = constants.pages[this.page];
    //this.calcs = constants.pages[this.page]["Page Calcs"];
    //console.log(this.data);
  }

  deletePage() {
    // delete page and all models and calcs attached to that page from constants.models so the save settings file isnt bloated with unused models
    for (let model in constants.pages[this.page]) {
      delete constants.models[model];
    }
    delete constants.calcs[this.page];
    delete constants.pages[this.page];
  }

  addModel(model) {
    // init the object then add reference to pages
    // wow this sure is ugly
    constants.models[model] = {};
    constants.pages[this.page][model] = constants.models[model];
    // lazy
    this.modelName = null;
  }

  deleteModel(model) {
    delete constants.models[model];
    delete constants.pages[this.page][model];
  }

  addSection(model, sectionName) {
    constants.models[model][sectionName] = {};
    console.log(constants.pages[this.page])
    // very lazy
    this.sectionName = null;
  }

  isEditMode() {
    return constants.editMode;
  }

  //calcTotals() { return common.calcTotalsForPage(this.page); }
}
