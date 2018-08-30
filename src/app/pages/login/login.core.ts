import { Component, NgZone, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {
      SessionObject, UserDetails, SaveSearchService, GlobalSettings, ProjectUtils, Utils
} from '../shared';
import {
      BaseComponent, LoaderService, TimeOutService,
      MyClientServices
} from '../../core';

import { AuthenticationService } from './authentication.service'

export abstract class LoginCoreComponent extends BaseComponent implements OnDestroy {
      model: any = {};
      loading = false;
      error = ``;
      userDetail: Array<any>;
      oldOrNew = false;
      retMsg: string;
      loginFunction: any;
      showForgetPasswordLinkForInsight: boolean;
      constructor(
            protected loaderService: LoaderService,
            protected _zone: NgZone,
            protected activatedRoute: ActivatedRoute,
            protected router: Router,
            protected saveSearchService: SaveSearchService,
            protected _authenticationService: AuthenticationService,
            protected timeOutService: TimeOutService,
            protected myClientServices: MyClientServices
      ) {
            super(loaderService);
            console.log('Where are you....');
            window['angularComponentRef'] = { component: this, zone: _zone };
            console.log('reference added');
            this.setMyLoginFunctions();
            this.showForgetPasswordLinkForInsight = (myClientServices.clientDetails.project === 'insight');

      }

      getLoaderName(): string {
            return 'Login';
      }

      callFromOutside(value) {
            // this.zone.run(() => {
            console.log('calledFromOutside ' + value);
            // window['angularComponent'].zone.run(() => {
            //     runThisFunctionFromOutside();
            // });
            // this.someValue = value;
            // });
      }

      AfterLogin(result: any) {

            const res = result.userDetail;
            const sessionObject: SessionObject = new SessionObject();
            sessionObject.insightAllowed = true;
            sessionObject.allCurrentUser = res;
            sessionObject.activeCurrentUser = res[0];
            sessionObject.currentClientCode = res[0].webmartCode;
            sessionObject.userAccess = 'insight';
            sessionObject.userType = res[0].userType === 'Publisher' ? 'admin' : 'user';
            sessionObject.userStatus = res[0].userStatus === 'Live' || 'New';
            console.log(res[0].webmartCode);

            const tempArrayWebmartCode: string[] = [];

            for (const userDetail of res) {
                  console.log(res[0].webmartCode);
                  if (userDetail.webmartCode !== ``) {
                        tempArrayWebmartCode.push(res[0].webmartCode);
                  } else {
                        tempArrayWebmartCode.push('demo');
                  }
            }
            console.log(tempArrayWebmartCode);
            const arrayWebmartCode = Array.from(new Set(tempArrayWebmartCode));
            console.log(arrayWebmartCode);
            sessionObject.arrayWebmartCode = arrayWebmartCode;
            console.log(SessionObject.getSessionObject());
            this.doAfterSuccessLoginCommon(sessionObject, false);

      }

      fadeAlertBox() {

            this.retMsg = 'Username or password is incorrect';
            $('#alertBox').fadeIn();
            setTimeout(function () {
                  $('#alertBox').fadeOut();
            }, 3500);
      }

      thinkLogin() {
            this.showLoader();
            this.loading = true;
            console.log('into login');

            this._authenticationService
                  .login(this.model.username, this.model.password)
                  .finally(() => {
                        this.hideLoader();
                  })
                  .subscribe((data: any) => {
                        console.log('_authenticationService New Login ', data);
                        this.resopndToLoginStatus(data);
                  });
            this.loading = false;
      }


      xtBaseOnDestroy() {
            window['angularComponent'] = null;
      }

      doInInitLoad() {
            this.activatedRoute.params.subscribe(params => {
                  // let userId = params['userId'];
                  console.log(params);
            });
            console.log(this);
            console.log(this.model);
            console.log('I am here....');
            this._authenticationService.logout();
      }

      resopndToLoginStatus(data: any) {
            const status = data.status;
            // #   code - value
            // #   1000 - true
            // #   1001 - error-There is no user with username of "username"
            // #   1002 - error-Password for account "username" was incorrect
            // # 1003 - error-The account for "username" is locked.Please contact your administrator to unlock it.
            // #   1004 - error-Unexpected Error
            // #   1005 - error-wrong parameters
            // #   1006 - false
            this.retMsg = ``;
            switch (status) {
                  case '1000': // this.myClientServices.checkFromNewLogin(true);
                        this.doAfterSuccessLoginCommon(null, true);
                        break;
                  case '1001': // this.retMsg =  `There is no user with username of "${this.model.username}"`;
                  //                         break;
                  case '1002': // this.retMsg =  `Password for account "${this.model.username}" is incorrect`;
                  // break;
                  case '1003': // this.retMsg =  `The account for username "${this.model.username}" is locked.Please contact your administrator to unlock it.`;
                  // break;
                  case '1004': // throw new Error('Unexpected Error.');
                  case '1005': // throw new Error('wrong parameters.');
                  case '1006': this.retMsg = `You have entered an invalid username or password!`;
                        break;
                  default: this.retMsg = `You have entered an invalid username or password!`;
                        console.warn('No login status is matching...');
                        break;
            }

            if (this.retMsg) {
                  this.fadeAlertBox();
            }

      }


      doAfterSuccessLoginCommon(sessionObject: SessionObject, isThink: boolean) {
            if (sessionObject === null) {
                  sessionObject = new SessionObject();
                  sessionObject.activeCurrentUser = new UserDetails();
                  sessionObject.userAccess = 'think';
                  sessionObject.activeCurrentUser.firstName = this.myClientServices.loginUrl.toUpperCase();
                  sessionObject.activeCurrentUser.lastName = ' User';
                  sessionObject.currentClientCode = this.myClientServices.getMyClient();
                  sessionObject.thinkAllowed = true;
            }
            sessionObject.savedSearches = [];
            sessionObject.clientID = this.myClientServices.getMyClient();
            sessionObject.currentClientLoginUrl = this.myClientServices.loginUrl;
            sessionObject.currentClientDashBoard = this.myClientServices.getFirstPage();
            console.log('activeCurrentUser', JSON.stringify(sessionObject.activeCurrentUser));
            this.setGlobalSetting(sessionObject, this.myClientServices.getMyClient());
            SessionObject.setSessionObject(sessionObject);
            this.saveSearchService.loadSearchesFromServer();
            if (sessionObject.activeCurrentUser.userStatus === 'New') {
                  this.router.navigate(['/' + this.myClientServices.loginUrl + '/pages/insight/changepswd'
                  ]);
            } else {
                  this.router.navigate(['/' + this.myClientServices.loginUrl + '/pages/' +
                        this.myClientServices.getFirstPage()
                  ]);
            }
            this.timeOutService.setNewTimeOut()
                  .then(() => {
                        this.timeOutService.setCheckTimeOut();
                  })
      }

      setGlobalSetting(sessionObject: SessionObject, clientID: string) {
            switch (clientID) {
                  case 'ucp':
                        sessionObject.clientSettings = GlobalSettings.UCP_UI_SETTING;
                        break;
                  case 'php':
                        sessionObject.clientSettings = GlobalSettings.PHP_UI_SETTING;
                        break;
                  case 'mit':
                        sessionObject.clientSettings = GlobalSettings.MIT_UI_SETTING;
                        break;
            }
      }

      setMyLoginFunctions() {

            const clientID = this.myClientServices.getMyClient();
            switch (clientID) {
                  //  thinkLogin*************thinkLogin*************thinkLogin
                  case 'ucp':
                        this.loginFunction = this.thinkLogin;
                        break;
                  case 'php':
                        this.loginFunction = this.thinkLogin;
                        break;
                  case 'mit':
                        this.loginFunction = this.thinkLogin;
                        break;
                  //  thinkLogin*************thinkLogin*************thinkLogin
                  //  insightLogin*************insightLogin*************insightLogin
                  //  insightLogin*************insightLogin*************insightLogin
                  default: this.loginFunction = this.thinkLogin;
                        break;
            }
      }

}
