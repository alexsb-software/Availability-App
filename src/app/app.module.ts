import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NewEventFormComponent } from './new-event-form/new-event-form.component';
import { UserAvalComponent } from './user_reg/useraval.component';

@NgModule({
  declarations: [
    AppComponent,
    NewEventFormComponent,
    UserAvalComponent
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
