import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatDatepickerModule, MatNativeDateModule, MatFormFieldModule,
  MatFormFieldControl, MatInputModule, MatButtonModule, MatSelectModule, MatCheckboxModule, MatCardModule, MatExpansionModule,
  MatDividerModule, MatTooltipModule, MatSnackBarModule
} from '@angular/material';

import { DependencyHandlerService } from './injectables/dependency-handler.service';

//components and pipes
import { KeysPipe } from './pipes/keysPipe'
import { Page } from './components/page/page.component';
import { AddFormModal } from './components/add-form-modal/add-form-modal.component';
import { SectionFields } from './components/section-fields/section-fields.component';
import { SectionAccordians } from './components/section-accordians/section-accordians.component';
import { DependenciesModal } from './components/dependencies-modal/dependencies-modal.component'
import { CalculationsEditor } from './components/calculations-editor/calculations-editor.component';
import { FieldRenderer } from './components/field-renderer/field-renderer.component';

//pages
import { AppComponent } from './app.component';
//import { AppRoutingModule } from './routes/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,

    KeysPipe,
    Page,
    AddFormModal,
    SectionFields,
    SectionAccordians,
    DependenciesModal,
    CalculationsEditor,
    FieldRenderer,
  ],
  imports: [
    BrowserModule,
    //AppRoutingModule,
    FormsModule, ReactiveFormsModule,
    NgbModule.forRoot(),

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
    MatDividerModule,
    MatTooltipModule,
    MatSnackBarModule
  ],
  entryComponents: [
    AddFormModal,
    DependenciesModal,
  ],
  providers: [DependencyHandlerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
