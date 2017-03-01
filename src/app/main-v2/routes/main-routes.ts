import { Route } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { MemberAssignmentComponent } from '../member-assignment/member-assignment.component';
import { DayTasksComponent } from '../day-tasks/day-tasks.component';
import { ShiftTasksComponent } from '../day-tasks/shift-tasks/shift-tasks.component';

export const APP_ROUTES: Route[] = [
    { path: 'v2', component: HomeComponent },
    {
        path: 'member-assignment', component: MemberAssignmentComponent,
        children: [{ path: 'day-assignment/:id', component: DayTasksComponent, children: [{ path: 'shift/:id', component: ShiftTasksComponent }] }]
    },
    { path: '', component: HomeComponent }
];