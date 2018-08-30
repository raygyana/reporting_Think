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
import { Log, Level } from 'ng2-logger';
import { Logger as Loggerr } from '../../../../core/logger/logger';

import { CashByAccPeriodSearchService } from './cash-by-acc-period-search.service';
import { CashByAccPeriodSearchModel } from './cash-by-acc-period-search.model';
import { GlobalService } from '../../../shared/global.service';
import { ChangeService } from '../../../shared/change-service';
import { SaveSearchService } from '../../../shared/save-search-service';
import { CzDatePickerComponent } from '../../../../components/cz-date-picker/cz-date-picker.component';
@Component({
    selector: 'app-cash-by-acc-period-search',
    templateUrl: './cash-by-acc-period-search.component.html',
    styleUrls: ['./cash-by-acc-period-search.component.css'],
    providers: [CashByAccPeriodSearchService]
})
export class CashByAccPeriodSearchComponent extends BaseComponent {
    private serviceName = 'CASH_ACC_PERIOD';
    log = Log.create('CashByAccPeriodSearchComponent');

    cashByAccPeriodSearchModel: CashByAccPeriodSearchModel;
    ddOptionsPCenter: DataDropDownOptions;
    ngCenter: any;

    @ViewChild(DataTableDirective) dtElement: DataTableDirective;
    @ViewChild('cashByAccPeriodList') CashByAccPeriodTemplate;
    @ViewChild(TabsComponent) tabsComponent;
    @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;
    @ViewChild(CzDatePickerComponent) czDatePicker: CzDatePickerComponent;
    @ViewChild('profitCentre', { read: DataDropDownComponent }) ddProfitCentre: DataDropDownComponent;



    constructor(private router: Router,
        protected loaderService: LoaderService,
        private _logger: Logger,
        protected globalService: GlobalService,
        protected changeService: ChangeService,
        protected saveSearchService: SaveSearchService,
        private cashByAccPeriodSearchService: CashByAccPeriodSearchService) {
        super(loaderService, changeService, saveSearchService, cashByAccPeriodSearchService, globalService);
        this.log.color = 'lightblue';
        this.doInitialSetup();
    }

    doInInitLoad() {

    }

    getDatePicker(): CzDatePickerComponent {
        return this.czDatePicker;
    }

    doInitialSetup() {

        this.ddOptionsPCenter = new DataDropDownOptions();
        this.ddOptionsPCenter.serviceURL = Constants.TK_PROFITCENTER_URL;
        this.ddOptionsPCenter.keyName = 'profit_center';
        this.ddOptionsPCenter.keyDesc = 'description';
        this.ddOptionsPCenter.firstOptionText = 'Select a Profit Center';
        this.ddOptionsPCenter.modelName = 'profitCentre';
        this.ddOptionsPCenter.baseComponent = this;


    }

    baseProcessData() {
        const toSum = ['net', 'tax', 'delivery', 'commission', 'total'];
        const keys = ['order_control'];
        return ProjectUtils.mySumFunction2(this.listData, toSum, 'order_control', 'Total:', 'Grand Total', keys);
    }

    // override
    getLoaderName(): string {
        return 'cash-by-acc-period-search';
    }
    // override
    getReportTitle(): string {
        return 'Cash By Account Period Report';
    }
    getReportIcon(): string {
        return 'fa fa-calculator';
    }
    // override
    getReportFileName(): string {
        return 'cashByAccountPeriodReport';
    }

    // override
    getSearchModel(): any {
        if (ProjectUtils.isEmpty(this.cashByAccPeriodSearchModel)) {
            this.cashByAccPeriodSearchModel = <CashByAccPeriodSearchModel>ProjectUtils.getCashByAccPeriodSearch(this.sessionObject);
            if (ProjectUtils.isEmpty(this.cashByAccPeriodSearchModel)) {
                this.cashByAccPeriodSearchModel = new CashByAccPeriodSearchModel();
                this.cashByAccPeriodSearchModel.limit = this.sessionObject.limit;
            }
            this.ngCenter = this.cashByAccPeriodSearchModel.profitCentre;
        }
        this.log.i('this.cashByAccPeriodSearchModel', this.cashByAccPeriodSearchModel);
        return this.cashByAccPeriodSearchModel;
    }

    // override
    getSearchType(): string {
        return 'cashByAccPeriodSearch';
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
        this.tabsComponent.openTab('Cash By A/C Period List',
            this.CashByAccPeriodTemplate, {}, true, 'cashByAccPeriodList');
    }

    // override
    getDispSearch(): ThinkListDisplaySearchComponent {
        return this.dispSearch;
    }

    // override
    setSearchModel(searchModel: any) {
        if (!ProjectUtils.isEmpty(searchModel)) {
            if (typeof searchModel === 'string') {
                this.cashByAccPeriodSearchModel = JSON.parse(searchModel);
            } else {
                this.cashByAccPeriodSearchModel = searchModel;
            }
        }
        if (this.cashByAccPeriodSearchModel.limit === '') {
            this.cashByAccPeriodSearchModel.limit = 0;
        }
        this.log.i('setSearchModel', this.cashByAccPeriodSearchModel);
        this.ngCenter = this.setDropDownComponentValue('profitCentre');
        ProjectUtils.setCashByAccPeriodSearch(this.sessionObject, this.cashByAccPeriodSearchModel);
    }

    getDataElement(whichService: string): DataTableDirective {
        if (whichService === this.serviceName) {
            return this.dtElement;
        }
    }

    // override
    getBodyData(): string {
        let body = '';
        body += this.cashByAccPeriodSearchService.getDateSearchParam(this.cashByAccPeriodSearchModel, body);
        body += this.cashByAccPeriodSearchService.getDropDownSearchParam(body, 'profitCentre', this.cashByAccPeriodSearchModel);
        body += this.getBodyLimit(body, this.cashByAccPeriodSearchModel.limit);
        return body;
    }

    doOnReset() {
        this.cashByAccPeriodSearchModel['profitCentre'] = null;
        this.cashByAccPeriodSearchModel.limit = this.sessionObject.limit;
        this.ddProfitCentre.optionsModel = [];
        this.ngCenter = [];
        this.czDatePicker.calendarCanceled(this);
    }

}
