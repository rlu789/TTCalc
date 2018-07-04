import { Component, Input } from '@angular/core';
import { DependenciesModal } from '../../components/dependencies-modal/dependencies-modal.component'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as constants from '../../models/constants';
import * as common from '../../models/common';
 
@Component({
  selector: 'calculations-editor',
  templateUrl: './calculations-editor.component.html'
})
export class CalculationsEditor {
  @Input('calcs') calcs: any;
  @Input('keyProvided') keyProvided: string;
  @Input('doCalcIf') doCalcIf: Array<any>;

  addCalcForm = {
    name: null,
    model: null,
    section: null,
    field: null,
    operation: null,
    ifChecked: false,
    percent: null,
    if: [{
      model1: null, section1: null, field1: null, compare: null, value: null, model2: null, section2: null, field2: null, compareWithPrevious: null }]
  };
  
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    console.log(this.calcs);
    //console.log(this.keyProvided);
    //console.log(this.doCalcIf);
  }

  isEditMode() {
    return constants.editMode;
  }

  deletePageCalc(key) {
    delete this.calcs[key];
  }

  calcField(thisField) {
    return common.calcField(thisField);
  }

  deleteCalc(key, modelKey, sectionKey, childKey) {
    console.log(this.calcs)
    this.calcs[key].calcs[modelKey][sectionKey].splice(childKey, 1);
    if (!this.calcs[key].calcs[modelKey][sectionKey].length) delete this.calcs[key].calcs[modelKey][sectionKey];
    if (!Object.keys(this.calcs[key].calcs[modelKey]).length) delete this.calcs[key].calcs[modelKey];
  }

  deleteCalcInFieldMode(modelKey, sectionKey, childKey) {
    this.calcs[modelKey][sectionKey].splice(childKey, 1);
    if (!this.calcs[modelKey][sectionKey].length) delete this.calcs[modelKey][sectionKey];
    if (!Object.keys(this.calcs[modelKey]).length) delete this.calcs[modelKey];
  }

  deleteDoCalcIf(i) {
    this.doCalcIf.splice(i, 1);
    if (!this.doCalcIf.length) this.doCalcIf = null;
  }

  setupAdd(key) {
    this.addCalcForm.name = key;
    //TODO redo the if part
    this.addCalcForm.if = [{ model1: null, section1: null, field1: null, compare: null, value: null, model2: null, section2: null, field2: null, compareWithPrevious: '&&' }]; 
    let dialogRef = this.dialog.open(DependenciesModal, {
      width: '700px',
      data: { data: this.addCalcForm }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(this.calcs)
      if (result) {
        if (!this.keyProvided) {
          // if no key provided, we're NOT in field mode, so name key is needed
          if (!this.calcs[this.addCalcForm.name].calcs.hasOwnProperty([this.addCalcForm.model]))
            this.calcs[this.addCalcForm.name].calcs[this.addCalcForm.model] = {};
          if (!this.calcs[this.addCalcForm.name].calcs[this.addCalcForm.model].hasOwnProperty([this.addCalcForm.section]))
            this.calcs[this.addCalcForm.name].calcs[this.addCalcForm.model][this.addCalcForm.section] = [];
          this.calcs[this.addCalcForm.name].calcs[this.addCalcForm.model][this.addCalcForm.section].push({
            field: this.addCalcForm.field,
            operation: this.addCalcForm.operation,
            if: this.addCalcForm.ifChecked ? this.addCalcForm.if : null,
            percent: this.addCalcForm.percent
          });
        }
        else {
          if (!this.calcs.hasOwnProperty([this.addCalcForm.model]))
            this.calcs[this.addCalcForm.model] = {};
          if (!this.calcs[this.addCalcForm.model].hasOwnProperty([this.addCalcForm.section]))
            this.calcs[this.addCalcForm.model][this.addCalcForm.section] = [];
          this.calcs[this.addCalcForm.model][this.addCalcForm.section].push({
            field: this.addCalcForm.field,
            operation: this.addCalcForm.operation,
            if: this.addCalcForm.ifChecked ? this.addCalcForm.if : null,
            percent: this.addCalcForm.percent
          });
        }
        console.log(this.calcs);

        //for (let key in this.addCalcForm) {
        //  if (this.addCalcForm.hasOwnProperty(key)) {
        //    this.addCalcForm[key] = null;
        //  }
        //}
      }
    });
  }

  setupDoCalcIf() {
    //TODO REDO THIS IS TRASH
    this.addCalcForm.if = [{ model1: null, section1: null, field1: null, compare: null, value: null, model2: null, section2: null, field2: null, compareWithPrevious: '&&' }];
    let dialogRef = this.dialog.open(DependenciesModal, {
      width: '450px',
      data: { data: this.addCalcForm, onlyIfs: true }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        for (let index in this.addCalcForm.if) {
          this.doCalcIf.push(this.addCalcForm.if[index]);
        }
        //console.log(this.doCalcIf);
      }
    });
  }
}
