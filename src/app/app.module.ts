import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NewEventFormComponent } from './new-event-form/new-event-form.component';
<<<<<<< HEAD
import { ValidationMessagesComponent } from './custom-forms/validation-messages/validation-messages.component';
import { FormTextComponent } from './custom-forms/form-text/form-text.component';
import { FormContainerComponent } from './custom-forms/form-container/form-container.component';
=======
import { UserAvalComponent } from './user_reg/useraval.component';
>>>>>>> beb0b9af58d8bec23687bb4a9488867da1fa5567

@NgModule({
  declarations: [
    AppComponent,
    NewEventFormComponent,
<<<<<<< HEAD
    ValidationMessagesComponent,
    FormTextComponent,
    FormContainerComponent,
=======
    UserAvalComponent
>>>>>>> beb0b9af58d8bec23687bb4a9488867da1fa5567
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {path: 'event/new', component: NewEventFormComponent },
      {path: 'aval', component: UserAvalComponent},
      {path: '', component: AppComponent},
      {path: '**', component: AppComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
