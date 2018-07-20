import { Component, Input } from '@angular/core';
import { AddFormModal } from '../../components/add-form-modal/add-form-modal.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as common from '../../models/common';
import * as constants from '../../models/constants';
 
@Component({
  selector: 'section-accordians',
  templateUrl: './section-accordians.component.html'
})
export class SectionAccordians {
  //addFormData = {
  //  model: null,
  //  section: null,
  //  field: null,
  //  option: 'N',
  //  dropdownOptions: [],
  //  initialValue: null
  //}
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

  calcRepeatingGroup(key) {
    var total = 0;
    for (var i = 0; i < this.data["repeatingGroupDataSet"].collection.length; i++) {
      total += this.data["repeatingGroupDataSet"].collection[i][key].value;
    }
    return total;
  }

  removeRecord(i) {
    this.data["repeatingGroupDataSet"].collection.splice(i, 1);
  }

  addRecord() {
    var obj = {};
    for (var i = 0; i < Object.keys(this.data["repeatingGroupDataSet"].template).length; i++) {
      obj[Object.keys(this.data["repeatingGroupDataSet"].template)[i]] = { value: null };
      obj[Object.keys(this.data["repeatingGroupDataSet"].template)[i]] = Object.assign({}, obj[Object.keys(this.data["repeatingGroupDataSet"].template)[i]], obj[Object.keys(this.data["repeatingGroupDataSet"].template)[i]]);
    }
    console.log(obj)
    this.data["repeatingGroupDataSet"].collection.push(obj);
  }

  setFormat(format, key) {
    switch (format) {
      case 'Days':
        this.data[key].format = 'Days';
        break;
      case 'N':
        delete this.data[key].format;
        break;
    }
  }
}
