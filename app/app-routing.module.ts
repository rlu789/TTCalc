import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { IncomeComponent } from './income/income.component';
import { EstimateComponent } from './estimate/estimate.component';

const routes: Routes = [
  { path: '', redirectTo: '/app-income', pathMatch: 'full' },
  { path: 'app-income', component: IncomeComponent }
  { path: 'app-estimate', component: EstimateComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
