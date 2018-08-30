import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
// Import from III party
import { DataTableDirective } from 'angular-datatables';
import { TabsetComponent } from '../../../../components/ngtabs';
import { TabsComponent } from '../../../../components/ng-tabs/tabs.component';
import { ThinkListDisplaySearchComponent } from '../../../../components/think-list-display-search/think-list-display-search.component';

import { Logger } from '../../../../core/logger/logger';
import { LoaderService } from '../../../../core/loader/loader.service';
import { BaseComponent } from '../../../../core/base/base.component';

import { ProjectUtils } from '../../../shared/project-utils';
import { Constants } from '../../../shared/constant';
import { Log, Level } from 'ng2-logger';
import { Logger as Loggerr } from '../../../../core/logger/logger';

import { CustomerDepositSearchService } from './customer-deposit-search.service';
import { CustomerDepositSearchModel } from './customer-deposit-search.model';
import { GlobalService } from '../../../shared/global.service';
import { ChangeService } from '../../../shared/change-service';
import { SaveSearchService } from '../../../shared/save-search-service';
import { CzDatePickerComponent } from '../../../../components/cz-date-picker/cz-date-picker.component';


@Component({
    selector: 'app-customer-deposit-search',
    templateUrl: './customer-deposit-search.component.html',
    styleUrls: ['./customer-deposit-search.component.css'],
    providers: [CustomerDepositSearchService]
})
export class CustomerDepositSearchComponent extends BaseComponent {
    private serviceName = 'CUST_DEPOSIT_LIST';
    log = Log.create('CustomerDepositSearchComponent');

    customerDepositSearchModel: CustomerDepositSearchModel;


    @ViewChild(DataTableDirective) dtElement: DataTableDirective;
    @ViewChild('customerDepositsList') CustomerDepositTemplate;
    @ViewChild(TabsComponent) tabsComponent;
    @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;
    @ViewChild(CzDatePickerComponent) czDatePicker: CzDatePickerComponent;

    constructor(private router: Router,
        protected loaderService: LoaderService,
        private _logger: Logger,
        protected globalService: GlobalService,
        protected changeService: ChangeService,
        protected saveSearchService: SaveSearchService,
        private customerDepositSearchService: CustomerDepositSearchService) {
        super(loaderService, changeService, saveSearchService, customerDepositSearchService, globalService);
        this.log.color = 'lightblue';
        this.doInitialSetup();
    }
    doInInitLoad() {
        this.hideLoader();
    }

    getDatePicker(): CzDatePickerComponent {
        return this.czDatePicker;
    }


    doInitialSetup() {
    }
    // override
    getReportTitle(): string {
        return 'Customer Deposit Cash Report';
    }
    getReportIcon(): string {
        return 'fa fa-calculator';
    }
    // override
    getReportFileName(): string {
        return 'customerDepositCashReport';
    }

    // override
    getLoaderName(): string {
        return 'customer-deposit-search';
    }

    // override
    getSearchModel(): any {
        if (ProjectUtils.isEmpty(this.customerDepositSearchModel)) {
            this.customerDepositSearchModel = <CustomerDepositSearchModel>ProjectUtils.getCustomerDepositSearch(this.sessionObject);
            if (ProjectUtils.isEmpty(this.customerDepositSearchModel)) {
                this.customerDepositSearchModel = new CustomerDepositSearchModel();
                this.customerDepositSearchModel.limit = this.sessionObject.limit;
            }
        }
        this.log.i('this.customerDepositSearchModel', this.customerDepositSearchModel);
        return this.customerDepositSearchModel;
    }

    // override
    getSearchType(): string {
        return 'customerDepositSearch';
    }

    // override
    getTabsComponent(): any {
        return this.tabsComponent;
    }


    // override
    getServiceName(): string {
        return this.serviceName;
    }

    // override
    openListTab() {
        this.tabsComponent.openTab('Customer Deposit Cash Report List',
            this.CustomerDepositTemplate, {}, true, 'customerDepositsList');
    }

    // override
    getDispSearch(): ThinkListDisplaySearchComponent {
        return this.dispSearch;
    }

    // override
    setSearchModel(searchModel: any) {
        if (!ProjectUtils.isEmpty(searchModel)) {
            if (typeof searchModel === 'string') {
                this.customerDepositSearchModel = JSON.parse(searchModel);
            } else {
                this.customerDepositSearchModel = searchModel;
            }
        }
        if (this.customerDepositSearchModel.limit === '') {
            this.customerDepositSearchModel.limit = 0;
        }
        ProjectUtils.setCustomerDepositSearch(this.sessionObject, this.customerDepositSearchModel);
    }

    getDataElement(whichService: string): DataTableDirective {
        if (whichService === this.serviceName) {
            return this.dtElement;
        }
    }

    // override
    getBodyData(): string {
        let body = '';
        body += this.customerDepositSearchService.getSingleDateSearchParam(this.customerDepositSearchModel, body, 'endDate');
        body += this.customerDepositSearchService.setParamValue(body, 'customerId', this.customerDepositSearchModel['cust_id']);
        body += this.customerDepositSearchService.setParamValue(body, 'name', this.customerDepositSearchModel['cust_name']);
        body += this.getBodyLimit(body, this.customerDepositSearchModel.limit);
        return body;
    }
    doOnReset() {
        this.customerDepositSearchModel.limit = this.sessionObject.limit;
        this.czDatePicker.calendarCanceled(this);
    }

    baseProcessData() {
        const toSum = ['payment_amount', 'total_cust_dep_amount'];
        //        const keys = ['order_code', 'profit_center', 'month'];
        const keys = [];
        return ProjectUtils.mySumFunction2(this.listData, toSum, 'payment_type', 'Total Amount by currency:', 'Grand Totals', keys);

    }
}


// creation_date
// currency
// cust_dep_amount
// customer_id
// description
// name
// payment_amount
// payment_type
// total_cust_dep_amount
// total_payment_amount
// user_code
