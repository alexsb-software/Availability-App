import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class UserAuthService implements OnInit {

    private auth_token: string = null;
    private login_api_link = '../../api/login.php';
    private logout_api_link = '../../api/logout.php';

    constructor(private http: Http) {

    }

    ngOnInit() {

    }

    login(email: string, password: string): Boolean {
        let data = {};
        data['email'] = email; data['password'] = password;
        let body = JSON.stringify(data);
        this.sentLoginRequest(body).subscribe(
            response => {
                if (response) {
                    this.auth_token = response;
                    return true;
                } else {
                    return false;
                }
            },
            error => {
                console.log(error);
                return false;
            }
        );
        return false;
    }

    sentLoginRequest(body): Observable<string> {
        return this.http.post(this.login_api_link, body).map((res: Response) => <string>res.headers['Authorization']);
    }

    loggedIn(): Boolean {
        return this.auth_token != null;
    }

    logout(): void {
        let headers = new Headers({ 'Authorization': this.auth_token });
        let options = new RequestOptions({ headers: headers });
        this.http.post(this.logout_api_link, {}, headers).map((res: Response) => <number>res.status);
        this.auth_token = null;
    }

    authorizedPost(body: any, urlLink: string, headers?: any) {
        if (!this.auth_token) {
            console.debug("Unauthorized");
            return;
        }
        if (!headers) headers = new Headers({ 'Authorization': this.auth_token });

        return this.http.post(urlLink, body, headers).map((res: Response) => <number>res.status);
    }

    authorizedGet(urlLink: string, headers?: any): Observable<Response> {
        if (!this.auth_token) {
            console.debug("Unauthorized");
            return;
        }
        if (!headers) headers = new Headers({ 'Authorization': this.auth_token });
        let options: RequestOptions = new RequestOptions({ headers: headers });

        return this.http.get(urlLink, options);
    }
}