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
    dropdownOptions: [],
    initialValue: null
  }
  @Input('data') data: Object;
  @Input('page') page: string;
  @Input('model') model: string;
  @Input('section') section: string;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  isEditMode() {
    return constants.editMode;
  }

  deleteSection() {
    delete constants.models[this.page][this.model][this.section];
    //console.log(constants.models[this.model])
  }

  deleteField(key) {
    delete constants.models[this.page][this.model][this.section][key];
  }

  addField() {
    this.addFormData.model = this.model;
    this.addFormData.section = this.section;
    this.addFormData.dropdownOptions = [];
    let dialogRef = this.dialog.open(AddFormModal, {
      width: '700px',
      data: { data: this.addFormData }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (!constants.models[this.page][this.addFormData.model].hasOwnProperty([this.addFormData.section]))
          constants.models[this.page][this.addFormData.model][this.addFormData.section] = {};
        if (this.addFormData.field && !constants.models[this.page][this.addFormData.model][this.addFormData.section].hasOwnProperty([this.addFormData.field])) {
          var input = null;
          switch (this.addFormData.option) {
            case 'N':
              input = { value: this.addFormData.initialValue, initialValue: this.addFormData.initialValue };
              break;
            case 'D':
              input = { value: this.addFormData.initialValue, dropdown: this.addFormData.dropdownOptions, initialValue: this.addFormData.initialValue };
              break;
            case 'C':
              input = { value: this.addFormData.initialValue, calcs: {}, initialValue: null, doCalcIf: [] };
              break;
            case 'Date':
              input = { value: this.addFormData.initialValue, date: true, initialValue: this.addFormData.initialValue };
              break;
          }
          constants.models[this.page][this.addFormData.model][this.addFormData.section][this.addFormData.field] = input;
        }
        console.log(constants.models[this.page][this.addFormData.model]);
      }
      console.log(this.addFormData);
    });
  }
}
