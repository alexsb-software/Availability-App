import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { AppServicesModule } from './app-services/app-services.module';

import { HomeComponent } from './home/home.component';
import { TimepickerModule } from 'ng2-bootstrap/timepicker';
import { AccordionModule } from 'ng2-bootstrap/accordion';

import { APP_ROUTES } from './routes/main-routes';
import { ExcelParserComponent } from './excel-parser/excel-parser.component';
import { ElasticTableComponent } from './elastic-table/elastic-table.component';
import { MemberAssignmentComponent } from './member-assignment/member-assignment.component';
import { CommitteeMembersComponent } from './member-assignment/day-tasks/committee-members/committee-members.component';
import { ShiftTasksComponent } from './member-assignment/day-tasks/shift-tasks/shift-tasks.component';
import { SessionTaskComponent } from './member-assignment/day-tasks/shift-tasks/session-task/session-task.component';
import { ExcelExportComponent } from './excel-export/excel-export.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FileUploadModule,
    AppServicesModule,
    AccordionModule.forRoot(),
    TimepickerModule.forRoot(),
    RouterModule.forChild(APP_ROUTES)
  ],
  declarations: [
    HomeComponent,
    ExcelParserComponent,
    ElasticTableComponent,
    MemberAssignmentComponent,
    CommitteeMembersComponent,
    ShiftTasksComponent,
    SessionTaskComponent,
    ExcelExportComponent
  ]
})
export class MainV2Module { }
