import { Component, Input } from '@angular/core';
 
@Component({
  selector: 'section-fields',
  templateUrl: './section-fields.component.html'
})
export class SectionFields {
  @Input('data') data: null;

  ngOnInit() {
    console.log(this.data);
  }
}
