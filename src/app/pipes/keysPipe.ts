import { Pipe, PipeTransform } from '@angular/core';

// used with ngFor for when iterating through an object
// object keys are returned

@Pipe({ name: 'keys', pure: false })
export class KeysPipe implements PipeTransform {
  transform(value: any, args: any[] = null): any {
    return Object.keys(value)//.map(key => value[key]);
  }
}
