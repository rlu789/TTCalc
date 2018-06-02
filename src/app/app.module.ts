import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatFormFieldControl, MatInputModule  } from '@angular/material';

//components and pipes
import { KeysPipe } from './pipes/keysPipe'
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

    KeysPipe,
    SectionFields,

    IncomeComponent,
    EstimateComponent,
    PersonalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, ReactiveFormsModule,
    NgbModule.forRoot(),

    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
