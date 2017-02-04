import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ShiftEditor } from './new-event-form-src/shift-editor-form/shift-editor-form.component';

import { UserAvalComponent } from './user_reg/useraval.component';
import { ShiftViewerComponent } from './new-event-form-src/shift-viewer/shift-viewer.component';
import { NewEventComponent } from './new-event-form-src/new-event/new-event.component';
import { DayEditorFormComponent } from './new-event-form-src/day-editor-form/day-editor-form.component';
import { DatePickerComponent } from './new-event-form-src/date-picker/date-picker.component';

import { MyDatePickerModule } from 'mydatepicker';

import { TimepickerModule } from 'ng2-bootstrap/timepicker';
import { AccordionModule } from 'ng2-bootstrap/accordion';
import { TypeaheadModule } from 'ng2-bootstrap/typeahead';
import { TabsModule } from 'ng2-bootstrap/tabs';
import { DropdownModule } from 'ng2-bootstrap/dropdown';

import { InfoTextComponent } from './applogic-general/info-text/info-text.component';
import { CommitteeMembersComponent } from './availability-grid-src/committee-members/committee-members.component';
import { SessionEditorComponent } from './new-event-form-src/session-editor/session-editor.component';
import { DynamicTableComponent } from './applogic-general/dynamic-table/dynamic-table.component';
import { SessoinMemberInputComponent } from './availability-grid-src/sessoin-member-input/sessoin-member-input.component';
@NgModule({
  declarations: [
    AppComponent,
    ShiftEditor,
    UserAvalComponent,
    ShiftViewerComponent,
    NewEventComponent,
    DayEditorFormComponent,
    DatePickerComponent,
    //SessionComponent,
    InfoTextComponent,
    CommitteeMembersComponent,
    SessionEditorComponent,
    DynamicTableComponent,
    SessoinMemberInputComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MyDatePickerModule,
    TimepickerModule.forRoot(),
    AccordionModule.forRoot(),
    DropdownModule.forRoot(),
    TypeaheadModule.forRoot(),
    TabsModule.forRoot(),
    RouterModule.forRoot([
      { path: 'event/new', component: NewEventComponent },
      { path: 'session', component: SessoinMemberInputComponent },
      { path: 'comm', component: CommitteeMembersComponent },
      { path: 'aval', component: UserAvalComponent },
      { path: '', component: AppComponent },
      { path: '**', component: AppComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
