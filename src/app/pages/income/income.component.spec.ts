import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { KeysPipe } from '../../pipes/keysPipe'
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { SectionFields } from '../../components/section-fields/section-fields.component';
import { DependenciesModal } from '../../components/dependencies/dependencies.component'
import { CalculationsEditor } from '../../components/calculations-editor/calculations-editor.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatDatepickerModule, MatNativeDateModule, MatFormFieldModule,
  MatFormFieldControl, MatInputModule, MatButtonModule, MatSelectModule, MatCheckboxModule, MatCardModule, MatExpansionModule,
  MatDividerModule
} from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material';

import { IncomeComponent } from './income.component';

describe('IncomeComponent', () => {
  let component: IncomeComponent;
  let fixture: ComponentFixture<IncomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        IncomeComponent,
        KeysPipe,
        SectionFields,
        CalculationsEditor,
        DependenciesModal
      ],
      imports: [
        FormsModule,

        BrowserAnimationsModule,
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
      providers: [MatDialog]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
