import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { MyClientServices } from './myClient.service';
import { SessionObject } from '../../../pages/shared';


declare var $;

@Injectable()
export class MyClientAuthGuard implements CanActivate {
      disableTheseClients = ['mit'];


      constructor(
            private myClientServices: MyClientServices,
            private router: Router
      ) { }
      canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
            return new Promise((resolve, reject) => {
                  // const myClient = this.myClientServices.getMyClient();
                  // const isDiabledThisClient = this.disableTheseClients.find((item) => {
                  //       return myClient === item;
                  // })
                  const sessionObj: SessionObject = SessionObject.getSessionObject();
                  if (sessionObj.activeCurrentUser.userStatus === 'New' && sessionObj.userAccess === 'insight') {
                        $('#linkDisable').modal('show');
                        this.router.navigate(['/' + this.myClientServices.loginUrl + '/pages/insight/changepswd'
                        ]);
                        resolve(false);
                  } else {
                        resolve(true);
                  }

                  const isDiabledThisClient = state.url.includes('disabledPath');
                  if (isDiabledThisClient) {
                        $('#linkDisable').modal('show');
                        resolve(false);
                  } else {
                        resolve(true);
                  }
            })
      }
}
