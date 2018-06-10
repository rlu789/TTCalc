import { Component, Input } from '@angular/core';
import * as common from '../../models/common';
import * as constants from '../../models/constants';
 
@Component({
  selector: 'page',
  templateUrl: './page.component.html'
})
export class Page {
  calcs = null
  @Input('data') data: null;
  @Input('page') page: string;
  
  ngOnInit() {
    //console.log(this.data);
    //console.log(constants.calcs[this.page]);
    this.calcs = constants.calcs[this.page];
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
