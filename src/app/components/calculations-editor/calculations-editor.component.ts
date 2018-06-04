import { Component, Input } from '@angular/core';
import { DependenciesModal } from '../../components/dependencies/dependencies.component'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
 
@Component({
  selector: 'calculations-editor',
  templateUrl: './calculations-editor.component.html'
})
export class CalculationsEditor {
  @Input('calcs') calcs: any;
  addCalcForm = {
    name: null,
    model: null,
    section: null,
    field: null,
    operation: null,
    ifChecked: false,
    if: [{ model1: null, section1: null, field1: null, compare: null, value: null, model2: null, section2: null, field2: null }]
  };
  
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    console.log(this.calcs);
  }

  deteleCalc(key, modelKey, sectionKey, childKey) {
    this.calcs[key][modelKey][sectionKey].splice(childKey, 1);
    if (!this.calcs[key][modelKey][sectionKey].length) delete this.calcs[key][modelKey][sectionKey];
  }

  setupAdd(key) {
    this.addCalcForm.name = key;
    //TODO redo the if part
    this.addCalcForm.if = [{ model1: null, section1: null, field1: null, compare: null, value: null, model2: null, section2: null, field2: null }]; 
    let dialogRef = this.dialog.open(DependenciesModal, {
      width: '450px',
      data: { data: this.addCalcForm }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(this.calcs)
      console.log('The dialog was closed');
      if (result) {
        //TODO might have to account for model also not existing
        if (!this.calcs[this.addCalcForm.name][this.addCalcForm.model].hasOwnProperty([this.addCalcForm.section]))
          this.calcs[this.addCalcForm.name][this.addCalcForm.model][this.addCalcForm.section] = [];
        this.calcs[this.addCalcForm.name][this.addCalcForm.model][this.addCalcForm.section].push({
          field: this.addCalcForm.field,
          operation: this.addCalcForm.operation,
          if: this.addCalcForm.ifChecked ? this.addCalcForm.if : null,
        });
        console.log(this.calcs);
        //for (let key in this.addCalcForm) {
        //  if (this.addCalcForm.hasOwnProperty(key)) {
        //    this.addCalcForm[key] = null;
        //  }
        //}
      }
    });
  }
}
