import { Route } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { MemberAssignmentComponent } from '../member-assignment/member-assignment.component';

export const APP_ROUTES: Route[] = [
    { path: 'v2', component: HomeComponent },
    { path: 'assignment', component: MemberAssignmentComponent },
    { path: '', component: HomeComponent }
];