import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { SingletonServicesModule } from './singleton-services/singleton-services.module';
import { MainV2Module } from './main-v2/main-v2.module';

import { AppComponent } from './app.component';
import { ShiftEditor } from './new-event-form-src/shift-editor-form/shift-editor-form.component';
import { UserAvalComponent } from './user_reg/useraval.component';
import { NewEventComponent } from './new-event-form-src/new-event/new-event.component';
import { DayEditorFormComponent } from './new-event-form-src/day-editor-form/day-editor-form.component';
import { DatePickerComponent } from './new-event-form-src/date-picker/date-picker.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserAuthService } from './user-auth/user-auth.service';
import { MyDatePickerModule } from 'mydatepicker';
import { TimepickerModule } from 'ng2-bootstrap/timepicker';
import { AccordionModule } from 'ng2-bootstrap/accordion';
import { TypeaheadModule } from 'ng2-bootstrap/typeahead';
import { TabsModule } from 'ng2-bootstrap/tabs';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { InfoTextComponent } from './applogic-general/info-text/info-text.component';
import { CommitteeMembersComponent } from './availability-grid-src/committee-members/committee-members.component';
import { SessionEditorComponent } from "./new-event-form-src/session-editor/session-editor.component";
import { DynamicTableComponent } from './applogic-general/dynamic-table/dynamic-table.component';
import { SessoinMemberInputComponent } from './availability-grid-src/sessoin-member-input/sessoin-member-input.component';
import { MemberViewComponent } from './applogic-general/member-view/member-view.component';
import { TextSearchHelperComponent } from './applogic-general/text-search-helper/text-search-helper.component';
import { CommFilterPipe } from './applogic-general/member-view/comm-filter.pipe';
import { ShiftFilterPipe } from './applogic-general/member-view/shift-filter.pipe';
import { NameFilterPipe } from './applogic-general/member-view/name-filter.pipe';
import { NameSortPipe } from './applogic-general/member-view/name-sort.pipe';
import { PaginationModule } from 'ng2-bootstrap/pagination';
import { ShiftAssignmentComponent } from './availability-grid-src/shift-assignment/shift-assignment.component';
import { DayAssignmentComponent } from './availability-grid-src/day-assignment/day-assignment.component';
import { AvialabilityRootComponent } from './availability-grid-src/avialability-root/avialability-root.component';
import { MapKeysPipe } from './applogic-general/map-keys.pipe';
import { MapValuesPipe } from './applogic-general/map-values.pipe';
import { PrintComponent } from './availability-grid-src/print/print.component';

import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from "@angular/router";
import { StateSaverRouter } from './state-saver-router';
import { GetCommitteePipe } from './applogic-general/get-committee.pipe';
import { AuthGuard } from './auth-guard';
import { RemovePrRnpPipe } from './applogic-general/remove-pr-rnp.pipe';
import { ExcelInterfaceComponent } from './excel-interface/excel-interface.component';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';

import { HomeComponent } from './main-v2/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    ShiftEditor,
    UserAvalComponent,
    NewEventComponent,
    DayEditorFormComponent,
    DatePickerComponent,
    InfoTextComponent,
    CommitteeMembersComponent,
    SessionEditorComponent,
    DynamicTableComponent,
    SessoinMemberInputComponent,
    MemberViewComponent,
    TextSearchHelperComponent,
    CommFilterPipe,
    ShiftFilterPipe,
    NameFilterPipe,
    NameSortPipe,
    ShiftAssignmentComponent,
    DayAssignmentComponent,
    AvialabilityRootComponent,
    MapKeysPipe,
    UserLoginComponent,
    MapValuesPipe,
    PrintComponent,
    GetCommitteePipe,
    RemovePrRnpPipe,
    ExcelInterfaceComponent,
    //MemberAssignmentComponent
    ExcelInterfaceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MainV2Module,
    MyDatePickerModule,
    SingletonServicesModule,
    FileUploadModule,
    PaginationModule.forRoot(),
    TimepickerModule.forRoot(),
    AccordionModule.forRoot(),
    DropdownModule.forRoot(),
    TypeaheadModule.forRoot(),
    TabsModule.forRoot(),
    RouterModule.forRoot([
      // { path: 'login', component: UserLoginComponent },
      // { path: 'session', component: SessoinMemberInputComponent },
      // { path: 'comm', component: CommitteeMembersComponent },
      // { path: 'aval', component: UserAvalComponent },
      // { path: 'event/new', component: NewEventComponent },
      // { path: 'member', component: MemberViewComponent },
      // { path: 'print', component: PrintComponent },
      // { path: 'day/:id', component: DayAssignmentComponent },
      // { path: 'main', component: AvialabilityRootComponent },

      // { path: 'excel', component: ExcelInterfaceComponent },
      { path: 'home', component: HomeComponent, pathMatch: 'prefix'},
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      // { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ])
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: StateSaverRouter }, UserAuthService, AuthGuard],

  bootstrap: [AppComponent]
})
export class AppModule { }
