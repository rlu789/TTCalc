import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { IncomeComponent } from '../pages/income/income.component';
import { EstimateComponent } from '../pages/estimate/estimate.component';

export const routes: Routes = [
  { path: '', redirectTo: '/app-income', pathMatch: 'full' },
  { path: 'app-income', component: IncomeComponent },
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
