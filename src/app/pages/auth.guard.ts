import { Injectable, isDevMode } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { SessionObject } from './shared/session-object';
import { TimeOutService } from '../core/timeOut/timeOut.service';
import { MyClientServices } from '../core/core';
@Injectable()
export class AuthGuard implements CanActivate {
    private isDevMode = isDevMode();

    private currentClient: string;

    constructor(
        private router: Router,
        private timeOutService: TimeOutService,
        private myClientServices: MyClientServices) {
        this.timeOutService.setCheckTimeOut();
        this.currentClient = myClientServices.getMyClient();
        console.log('this.currentClient', this.currentClient);

    }


    ifisDevMode() {
        if (this.isDevMode) {
            return false;
        } else {
            return true;
        }
    }


    canActivate(): Promise<boolean> {
        console.log('AuthGuard1');
        const sessionObject: SessionObject = SessionObject.getSessionObject();
        if ((null !== sessionObject)
            && (sessionObject.clientID !== undefined)
            && (sessionObject.activeCurrentUser.userCode !== '')
        ) {
            // // logged in so return true
            return new Promise((resolve, reject) => {
                this.timeOutService.isTimeOutSilent()
                    .then(() => {
                        this.router.navigate(['/' + this.myClientServices.loginUrl + '/login/']);
                        resolve(false);
                    })
                    .catch(() => {
                        this.timeOutService.setNewTimeOut()
                            .then(() => {
                                console.log('New Time out Set')
                            })
                        resolve(true);
                    })
            })



        }
    }
}
