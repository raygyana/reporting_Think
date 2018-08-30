import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { ParamMap } from '@angular/router';
import { DatePipe } from '@angular/common';
// Import from III party
import { DataTableDirective } from 'angular-datatables';
import { TabsetComponent } from '../../../../components/ngtabs';
import { TabsComponent } from '../../../../components/ng-tabs/tabs.component';
import { DataDropDownOptions } from '../../../../components/data-drop-down/data-drop-down.model';
import { DataDropDownComponent } from '../../../../components/data-drop-down/data-drop-down.component';
import { ThinkListDisplaySearchComponent } from '../../../../components/think-list-display-search/think-list-display-search.component';
import { Log, Level } from 'ng2-logger';
import { Logger } from '../../../../core/logger/logger';
import { LoaderService } from '../../../../core/loader/loader.service';
import { BaseComponent } from '../../../../core/base/base.component';
import { ProjectUtils } from '../../../shared/project-utils';
import { Constants } from '../../../shared/constant';
import { SessionObject } from '../../../shared/session-object';
import { GlobalService } from '../../../shared/global.service';
import { ChangeService } from '../../../shared/change-service';
import { SaveSearchService } from '../../../shared/save-search-service';
import { SalesSummaryListService } from './sales-summary-search.service';
import { SalesSummaryModel } from './sales-summary-search.model';
import { CzDatePickerComponent } from '../../../../components/cz-date-picker/cz-date-picker.component';
@Component({
    selector: 'app-sales-summary-search',
    templateUrl: './sales-summary-search.component.html',
    styleUrls: ['./sales-summary-search.component.css'],
    providers: [SalesSummaryListService]
})
export class SalesSummarySearchComponent extends BaseComponent {
    private SALES_SUMMARY = 'salesSummary';
    log = Log.create('SalesSummarySearchComponent');
    ngProductName: any;
    ngAgencyName: any;
    ngRegion: any;
    ngCountry: any;
    ngCurrency: any;
    ngStatus: any;
    ngCustomerType: any;
    ngSubscriptionType: any;
    salesSummarySearchModel: any;
    ddOptionsReg: DataDropDownOptions;
    ddOptionsCountry: DataDropDownOptions;
    ddOptionsCurr: DataDropDownOptions;
    ddOptionsSubType: DataDropDownOptions;
    ddOptionsCustomerType: DataDropDownOptions;
    ddOptionsStatus: DataDropDownOptions;
    ddOptionsProduct: DataDropDownOptions;
    ddOptionsagency: DataDropDownOptions;
    ddTrigger: Subject<any> = new Subject();
    ddTriggerSubType: Subject<any> = new Subject();
    ddTriggerStatus: Subject<any> = new Subject();

    @ViewChild('salesSummaryData', { read: DataTableDirective }) dtElement: DataTableDirective;
    @ViewChild('salesSummaryList') salesSummaryListTemplate;
    @ViewChild(TabsComponent) tabsComponent;
    @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;

    @ViewChild('region', { read: DataDropDownComponent }) ddRegion: DataDropDownComponent;
    @ViewChild('country', { read: DataDropDownComponent }) ddCountry: DataDropDownComponent;
    @ViewChild('currency', { read: DataDropDownComponent }) ddCurrency: DataDropDownComponent;
    @ViewChild('subscriptionType', { read: DataDropDownComponent }) ddSubType: DataDropDownComponent;
    @ViewChild('customerType', { read: DataDropDownComponent }) ddCustomerType: DataDropDownComponent;
    @ViewChild('status', { read: DataDropDownComponent }) ddStatus: DataDropDownComponent;
    @ViewChild('prodName') ddProduct: DataDropDownComponent;
    @ViewChild('agency_id') ddAgency: DataDropDownComponent;
    @ViewChild(CzDatePickerComponent) czDatePicker: CzDatePickerComponent;
    showAdvanceSearch: boolean;

    constructor(private router: Router,
        private salesSummaryListService: SalesSummaryListService,
        protected globalService: GlobalService,
        protected loaderService: LoaderService,
        protected changeService: ChangeService,
        protected saveSearchService: SaveSearchService,
        private _logger: Logger) {
        super(loaderService, changeService, saveSearchService, salesSummaryListService, globalService);
        this.showAdvanceSearch = true;
        this.log.color = 'lightblue';
        this.doInitialSetup();
    }

