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
    // pls remember this in the morning lol
    // TODO redo so its done by dependency handler
    var self = this;
    var total = 0;
    if (this.data[key].repeatingGroupCalcs){
      this.data[key].repeatingGroupCalcs.forEach(element => {
        for (var i = 0; i < this.data["repeatingGroupDataSet"].collection.length; i++) {
          var passed = false;
          if (element.if){
            // PRIMITIVE - eval the 'if' array and see if it passes
            // console.log(this.data["repeatingGroupDataSet"].collection[i])
            element.if.forEach(ifs => {
              var value = ifs.value;
              var compare = ifs.compare;
              var fieldValue = this.data["repeatingGroupDataSet"].collection[i][ifs.field].value;
              // check if bool?
              passed = eval("'" + fieldValue + "'" + compare + "'" + value + "'");
            });
          }
          if (passed){
            total += self.data["repeatingGroupDataSet"].collection[i][element.field].value;
          }
        }
      });
    }
    else {
      for (var i = 0; i < this.data["repeatingGroupDataSet"].collection.length; i++) {
        total += this.data["repeatingGroupDataSet"].collection[i][key].value;
      }
    }
    this.data[key].value = total; // save the total
    return total;
  }

  removeRecord(i) {
    this.data["repeatingGroupDataSet"].collection.splice(i, 1);
  }

  addRecord() {
    var obj = {};
    for (var i = 0; i < Object.keys(this.data["repeatingGroupDataSet"].template).length; i++) {
      obj[Object.keys(this.data["repeatingGroupDataSet"].template)[i]] = this.data["repeatingGroupDataSet"].template[Object.keys(this.data["repeatingGroupDataSet"].template)[i]];
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
