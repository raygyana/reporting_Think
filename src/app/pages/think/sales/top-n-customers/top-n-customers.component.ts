import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { ParamMap } from '@angular/router';
import { DatePipe } from '@angular/common';
// Import from III party
import { DataTableDirective } from 'angular-datatables';
import { TabsetComponent, ModalModelOptions } from '../../../../components';
import { TabsComponent } from '../../../../components/ng-tabs/tabs.component';

import { Log, Level } from 'ng2-logger';
import { Logger } from '../../../../core/logger/logger';
import { LoaderService } from '../../../../core/loader/loader.service';
import { BaseComponent } from '../../../../core/base/base.component';
import { ProjectUtils } from '../../../shared/project-utils';
import { Constants } from '../../../shared/constant';
import { DataDropDownOptions } from '../../../../components/data-drop-down/data-drop-down.model';
import { SessionObject } from '../../../shared/session-object';
import { GlobalService } from '../../../shared/global.service';
import { SearchModelType } from '../../../shared/search-model-type';
// import { CustomerListService } from '../customer-search/customer-search.service';
import { ChangeService } from '../../../shared/change-service';
import { SaveSearchService } from '../../../shared/save-search-service';
import { ThinkListDisplaySearchComponent } from '../../../../components/think-list-display-search/think-list-display-search.component';
import { CzDatePickerComponent } from '../../../../components/cz-date-picker/cz-date-picker.component';
import { TopNCustomersModel } from './top-n-customers.model';
import { TopNCustomersService } from './top-n-customers.service';
import { DataDropDownComponent } from '../../../../components/data-drop-down/data-drop-down.component';

@Component({
    selector: 'app-top-n-customers',
    templateUrl: './top-n-customers.component.html',
    styleUrls: ['./top-n-customers.component.css'],
    providers: [TopNCustomersService]
})
export class TopNCustomersComponent extends BaseComponent {

    showInfoPopUp: ModalModelOptions;




    ngNNumbers: any; // = [];
    ngCountry: any;
    ngRegionId: any;
    custIdData: any;
    ngCenter: any;
    private TOP_N_CUSTOMERS = 'topNCustomers';
    log = Log.create('TopNCustomersComponent');

    topNCustomersModel: any;
    topNNumbersData: any;
    ddOptionsReg: DataDropDownOptions;
    ddOptionsCountry: DataDropDownOptions;
    ddOptionsTopN: DataDropDownOptions;
    ddOptionsCustId: DataDropDownOptions;
    ddTrigger: Subject<any> = new Subject();
    ddTriggerTopN: Subject<any> = new Subject();
    ddTriggerCustId: Subject<any> = new Subject();
    // dtOptions: any = {};

    @ViewChild('topNCustomersListData', { read: DataTableDirective }) dtElement: DataTableDirective;
    @ViewChild('topNCustomersList') topNCustomersListTemplate;
    @ViewChild(TabsComponent) tabsComponent;
    @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;
    @ViewChild('nNumbers', { read: DataDropDownComponent }) ddTopNProduct: DataDropDownComponent;
    @ViewChild('country', { read: DataDropDownComponent }) country: DataDropDownComponent;
    @ViewChild('regionId', { read: DataDropDownComponent }) region: DataDropDownComponent;
    @ViewChild(CzDatePickerComponent) czDatePicker: CzDatePickerComponent;
    @ViewChild('customer_ids', { read: DataDropDownComponent }) ddCustomerId: DataDropDownComponent;

    constructor(private router: Router,
        private topNCustomersService: TopNCustomersService,
        protected globalService: GlobalService,
        private _logger: Logger,
        protected changeService: ChangeService,
        protected saveSearchService: SaveSearchService,
        protected loaderService: LoaderService) {
        super(loaderService, changeService, saveSearchService, topNCustomersService, globalService);
        this.log.color = 'lightblue';
        this.doInitialSetup();
        this.createModalPopUp();
    }

    createModalPopUp() {
        this.showInfoPopUp = new ModalModelOptions();
        this.showInfoPopUp.captionHeading = 'Information';
        this.showInfoPopUp.bodyMessage = 'Top Customers with highest order amount';
        this.showInfoPopUp.button1 = null;
        this.showInfoPopUp.button2 = 'Ok';
    }

    // override
    getLoaderName(): string {
        return 'top-n-customers-component';
    }

    // override
    getSearchModel(): any {
        if (ProjectUtils.isEmpty(this.topNCustomersModel)) {
            this.topNCustomersModel = this.sessionObject.topNCustomersSearch;
            if (ProjectUtils.isEmpty(this.topNCustomersModel)) {
                this.topNCustomersModel = {};
                //  this.topNCustomersModel.limit = this.sessionObject.limit;
                this.calenderSetDefaultValue(this.topNCustomersModel);
            }
            this.ngRegionId = this.topNCustomersModel.regionId;
            this.ngCountry = this.topNCustomersModel.country;
            this.ngNNumbers = this.topNCustomersModel.nNumbers;
            this.ngCenter = this.topNCustomersModel.customerAs;
        }
        this.log.i('getSearchModel', this.topNCustomersModel);
        return this.topNCustomersModel;
    }

    // override
    getSearchType(): string {
        return 'topNCustomers';
    }

    // override
    getDataElement(whichService: string): DataTableDirective {
        return this.dtElement;
    }

    // override used by Country Drop down to populate values
    getddTrigger() {
        return this.ddTrigger;
    }

    // override
    getServiceName(): string {
        return this.TOP_N_CUSTOMERS;
    }
    // override
    getReportIcon(): string {
        return 'fa-pie-chart';
    }

    // override
    openListTab() {
        this.tabsComponent.openTab('Top N Customers List',
            this.topNCustomersListTemplate, {}, true, 'topNCustomersList');
    }

