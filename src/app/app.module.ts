import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NewEventFormComponent } from './new-event-form/new-event-form.component';
import { ValidationMessagesComponent } from './custom-forms/validation-messages/validation-messages.component';
import { FormTextComponent } from './custom-forms/form-text/form-text.component';
import { FormContainerComponent } from './custom-forms/form-container/form-container.component';

@NgModule({
  declarations: [
    AppComponent,
    NewEventFormComponent,
    ValidationMessagesComponent,
    FormTextComponent,
    FormContainerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
