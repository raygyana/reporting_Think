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
import { WebOrdersByMonthService } from './web_orders_by_month.service';
import { WebOrderByMonthModel } from './web_order_by_month.model';


import { CzDatePickerComponent } from '../../../../components/cz-date-picker/cz-date-picker.component';
@Component({
    selector: 'app-web-orders-by-month',
    templateUrl: './web_orders_by_month.component.html',
    styleUrls: ['./web_orders_by_month.component.css'],
    providers: [WebOrdersByMonthService]
})
export class WebOrdersByMonthComponent extends BaseComponent {
    private WEB_ORDERS_BY_MONTH_SEARCH = 'webOrdersByMonthSearch';
    log = Log.create('WebOrdersByMonthComponent');
    webOrdersByMonthModel: WebOrderByMonthModel;
    ddOptionsCountryList: DataDropDownOptions;
    ngCountryList: any;


    @ViewChild('webOrdersByMonthData', { read: DataTableDirective }) dtElement: DataTableDirective;
    @ViewChild('region', { read: DataDropDownComponent }) ddRegion: DataDropDownComponent;
    @ViewChild('webOrdersByMonthList') webOrdersByMonthListTemplate;
    @ViewChild(TabsComponent) tabsComponent;
    @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;
    @ViewChild(CzDatePickerComponent) czDatePicker: CzDatePickerComponent;



    constructor(private webOrdersByMonthService: WebOrdersByMonthService,
        protected globalService: GlobalService,
        private _logger: Logger,
        private router: Router,
        protected changeService: ChangeService,
        protected saveSearchService: SaveSearchService,
        protected loaderService: LoaderService) {
        super(loaderService, changeService, saveSearchService, webOrdersByMonthService, globalService);
        this.log.color = 'lightblue';
        this.doInitialSetup();

    }
    doPreInitLoad() {
        this.hideLoader();
    }
    // override
    getLoaderName(): string {
        return 'discount-summary-report-component';
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
        if (ProjectUtils.isEmpty(this.webOrdersByMonthModel)) {
            this.webOrdersByMonthModel = this.sessionObject.webOrdersByMonthSearch;
            if (ProjectUtils.isEmpty(this.webOrdersByMonthModel)) {
                this.webOrdersByMonthModel = new WebOrderByMonthModel();
                this.webOrdersByMonthModel.limit = this.sessionObject.limit;
            }
            this.ngCountryList = this.webOrdersByMonthModel.country;
        }
        this.log.i('getSearchModel', this.webOrdersByMonthModel);
        return this.webOrdersByMonthModel;
    }

    // override
    getSearchType(): string {
        return 'webOrdersByMonth';
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
        return this.WEB_ORDERS_BY_MONTH_SEARCH;
    }

    // override
    openListTab() {
        this.tabsComponent.openTab('Web Source Code Report List',
            this.webOrdersByMonthListTemplate, {}, true, 'webOrdersByMonthList');
    }

    // override
    getDispSearch(): ThinkListDisplaySearchComponent {
        return this.dispSearch;
    }

    // override
    getReportTitle(): string {
        return 'Web Source Code Report';
    }
    getReportIcon(): string {
        return 'fa-file-text-o';
    }
    // override
    getReportFileName(): string {
        return 'webSourceCodeReport';
    }

    // override
    setSearchModel(searchModel: any) {
        if (!ProjectUtils.isEmpty(searchModel)) {
            if (typeof searchModel === 'string') {
                this.webOrdersByMonthModel = JSON.parse(searchModel);
            } else {
                this.webOrdersByMonthModel = searchModel;
            }
        }
        if (this.webOrdersByMonthModel.limit === '') {
            this.webOrdersByMonthModel.limit = 0;
        }
        this.ngCountryList = this.setDropDownComponentValue('country');

        this.log.i('setSearchModel', this.webOrdersByMonthModel);

        ProjectUtils.setWebOrdersByMonthSearch(this.sessionObject, this.webOrdersByMonthModel);
    }

    getDatePicker(): CzDatePickerComponent {
        return this.czDatePicker;
    }

    getBodyData(): string {
        let body = '';
        body += this.webOrdersByMonthService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());
        body += this.webOrdersByMonthService.getDateSearchParam(this.webOrdersByMonthModel, body);
        body += this.getBodyLimit(body, this.webOrdersByMonthModel.limit);
        body += this.webOrdersByMonthService.setParamValue(body, 'sourceCode', this.webOrdersByMonthModel['sourceCode']);

        body += this.webOrdersByMonthService.getDropDownSearchParam(body, 'country', this.webOrdersByMonthModel);

        return body;
    }


    doOnReset() {

        this.czDatePicker.calendarCanceled(this);
        this.webOrdersByMonthModel.limit = this.sessionObject.limit;
        this.webOrdersByMonthModel['country'] = null;
        this.ngCountryList = [];
        this.webOrdersByMonthModel['sourceCode'] = null;
    }

    baseProcessData() {
        const toSum = ['order_count', 'pd_delivery', 'pd_order', 'pd_tax', 'total'];
        const keys = ['source_code', 'month'];
        return ProjectUtils.mySumFunction2(this.listData, toSum, 'month', 'Total:', 'Grand Total', keys);
    }
}
