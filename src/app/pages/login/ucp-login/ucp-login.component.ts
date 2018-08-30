import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { LoginCoreComponent } from '../login.core';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { SessionObject } from '../../shared/session-object';
import { UserDetails } from '../../shared/user-detail';

import { BaseComponent } from '../../../core/base/base.component';
import { LoaderService } from '../../../core/loader/loader.service';

import { AuthenticationService } from '../authentication.service'
import { SaveSearchService } from '../../../pages/shared/save-search-service';
import { TimeOutService } from '../../../core/timeOut/timeOut.service';
import { MyClientServices } from '../../../core/core';
import { commonHtml } from '../common-login.html';
@Component({
  selector: 'app-ucp-login',
  template: commonHtml(),
  styleUrls: ['./ucp-login.component.css']
})
export class UcpLoginComponent extends LoginCoreComponent implements OnInit {
  loginImgUrl = './assets/ucp/images/logo.png'
  constructor(protected loaderService: LoaderService,
    protected _zone: NgZone,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected saveSearchService: SaveSearchService,
    protected _authenticationService: AuthenticationService,
    protected timeOutService: TimeOutService,
    protected myClientServices: MyClientServices) {
    super(
      loaderService,
      _zone,
      activatedRoute,
      router,
      saveSearchService,
      _authenticationService,
      timeOutService,
      myClientServices);
  }

  ngOnInit() {
  }

}

