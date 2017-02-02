import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ShiftEditor } from './new-event-form-src/shift-editor-form/shift-editor-form.component';

import { UserAvalComponent } from './user_reg/useraval.component';
import { TimePickerComponent } from './new-event-form-src/time-picker/time-picker.component';
import { ShiftViewerComponent } from './new-event-form-src/shift-viewer/shift-viewer.component';
import { ShiftStringPipe } from './new-event-form-src/event-classes/shift-string.pipe';
import { NewEventComponent } from './new-event-form-src/new-event/new-event.component';
import { DayEditorFormComponent } from './new-event-form-src/day-editor-form/day-editor-form.component';
import { DatePickerComponent } from './new-event-form-src/date-picker/date-picker.component';

import { MyDatePickerModule } from 'mydatepicker';

@NgModule({
  declarations: [
    AppComponent,
    ShiftEditor,
    UserAvalComponent,
    TimePickerComponent,
    ShiftViewerComponent,
    ShiftStringPipe,
    NewEventComponent,
    DayEditorFormComponent,
    DatePickerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MyDatePickerModule,
    RouterModule.forRoot([
      {path: 'event/new', component: NewEventComponent },
      {path: 'aval', component: UserAvalComponent},
      {path: '', component: AppComponent},
      {path: '**', component: AppComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
