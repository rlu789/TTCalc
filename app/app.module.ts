import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

//components
import { SectionFields } from './components/section-fields/section-fields.component';

//pages
import { AppComponent } from './app.component';
import { IncomeComponent } from './pages/income/income.component';
import { EstimateComponent } from './pages/estimate/estimate.component';
import { PersonalComponent } from './pages/personal/personal.component'
import { AppRoutingModule } from './routes/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    SectionFields,

    IncomeComponent,
    EstimateComponent,
    PersonalComponent
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
