import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ShiftEditor } from './shift-editor-form/shift-editor-form.component';

import { UserAvalComponent } from './user_reg/useraval.component';
import { TimePickerComponent } from './time-picker/time-picker.component';
import { ShiftViewerComponent } from './shift-viewer/shift-viewer.component';
import { ShiftStringPipe } from './events/shift-string.pipe';
import { NewEventComponent } from './new-event/new-event.component';
import { DayEditorFormComponent } from './day-editor-form/day-editor-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ShiftEditor,
    UserAvalComponent,
    TimePickerComponent,
    ShiftViewerComponent,
    ShiftStringPipe,
    NewEventComponent,
    DayEditorFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
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
