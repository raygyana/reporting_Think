import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { SessionObject } from '../shared';
import { MyClientServices, TimeOutService } from '../../core';
@Injectable()
export class LoginGuard implements CanActivate {

      constructor(
            protected myClientServices: MyClientServices,
            protected router: Router,
            protected timeOutService: TimeOutService
      ) { }


      canActivate(): Promise<boolean> {
            return new Promise((resolve, reject) => {
                  const sessionObject: SessionObject = SessionObject.getSessionObject();

                  if ((null !== sessionObject)
                        && (sessionObject.clientID !== undefined)
                        && (sessionObject.activeCurrentUser.userCode !== '')
                  ) {


                        console.log('LoginGuard1');
                        this.timeOutService.isTimeOutSilent()
                              .then(() => {
                                    console.log('isTimeOut true');
                                    resolve(true);
                              })
                              .catch(() => {
                                    console.log('isTimeOut false');
                                    console.log('I am routing to Dashboard');
                                    const defaultPath = this.myClientServices.loginUrl + '/pages/';
                                    this.router.navigate(['/' + defaultPath])
                                          .then((e) => {
                                                console.log('then', e)
                                          }, (e) => {
                                                console.log('then catch', e)
                                                reject(false)
                                          })
                                          .catch((e) => {
                                                console.log('catch, e')
                                          })

                                    console.log('resolve false')
                                    resolve(false);
                              })

                  } else {
                        resolve(true)
                  }

            })
      }
}
