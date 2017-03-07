import {Routes}from'@angular/router';
import {HomeComponent} from '../home/home.component';
import {MemberAssignmentComponent} from '../member-assignment/member-assignment.component';
import {ShiftTasksComponent} from '../member-assignment/day-tasks/shift-tasks/shift-tasks.component';
import {ExcelExportComponent} from '../excel-export/excel-export.component';
import {SessionTaskComponent} from '../member-assignment/day-tasks/shift-tasks/session-task/session-task.component';
import {DataExistsGuard} from "../logic/data-exists-guard";

export const APP_ROUTES: Routes = [
  {path: 'v2', component: HomeComponent},
  {
    path: 'excel-export',
    component: ExcelExportComponent
  },
  {
    path: 'memberassignment',
    component: MemberAssignmentComponent,
    //canActivate: [DataExistsGuard]
  },
  {
    path: 'shift/:dayIndex/:id',
    component: ShiftTasksComponent,
    canActivate: [DataExistsGuard]
  }
];
