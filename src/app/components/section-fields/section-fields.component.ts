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

  calcField(thisField) {
    var value = 0;
    for (let model in thisField.calcs) {
      for (let section in thisField.calcs[model]) {
        for (let field in thisField.calcs[model][section]) {
          value += common.doFieldCalculation(model, section, field, constants.models, thisField.calcs)
        }
      }
    }
    thisField.value = value;
    return value;
  }

  showCalcs(calcs) {
    console.log(calcs);
  }
}
