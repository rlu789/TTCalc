import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here
import {
  MatDatepickerModule, MatNativeDateModule, MatFormFieldModule,
  MatFormFieldControl, MatInputModule, MatButtonModule, MatSelectModule, MatCheckboxModule, MatCardModule, MatExpansionModule,
  MatDividerModule
} from '@angular/material';
import { APP_BASE_HREF } from '@angular/common';

import { SectionFields } from './components/section-fields/section-fields.component';
import { DependenciesModal } from './components/dependencies/dependencies.component'
import { CalculationsEditor } from './components/calculations-editor/calculations-editor.component';

import { AppRoutingModule } from './routes/app-routing.module';
import { IncomeComponent } from './pages/income/income.component';
import { EstimateComponent } from './pages/estimate/estimate.component';
import { PersonalComponent } from './pages/personal/personal.component';
import { KeysPipe } from './pipes/keysPipe'

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        IncomeComponent,
        SectionFields,
        DependenciesModal,
        CalculationsEditor,
        KeysPipe,

        AppComponent,
        EstimateComponent,
        PersonalComponent,
      ],
      imports: [
        AppRoutingModule,
        FormsModule, ReactiveFormsModule,
        
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatCheckboxModule,
        MatCardModule,
        MatExpansionModule,
        MatDividerModule
      ],
      providers:  [{ provide: APP_BASE_HREF, useValue: '/' }]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  //it(`should have as title 'app'`, async(() => {
  //  const fixture = TestBed.createComponent(AppComponent);
  //  const app = fixture.debugElement.componentInstance;
  //  expect(app.title).toEqual('app');
  //}));
  //it('should render title in a h1 tag', async(() => {
  //  const fixture = TestBed.createComponent(AppComponent);
  //  fixture.detectChanges();
  //  const compiled = fixture.debugElement.nativeElement;
  //  expect(compiled.querySelector('h1').textContent).toContain('Welcome to myTaxCalculator!');
  //}));
});
