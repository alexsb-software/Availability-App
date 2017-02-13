import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { SingletonServicesModule } from './singleton-services/singleton-services.module';

import { AppComponent } from './app.component';
import { ShiftEditor } from './new-event-form-src/shift-editor-form/shift-editor-form.component';

import { UserAvalComponent } from './user_reg/useraval.component';
import { ShiftViewerComponent } from './new-event-form-src/shift-viewer/shift-viewer.component';
import { NewEventComponent } from './new-event-form-src/new-event/new-event.component';
import { DayEditorFormComponent } from './new-event-form-src/day-editor-form/day-editor-form.component';
import { DatePickerComponent } from './new-event-form-src/date-picker/date-picker.component';
import { UserLoginComponent } from './user-login/user-login.component';

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
import { SearchBarDirective } from './applogic-general/search-bar.directive';
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
    SessoinMemberInputComponent,
    MemberViewComponent,
    TextSearchHelperComponent,
    SearchBarDirective,
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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MyDatePickerModule,
    SingletonServicesModule,
    PaginationModule.forRoot(),
    TimepickerModule.forRoot(),
    AccordionModule.forRoot(),
    DropdownModule.forRoot(),
    TypeaheadModule.forRoot(),
    TabsModule.forRoot(),
    RouterModule.forRoot([
      { path: 'event/new', component: NewEventComponent },
      { path: 'login', component: UserLoginComponent },
      { path: 'session', component: SessoinMemberInputComponent },
      { path: 'comm', component: CommitteeMembersComponent },
      { path: 'aval', component: UserAvalComponent },
      { path: 'member', component: MemberViewComponent },
      { path: 'shift', component: ShiftAssignmentComponent },
      { path: 'day/:id', component: DayAssignmentComponent },
      { path: 'print', component: PrintComponent },
      { path: '', component: AvialabilityRootComponent },
      { path: '**', component: AppComponent }
    ])
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: StateSaverRouter }],
  bootstrap: [AppComponent]
})
export class AppModule { }
