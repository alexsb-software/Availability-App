import { Route } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { MemberAssignmentComponent } from '../member-assignment/member-assignment.component';
import { ShiftTasksComponent } from '../member-assignment/day-tasks/shift-tasks/shift-tasks.component';
import { ExcelExportComponent } from '../excel-export/excel-export.component';
export const APP_ROUTES: Route[] = [
    { path: 'v2', component: HomeComponent },
    {
        path: 'excel-export',
        component: ExcelExportComponent
    },
    {
        path: 'memberassignment', component: MemberAssignmentComponent,

    },
    {
        path: 'shift/:dayIndex/:id',
        component: ShiftTasksComponent
    }
];