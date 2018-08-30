import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { SessionObject } from '../shared/session-object';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from '../shared/constant';
import { MyClientServices } from '../../core';
import { ProjectUtils } from '../shared';
import { DashboardService } from './dashboard.service';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

    constants: Constants;
    currentMonthStr: string;
    liveYear: number;
    _subscription: Subscription;
    showDashboard: boolean;
    showIncrease: boolean;
    showHighestIP: boolean;
    moreHighestIP: boolean;

    showAnalysisChart: boolean;
    showUnidentifiedIp: boolean;
    showLicenceDenial: boolean;
    chartType: 'bar';
    headerMessage: string;
    //    highestIPDetailsMessage: string;
    //    unidentifiedIPDetailMessage: string;
    //    licenceDenialMessage: string;
    currentClient: string;

    dashBoardItems: any;

    constructor(
        route: ActivatedRoute,
        protected myClientServices: MyClientServices,
        private router: Router,
        private dashboardService: DashboardService) {
        const sessionObject: SessionObject = SessionObject.getSessionObject();
        if (sessionObject.activeCurrentUser.userType === 'LibraryClients') {
            this.router.navigate(['library'], { relativeTo: route });
        }

        this.dashBoardItems = ProjectUtils.getDashBoardItems();

        this.constants = new Constants();
        //        this.highestIPDetailsMessage = 'Top %d Highest Accessing IPs ';
        //        this.unidentifiedIPDetailMessage = 'Top %d Unidentified Full-Text Requests';
        //        this.licenceDenialMessage = 'Identified Licence Denial';





        this.currentClient = this.myClientServices.getMyClient();
        this.showDashboard = true;
        this.showIncrease = true;
        this.showHighestIP = true;
        this.moreHighestIP = false;
        this.showAnalysisChart = true;
        this.showUnidentifiedIp = true;
        this.showLicenceDenial = true;
    }

    ngOnInit() {
        this.subFullTestSub();
    }

    doOnHighestIPMoreClick() {
        this.moreHighestIP = true;

        this.showDashboard = false;
        this.showIncrease = false;
        this.showHighestIP = true;
        this.showAnalysisChart = false;
        this.showUnidentifiedIp = false;
        this.showLicenceDenial = false;
    }

    subFullTestSub() {
        const temp = 'Full-Text Analysis for';
        this.dashboardService.fullTextSub
            .subscribe((data) => {
                this.headerMessage = temp;

                if (data === 'DATABASES') {
                    this.headerMessage = this.headerMessage.replace('Full-Text', data);
                }
            })
    }

    ngOnDestroy() {
        this._subscription.unsubscribe();
    }

}