    doInitialSetup() {

        this.ddOptionsReg = new DataDropDownOptions();
        this.ddOptionsReg.serviceURL = Constants.TK_REGION_SEARCH_URL;
        this.ddOptionsReg.keyName = 'region';
        this.ddOptionsReg.keyDesc = 'description';
        this.ddOptionsReg.firstOptionText = 'Select a Region';
        this.ddOptionsReg.modelName = 'region';
        this.ddOptionsReg.baseComponent = this;

        this.ddOptionsCountry = new DataDropDownOptions();
        this.ddOptionsCountry.serviceURL = Constants.TK_COUNTRY_SEARCH_URL;
        this.ddOptionsCountry.keyName = 'country';
        this.ddOptionsCountry.keyDesc = 'description';
        this.ddOptionsCountry.firstOptionText = 'Select a Country';
        this.ddOptionsCountry.modelName = 'country';
        this.ddOptionsCountry.baseComponent = this;

        this.ddOptionsCurr = new DataDropDownOptions();
        this.ddOptionsCurr.serviceURL = Constants.TK_CURRENCY_SEARCH_URL;
        this.ddOptionsCurr.keyName = 'currency';
        this.ddOptionsCurr.keyDesc = 'currency';
        this.ddOptionsCurr.firstOptionText = 'Select a Currency';
        this.ddOptionsCurr.modelName = 'currency';
        this.ddOptionsCurr.baseComponent = this;

        this.ddOptionsSubType = new DataDropDownOptions();
        this.ddOptionsSubType.keyName = 'id';
        this.ddOptionsSubType.keyDesc = 'value';
        this.ddOptionsSubType.firstOptionText = 'Select a Subscription Type';
        this.ddOptionsSubType.modelName = 'subscriptionType';
        this.ddOptionsSubType.baseComponent = this;

        this.ddOptionsCustomerType = new DataDropDownOptions();
        this.ddOptionsCustomerType.serviceURL = Constants.TK_CUSTOMER_CATEGORY_URL;
        this.ddOptionsCustomerType.keyName = 'subscriptionCategoryId';
        this.ddOptionsCustomerType.keyDesc = 'description';
        this.ddOptionsCustomerType.firstOptionText = 'Select a Customer Type';
        this.ddOptionsCustomerType.modelName = 'customerType';
        this.ddOptionsCustomerType.baseComponent = this;

        this.ddOptionsStatus = new DataDropDownOptions();
        this.ddOptionsStatus.keyName = 'id';
        this.ddOptionsStatus.keyDesc = 'value';
        this.ddOptionsStatus.firstOptionText = 'Select a Status';
        this.ddOptionsStatus.modelName = 'status';
        this.ddOptionsStatus.baseComponent = this;

        this.ddOptionsProduct = new DataDropDownOptions();
        this.ddOptionsProduct.serviceURL = Constants.TK_SALE_JOURNAL_LIST_URL;
        this.ddOptionsProduct.keyName = 'ocID';
        this.ddOptionsProduct.keyDesc = 'description';
        this.ddOptionsProduct.firstOptionText = 'Select a Product';
        this.ddOptionsProduct.baseComponent = this;
        this.ddOptionsProduct.modelName = 'productName';

        this.ddOptionsagency = new DataDropDownOptions();
        this.ddOptionsagency.serviceURL = Constants.TK_SALE_AGENCY_LIST_URL;
        this.ddOptionsagency.keyName = 'customerId';
        this.ddOptionsagency.keyDesc = 'company';
        this.ddOptionsagency.firstOptionText = 'Select a agency';
        this.ddOptionsagency.modelName = 'agencyName';
        this.ddOptionsagency.baseComponent = this;
    }

    // override
    getLoaderName(): string {
        return 'sales-summary-search';
    }

    // override
    getSearchModel(): any {
        if (ProjectUtils.isEmpty(this.salesSummarySearchModel)) {
            this.salesSummarySearchModel = this.sessionObject.salesSummarySearch;
            if (ProjectUtils.isEmpty(this.salesSummarySearchModel)) {
                this.salesSummarySearchModel = new SalesSummaryModel();
                this.salesSummarySearchModel.limit = this.sessionObject.limit;
                this.calenderSetDefaultValue(this.salesSummarySearchModel);
            }
            this.ngProductName = this.salesSummarySearchModel.productName;
            this.ngAgencyName = this.salesSummarySearchModel.agencyName;
            this.ngRegion = this.salesSummarySearchModel.region;
            this.ngCountry = this.salesSummarySearchModel.country;
            this.ngCurrency = this.salesSummarySearchModel.currency;
            this.ngSubscriptionType = this.salesSummarySearchModel.subscriptionType;
            this.ngCustomerType = this.salesSummarySearchModel.customerType;
            this.ngStatus = this.salesSummarySearchModel.status;
        }
        this.log.i('getSearchModel', this.salesSummarySearchModel);
        return this.salesSummarySearchModel;
    }

    // override
    getSearchType(): string {
        return 'salesSummary';
    }

    // override
    getTabsComponent(): any {
        return this.tabsComponent;
    }

    // override
    getDataElement(whichService: string): DataTableDirective {
        return this.dtElement;
    }

    // override, used by Country Drop down to populate values
    getddTrigger() {
        return this.ddTrigger;
    }

    // override
    getServiceName(): string {
        return this.SALES_SUMMARY;
    }

    // override
    openListTab() {
        this.tabsComponent.openTab('Detailed Sales Search Summary List',
            this.salesSummaryListTemplate, {}, true, 'salesSummaryList');
    }

    // override
    getDispSearch(): ThinkListDisplaySearchComponent {
        return this.dispSearch;
    }

    // override
    getReportTitle(): string {
        return 'Detailed Sales Summary Report';
    }

    // override
    getReportFileName(): string {
        return 'salesSummaryReport';
    }

