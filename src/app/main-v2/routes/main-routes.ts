import { Route } from '@angular/router';
import { HomeComponent } from '../home/home.component';

export const APP_ROUTES: Route[] = [
    { path: 'v2', component: HomeComponent },
    { path: '', component: HomeComponent }
];