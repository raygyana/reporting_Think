import {
    Component, OnInit,
    AfterContentInit, AfterViewInit
} from '@angular/core';
import {
    Router, Event as RouterEvent, NavigationStart,
    NavigationEnd, NavigationCancel, NavigationError, RouteConfigLoadStart,
    ActivatedRoute, Routes
} from '@angular/router';

import { ModalModelOptions } from './components'
import { Log, Level } from 'ng2-logger'
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { UrlForAllClients } from './pages/pages.routing';

import { MyClientServices, LoaderService, TimeOutService } from './core';
import { Utils, ProjectUtils } from './pages/shared';
import { routes as LoginRoutes } from './pages/login/login.routing';
declare var $;

import { environment } from '../environments/environment.prod';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterContentInit, AfterViewInit {

    version = environment.version;

    urlForAllClients: UrlForAllClients;
    myTimer: Observable<any> = Observable.interval(1000);
    myTimerSub: Subscription;
    AppMMOtions: ModalModelOptions
    dynamicRoutes: Routes;
    currentClient: string;

    constructor(
        private timeOutService: TimeOutService,
        private router: Router,
        private loaderService: LoaderService,
        private myClientServices: MyClientServices
    ) {
        this.makeDynamicRoutes();
        this.setLoggerSetting();
        this.myRouterEvents();
        // Log.setProductionMode();
        // Log.onlyLevel(Level.ERROR);
    }



    ngOnInit() {
        this.timerSetting();
    }

    ngAfterContentInit() {
        this.doInitialSetup();
    }

    ngAfterViewInit() {
        this.addCKEditor()
    }

    onCLickPage() {
        const url = this.router.url;
        if (!url.includes('login')) {
            this.timeOutService.setNewTimeOut().then();
        }
    }



    doInitialSetup() {
        this.AppMMOtions = new ModalModelOptions();
        this.AppMMOtions.id = 'AppComponenet';
        this.AppMMOtions.captionHeading = 'Alert!';
        this.AppMMOtions.bodyMessage = '-';
        this.AppMMOtions.button2 = 'OK';
        // this.AppMMOtions.button2 = 'Save';
        // this.AppMMOtions.showInput = true;

    }

    doOnModalSubmit(e: any) {
        if (!this.myTimerSub.closed) {
            this.myTimerSub.unsubscribe();
            this.timeOutService.setNewTimeOut();
            this.timeOutService.setCheckTimeOut();
        }
    }

    setLoggerSetting() {
        //    Log.setProductionMode();
        //    Log.onlyModules('src:books', 'src:records', 'src:page:login');
        //    Log.onlyLevel(Level.ERROR, Level.INFO);
    }




    getLoaderName() {
        return 'AppLoader';
    }


    myRouterEvents() {
        if (!this.router.navigated) {
            this.makeDynamicRoutes();
        }

        this.router.events.subscribe((event: RouterEvent) => {
            if (event instanceof RouteConfigLoadStart) {
                this.loaderService.showNow('AppLoader');
            } else if (event instanceof NavigationEnd) {
                if (this.router.url.includes('login')) {
                    this.makeDynamicRoutes();
                }
                this.loaderService.hideNow('AppLoader');
            } else if (event instanceof NavigationCancel) {
                this.loaderService.hideNow('AppLoader');
            } else if (event instanceof NavigationError) {
                this.loaderService.hideNow('AppLoader');
            }
        })
    }





    makeDynamicRoutes() {
        this.dynamicRoutes = [];
        this.myClientServices.sendMyClient(window.location.href);
        this.currentClient = this.myClientServices.getMyClient();
        const myDashboard = this.myClientServices.getFirstPage();

        this.urlForAllClients = new UrlForAllClients(this.myClientServices.loginUrl, myDashboard);
        LoginRoutes.forEach((item) => {
            this.dynamicRoutes.push(item);
        });

        this.urlForAllClients.clientRoutes.forEach(element => {
            this.dynamicRoutes.push(element);
        });

        this.router.resetConfig(this.dynamicRoutes);
        console.log('this.dynamicRoutes', this.dynamicRoutes);

        if (this.currentClient) {
            this.myClientServices.myDynamicCss(this.currentClient);
        }

    }


    timerSetting() {
        this.timeOutService.LogOutAtTimeOut
            .subscribe((data) => {

                if (!this.router.url.includes('login')) {
                    $(`#${this.AppMMOtions.id}`).modal('show');
                    $(`#checkLogout`).modal('hide');
                    this.myTimerSub = this.myTimer
                        .subscribe((count) => {
                            this.AppMMOtions.bodyMessage = `Session will time out in ${30 - count} secs!`;
                            if (count === 30) {
                                this.timeOutService.clearSession();
                                this.myTimerSub.unsubscribe();
                                this.router.navigate(['/' + this.currentClient])
                                    .then((r) => {
                                        console.log('login', r)
                                        this.AppMMOtions.bodyMessage = `Session Timed Out!`;
                                    }).catch((e) => {
                                        console.log('Not login', e)
                                    })
                            }
                        });
                } else {
                    console.log('unsubscribe from App')
                    data.unsubscribe();
                }





            })
    }


    addCKEditor() {
        const url = './assets/js/ckeditor/ckeditor.js'
        Utils.loadJS(url);

        if (this.myClientServices.clientDetails.project === 'think') {
            ProjectUtils.loadCss('./assets/think/think.css', 'think-css');
        }

        //  Utils.loadJS('https://cdn.ckeditor.com/4.5.11/full/ckeditor.js');
    }
}

