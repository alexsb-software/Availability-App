import { Component } from '@angular/core';
import { UserAuthService } from '../user-auth/user-auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-user-login',
    templateUrl: './user-login.component.html',
    styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
    email: string = '';
    password: string = '';

    constructor(private user_auth: UserAuthService, private router: Router){
    }

    onLoginClicked() {
        
        if (this.email && this.password) {
            this.user_auth.login(this.email, this.password).subscribe(
                response => {
                    this.user_auth.setAuthToken(response);
                },
                error => {
                    this.user_auth.setAuthToken(null);
                    console.log(error);
                }
            )
        }
    }

}