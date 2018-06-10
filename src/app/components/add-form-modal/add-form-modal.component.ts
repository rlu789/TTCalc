import { Component, Input, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as constants from '../../models/constants';

@Component({
  selector: 'add-form-modal',
  templateUrl: './add-form-modal.component.html'
})
export class AddFormModal {
  constructor(
    public dialogRef: MatDialogRef<AddFormModal>,
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
