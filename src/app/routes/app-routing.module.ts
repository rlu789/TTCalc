import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { IncomeComponent } from '../pages/income/income.component';
import { EstimateComponent } from '../pages/estimate/estimate.component';
import { PersonalComponent } from '../pages/personal/personal.component'

export const routes: Routes = [
  { path: '', redirectTo: '/app-personal', pathMatch: 'full' },
  { path: 'app-income', component: IncomeComponent },
  { path: 'app-estimate', component: EstimateComponent },
  { path: 'app-personal', component: PersonalComponent }
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
