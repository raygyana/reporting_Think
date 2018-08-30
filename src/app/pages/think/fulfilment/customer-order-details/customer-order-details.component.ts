import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { ParamMap } from '@angular/router';
import { DatePipe } from '@angular/common';
// Import from III party
import { DataTableDirective } from 'angular-datatables';
import { TabsetComponent, ModalModelOptions } from '../../../../components';
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
import { CzDatePickerComponent } from '../../../../components/cz-date-picker/cz-date-picker.component';
import { CustomerOrderDetailsModel } from './customer-order-details.model';
import { CustomerOrderDetailsService } from './customer-order-details.service';

@Component({
    selector: 'app-customer-order-details',
    templateUrl: './customer-order-details.component.html',
    styleUrls: ['./customer-order-details.component.css'],
    providers: [CustomerOrderDetailsService]
})
export class CustomerOrderDetailsComponent extends BaseComponent {

    showInfoPopUp: ModalModelOptions;
    CUSTOMER_ORDER_DETAILS = 'customerOrderDetails';
    log = Log.create('CustomerOrderDetailsComponent');

    customerOrderDetailsModel: any;
    custIdData: any;
    ngCountry: any;
    ngCenter: any;

    ddOptionsCustId: DataDropDownOptions;
    ddOptionsCountryData: DataDropDownOptions;

    ddTriggerCustId: Subject<any> = new Subject();
    ddTriggerCountryData: Subject<any> = new Subject();
    ddTrigger: Subject<any> = new Subject();

    @ViewChild('customerOrderDetailsListData', { read: DataTableDirective }) dtElement: DataTableDirective;
    @ViewChild('customerOrderDetailsList') customerOrderDetailsListTemplate;
    @ViewChild(TabsComponent) tabsComponent;
    @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;
    @ViewChild('country', { read: DataDropDownComponent }) ddCountry: DataDropDownComponent;
    @ViewChild('customer_id', { read: DataDropDownComponent }) ddCustomerId: DataDropDownComponent;
    @ViewChild(CzDatePickerComponent) czDatePicker: CzDatePickerComponent;


    constructor(
        private router: Router,
        private customerOrderDetailsService: CustomerOrderDetailsService,
        protected globalService: GlobalService,
        private _logger: Logger,
        protected changeService: ChangeService,
        protected saveSearchService: SaveSearchService,
        protected loaderService: LoaderService) {
        super(loaderService, changeService, saveSearchService, customerOrderDetailsService, globalService);
        this.doInitialSetup();
        this.log.color = 'lightblue';
        this.createModalPopUp();
    }

    createModalPopUp() {
        this.showInfoPopUp = new ModalModelOptions();
        this.showInfoPopUp.captionHeading = 'Information';
        this.showInfoPopUp.bodyMessage = 'Order details for particular billing, shipping and end-user customer';
        this.showInfoPopUp.button1 = null;
        this.showInfoPopUp.button2 = 'Ok';
    }

    doInInitLoad() {
        this.displaySearchOptions.noCrossList = [];
        this.displaySearchOptions.noCrossList.push('customerId');
        this.displaySearchOptions.noCrossList.push('country');
    }

    getServiceName(): string {
        return this.CUSTOMER_ORDER_DETAILS;
    }

    getLoaderName(): string {
        return 'customer-order-details';
    }

    getSearchModel(): any {
        if (ProjectUtils.isEmpty(this.customerOrderDetailsModel)) {
            this.customerOrderDetailsModel = this.sessionObject.customerOrderDetailsSearch;
            if (ProjectUtils.isEmpty(this.customerOrderDetailsModel)) {
                this.customerOrderDetailsModel = new CustomerOrderDetailsModel();
                this.customerOrderDetailsModel.limit = this.sessionObject.limit;
            }
            this.ngCenter = this.customerOrderDetailsModel.customerId;
            this.ngCountry = this.customerOrderDetailsModel.country;
        }
        this.log.i('getSearchModel', this.customerOrderDetailsModel);

        return this.customerOrderDetailsModel;
    }

