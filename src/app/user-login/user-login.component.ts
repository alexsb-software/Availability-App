import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../user-auth/user-auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-user-login',
    templateUrl: './user-login.component.html',
    styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
    email: string = '';
    password: string = '';
    returnUrl: string;
    mssg: string;

    constructor(private user_auth: UserAuthService,
     private router: Router,
     private route: ActivatedRoute){
    }

    ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/aval';
    }

    onLoginClicked() {
        
        if (this.email && this.password) {
            this.user_auth.login(this.email, this.password).subscribe(
                response => {
                    if (!response) 
                        this.mssg = "Invalid email or password.";
                    else {
                        this.user_auth.setAuthToken(response);
                        this.router.navigateByUrl(this.returnUrl);
                        this.mssg = "Welcome Back.. Redirecting you.";
                    }
                },
                error => {
                    this.user_auth.setAuthToken(null);
                    console.log(error);
                    this.mssg = "Login failed make sure that the email and password is correct or contact us.";
                }
            )
        }
    }

}