    // override
    getDispSearch(): ThinkListDisplaySearchComponent {
        return this.dispSearch;
    }

    // override
    getReportTitle(): string {
        return 'Top N Customers Report';
    }

    // override
    getReportFileName(): string {
        return 'topNCustomersReport';
    }

    getCustIdAsData() {
        this.custIdData = this.globalService.getCustomerIdAsData();
        this.ddTriggerCustId.next(this.custIdData);
    }
    // override
    setSearchModel(searchModel: any) {
        if (!ProjectUtils.isEmpty(searchModel)) {
            if (typeof searchModel === 'string') {
                this.topNCustomersModel = JSON.parse(searchModel);
            } else {
                this.topNCustomersModel = searchModel;
            }
        }
        this.log.i('setSearchModel', this.topNCustomersModel);

        console.log('this.topNCustomersModel.nNumbersthis.topNCustomersModel.nNumbersthis.topNCustomersModel.nNumbers', this.topNCustomersModel.nNumbers)


        this.ngNNumbers = this.setDropDownComponentValue('nNumbers');
        this.ngRegionId = this.setDropDownComponentValue('regionId');
        this.ngCenter = this.setDropDownComponentValue('customerAs');
        if (!ProjectUtils.isEmpty(this.topNCustomersModel.regionId)) {
            this.ngCountry = this.setDropDownComponentValue('country');
        } else {

            this.ngCountry = [];
        }


        ProjectUtils.setTopNCustomersSearch(this.sessionObject, this.topNCustomersModel);
    }

    doInitialSetup() {

        this.ddOptionsCustId = new DataDropDownOptions();
        this.ddOptionsCustId.serviceURL = Constants.TK_REGION_SEARCH_URL;
        this.ddOptionsCustId.keyName = 'id';
        this.ddOptionsCustId.keyDesc = 'value';
        this.ddOptionsCustId.firstOptionText = 'Select...';
        this.ddOptionsCustId.baseComponent = this;
        this.ddOptionsCustId.modelName = 'customerAs';

        this.ddOptionsReg = new DataDropDownOptions();
        this.ddOptionsReg.serviceURL = Constants.TK_REGION_SEARCH_URL;
        this.ddOptionsReg.keyName = 'region';
        this.ddOptionsReg.keyDesc = 'description';
        this.ddOptionsReg.firstOptionText = 'Select a Region';
        this.ddOptionsReg.modelName = 'regionId';
        this.ddOptionsReg.baseComponent = this;

        this.ddOptionsCountry = new DataDropDownOptions();
        this.ddOptionsCountry.serviceURL = Constants.TK_COUNTRY_SEARCH_URL;
        this.ddOptionsCountry.keyName = 'country';
        this.ddOptionsCountry.keyDesc = 'description';
        this.ddOptionsCountry.firstOptionText = 'Select a Country';
        this.ddOptionsCountry.modelName = 'country';
        this.ddOptionsCountry.baseComponent = this;

        this.ddOptionsTopN = new DataDropDownOptions();
        /* this.ddOptionsTopN.serviceURL = Constants.TK_COUNTRY_SEARCH_URL;*/
        this.ddOptionsTopN.keyName = 'id';
        this.ddOptionsTopN.keyDesc = 'value';
        this.ddOptionsTopN.firstOptionText = 'Select a Top N Customer';
        this.ddOptionsTopN.modelName = 'nNumbers';
        this.ddOptionsTopN.baseComponent = this;
        // this.ddOptionsTopN.selectMulti = true;

        this.displaySearchOptions.noCrossList = [];
        this.displaySearchOptions.noCrossList.push('nNumbers');
    }

    doInInitLoad() {
        this.getTopNCustomersData();
        this.getCustIdAsData();
        if (!ProjectUtils.isEmpty(this.topNCustomersModel.regionId)) {
            this.getCountryDropDownData(this.topNCustomersModel.regionId[0], false);
        }
    }

    getDatePicker(): CzDatePickerComponent {
        return this.czDatePicker;
    }

    getTopNCustomersData() {
        this.topNNumbersData = this.globalService.getTopNCustomers();
        this.log.i('getTopNCustomersData', this.ddTriggerTopN, this.topNNumbersData);
        this.ddTriggerTopN.next(this.topNNumbersData);

    }
    getBodyData(): string {
        let body = '';
        body += this.topNCustomersService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());
        body += this.topNCustomersService.getDateSearchParam(this.topNCustomersModel, body);
        body += this.topNCustomersService.getDropDownSearchParam(body, 'regionId', this.topNCustomersModel);
        body += this.topNCustomersService.getDropDownSearchParam(body, 'country', this.topNCustomersModel);
        body += this.topNCustomersService.getDropDownSearchParam(body, 'nNumbers', this.topNCustomersModel);
        body += this.topNCustomersService.getDropDownSearchParam(body, 'customerAs', this.topNCustomersModel);
        body += this.topNCustomersService.setParamValue(body, 'customerId', this.topNCustomersModel['cust_id']);
        return body;
    }

    doOnReset() {
        this.topNCustomersModel['nNumbers'] = null;
        this.topNCustomersModel['country'] = null;
        this.topNCustomersModel['regionId'] = null;
        this.topNCustomersModel['customerAs'] = null;
        // this.country.optionsModel = [];
        // this.ddTopNProduct.optionsModel = [];
        // this.region.optionsModel = [];
        this.ngNNumbers = [];
        this.ngRegionId = [];
        this.ngCountry = [];
        this.ngCenter = [];
        this.getCountryDropDownData('', true);
        this.calenderSetDefaultValue(this.topNCustomersModel);
        // this.topNCustomersModel.limit = this.sessionObject.limit;

    }




}
