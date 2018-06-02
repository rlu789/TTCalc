import { Component, OnInit } from '@angular/core';
import * as incomeModel from '../../models/income/incomeModel';

@Component({
  selector: 'app-estimate',
  templateUrl: './estimate.component.html',
  styleUrls: ['./estimate.component.css']
})
export class EstimateComponent implements OnInit {

  constructor() {
    console.log(incomeModel.calcIncomeTotal());
  }

  ngOnInit() {
  }

}
