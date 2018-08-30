import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { ParamMap } from '@angular/router';
import { DatePipe } from '@angular/common';
// Import from III party
import { DataTableDirective } from 'angular-datatables';
import { TabsetComponent } from '../../../../components/ngtabs';
import { TabsComponent } from '../../../../components/ng-tabs/tabs.component';

import { Logger } from '../../../../core/logger/logger';
import { LoaderService } from '../../../../core/loader/loader.service';
import { BaseComponent } from '../../../../core/base/base.component';
import { ProjectUtils } from '../../../shared/project-utils';
import { Constants } from '../../../shared/constant';
import { DataDropDownOptions } from '../../../../components/data-drop-down/data-drop-down.model';
import { DataDropDownComponent } from '../../../../components/data-drop-down/data-drop-down.component';
import { SessionObject } from '../../../shared/session-object';
import { GlobalService } from '../../../shared/global.service';
import { SearchModelType } from '../../../shared/search-model-type';
import { ChangeService } from '../../../shared/change-service';
import { SaveSearchService } from '../../../shared/save-search-service';
import { Log, Level } from 'ng2-logger';
import { Logger as Loggerr } from '../../../../core/logger/logger';
import { ThinkListDisplaySearchComponent } from '../../../../components/think-list-display-search/think-list-display-search.component';

import { AgedArCustomerWiseSearchService } from './aged-ar-customerwise-search.service';
import { AgedArCustomerWiseSearchModel, keysToSum } from './aged-ar-customerwise-search.model';
import { CzDatePickerComponent } from '../../../../components/cz-date-picker/cz-date-picker.component';

@Component({
    selector: 'app-aged-ar-customerwise-search',
    templateUrl: './aged-ar-customerwise-search.component.html',
    styleUrls: ['./aged-ar-customerwise-search.component.css'],
    providers: [AgedArCustomerWiseSearchService]

})

export class AgedArCustomerwiseSearchComponent extends BaseComponent {
    private serviceName = 'AGED_AR_CUSTOMERWISE_SEARCH';
    log = Log.create('AgedArCustomerwiseSearchComponent');
    creditOrdersData: any;
    detailsData: any;
    orderDueData: any;
    ngCenter: any;
    ngDetails: any;
    ngOrders: any;


    agedArCustomerWiseSearchModel: AgedArCustomerWiseSearchModel;

    @ViewChild(DataTableDirective) dtElement: DataTableDirective;
    @ViewChild('agedArCustomerWiseList') AgedArCustomerWiseTemplate;
    @ViewChild(TabsComponent) tabsComponent;
    @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;
    ddOptionsCashOrders: DataDropDownOptions;
    ddOptionsOrdDue: DataDropDownOptions;
    ddOptionsDetails: DataDropDownOptions;
    ddTriggerCashOrders: Subject<any> = new Subject();
    ddTriggerOrdDue: Subject<any> = new Subject();
    ddTriggerDetails: Subject<any> = new Subject();

    @ViewChild('cash_orders', { read: DataDropDownComponent }) ddCashOrders: DataDropDownComponent;
    @ViewChild('order_due', { read: DataDropDownComponent }) ddOrderDue: DataDropDownComponent;
    @ViewChild('details', { read: DataDropDownComponent }) ddDetails: DataDropDownComponent;
    @ViewChild(CzDatePickerComponent) czDatePicker: CzDatePickerComponent;

    constructor(private router: Router,
        protected loaderService: LoaderService,
        private _logger: Logger,
        protected globalService: GlobalService,
        protected changeService: ChangeService,
        protected saveSearchService: SaveSearchService,
        private agedArCustomerWiseSearchService: AgedArCustomerWiseSearchService) {
        super(loaderService, changeService, saveSearchService, agedArCustomerWiseSearchService, globalService);
        this.log.color = 'lightblue';
        this.doInitialSetup();
    }

    doInInitLoad() {
        this.getCreditOrdersData();
        this.getOrderDueData();
        this.getDetailsData();
        this.hideLoader();
    }
    getDatePicker(): CzDatePickerComponent {
        return this.czDatePicker;
    }

    doInitialSetup() {

        this.ddOptionsCashOrders = new DataDropDownOptions();
        this.ddOptionsCashOrders.keyName = 'id';
        this.ddOptionsCashOrders.keyDesc = 'value';
        this.ddOptionsCashOrders.firstOptionText = 'Select a value';
        this.ddOptionsCashOrders.modelName = 'cashorcredit';
        this.ddOptionsCashOrders.baseComponent = this;

        this.ddOptionsOrdDue = new DataDropDownOptions();
        this.ddOptionsOrdDue.keyName = 'id';
        this.ddOptionsOrdDue.keyDesc = 'value';
        this.ddOptionsOrdDue.firstOptionText = 'Select a value';
        this.ddOptionsOrdDue.modelName = 'over_due';
        this.ddOptionsOrdDue.baseComponent = this;


        this.ddOptionsDetails = new DataDropDownOptions();
        this.ddOptionsDetails.keyName = 'id';
        this.ddOptionsDetails.keyDesc = 'value';
        this.ddOptionsDetails.firstOptionText = 'Select a value';
        this.ddOptionsDetails.modelName = 'detail_or_summary';
        this.ddOptionsDetails.baseComponent = this;
    }

