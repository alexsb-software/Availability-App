import { Route } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { MemberAssignmentComponent } from '../member-assignment/member-assignment.component';
import { DayTasksComponent } from '../day-tasks/day-tasks.component';

export const APP_ROUTES: Route[] = [
    { path: 'v2', component: HomeComponent },
    {
        path: 'assignment', component: MemberAssignmentComponent,
        children: [{ path: 'day-assignment/:id', component: DayTasksComponent }]
    },
    { path: '', component: HomeComponent }
];