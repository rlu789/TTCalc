import { Component, Input } from '@angular/core';

@Component({
  selector: 'dependencies',
  templateUrl: './dependencies.component.html'
})
export class DependenciesModal {
  @Input('data') data: null;

  ngOnInit() {
    console.log(this.data);
  }
}
