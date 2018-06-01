import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {
  income = {
    SWA : {
      gross: null,
      withheld: null
    }
  }

  constructor() {
    if (localStorage.getItem('income'))
      this.income = JSON.parse(localStorage.getItem('income'));
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log(this.income);
    localStorage.setItem('income', JSON.stringify(this.income));
  }
}
