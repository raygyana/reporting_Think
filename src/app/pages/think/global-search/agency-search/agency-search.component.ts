import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
// Import from III party
import { DataTableDirective } from 'angular-datatables';
import { TabsetComponent } from '../../../../components/ngtabs';
import { TabsComponent } from '../../../../components/ng-tabs/tabs.component';
import { DataDropDownOptions } from '../../../../components/data-drop-down/data-drop-down.model';
import { DataDropDownComponent } from '../../../../components/data-drop-down/data-drop-down.component';
import { ThinkListDisplaySearchComponent } from '../../../../components/think-list-display-search/think-list-display-search.component';

import { Logger } from '../../../../core/logger/logger';
import { LoaderService } from '../../../../core/loader/loader.service';
import { BaseComponent } from '../../../../core/base/base.component';
import { ProjectUtils } from '../../../shared/project-utils';
import { Constants } from '../../../shared/constant';
import { SessionObject } from '../../../shared/session-object';
import { ChangeService } from '../../../shared/change-service';
import { SaveSearchService } from '../../../shared/save-search-service';
import { GlobalService } from '../../../shared/global.service';

import { SalesSummaryListService } from '../../sales/sales-summary-search/sales-summary-search.service';

import { AgencyListService } from './agency-search.service';
import { AgencySearchModel } from './agency-search.model';


@Component({
    selector: 'app-agency-search',
    templateUrl: './agency-search.component.html',
    styleUrls: ['./agency-search.component.css'],
    providers: [AgencyListService, SalesSummaryListService]
})
export class AgencySearchComponent extends BaseComponent {
    ngcountry: any;
    ngregion: any;
    private AGENCY_LIST = 'AGENCY_LIST';
    private SALES_REPORT = 'SALES_REPORT';

    agencySearchModel: AgencySearchModel;
    ddOptionsReg: DataDropDownOptions;
    ddOptionsCountry: DataDropDownOptions;
    ddTrigger: Subject<any> = new Subject();

    dtSalesOptions: any = {};
    @ViewChild(DataTableDirective) dtElement: DataTableDirective;
    @ViewChild('agencyList') agencyListTemplate;
    @ViewChild(TabsComponent) tabsComponent;
    @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;
    @ViewChild('salesReport') salesReportTemplate;
    @ViewChild('salesReportData', { read: DataTableDirective }) dtSalesElement: DataTableDirective;

    @ViewChild('region', { read: DataDropDownComponent }) ddRegion: DataDropDownComponent;
    @ViewChild('country', { read: DataDropDownComponent }) ddCountry: DataDropDownComponent;

    constructor(private router: Router,
        protected loaderService: LoaderService,
        private _logger: Logger,
        private agencyListService: AgencyListService,
        protected globalService: GlobalService,
        protected salesSummaryListService: SalesSummaryListService,
        protected changeService: ChangeService,
        protected saveSearchService: SaveSearchService) {
        super(loaderService, changeService, saveSearchService, agencyListService, globalService);
        this.doInitialSetup();
    }


    doInitialSetup() {
        this.ddOptionsReg = new DataDropDownOptions();
        this.ddOptionsReg.serviceURL = Constants.TK_REGION_SEARCH_URL;
        this.ddOptionsReg.keyName = 'region';
        this.ddOptionsReg.keyDesc = 'description';
        this.ddOptionsReg.firstOptionText = 'Select a Region';
        this.ddOptionsReg.baseComponent = this;
        this.ddOptionsReg.modelName = 'region';


        this.ddOptionsCountry = new DataDropDownOptions();
        this.ddOptionsCountry.serviceURL = Constants.TK_COUNTRY_SEARCH_URL;
        this.ddOptionsCountry.keyName = 'country';
        this.ddOptionsCountry.keyDesc = 'description';
        this.ddOptionsCountry.firstOptionText = 'Select a Country';
        this.ddOptionsCountry.baseComponent = this;
        this.ddOptionsCountry.modelName = 'country';

        this.salesListSetup();
    }

    // override
    getLoaderName(): string {
        return 'agency-search';
    }

    doInInitLoad() {
        console.log(this.agencySearchModel.region, ProjectUtils.getIds(this.agencySearchModel.region));
        if (!ProjectUtils.isEmpty(this.agencySearchModel.region)) {
            this.getCountryDropDownData(this.agencySearchModel.region[0], false);
        }
    }


    // override
    getSearchModel(): any {
        console.log(this.agencySearchModel);
        if (ProjectUtils.isEmpty(this.agencySearchModel)) {
            this.agencySearchModel = this.sessionObject.agencySearch;
            if (ProjectUtils.isEmpty(this.agencySearchModel)) {
                this.agencySearchModel = new AgencySearchModel();
                this.agencySearchModel.limit = this.sessionObject.limit

            }
            this.ngregion = this.agencySearchModel.region;
            this.ngcountry = this.agencySearchModel.country;
        }
        console.log(this.agencySearchModel);
        return this.agencySearchModel;
    }

