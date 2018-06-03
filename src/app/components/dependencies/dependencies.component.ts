import { Component, Input, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'dependencies',
  templateUrl: './dependencies.component.html'
})
export class DependenciesModal {

  constructor(
    public dialogRef: MatDialogRef<DependenciesModal>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  
  ngOnInit() {
    console.log(this.data);
  }

  add() {
    this.dialogRef.close("add");
  }

  cancel() {
    this.dialogRef.close();
    console.log(this.data.data);
  }

  addIf() {
    this.data.data.if.push({ section1: null, field1: null, compare: null, value: null, section2: null, field2: null });
    console.log(this.data.data.if)
  }
}
