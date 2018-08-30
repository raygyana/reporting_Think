import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { UserDetails } from '../shared/user-detail';
import { Constants } from '../shared/constant';
import { SessionObject } from '../shared/session-object';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { Utils } from '../shared/utils'
import { HttpService } from '../../core/http.service';
// import 'rxjs/add/operator/map'
import { map } from 'rxjs/operator/map';
import 'rxjs/add/operator/catch';
import { TimeOutService } from '../../core/timeOut/timeOut.service';

@Injectable()
export class AuthenticationService {

    public token: string;

    constructor(private httpService: HttpService,
        private timeOutService: TimeOutService) {
        // set token if saved in local storage
    }

    login(username: string, password: string): Observable<UserDetails[]> {
        const body = 'username=' + username + '&password=' + password;
        return this.httpService.extractPostData(Constants.LOGIN_URL, body, null)
            .map(this.extractData)
            .catch(this.handleError);
    }


    // login_old(username: string, password: string, publisher: string): Observable<UserDetails[]> {
    //     const body = 'user=' + username + '&pwd=' + password + '&publisher=' + publisher;
    //     return this.httpService.extractPostDataInsight(Constants.OLD_LOGIN_URL, body, null)
    //         .map(this.extractData)
    //         .catch(this.handleError);
    // }


    logout(): void {
        // clear token remove user from local storage to log user out
        console.log('Logout called....');
        this.timeOutService.clearCheckTimeOutSubcription();
        this.token = null;
        SessionObject.removeSessionObject();
    }

    private extractData(res: Response) {
        console.log(res);
        const body = res; // .json();
        return body || [];
    }

    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        const errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

}

