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
    section: null,
    field: null,
    operation: null,
    ifChecked: false,
    if: [{ section1: null, field1: null, compare: null, value: null, section2: null, field2: null }]
  };
  
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    console.log(this.calcs);
  }

  deteleCalc(key, sectionKey, childKey) {
    delete this.calcs[key][sectionKey][childKey];
  }

  setupAdd(key) {
    this.addCalcForm.name = key;
    //TODO redo the if part
    this.addCalcForm.if = [{ section1: null, field1: null, compare: null, value: null, section2: null, field2: null }]; 
    let dialogRef = this.dialog.open(DependenciesModal, {
      width: '450px',
      data: { data: this.addCalcForm }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.calcs[this.addCalcForm.name][this.addCalcForm.section].push({
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
