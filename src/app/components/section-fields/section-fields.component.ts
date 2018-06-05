import { Component, Input } from '@angular/core';
import * as common from '../../models/common';
import * as constants from '../../models/constants';
 
@Component({
  selector: 'section-fields',
  templateUrl: './section-fields.component.html'
})
export class SectionFields {
  @Input('data') data: null;

  ngOnInit() {
  }

  calcField(calcs) {
    var value = 0;
    for (let model in calcs) {
      for (let section in calcs[model]) {
        for (let field in calcs[model][section]) {
          value += common.doFieldCalculation(model, section, field, constants.models, calcs)
        }
      }
    }
    return value;
  }

  showCalcs(calcs) {
    console.log(calcs);
  }
}