    // override
    setSearchModel(searchModel: any) {
        if (!ProjectUtils.isEmpty(searchModel)) {
            if (typeof searchModel === 'string') {
                this.salesSummarySearchModel = JSON.parse(searchModel);
            } else {
                this.salesSummarySearchModel = searchModel;
            }
        }
        if (this.salesSummarySearchModel.limit === '') {
            this.salesSummarySearchModel.limit = 0;
        }
        this.log.i('setSearchModel', this.salesSummarySearchModel);
        this.ngProductName = this.setDropDownComponentValue('productName');
        this.ngAgencyName = this.setDropDownComponentValue('agencyName');
        this.ngRegion = this.setDropDownComponentValue('region');
        this.ngCountry = this.setDropDownComponentValue('country');
        this.ngCurrency = this.setDropDownComponentValue('currency');
        this.ngSubscriptionType = this.setDropDownComponentValue('subscriptionType');
        this.ngCustomerType = this.setDropDownComponentValue('customerType');
        this.ngStatus = this.setDropDownComponentValue('status');

        ProjectUtils.setSalesSummarySearch(this.sessionObject, this.salesSummarySearchModel);
    }


    getDatePicker(): CzDatePickerComponent {
        return this.czDatePicker;
    }
    // override
    getReportIcon(): string {
        return 'fa-pie-chart';
    }

    doInInitLoad() {
        this.getSubTypeData();
        this.getStatusData();
        if (!ProjectUtils.isEmpty(this.salesSummarySearchModel.region)) {
            this.getCountryDropDownData(this.salesSummarySearchModel.region[0], false);
        }
    }

    doOnAdSearch(): void {
        this.showAdvanceSearch = !this.showAdvanceSearch;
    }

    getSubTypeData() {
        const ddData = this.globalService.getSubscriptionType();
        this.ddTriggerSubType.next(ddData);
    }

    getStatusData() {
        const ddData = this.globalService.getOrderStatus();
        this.ddTriggerStatus.next(ddData);
    }

    getBodyData(): string {
        let body = '';
        body += this.salesSummaryListService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());
        body += this.salesSummaryListService.getDateSearchParam(this.salesSummarySearchModel, body);
        body += this.salesSummaryListService.setParamValue(body, 'volumeYear', this.salesSummarySearchModel['volYear']);
        body += this.salesSummaryListService.setParamValue(body, 'emailAddress', this.salesSummarySearchModel['email']);
        body += this.salesSummaryListService.setParamValue(body, 'customerAddressType', this.salesSummarySearchModel['custAddType']);
        body += this.salesSummaryListService.getDropDownSearchParam(body, 'productName', this.salesSummarySearchModel);
        body += this.salesSummaryListService.getDropDownSearchParam(body, 'region', this.salesSummarySearchModel);
        body += this.salesSummaryListService.getDropDownSearchParam(body, 'country', this.salesSummarySearchModel);
        body += this.salesSummaryListService.getDropDownSearchParam(body, 'currency', this.salesSummarySearchModel);
        body += this.salesSummaryListService.setParamValue(body, 'city', this.salesSummarySearchModel['city']);
        body += this.salesSummaryListService.setParamValue(body, 'zip', this.salesSummarySearchModel['zip']);
        body += this.salesSummaryListService.getDropDownSearchParam(body, 'agencyName', this.salesSummarySearchModel);
        body += this.salesSummaryListService.setParamValue(body, 'sourceCode', this.salesSummarySearchModel['source_code']);
        body += this.salesSummaryListService.setParamValue(body, 'invoiceID', this.salesSummarySearchModel['invoice_id']);
        body += this.salesSummaryListService.getDropDownSearchParam(body, 'subscriptionType', this.salesSummarySearchModel);
        body += this.salesSummaryListService.getDropDownSearchParam(body, 'status', this.salesSummarySearchModel);
        body += this.salesSummaryListService.setParamValue(body, 'order', this.salesSummarySearchModel['order_id']);
        body += this.salesSummaryListService.getDropDownSearchParam(body, 'customerType', this.salesSummarySearchModel);
        body += this.getBodyLimit(body, this.salesSummarySearchModel.limit);
        return body;
    }

    doOnReset() {
        this.salesSummarySearchModel['region'] = null;
        this.salesSummarySearchModel['country'] = null;
        this.salesSummarySearchModel['currency'] = null;
        this.salesSummarySearchModel['subscriptionType'] = null;
        this.salesSummarySearchModel['status'] = null;
        this.salesSummarySearchModel['customerType'] = null;
        this.salesSummarySearchModel['productName'] = null;
        this.salesSummarySearchModel['agencyName'] = null;
        this.getCountryDropDownData('', true);
        this.ngProductName = [];
        this.ngAgencyName = [];
        this.ngRegion = [];
        this.ngCountry = [];
        this.ngCurrency = [];
        this.ngSubscriptionType = [];
        this.ngCustomerType = [];
        this.ngStatus = [];
        this.calenderSetDefaultValue(this.salesSummarySearchModel);
        this.salesSummarySearchModel.limit = this.sessionObject.limit;
    }
}
