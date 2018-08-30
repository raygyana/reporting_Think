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

import { SalesByMonthListService } from './sales-by-month.service';
import { CzDatePickerComponent } from '../../../../components/cz-date-picker/cz-date-picker.component';
@Component({
    selector: 'app-sales-by-month',
    templateUrl: './sales-by-month.component.html',
    styleUrls: ['./sales-by-month.component.css'],
    providers: [SalesByMonthListService]
})
export class SalesByMonthComponent extends BaseComponent {
    private SALES_BY_Month = 'salesByMonth';
    log = Log.create('SalesByMonthsComponent');

    salesByMonthModel: any;

    @ViewChild('salesByMonthData', { read: DataTableDirective }) dtElement: DataTableDirective;
    @ViewChild('salesByMonthList') salesByMonthListTemplate;
    @ViewChild(TabsComponent) tabsComponent;
    @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;
    @ViewChild(CzDatePickerComponent) czDatePicker: CzDatePickerComponent;

    constructor(private router: Router,
        private salesByMonthListService: SalesByMonthListService,
        private _logger: Logger,
        protected globalService: GlobalService,
        protected changeService: ChangeService,
        protected saveSearchService: SaveSearchService,
        protected loaderService: LoaderService) {
        super(loaderService, changeService, saveSearchService, salesByMonthListService, globalService);
        this.log.color = 'lightblue';
    }

    // override
    getLoaderName(): string {
        return 'sales-by-month';
    }

    // override
    getSearchModel(): any {
        if (ProjectUtils.isEmpty(this.salesByMonthModel)) {
            this.salesByMonthModel = this.sessionObject.salesMonthSearch;
            if (ProjectUtils.isEmpty(this.salesByMonthModel)) {
                this.salesByMonthModel = {};
                this.salesByMonthModel.limit = this.sessionObject.limit;
                this.calenderSetDefaultValue(this.salesByMonthModel);

            }
        }
        this.log.i('getSearchModel', this.salesByMonthModel);
        return this.salesByMonthModel;
    }

    // override
    getSearchType(): string {
        return 'salesByMonth';
    }

    // override
    getDataElement(whichService: string): DataTableDirective {
        return this.dtElement;
    }

    // override
    getServiceName(): string {
        return this.SALES_BY_Month;
    }
    // override
    getReportIcon(): string {
        return 'fa-pie-chart';
    }

    // override
    openListTab() {
        this.tabsComponent.openTab('Sales By Month List',
            this.salesByMonthListTemplate, {}, true, 'salesByMonthList');
    }

    // override
    getDispSearch(): ThinkListDisplaySearchComponent {
        return this.dispSearch;
    }

    // override
    getReportTitle(): string {
        return 'Sales By Month Report';
    }

    // override
    getReportFileName(): string {
        return 'salesByMonthReport';
    }

    // override
    setSearchModel(searchModel: any) {
        if (!ProjectUtils.isEmpty(searchModel)) {
            if (typeof searchModel === 'string') {
                this.salesByMonthModel = JSON.parse(searchModel);
            } else {
                this.salesByMonthModel = searchModel;
            }
        }
        if (this.salesByMonthModel.limit === '') {
            this.salesByMonthModel.limit = 0;
        }
        this.log.i('setSearchModel', this.salesByMonthModel);
        ProjectUtils.setSalesMonthSearch(this.sessionObject, this.salesByMonthModel);
    }
    doPreInitLoad() {
        this.hideLoader();
    }
    getDatePicker(): CzDatePickerComponent {
        return this.czDatePicker;
    }
    getBodyData(): string {
        let body = '';
        body += this.salesByMonthListService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());
        body += this.salesByMonthListService.getDateSearchParam(this.salesByMonthModel, body);
        body += this.getBodyLimit(body, this.salesByMonthModel.limit);

        return body;
    }
    doOnReset() {
        this.calenderSetDefaultValue(this.salesByMonthModel);
        this.salesByMonthModel.limit = this.sessionObject.limit;

    }
}
