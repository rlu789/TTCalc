import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { AppComponent } from './app.component';
import { IncomeComponent } from './pages/income/income.component';
import { EstimateComponent } from './pages/estimate/estimate.component';
import { AppRoutingModule } from './routes/app-routing.module';

import { SectionFields } from './components/section-fields/section-fields.component'

@NgModule({
  declarations: [
    AppComponent,
    IncomeComponent,
    EstimateComponent,

    SectionFields
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
