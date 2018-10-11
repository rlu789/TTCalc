import { Component, OnInit, Input } from '@angular/core';
import * as constants from '../../models/constants';
import * as common from '../../models/common';

@Component({
  selector: 'field-renderer',
  templateUrl: './field-renderer.component.html'
  // styleUrls: ['./field-renderer.component.css']
})
export class FieldRenderer implements OnInit {
  @Input('fieldData') fieldData: any;
  @Input('key') key: string;
  
  constructor() { }

  ngOnInit() {
    // console.log(this.key);
    // console.log(this.fieldData);
  }

  isEditMode() {
    return constants.editMode;
  }

  calcField(thisField) {
    return common.calcField(thisField);
  }

  setFormat(format, key) {
    switch (format) {
      case 'Days':
        this.fieldData.format = 'Days';
        break;
      case 'N':
        delete this.fieldData.format;
        break;
    }
  }
}
