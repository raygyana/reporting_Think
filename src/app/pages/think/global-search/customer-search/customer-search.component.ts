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

import { CustomerListService } from './customer-search.service';
import { CustomerSearchModel } from './customer-search.model';
import { GlobalService } from '../../../shared/global.service';
import { ChangeService } from '../../../shared/change-service';
import { SaveSearchService } from '../../../shared/save-search-service';
import { SalesSummaryListService } from '../../sales/sales-summary-search/sales-summary-search.service';

@Component({
    selector: 'app-customer-search',
    templateUrl: './customer-search.component.html',
    styleUrls: ['./customer-search.component.css'],
    providers: [CustomerListService, SalesSummaryListService]
})
export class CustomerSearchComponent extends BaseComponent {

    ngRegion: any;

    private CUST_LIST = 'CUST_LIST';
    private SALES_REPORT = 'SALES_REPORT';
    custSearchModel: CustomerSearchModel;
    ddOptionsReg: DataDropDownOptions;
    ddOptionsCountry: DataDropDownOptions;
    ddTrigger: Subject<any> = new Subject

    dtSalesOptions: any = {};
    @ViewChild(DataTableDirective) dtElement: DataTableDirective;
    @ViewChild('custList') custListTemplate;
    @ViewChild(TabsComponent) tabsComponent;
    @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;
    @ViewChild('salesReport') salesReportTemplate;
    @ViewChild('salesReportData', { read: DataTableDirective }) dtSalesElement: DataTableDirective;

    @ViewChild('region', { read: DataDropDownComponent }) ddRegion: DataDropDownComponent;
    @ViewChild('country', { read: DataDropDownComponent }) ddCountry: DataDropDownComponent;


    constructor(private router: Router,
        protected loaderService: LoaderService,
        private _logger: Logger,
        protected globalService: GlobalService,
        protected changeService: ChangeService,
        protected saveSearchService: SaveSearchService,
        protected salesSummaryListService: SalesSummaryListService,
        private customerListService: CustomerListService) {
        super(loaderService, changeService, saveSearchService, customerListService, globalService);
        console.log(this.customerListService);
        this.doInitialSetup();
    }

    doInInitLoad() {

    }

    doInitialSetup() {



        this.ddOptionsCountry = new DataDropDownOptions();
        this.ddOptionsCountry.serviceURL = Constants.TK_COUNTRY_SEARCH_URL;
        this.ddOptionsCountry.keyName = 'country';
        this.ddOptionsCountry.keyDesc = 'description';
        this.ddOptionsCountry.firstOptionText = 'Select a Country';
        this.ddOptionsCountry.modelName = 'country';
        this.ddOptionsCountry.baseComponent = this;

        this.ddOptionsReg = new DataDropDownOptions();
        this.ddOptionsReg.serviceURL = Constants.TK_REGION_SEARCH_URL;
        this.ddOptionsReg.keyName = 'region';
        this.ddOptionsReg.keyDesc = 'description';
        this.ddOptionsReg.firstOptionText = 'Select a Region';
        this.ddOptionsReg.modelName = 'region';
        this.ddOptionsReg.baseComponent = this;

        this.salesListSetup();

    }

    // override
    getLoaderName(): string {
        return 'customer-search';
    }

    // override
    getSearchModel(): any {
        console.log('getSearchModel::this.custSearchModel', this.custSearchModel);
        if (ProjectUtils.isEmpty(this.custSearchModel)) {
            this.custSearchModel = <CustomerSearchModel>ProjectUtils.getCustomerSearch(this.sessionObject);
            console.log('getSearchModel::this.custSearchModel', this.custSearchModel);
            if (ProjectUtils.isEmpty(this.custSearchModel)) {
                this.custSearchModel = new CustomerSearchModel();
                this.custSearchModel.limit = this.sessionObject.limit
            }
            this.ngRegion = this.custSearchModel.region;
            this.ngCountry = this.custSearchModel.country;
        }
        console.log('getSearchModel::this.custSearchModel', this.custSearchModel);
        return this.custSearchModel;
    }

    // override
    getSearchType(): string {
        return 'custSearch';
    }

    // override
    getTabsComponent(): any {
        return this.tabsComponent;
    }

    // override, used by Country Drop down to populate values
    getddTrigger() {
        return this.ddTrigger;
    }
    // override
    getServiceName(): string {
        return this.CUST_LIST;
    }

    // override
    openListTab() {
        this.tabsComponent.openTab('Customer Search List',
            this.custListTemplate, {}, true, 'custList');
    }

    // override
    getDispSearch(): ThinkListDisplaySearchComponent {
        return this.dispSearch;
    }