    getSearchType(): string {
        return 'customerOrderDetails';
    }
    // override
    getReportTitle(): string {
        return 'Customer Order Details Report';
    }
    getReportIcon(): string {
        return 'fa fa-edit';
    }
    // override
    getReportFileName(): string {
        return 'customerOrderDetailsReport';
    }

    doInitialSetup() {
        this.ddOptionsCustId = new DataDropDownOptions();
        this.ddOptionsCustId.serviceURL = Constants.TK_REGION_SEARCH_URL;
        this.ddOptionsCustId.keyName = 'id';
        this.ddOptionsCustId.keyDesc = 'value';
        this.ddOptionsCustId.firstOptionText = 'Select...';
        this.ddOptionsCustId.baseComponent = this;
        this.ddOptionsCustId.modelName = 'customerId';

        this.ddOptionsCountryData = new DataDropDownOptions();
        this.ddOptionsCountryData.serviceURL = Constants.TK_FULFILMENTREPORT_COUNTRY_URL;
        this.ddOptionsCountryData.keyName = 'country';
        this.ddOptionsCountryData.keyDesc = 'description';
        this.ddOptionsCountryData.firstOptionText = 'Select a Country';
        this.ddOptionsCountryData.baseComponent = this;
        this.ddOptionsCountryData.modelName = 'country';
        this.ddOptionsCountryData.selectMulti = true;

        this.displaySearchOptions.noCrossList = [];
        this.displaySearchOptions.noCrossList.push('country');
        this.displaySearchOptions.noCrossList.push('customerId');

    }

    doPreInitLoad() {
        this.getCustIdAsData();
    }


    getCustIdAsData() {
        this.custIdData = this.globalService.getCustomerIdAsData();
        this.ddTriggerCustId.next(this.custIdData);
    }

    getDatePicker(): CzDatePickerComponent {
        return this.czDatePicker;
    }
    getTabsComponent(): any {
        return this.tabsComponent;
    }


    // override
    openListTab() {
        this.tabsComponent.openTab('Customer Order Details List',
            this.customerOrderDetailsListTemplate, {}, true, 'customerOrderDetailsList');
    }
    // override
    getDispSearch(): ThinkListDisplaySearchComponent {
        return this.dispSearch;
    }

    // override
    setSearchModel(searchModel: any) {
        if (!ProjectUtils.isEmpty(searchModel)) {
            if (typeof searchModel === 'string') {
                this.customerOrderDetailsModel = JSON.parse(searchModel);
            } else {
                this.customerOrderDetailsModel = searchModel;
            }
        }
        if (this.customerOrderDetailsModel.limit === '') {
            this.customerOrderDetailsModel.limit = 0;
        }
        this.log.i('setSearchModel', this.customerOrderDetailsModel);
        this.ngCenter = this.setDropDownComponentValue('customerId');
        this.ngCountry = this.setDropDownComponentValue('country');

        ProjectUtils.setCustomerOrderDetailsSearch(this.sessionObject, this.customerOrderDetailsModel);
    }

    getDataElement(whichService: string): DataTableDirective {
        return this.dtElement;
    }

    // used by Country Drop down to populate values
    getddTrigger() {
        return this.ddTrigger;
    }

    getBodyData(): string {
        let body = '';
        body += this.customerOrderDetailsService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());
        body += this.customerOrderDetailsService.getDateSearchParam(this.customerOrderDetailsModel, body);
        body += this.getBodyLimit(body, this.customerOrderDetailsModel.limit);
        body += this.customerOrderDetailsService.getDropDownSearchParam(body, 'customerId', this.customerOrderDetailsModel);
        body += this.customerOrderDetailsService.getDropDownSearchParam(body, 'country', this.customerOrderDetailsModel);
        return body;
    }

    doOnReset() {
        this.customerOrderDetailsModel['customerId'] = null;
        this.customerOrderDetailsModel['country'] = null;
        this.czDatePicker.calendarCanceled(this);
        this.ngCountry = [];
        this.ngCenter = [];
        this.customerOrderDetailsModel.limit = this.sessionObject.limit;
    }

}