    // override
    getLoaderName(): string {
        return 'aged-ar-customerwise-search';
    }

    getCreditOrdersData() {
        this.creditOrdersData = this.globalService.getCreditOrdersData();
        this.ddTriggerCashOrders.next(this.creditOrdersData);
    }

    getDetailsData() {
        this.detailsData = this.globalService.getDetailsData();
        this.log.i('getDetailsData', this.agedArCustomerWiseSearchModel);
        this.ddTriggerDetails.next(this.detailsData);
    }

    getOrderDueData() {
        this.orderDueData = this.globalService.getOrderDueData();
        this.ddTriggerOrdDue.next(this.orderDueData);
    }
    // override
    getSearchModel(): any {
        if (ProjectUtils.isEmpty(this.agedArCustomerWiseSearchModel)) {
            this.agedArCustomerWiseSearchModel = <AgedArCustomerWiseSearchModel>ProjectUtils.getAgedArCustomerWiseSearch(this.sessionObject);
            if (ProjectUtils.isEmpty(this.agedArCustomerWiseSearchModel)) {
                this.agedArCustomerWiseSearchModel = new AgedArCustomerWiseSearchModel();
                this.agedArCustomerWiseSearchModel.limit = this.sessionObject.limit
            }
            this.ngCenter = this.agedArCustomerWiseSearchModel.over_due;
            this.ngOrders = this.agedArCustomerWiseSearchModel.cashorcredit;
            this.ngDetails = this.agedArCustomerWiseSearchModel.detail_or_summary;
        }
        if (ProjectUtils.isEmpty(this.agedArCustomerWiseSearchModel.cashorcredit)) { }
        this.log.i('getSearchModel', this.agedArCustomerWiseSearchModel);
        return this.agedArCustomerWiseSearchModel;
    }

    // override
    getSearchType(): string {
        return 'agedArCustomerWiseSearch';
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
        this.tabsComponent.openTab('Aged AR Customerwise List',
            this.AgedArCustomerWiseTemplate, {}, true, 'agedArCustomerWiseList');
    }

    // override
    getDispSearch(): ThinkListDisplaySearchComponent {
        return this.dispSearch;
    }

    // override
    setSearchModel(searchModel: any) {
        if (!ProjectUtils.isEmpty(searchModel)) {
            if (typeof searchModel === 'string') {
                this.agedArCustomerWiseSearchModel = JSON.parse(searchModel);
            } else {
                this.agedArCustomerWiseSearchModel = searchModel;
            }
        }
        this.ngOrders = this.setDropDownComponentValue('cashorcredit');
        this.ngCenter = this.setDropDownComponentValue('over_due');
        this.ngDetails = this.setDropDownComponentValue('detail_or_summary');
        ProjectUtils.setAgedArCustomerWiseSearch(this.sessionObject, this.agedArCustomerWiseSearchModel);

    }

    getDataElement(whichService: string): DataTableDirective {
        if (whichService === this.serviceName) {
            return this.dtElement;
        }
    }
    // override
    getReportTitle(): string {
        return 'Aged AR Customerwise Report';
    }
    getReportIcon(): string {
        return 'fa fa-calculator';
    }
    // override
    getReportFileName(): string {
        return 'agedARCustomerwiseReport';
    }
    // override
    getBodyData(): string {
        let body = '';
        body += this.agedArCustomerWiseSearchService.getSingleDateSearchParam(this.agedArCustomerWiseSearchModel, body, 'last_transaction_date');
        body += this.agedArCustomerWiseSearchService.getDropDownSearchParam(body, 'cashorcredit', this.agedArCustomerWiseSearchModel);
        body += this.agedArCustomerWiseSearchService.getDropDownSearchParam(body, 'over_due', this.agedArCustomerWiseSearchModel);
        body += this.getBodyLimit(body, this.agedArCustomerWiseSearchModel.limit);
        body += this.agedArCustomerWiseSearchService.getDropDownSearchParam(body, 'detail_or_summary', this.agedArCustomerWiseSearchModel);

        return body;
    }

    doOnReset() {
        this.agedArCustomerWiseSearchModel['cashorcredit'] = null;
        this.agedArCustomerWiseSearchModel['over_due'] = null;
        this.agedArCustomerWiseSearchModel['detail_or_summary'] = null;
        this.czDatePicker.calendarCanceled(this);
        this.ngDetails = [];
        this.ngOrders = [];
        this.ngCenter = [];
        this.agedArCustomerWiseSearchModel.limit = this.sessionObject.limit
    }


    baseProcessData() {
        const textDisplay = { customer_id: 'Grand Total(GBP)' };
        this.listData = ProjectUtils.SumAllObjects(this.listData, keysToSum, textDisplay);
    }





}

