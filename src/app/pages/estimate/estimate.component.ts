import { Component, OnInit } from '@angular/core';
import * as estimateModel from '../../models/estimate/estimateModel';

@Component({
  selector: 'app-estimate',
  templateUrl: './estimate.component.html',
  styleUrls: ['./estimate.component.css']
})
export class EstimateComponent implements OnInit {
  estimate = null;

  constructor() {
  }

  ngOnInit() {
    this.estimate = estimateModel.calcEstimateTotal;
  }

}
