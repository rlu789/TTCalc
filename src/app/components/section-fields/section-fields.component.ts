import { Component, Input } from '@angular/core';
import { AddFormModal } from '../../components/add-form-modal/add-form-modal.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as common from '../../models/common';
import * as constants from '../../models/constants';
 
@Component({
  selector: 'section-fields',
  templateUrl: './section-fields.component.html'
})
export class SectionFields {
  addFormData = {
    model: null,
    section: null,
    field: null,
    option: 'N',
    dropdownOptions: []
  }
  @Input('data') data: null;
  @Input('model') model: string;
  @Input('section') section: string;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  isEditMode() {
    return constants.editMode;
  }

  deleteField(key) {
    delete constants.models[this.model][this.section][key];
  }

  calcField(thisField) {
    var minutes = 1000 * 60,
      hours = minutes * 60,
      days = hours * 24,
      years = days * 365;

    if (!common.evalIf(thisField.doCalcIf)) {
      thisField.value = 0;
      return false;
    }
    var value = 0;
    for (let model in thisField.calcs) {
      for (let section in thisField.calcs[model]) {
        for (let field in thisField.calcs[model][section]) {
          value += common.doFieldCalculation(model, section, field, thisField.calcs);
        }
      }
    }
    switch (thisField.format) {
      case ('Days'):
        value = value / days;
        break;
    }
    thisField.value = value;
    return value;
  }

  addField() {
    this.addFormData.model = this.model;
    this.addFormData.section = this.section;
    this.addFormData.dropdownOptions = [];
    let dialogRef = this.dialog.open(AddFormModal, {
      width: '600px',
      data: { data: this.addFormData }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (!constants.models[this.addFormData.model].hasOwnProperty([this.addFormData.section]))
          constants.models[this.addFormData.model][this.addFormData.section] = {};
        if (this.addFormData.field && !constants.models[this.addFormData.model][this.addFormData.section].hasOwnProperty([this.addFormData.field])) {
          var input = null;
          switch (this.addFormData.option) {
            case 'N':
              input = { value: null };
              break;
            case 'D':
              input = { value: null, dropdown: this.addFormData.dropdownOptions };
              break;
            case 'C':
              input = { value: null, calcs: {} };
              break;
          }
          constants.models[this.addFormData.model][this.addFormData.section][this.addFormData.field] = input;
        }
        console.log(constants.models[this.addFormData.model])
      }
      console.log(this.addFormData)
    });
  }
}
