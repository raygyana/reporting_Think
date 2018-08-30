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
import { SearchModelType } from '../../../shared/search-model-type';
import { ChangeService } from '../../../shared/change-service';
import { SaveSearchService } from '../../../shared/save-search-service';
import { WebOrdersByMonthNonSubsService } from './web_orders_by_month_non_subs.service';
import { WebOrderByMonthNonSubsModel } from './web_orders_by_month_non_subs.model';
import { CzDatePickerComponent } from '../../../../components/cz-date-picker/cz-date-picker.component';
@Component({
    selector: 'app-web-orders-by-month-non-subs',
    templateUrl: './web_orders_by_month_non_subs.component.html',
    styleUrls: ['./web_orders_by_month_non_subs.component.css'],
    providers: [WebOrdersByMonthNonSubsService]
})
export class WebOrdersByMonthNonSubsComponent extends BaseComponent {
    private WEB_ORDERS_BY_MONTH_NON_SUBS_SEARCH = 'webOrdersByMonthNonSubsSearch';
    log = Log.create('WebOrdersByMonthNonSubsComponent');
    ddOptionsproductName: DataDropDownOptions;
    webOrdersByMonthNonSubsModel: any;
    ngCountryList: any;
    ddOptionsCountryList: DataDropDownOptions;


    @ViewChild('webOrdersByMonthNonSubsData', { read: DataTableDirective }) dtElement: DataTableDirective;
    @ViewChild('region', { read: DataDropDownComponent }) ddRegion: DataDropDownComponent;
    @ViewChild('webOrdersByMonthNonSubsList') webOrdersByMonthNonSubsListTemplate;
    @ViewChild(TabsComponent) tabsComponent;
    @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;
    @ViewChild(CzDatePickerComponent) czDatePicker: CzDatePickerComponent;



    constructor(private webOrdersByMonthNonSubsService: WebOrdersByMonthNonSubsService,
        protected globalService: GlobalService,
        private _logger: Logger,
        private router: Router,
        protected changeService: ChangeService,
        protected saveSearchService: SaveSearchService,
        protected loaderService: LoaderService) {
        super(loaderService, changeService, saveSearchService, webOrdersByMonthNonSubsService, globalService);
        this.log.color = 'lightblue';
        this.doInitialSetup();

    }
    doPreInitLoad() {
        this.hideLoader();
    }
    // override
    getLoaderName(): string {
        return 'web-orders-by-month-non-subs-component';
    }
    // override
    doInitialSetup() {
        this.ddOptionsCountryList = new DataDropDownOptions();
        this.ddOptionsCountryList.serviceURL = Constants.MIT_REGION_LIST_URL;
        this.ddOptionsCountryList.keyName = 'state';
        this.ddOptionsCountryList.keyDesc = 'country';
        this.ddOptionsCountryList.firstOptionText = 'Select a Country';
        this.ddOptionsCountryList.modelName = 'country';
        this.ddOptionsCountryList.baseComponent = this;
    }

    // override
    getSearchModel(): any {
        if (ProjectUtils.isEmpty(this.webOrdersByMonthNonSubsModel)) {
            this.webOrdersByMonthNonSubsModel = this.sessionObject.webOrdersByMonthNonSubsSearch;
            if (ProjectUtils.isEmpty(this.webOrdersByMonthNonSubsModel)) {
                this.webOrdersByMonthNonSubsModel = new WebOrderByMonthNonSubsModel();
                this.webOrdersByMonthNonSubsModel.limit = this.sessionObject.limit;
            }
            this.ngCountryList = this.webOrdersByMonthNonSubsModel.country;
        }
        this.log.i('getSearchModel', this.webOrdersByMonthNonSubsModel);
        return this.webOrdersByMonthNonSubsModel;
    }

    // override
    getSearchType(): string {
        return 'discountSummaryReport';
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
        return this.WEB_ORDERS_BY_MONTH_NON_SUBS_SEARCH;
    }

    // override
    openListTab() {
        this.tabsComponent.openTab('Web Source Code Report - Non Subs List',
            this.webOrdersByMonthNonSubsListTemplate, {}, true, 'webOrdersByMonthNonSubsList');
    }

    // override
    getDispSearch(): ThinkListDisplaySearchComponent {
        return this.dispSearch;
    }

    // override
    getReportTitle(): string {
        return 'Web Source Code - Non Subs Report';
    }
    getReportIcon(): string {
        return 'fa-file-text-o';
    }
    // override
    getReportFileName(): string {
        return 'webSourceCodeReport-NonSubsReport';
    }

    // override
    setSearchModel(searchModel: any) {
        if (!ProjectUtils.isEmpty(searchModel)) {
            if (typeof searchModel === 'string') {
                this.webOrdersByMonthNonSubsModel = JSON.parse(searchModel);
            } else {
                this.webOrdersByMonthNonSubsModel = searchModel;
            }
        }
        if (this.webOrdersByMonthNonSubsModel.limit === '') {
            this.webOrdersByMonthNonSubsModel.limit = 0;
        }
        this.ngCountryList = this.setDropDownComponentValue('country');
        this.log.i('setSearchModel', this.webOrdersByMonthNonSubsModel);

        ProjectUtils.setWebOrdersByMonthNonSubsSearch(this.sessionObject, this.webOrdersByMonthNonSubsModel);
    }

    getDatePicker(): CzDatePickerComponent {
        return this.czDatePicker;
    }

    getBodyData(): string {
        let body = '';
        body += this.webOrdersByMonthNonSubsService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());
        body += this.webOrdersByMonthNonSubsService.getDateSearchParam(this.webOrdersByMonthNonSubsModel, body);
        body += this.getBodyLimit(body, this.webOrdersByMonthNonSubsModel.limit);
        body += this.webOrdersByMonthNonSubsService.setParamValue(body, 'order_code', this.webOrdersByMonthNonSubsModel['orderCode']);
        body += this.webOrdersByMonthNonSubsService.getDropDownSearchParam(body, 'country', this.webOrdersByMonthNonSubsModel);


        return body;
    }


    baseProcessData() {
        const toSum = ['total', 'tax', 'price', 'delivery'];
        const keys = ['source_code', 'month'];
        return ProjectUtils.mySumFunction2(this.listData, toSum, 'profit_center', 'Total:', 'Grand Total', keys);
    }

    doOnReset() {

        this.czDatePicker.calendarCanceled(this);
        this.webOrdersByMonthNonSubsModel.limit = this.sessionObject.limit;
        this.webOrdersByMonthNonSubsModel['country'] = null;
        this.ngCountryList = [];
        this.webOrdersByMonthNonSubsModel['orderCode'] = null;
    }
}
