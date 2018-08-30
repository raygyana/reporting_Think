import {
    Component, OnInit, AfterViewInit, ViewChild,
    ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SessionObject, ThinkVsInsightSetting } from '../shared';
import { Logger, MyClientServices, TimeOutService } from '../../core';
import { ModalModelOptions, TabsComponent } from '../../components';
import { TabsetComponent } from '../../components/ngtabs';
import { LeftNavUrlSettingService } from './leftNavUrlSetting.service';

declare var $;
@Component({
    selector: 'app-left-nav',
    templateUrl: './left-nav.component.html',
    styleUrls: ['./left-nav.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: []
})
export class LeftNavComponent implements OnInit, AfterViewInit {





    navigationDataInsight: Array<any>;
    navigationDataThink: Array<any>;
    faqRoute: Array<any>;

    mmOptionsLogout: ModalModelOptions;
    mmOptionsDisabled: ModalModelOptions;
    disableHome: boolean;
    visibleHome: boolean;

    disableArchiveFeed: boolean;
    visibleArchiveFeed: boolean;

    disableQualityAssurance: boolean;
    visibleQualityAssurance: boolean;

    disablePushLive: boolean;
    visiblePushLive: boolean;

    disableDynamicReport: boolean;
    visibleDynamicReort: boolean;

    disableFavorites: boolean;
    visibleFavorites: boolean;

    disableEmailAlerts: boolean;
    visibleEmailAlerts: boolean;

    disablePushLivesetting: boolean;
    visiblePushLivesetting: boolean;

    disableLibraryConfig: boolean;
    visibleLibraryConfig: boolean;

    disableAccounts: boolean;
    visibleAccounts: boolean;

    // disableUserManagement: boolean;
    // visisbleeUserManagement: boolean;

    disablePublisherUSer: boolean;
    visiblePublisherUser: boolean;

    disableLibraryUSer: boolean;
    visibleLibraryUser: boolean;

    disableRole: boolean;
    visibleroles: boolean;

    disableManageFavorites: boolean;
    visibleManageFavorites: boolean;

    disableSettings: boolean;
    visibleSettings: boolean;

    disableConfigureReports: boolean;
    visibleConfigureReports: boolean;

    disableSushiPartners: boolean;
    visibleSushiPartners: boolean;

    disablePublisherReports: boolean;
    visiblePublisherReports: boolean;

    disableTools: boolean;
    visibleTools: boolean;

    disableClickToRedirectTools: boolean;
    visibleClickToRedirectTools: boolean;

    disableContactus: boolean;
    visibleContactus: boolean;

    disableFaqs: boolean;
    visibleFaqs: boolean;

    disableIssueTracker: boolean;
    visibleIssueTracker: boolean

    disableSystemLog: boolean;
    visibleSystemLog: boolean;

    disableTrials: boolean;
    visibleTrials: boolean;

    disableSalesReport: boolean;
    visibleSalesReport: boolean;

    disableAccountSearch: boolean;
    visibleAccountSearch: boolean;

    disableCreateAndManageSalesUsers: boolean;
    visibleCreateAndManageSalesUsers: boolean;

    disablePublisherLevelReportThresholdSetting: boolean;
    visiblePublisherLevelReportThresholdSetting: boolean;

    disableSeasonalityAdjustment: boolean;
    visibleSeasonalityAdjustment: boolean;

    disableUserAdministration: boolean;
    visibleUserAdministration: boolean;

    disableUserSavedQuery: boolean;
    visibleUserSavedQuery: boolean;

    userName: string;
    arrayWebmartCode: string[] = [];
    sessionObject: SessionObject;

    navigationData: Array<any>;

    @ViewChild(TabsComponent) tabsComponent;
    private currentClient: string;
    public selectTabName = 'THINKTAB';
    leftNavLogo: string;

    // showUserProfile: boolean;

    constructor(
        private _logger: Logger,
        private router: Router,
        public myClientServices: MyClientServices,
        private timeOutService: TimeOutService,
        private leftNavUrlSettingService: LeftNavUrlSettingService,
        private cdr: ChangeDetectorRef,
        private state: ActivatedRoute
    ) {

        this.currentClient = this.myClientServices.getMyClient();

        // if (this.myClientServices.clinetDetails.project === 'insight') {
        //     this.showUserProfile = false;
        // } else if (this.myClientServices.clinetDetails.project === 'think') {
        //     this.showUserProfile = true;
        // }
        this.makeFaqRoute();
        console.log('statestatestate', this.state.routeConfig);
        // this.faqRoute = ['insight/faqs-']
        // const provedAcess = this.currentClient === 'mit' ? 'mit' : 'other';



        this.disableHome = true;
        this.visibleHome = true;

        this.disableArchiveFeed = true;
        this.visibleArchiveFeed = true;

        this.disableQualityAssurance = true;
        this.visibleQualityAssurance = true;

        this.disablePushLive = true;
        this.visiblePushLive = true;

        this.disableDynamicReport = true;
        this.visibleDynamicReort = true;

        this.disableFavorites = true;
        this.visibleFavorites = true;

        this.disablePushLivesetting = true;
        this.visiblePushLivesetting = true;

        this.disableEmailAlerts = true;
        this.visibleEmailAlerts = true;

        this.disableLibraryConfig = true;
        this.visibleLibraryConfig = true;

        this.disableAccounts = true;
        this.visibleAccounts = true;

        // this.disableUserManagement = true;
        // this.visisbleeUserManagement = true;

        this.disablePublisherUSer = true;
        this.visiblePublisherUser = true;

        this.disableLibraryUSer = true;
        this.visibleLibraryUser = true;

        this.disableRole = true;
        this.visibleroles = true;

        this.disableManageFavorites = true;
        this.visibleManageFavorites = true;

        this.disableSettings = true;
        this.visibleSettings = true;

        this.disableConfigureReports = true;
        this.visibleConfigureReports = true;

        this.disableSushiPartners = true;
        this.visibleSushiPartners = true;

        this.disablePublisherReports = true;
        this.visiblePublisherReports = true;


        this.disableTools = true;
        this.visibleTools = true;

        this.disableClickToRedirectTools = true;
        this.visibleClickToRedirectTools = true;

        this.disableContactus = true;
        this.visibleContactus = true;

        this.disableFaqs = true;
        this.visibleFaqs = true;

        this.disableIssueTracker = true;
        this.visibleIssueTracker = true;

        this.disableSystemLog = true;
        this.visibleSystemLog = true;

        this.disableTrials = true;
        this.visibleTrials = true;

        this.disableSalesReport = true;
        this.visibleSalesReport = true;

        this.disableAccountSearch = true;
        this.visibleAccountSearch = true;

        this.disableCreateAndManageSalesUsers = true;
        this.visibleCreateAndManageSalesUsers = true;

        this.disablePublisherLevelReportThresholdSetting = true;
        this.visiblePublisherLevelReportThresholdSetting = true;

        this.disableSeasonalityAdjustment = true;
        this.visibleSeasonalityAdjustment = true;

        this.disableUserAdministration = true;
        this.visibleUserAdministration = true;

        this.disableUserSavedQuery = true;
        this.visibleUserSavedQuery = true;

        this.sessionObject = SessionObject.getSessionObject();


        const currentUser = this.sessionObject.activeCurrentUser;
        if (currentUser) {
            this.userName = currentUser.firstName + ' ' + currentUser.lastName;
        }

        this.arrayWebmartCode = this.sessionObject.arrayWebmartCode;
        this.doInitialSetup();
        if (this.myClientServices.loginUrl === 'demo') {
            this.leftNavLogo = './assets/demo/images/Think-Logo-white.png'
        } else {
            this.leftNavLogo = `./assets/${this.sessionObject.currentClientCode}/images/logo_header.png`;
        }
    }
    ngOnInit() {


        console.log('left nav', this.tabsComponent);
        if (this.sessionObject.insightAllowed) {
            this.selectTabName = 'INSIGHTTAB';
            // this.tabsComponent.selectTabWithID('INSIGHTTAB');
        } else {
            this.selectTabName = 'THINKTAB';
            // this.tabsComponent.selectTabWithID('THINKTAB');
        }
        console.log('left nav', this.tabsComponent);
        this.setNavigationData();
        this.cdr.detectChanges();
    }


    slimScrollOnResize() {
        window.onresize = () => {
            this.slimScrollSetting();
        }
    }

    slimScrollSetting() {
        const testDiv: any = document.getElementById('testDiv');
        if (testDiv) {
            const h = (window.innerHeight - testDiv.clientHeight) + 'px';
            $('.classForSlimmer').slimScroll({
                color: '#fff',
                size: '5px',
                height: h,
                alwaysVisible: true
            });
        }

    }


    ngAfterViewInit() {
        this.addActiveClassToAnchors();
        this.cdr.detectChanges();
        setTimeout(() => {
            this.slimScrollSetting();
            this.slimScrollOnResize();
        }, 300);
    }

    addActiveClassToAnchors() {
        let parent: any = document.getElementsByName('parentNav');
        parent = Array.from(parent);
        parent.forEach((p) => {
            p.addEventListener('click', (evnet: any) => {
                parent.forEach((p2: any) => {
                    p2.classList.remove('active1')
                })
                p.classList.add('active1')
            })
        })


        let secondChild: any = document.getElementsByName('secondChild');
        secondChild = Array.from(secondChild);
        let childnav: any = document.getElementsByName('childnav');
        childnav = Array.from(childnav);


        secondChild.forEach((c) => {
            c.addEventListener('click', (evnet: any) => {
                childnav.forEach((c2) => {
                    c2.classList.remove('active1')
                })
                secondChild.forEach((c2) => {
                    c2.classList.remove('active1')
                })
                c.classList.add('active1')
            })
        })




        childnav.forEach((c) => {
            c.addEventListener('click', (evnet: any) => {
                childnav.forEach((c2) => {
                    c2.classList.remove('active1')
                })
                secondChild.forEach((c2) => {
                    c2.classList.remove('active1')
                })
                c.classList.add('active1')
            })
        })



    }


    doOnClientChange(whichClient: string) {
        this._logger.debug('LeftNavComponent::', ':doOnClientChange:', whichClient);
        this.sessionObject = SessionObject.getSessionObject();
        for (const currentuser of this.sessionObject.allCurrentUser) {
            if (currentuser.webmartCode === whichClient) {
                this._logger.debug('LeftNavComponent::', ':doOnClientChange:', currentuser);
                this.sessionObject.activeCurrentUser = currentuser;
                this.sessionObject.currentClientCode = this.sessionObject.activeCurrentUser.webmartCode;
                break;
            }
        }
    }

    doInitialSetup() {
        this.mmOptionsLogout = new ModalModelOptions();
        this.mmOptionsLogout.id = 'checkLogout';
        this.mmOptionsLogout.captionHeading = 'Logout';
        this.mmOptionsLogout.bodyMessage = 'Do you want to logout?';
        this.mmOptionsLogout.button1 = 'No';
        this.mmOptionsLogout.button2 = 'Yes';
        this.mmOptionsLogout.showInput = false;

        this.mmOptionsDisabled = new ModalModelOptions();
        this.mmOptionsDisabled.id = 'linkDisable';
        this.mmOptionsDisabled.captionHeading = 'Alert!';
        this.mmOptionsDisabled.bodyMessage = 'These reports will be available on request!';
        // this.mmOptionsDisabled.button1 = 'No';
        this.mmOptionsDisabled.button2 = 'Ok';
        this.mmOptionsDisabled.showInput = false;

    }

    public doOnLogoutClick() {
        console.log('doOnLogoutClick');
        // this.mmOptionsLogout.showInput = true;
        this.mmOptionsLogout.bodyMessage = 'Do you want to logout?';
        console.log(this.mmOptionsLogout);
        this.cdr.detectChanges();
    }

    public doOnLogout(event: any) {
        console.log(event);
        SessionObject.removeSessionObject();
        this.timeOutService.clearCheckTimeOutSubcription();
        if (this.currentClient) {
            this.router.navigate(['/' + this.myClientServices.loginUrl + '/login']);
        } else {
            this.router.navigate(['/']);
        }
        this.cdr.detectChanges();
    }

    diabledKeyborad(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
        }
    }

    makeFaqRoute() {
        const client = this.myClientServices.getMyClient();
        this.faqRoute = [`insight/faqs-${client}`];
    }
    closeOtherCard() {
        let showList: any = document.getElementsByClassName('show');
        showList = Array.from(showList);
        showList.forEach((ele) => {
            ele.classList.remove('show');
        })

    }


    setNavigationData() {
        if (this.sessionObject.userAccess === 'insight') {

            this.navigationDataInsight = this.leftNavUrlSettingService.createAccessForInsight();
        } else {
            this.navigationDataThink = this.leftNavUrlSettingService.myAccess[this.currentClient];
        }

    }



    onClickUserProfile() {
        if ((this.myClientServices.clientDetails && this.myClientServices.clientDetails.project) === 'think') {

        } else {
            this.router.navigate([this.myClientServices.clientDetails.url + '/pages/insight/userprofile'])
        }
    }

}

