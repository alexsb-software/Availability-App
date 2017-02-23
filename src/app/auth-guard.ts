import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserAuthService } from './user-auth/user-auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: UserAuthService, private router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authService.loggedIn()) {
            return true;
        }

        this.router.navigate(['login']);
        return false;
    }
}
