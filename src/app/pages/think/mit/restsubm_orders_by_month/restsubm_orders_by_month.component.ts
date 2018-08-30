import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { ParamMap } from '@angular/router';
import { DatePipe } from '@angular/common';
// Import from III party
import { DataTableDirective } from 'angular-datatables';
import { TabsetComponent } from '../../../../components/ngtabs';
import { TabsComponent } from '../../../../components/ng-tabs/tabs.component';
import { ThinkListDisplaySearchComponent } from '../../../../components/think-list-display-search/think-list-display-search.component';
import { DataDropDownOptions } from '../../../../components/data-drop-down/data-drop-down.model';
import { Log, Level } from 'ng2-logger';
import { Logger } from '../../../../core/logger/logger';
import { LoaderService } from '../../../../core/loader/loader.service';
import { BaseComponent } from '../../../../core/base/base.component';
import { ProjectUtils } from '../../../shared/project-utils';
import { Constants } from '../../../shared/constant';
import { SessionObject } from '../../../shared/session-object';
import { GlobalService } from '../../../shared/global.service';
import { SearchModelType } from '../../../shared/search-model-type';
import { ChangeService } from '../../../shared/change-service';
import { SaveSearchService } from '../../../shared/save-search-service';

import { RestsubmOrdersByMonthService } from './restsubm_orders_by_month.service';
import { CzDatePickerComponent } from '../../../../components/cz-date-picker/cz-date-picker.component';
import { DataDropDownComponent } from '../../../../components/data-drop-down/data-drop-down.component';
import { RestsubmOrdersByMonthModel } from './restsubm_orders_by_month.model';
@Component({
    selector: 'app-restsubm-orders-by-month',
    templateUrl: './restsubm_orders_by_month.component.html',
    styleUrls: ['./restsubm_orders_by_month.component.css'],
    providers: [RestsubmOrdersByMonthService]
})
export class RestsubmOrdersByMonthComponent extends BaseComponent {
    private RESTSUBM_ORDERS_BY_MONTH = 'restsubmOrdersByMonthSearch';
    log = Log.create('RestsubmOrdersByMonthComponent');
    restsubmOrdersByMonthModel: RestsubmOrdersByMonthModel;
    ddOptionsCountryList: DataDropDownOptions;
    ngCountryList: any;
    @ViewChild('restsubmOrdersByMonthData', { read: DataTableDirective }) dtElement: DataTableDirective;
    @ViewChild('restsubmOrdersByMonth') restsubmOrdersByMonthTemplate;
    @ViewChild(TabsComponent) tabsComponent;
    @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;
    @ViewChild(CzDatePickerComponent) czDatePicker: CzDatePickerComponent;
    @ViewChild('region', { read: DataDropDownComponent }) ddRegion: DataDropDownComponent;


    constructor(private restsubmOrdersByMonthService: RestsubmOrdersByMonthService,
        protected globalService: GlobalService,
        private _logger: Logger,
        private router: Router,
        protected changeService: ChangeService,
        protected saveSearchService: SaveSearchService,
        protected loaderService: LoaderService) {
        super(loaderService, changeService, saveSearchService, restsubmOrdersByMonthService, globalService);
        this.log.color = 'lightblue';
        this.doInitialSetup();
    }

    doInitialSetup() {
        this.ddOptionsCountryList = new DataDropDownOptions();
        this.ddOptionsCountryList.serviceURL = Constants.MIT_REGION_LIST_URL;
        this.ddOptionsCountryList.keyName = 'state';
        this.ddOptionsCountryList.keyDesc = 'country';
        this.ddOptionsCountryList.firstOptionText = 'Select a Country';
        this.ddOptionsCountryList.modelName = 'country';
        this.ddOptionsCountryList.baseComponent = this;



    }

    doPreInitLoad() {
        this.hideLoader();
    }
    // override
    getLoaderName(): string {
        return 'restsubm-orders-by-month';
    }

    // override
    getSearchModel(): any {
        if (ProjectUtils.isEmpty(this.restsubmOrdersByMonthModel)) {
            this.restsubmOrdersByMonthModel = this.sessionObject.restsubmOrdersByMonthSearch;
            if (ProjectUtils.isEmpty(this.restsubmOrdersByMonthModel)) {
                this.restsubmOrdersByMonthModel = new RestsubmOrdersByMonthModel();
                this.restsubmOrdersByMonthModel.limit = this.sessionObject.limit;
                this.ngCountryList = this.restsubmOrdersByMonthModel.country;
            }
        }
        this.log.i('getSearchModel', this.restsubmOrdersByMonthModel);
        return this.restsubmOrdersByMonthModel;
    }

    // override
    getSearchType(): string {
        return 'restsubmOrdersByMonth';
    }

    // override
    getDataElement(whichService: string): DataTableDirective {
        return this.dtElement;
    }

    // override
    getTabsComponent(): any {
        return this.tabsComponent;
    }

    // override
    getServiceName(): string {
        return this.RESTSUBM_ORDERS_BY_MONTH;
    }
    getDatePicker(): CzDatePickerComponent {
        return this.czDatePicker;
    }

    // override
    openListTab() {
        this.tabsComponent.openTab('REST Submission Fee Payments List',
            this.restsubmOrdersByMonthTemplate, {}, true, 'restsubmOrdersByMonth');
    }

    // override
    getDispSearch(): ThinkListDisplaySearchComponent {
        return this.dispSearch;
    }

    // override
    getReportTitle(): string {
        return 'REST Submission Fee Payments Report';
    }
    getReportIcon(): string {
        return 'fa-file-text-o';
    }
    // override
    getReportFileName(): string {
        return 'rESTSubmissionFeePaymentsReport';
    }

    // override
    setSearchModel(searchModel: any) {
        if (!ProjectUtils.isEmpty(searchModel)) {
            if (typeof searchModel === 'string') {
                this.restsubmOrdersByMonthModel = JSON.parse(searchModel);
            } else {
                this.restsubmOrdersByMonthModel = searchModel;
            }
        }
        if (this.restsubmOrdersByMonthModel.limit === '') {
            this.restsubmOrdersByMonthModel.limit = 0;
        }

        this.log.i('setSearchModel', this.restsubmOrdersByMonthModel);
        this.ngCountryList = this.setDropDownComponentValue('country');
        ProjectUtils.setRestsubmOrdersByMonthSearch(this.sessionObject, this.restsubmOrdersByMonthModel);
    }

    getBodyData(): string {
        let body = '';
        body += this.restsubmOrdersByMonthService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());
        body += this.restsubmOrdersByMonthService.getDateSearchParam(this.restsubmOrdersByMonthModel, body);
        body += this.restsubmOrdersByMonthService.getDropDownSearchParam(body, 'country', this.restsubmOrdersByMonthModel);
        body += this.getBodyLimit(body, this.restsubmOrdersByMonthModel.limit);

        return body;
    }


    doOnReset() {
        this.restsubmOrdersByMonthModel['country'] = null;
        this.ngCountryList = [];
        this.czDatePicker.calendarCanceled(this);
        this.restsubmOrdersByMonthModel.limit = this.sessionObject.limit;
    }

    baseProcessData() {
        const toSum = ['delivery', 'qty', 'price', 'tax', 'total'];
        //        const keys = ['order_code', 'profit_center', 'month'];
        const keys = ['month'];
        return ProjectUtils.mySumFunction2(this.listData, toSum, 'profit_center', 'Totals:', 'Grand Totals', keys);



    }
}
