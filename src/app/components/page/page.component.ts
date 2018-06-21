import { Component, Input } from '@angular/core';
import * as common from '../../models/common';
import * as constants from '../../models/constants';
 
@Component({
  selector: 'page',
  templateUrl: './page.component.html'
})
export class Page {
  calcs = null;
  data = null;
  @Input('page') page: string;
  
  ngOnInit() {
    //console.log(constants.calcs[this.page]);
    this.data = constants.pages[this.page];
    this.calcs = constants.calcs[this.page];
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
    this.sectionName = null;
  }

  isEditMode() {
    return constants.editMode;
  }

  calcTotals() {
    return common.calcTotalsForPage(this.page);
    //var totals = {};
    //for (let total in this.calcs) {
    //  totals[total] = 0;
    //  for (let model in this.calcs[total]) {
    //    for (let section in this.calcs[total][model]) {
    //      for (let field in this.calcs[total][model][section]) {
    //        totals[total] += common.doCalculation(total, model, section, field, this.calcs);
    //      }
    //    }
    //  }
    //}
    //return totals;
  }
}
