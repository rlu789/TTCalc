import { Component, OnInit } from '@angular/core';;
import * as personalModel from '../../models/personal/personalModel';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {
  personal = null;

  constructor() { }

  ngOnInit() {
    this.personal = personalModel.initPersonal();
  }

  ngOnDestroy() {
  }
}
