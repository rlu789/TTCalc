import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {
  income = {
    SWA : {
      gross: 0,
      withheld: 0
    }
  }

  constructor() {
    if (localStorage.getItem('income'))
      this.income = JSON.parse(localStorage.getItem('income'));
  }

  ngOnDestroy() {
    console.log(this.income);
    localStorage.setItem('income', JSON.stringify(this.income));
  }
}