    // override
    getReportTitle(): string {
        return 'Customer Search Report';
    }
    getReportIcon(): string {
        return 'fa fa-search';
    }
    // override
    getReportFileName(): string {
        return 'customerReport';
    }

    // override
    setSearchModel(searchModel: any) {
        console.log('setSearchModel: searchModel', searchModel);
        if (!ProjectUtils.isEmpty(searchModel)) {
            if (typeof searchModel === 'string') {
                this.custSearchModel = JSON.parse(searchModel);
            } else {
                this.custSearchModel = searchModel;
            }
        }
        console.log('setSearchModel', this.custSearchModel);
        if (this.custSearchModel.limit === '') {
            this.custSearchModel.limit = 0;
        }

        // this.setDropDownValues();
        ProjectUtils.setCustomerSearch(this.sessionObject, this.custSearchModel);
    }

    setDropDownValues() {
        console.log('setDropDownValues', this.custSearchModel, this.sessionObject);
        //        this.ngRegion = this.custSearchModel.region;
        console.log('setDropDownValues', this.ngRegion[0],
            (this.custSearchModel.region && this.custSearchModel.region[0] && this.custSearchModel.region[0]['id']));
        // if (this.custSearchModel.region || this.custSearchModel.region[0] || (this.ngRegion[0] !== this.custSearchModel.region[0]['id'])) {
        this.ngRegion = this.custSearchModel.region;
        // }
        // this.setDropDownComponentValue('region');
        console.log('setDropDownValues', this.custSearchModel, this.sessionObject);

        // setTimeout(() => {
        // if (!ProjectUtils.isEmpty(this.custSearchModel.region)) {
        //     this.ngCountry = this.custSearchModel.country;
        //     // this.setDropDownComponentValue('country');
        //     this.getCountryDropDownData('');
        // } else {
        //     this.ngCountry = [];
        // }
        // console.log('setDropDownValues', this.custSearchModel, this.sessionObject);
        // }, 200);
    }



    salesListSetup() {
        this.dtSalesOptions = ProjectUtils.doOptionSettingsFull('customerSalesReport', 'Customer Sales Report');
        this.salesSummaryListService.addColumnsOption(this.dtSalesOptions);
        this.dtSalesOptions['data'] = [];
    }

    getDataElement(whichService: string): DataTableDirective {
        if (whichService === this.CUST_LIST) {
            return this.dtElement;
        } else { // this.SALES_REPORT
            return this.dtSalesElement;
        }
    }

    openSalesReport() {
        if (this.isRowSelected()) {
            console.log('openSalesReport', 'this.dtElement', this.dtElement);
            console.log('openSalesReport', 'this.dtSalesElement', this.dtSalesElement);
            this.tabsComponent.openTab('Sales Report',
                this.salesReportTemplate, {}, true, 'salesReport');
            // load Sales report
            let body = '';
            body += this.salesSummaryListService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());
            body += this.salesSummaryListService.setParamValue(body, 'customerID', this.selectedRow['customer_id']);
            body += this.getBodyLimit(body, this.custSearchModel.limit);
            this.loadDataFromAPIService(this.SALES_REPORT, body, this.salesSummaryListService);
        }
    }

    // override
    getBodyData(): string {
        console.log('this.custSearchModel', this.custSearchModel);
        let body = '';
        body += this.customerListService.setParamValue(body, 'customerID', this.custSearchModel['cust_id']);
        body += this.customerListService.setParamValue(body, 'department', this.custSearchModel['dept_id']);
        body += this.customerListService.setParamValue(body, 'fName', this.custSearchModel['f_name']);
        body += this.customerListService.setParamValue(body, 'lName', this.custSearchModel['l_name']);
        body += this.customerListService.setParamValue(body, 'email', this.custSearchModel['email_address']);
        body += this.customerListService.getDropDownSearchParam(body, 'region', this.custSearchModel);
        body += this.customerListService.getDropDownSearchParam(body, 'country', this.custSearchModel);
        body += this.customerListService.setParamValue(body, 'city', this.custSearchModel['city']);
        body += this.customerListService.setParamValue(body, 'zip', this.custSearchModel['zip']);
        body += this.customerListService.setParamValue(body, 'oldCustomerID', this.custSearchModel['old_cust_id']);
        body += this.getBodyLimit(body, this.custSearchModel.limit);
        return body;
    }

    doOnReset() {
        this.custSearchModel['region'] = null;
        this.custSearchModel['country'] = null;
        this.ngRegion = [];
        this.ngCountry = [];

        this.custSearchModel.limit = this.sessionObject.limit;
    }

}
