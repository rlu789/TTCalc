import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {
  minutes = 1000 * 60;
  hours = this.minutes * 60;
  days = this.hours * 24;
  years = this.days * 365;

  fullYearRes = true;
  fullYearResFrom = null;
  fullYearResTo = null;

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log((this.fullYearResTo.getTime() - this.fullYearResFrom.getTime()) / this.days);
  }
}
