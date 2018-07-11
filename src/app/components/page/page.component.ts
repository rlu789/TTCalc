import { Component, Input } from '@angular/core';
import * as common from '../../models/common';
import * as constants from '../../models/constants';
 
@Component({
  selector: 'page',
  templateUrl: './page.component.html'
})
export class Page {
  //calcs = null;
  data : Object;
  @Input('page') page: string;

  modelName: string;
  sectionName: string;
  pageCalcName: string
  
  ngOnInit() {
    this.data = constants.pages[this.page];
    //this.calcs = constants.pages[this.page]["Page Calcs"];
    //console.log(this.data);
  }

  addPageCalc() {
    if (!this.data.hasOwnProperty("Page Calcs")) {
      // if page has no Page Calcs yet, make one through this very convoluted process that might be redundant depending on how settings are loaded
      constants.calcs[this.page] = {};
      constants.models[this.page]["Page Calcs"] = constants.calcs[this.page];
    }
    this.data["Page Calcs"][this.pageCalcName] = {
      value: null, calcs: {}
    };
    console.log(this.data)
  }

  deletePage() {
    // delete page and all models and calcs attached to that page from constants.models so the save settings file isnt bloated with unused models
    delete constants.models[this.page];
    delete constants.calcs[this.page];
    delete constants.pages[this.page];
  }

  addModel(model) {
    // init the object then add reference to pages
    // wow this sure is ugly
    constants.models[this.page][model] = {};
    // lazy
    this.modelName = null;
  }

  deleteModel(model) {
    delete constants.models[this.page][model];
  }

  addSection(model, sectionName) {
    constants.models[this.page][model][sectionName] = {};
    console.log(constants.pages[this.page])
    // very lazy
    this.sectionName = null;
  }

  isEditMode() {
    return constants.editMode;
  }

  //calcTotals() { return common.calcTotalsForPage(this.page); }
}
