import { Injectable } from '@angular/core';
import * as common from '../models/common';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DependencyHandlerService {
  dependencies: Object;
  calcs: any[]

  constructor() { 
    this.dependencies = {};
    this.calcs = [];
  }

  public init(pages: {}): void{
    for (let page in pages) {
      for (let model in pages[page]) {
        for (let section in pages[page][model]) {
          for (let field in pages[page][model][section]) {
            if (!this.dependencies.hasOwnProperty(page))
              this.dependencies[page] = {};
            if (!this.dependencies[page].hasOwnProperty(model))
              this.dependencies[page][model] = {};
            if (!this.dependencies[page][model].hasOwnProperty(section))
              this.dependencies[page][model][section] = {};
            if (!this.dependencies[page][model][section].hasOwnProperty(field))
              this.dependencies[page][model][section][field] = [];
            var fld = pages[page][model][section][field];
            // TODO handle the REPEATINGDATASETS
            if (model === 'Page Calcs')
              this.calcs.push(pages[page][model][section]);
            else if (fld.calcs && field !== 'repeatingGroupDataSet')
              this.calcs.push(fld);
          }
        }
      }
    }
    this.setUpDependencies()
  }

  private setUpDependencies(): void{
    var self = this;
    this.calcs.forEach(function(c){
      common.calcField(c);
      for (let page in c['calcs']) {
        for (let model in c['calcs'][page]) {
          for (let section in c['calcs'][page][model]) {
            for (let field in c['calcs'][page][model][section]) {
              var fldKey = c['calcs'][page][model][section][field].field;
              // console.log(fldKey)
              // console.log(self.dependencies[page][model][section])
              // console.log(self.dependencies[page][model][section][fldKey])
              try{
                self.dependencies[page][model][section][fldKey].push(c);
              }
              catch{
                console.log('%c Error pushing to field: ' + fldKey, 'background: #222; color: #bada55');
              }
            }
          }
        }
      }
    });
    console.log(this.dependencies);
    console.log(this.calcs);
  }

  public updateValues(page: string, model: string, section: string, field: string): void{
    this.dependencies[page][model][section][field].forEach(fld => {
      console.log(common.calcField(fld));
      if (fld.calcs)
        console.log(fld.calcs);
    });
  }
}
