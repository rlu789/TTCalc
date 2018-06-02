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
  }

  add() {
    this.dialogRef.close("add");
  }

  cancel() {
    this.dialogRef.close();
  }
}
