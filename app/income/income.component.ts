import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {
  income = [
    {
      section: "SWA",
      fields: [
        { name: "Gross Income", value: null },
        { name: "Tax Withheld", value: null },
      ]
    },
    {
      section: "Interest",
      fields: [
        { name: "Gross Interest", value: null },
      ]
    },
  ]

  constructor() {
    if (localStorage.getItem('income'))
      this.income = JSON.parse(localStorage.getItem('income'));
    else
      localStorage.setItem('income', JSON.stringify(this.income));
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log(this.income);
    localStorage.setItem('income', JSON.stringify(this.income));
  }
}
