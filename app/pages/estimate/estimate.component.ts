import { Component, OnInit } from '@angular/core';
import * as incomeConstants from '../../constants/incomeConstants';

@Component({
  selector: 'app-estimate',
  templateUrl: './estimate.component.html',
  styleUrls: ['./estimate.component.css']
})
export class EstimateComponent implements OnInit {

  constructor() {
    console.log(incomeConstants.calcIncomeTotal());
  }

  ngOnInit() {
  }

}
