import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { AppServicesModule } from './app-services/app-services.module';

import { HomeComponent } from './home/home.component';

import { AccordionModule } from 'ng2-bootstrap/accordion';

import { APP_ROUTES } from './routes/main-routes';
import { ExcelParserComponent } from './excel-parser/excel-parser.component';
import { ElasticTableComponent } from './elastic-table/elastic-table.component';
import { MemberAssignmentComponent } from './member-assignment/member-assignment.component';
import { DayTasksComponent } from './day-tasks/day-tasks.component';
import { CommitteeMembersComponent } from './day-tasks/committee-members/committee-members.component';
import { ShiftTasksComponent } from './day-tasks/shift-tasks/shift-tasks.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FileUploadModule,
    AppServicesModule,
    AccordionModule,
    RouterModule.forRoot(APP_ROUTES)
  ],
  declarations: [
    HomeComponent,
    ExcelParserComponent,
    ElasticTableComponent,
    MemberAssignmentComponent,
    DayTasksComponent,
    CommitteeMembersComponent,
    ShiftTasksComponent
  ]
})
export class MainV2Module { }
