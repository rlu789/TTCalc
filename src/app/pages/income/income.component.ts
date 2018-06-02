import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
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
  @ViewChild('p') public popover: NgbPopover;

  constructor() {

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

  addCalc() {
    this.calcs[this.addCalcForm.name].push({
      section: this.addCalcForm.section,
      field: this.addCalcForm.field,
      operation: this.addCalcForm.operation
    });
    this.popover.close();
    for (let key in this.addCalcForm) {
      if (this.addCalcForm.hasOwnProperty(key)) {
        this.addCalcForm[key] = null;
      }
    }
  }

  setupAdd(key) {
    //TODO be less lazy with this
    if (this.addCalcForm.name === key) {
      this.popover.close();
      this.addCalcForm.name = null;
      return;
    }
    this.addCalcForm.name = key;
    const isOpen = this.popover.isOpen();
    if (!isOpen) {
      this.popover.open();
    }
  }
}