    // override
    getSearchType(): string {
        return 'agencySearch';
    }

    // override
    getTabsComponent(): any {
        return this.tabsComponent;
    }

    // used by Country Drop down to populate values
    getddTrigger() {
        return this.ddTrigger;
    }

    // override
    getDataElement(whichService: string): DataTableDirective {
        console.log(whichService);
        if (whichService === this.AGENCY_LIST) {
            return this.dtElement;
        } else { // this.SALES_REPORT
            console.log(this.dtSalesElement);
            return this.dtSalesElement;
        }
    }

    // override
    getServiceName(): string {
        return this.AGENCY_LIST;
    }

    // override
    openListTab() {
        this.tabsComponent.openTab('Agency Search List',
            this.agencyListTemplate, {}, true, 'agencyList');
    }

    // override
    getDispSearch(): ThinkListDisplaySearchComponent {
        return this.dispSearch;
    }
    // override
    getReportTitle(): string {
        return 'Agency Search Report';
    }
    getReportIcon(): string {
        return 'fa fa-search';
    }
    // override
    getReportFileName(): string {
        return 'agencySearchReport';
    }
    // override
    setSearchModel(searchModel: any) {
        console.log('setSearchModel: searchModel', searchModel);
        if (!ProjectUtils.isEmpty(searchModel)) {
            if (typeof searchModel === 'string') {
                this.agencySearchModel = JSON.parse(searchModel);
            } else {
                this.agencySearchModel = searchModel;
            }
        }

        if (this.agencySearchModel.limit === '') {
            this.agencySearchModel.limit = 0;
        }


        console.log('setSearchModel', this.agencySearchModel);
        this.ngregion = this.setDropDownComponentValue('region');

        if (!ProjectUtils.isEmpty(this.agencySearchModel.region)) {
            this.ngcountry = this.setDropDownComponentValue('country');
        } else {

            this.ngcountry = [];
        }



        //this.ngcountry = this.setDropDownComponentValue('country');
        ProjectUtils.setAgencySearch(this.sessionObject, this.agencySearchModel);
    }


    salesListSetup() {
        this.dtSalesOptions = ProjectUtils.doOptionSettingsFull('agencySalesReport', 'Agency Sales Report');
        this.agencyListService.addColumnsOptionAgencySales(this.dtSalesOptions);
        this.dtSalesOptions['data'] = [];
    }

    openSalesReport() {
        if (this.isRowSelected()) {
            this.showLoader();
            // console.log('openSalesReport', 'this.dtElement', this.dtElement);
            // console.log('openSalesReport', 'this.dtSalesElement', this.dtSalesElement);
            this.tabsComponent.openTab('Sales Report',
                this.salesReportTemplate, {}, true, 'salesReport');
            // load Sales report
            let body = '';
            body += this.agencyListService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());
            body += this.agencyListService.setParamValue(body, 'agencyName', this.selectedRow['customer_id']);
            // body += this.agencyListService.setParamValue(body, 'publisherID', this.selectedRow['pub_id']);
            body += this.getBodyLimit(body, this.agencySearchModel.limit);
            this.agencyListService.getAgencySales(body)
                .subscribe(data => {
                    console.log(data);
                    this.setListData(this.SALES_REPORT, data);
                }, err => {
                    this._logger.error('AgencyListComponent', 'loadData', 'Something went wrong!');
                    this.setListData(this.SALES_REPORT, []);
                });
        }
    }

    getBodyData(): string {
        let body = '';
        body += this.agencyListService.setParamValue(body, 'customerID', this.agencySearchModel['cust_id']);
        body += this.agencyListService.setParamValue(body, 'companyName', this.agencySearchModel['agency_name']);
        body += this.agencyListService.setParamValue(body, 'email', this.agencySearchModel['email_address']);
        body += this.agencyListService.getDropDownSearchParam(body, 'region', this.agencySearchModel);
        body += this.agencyListService.getDropDownSearchParam(body, 'country', this.agencySearchModel);
        body += this.agencyListService.setParamValue(body, 'city', this.agencySearchModel['city']);
        body += this.agencyListService.setParamValue(body, 'zip', this.agencySearchModel['zip']);
        body += this.agencyListService.setParamValue(body, 'oldCustomerID', this.agencySearchModel['old_cust_id']);
        body += this.getBodyLimit(body, this.agencySearchModel.limit);

        return body;
    }

    doOnReset() {
        this.agencySearchModel['region'] = null;
        this.ngregion = [];
        this.agencySearchModel['country'] = null;
        this.ngcountry = [];
        // this.ddCountry.value = [];
        this.getCountryDropDownData('', true);
        this.agencySearchModel.limit = this.sessionObject.limit;

    }

}
