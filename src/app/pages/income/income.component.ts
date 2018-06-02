import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { DependenciesModal } from '../../components/dependencies/dependencies.component'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as incomeModel from '../../models/income/incomeModel';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})

export class IncomeComponent implements OnInit {
  income = null;
  totals = null;
  calcs = null;

  addCalcForm = {
    name: null,
    section: null,
    field: null,
    operation: null
  };

  constructor(public dialog: MatDialog) {

    //if (localStorage.getItem('income'))
    //  this.income = JSON.parse(localStorage.getItem('income'));
    //else
    //  localStorage.setItem('income', JSON.stringify(this.income));
  }

  ngOnInit() {
    this.income = incomeModel.initIncome();
    this.totals = incomeModel.calcIncomeTotal;
    this.calcs = incomeModel.getIncomeCalcs();
  }

  ngOnDestroy() {
    //console.log(this.income);
    //localStorage.setItem('income', JSON.stringify(this.income));
  }

  deteleCalc(key, childKey) {
    delete this.calcs[key][childKey];
  }

  setupAdd(key) {
    this.addCalcForm.name = key;
    let dialogRef = this.dialog.open(DependenciesModal, {
      width: '250px',
      data: { data: this.addCalcForm }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.calcs[this.addCalcForm.name].push({
          section: this.addCalcForm.section,
          field: this.addCalcForm.field,
          operation: this.addCalcForm.operation
        });
        for (let key in this.addCalcForm) {
          if (this.addCalcForm.hasOwnProperty(key)) {
            this.addCalcForm[key] = null;
          }
        }
      }
    });
  }
}
