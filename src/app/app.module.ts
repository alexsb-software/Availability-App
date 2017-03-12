import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MainV2Module } from './main-v2/main-v2.module';

import { AppComponent } from './app.component';
import { MyDatePickerModule } from 'mydatepicker';
import { TimepickerModule } from 'ng2-bootstrap/timepicker';
import { AccordionModule } from 'ng2-bootstrap/accordion';
import { TypeaheadModule } from 'ng2-bootstrap/typeahead';
import { TabsModule } from 'ng2-bootstrap/tabs';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { PaginationModule } from 'ng2-bootstrap/pagination';

import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from "@angular/router";
import { StateSaverRouter } from './state-saver-router';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';

import { HomeComponent } from './main-v2/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MainV2Module,
    MyDatePickerModule,
    FileUploadModule,
    PaginationModule.forRoot(),
    TimepickerModule.forRoot(),
    AccordionModule.forRoot(),
    DropdownModule.forRoot(),
    TypeaheadModule.forRoot(),
    TabsModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full'},
      { path: 'home', redirectTo: '', pathMatch: 'prefix' }
    ])
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: StateSaverRouter }],

  bootstrap: [AppComponent]
})
export class AppModule { }
