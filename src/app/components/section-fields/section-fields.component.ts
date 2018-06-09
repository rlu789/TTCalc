import { Component, Input } from '@angular/core';
import * as common from '../../models/common';
 
@Component({
  selector: 'section-fields',
  templateUrl: './section-fields.component.html'
})
export class SectionFields {
  @Input('data') data: null;
  @Input('section') section: null;
  
  ngOnInit() {
  }

  calcField(thisField) {
    if (!common.evalIf(thisField.doCalcIf)) {
      thisField.value = 0;
      return false;
    }
    var value = 0;
    for (let model in thisField.calcs) {
      for (let section in thisField.calcs[model]) {
        for (let field in thisField.calcs[model][section]) {
          value += common.doFieldCalculation(model, section, field, thisField.calcs)
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
