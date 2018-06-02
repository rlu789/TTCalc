import { Component, OnInit } from '@angular/core';
import * as incomeModel from '../../models/income/incomeModel';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})

export class IncomeComponent implements OnInit {
  income = null;
  totals = null;

  constructor() {
    //if (localStorage.getItem('income'))
    //  this.income = JSON.parse(localStorage.getItem('income'));
    //else
    //  localStorage.setItem('income', JSON.stringify(this.income));
  }

  ngOnInit() {
    this.income = incomeModel.initIncome();
    this.totals = incomeModel.calcIncomeTotal;
  }

  ngOnDestroy() {
    //console.log(this.income);
    //localStorage.setItem('income', JSON.stringify(this.income));
  }
}