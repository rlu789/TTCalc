import { Component, Input, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as constants from '../../models/constants';

@Component({
  selector: 'dependencies-modal',
  templateUrl: './dependencies-modal.component.html'
})
export class DependenciesModal {
  constants = null;
  constructor(
    public dialogRef: MatDialogRef<DependenciesModal>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  
  ngOnInit() {
    console.log(this.data);
    this.constants = constants;
  }

  add() {
    this.dialogRef.close("add");
  }

  cancel() {
    this.dialogRef.close();
    console.log(this.data.data);
  }

  addIf() {
    this.data.data.if.push({ model1: null, section1: null, field1: null, compare: null, value: null, model2: null, section2: null, field2: null, compareWithPrevious: '&&' });
  }
}
