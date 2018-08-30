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

import { EarnedDeferredIncomeSearchService } from './earned-deferred-income-search.service';
import { EarnedDeferredIncomeSearchModel } from './earned-deferred-income-search.model';
import { GlobalService } from '../../../shared/global.service';
import { ChangeService } from '../../../shared/change-service';
import { SaveSearchService } from '../../../shared/save-search-service';
import { CzDatePickerComponent } from '../../../../components/cz-date-picker/cz-date-picker.component';

@Component({
    selector: 'app-earned-deferred-income-search',
    templateUrl: './earned-deferred-income-search.component.html',
    styleUrls: ['./earned-deferred-income-search.component.css'],
    providers: [EarnedDeferredIncomeSearchService]
})
export class EarnedDeferredIncomeSearchComponent extends BaseComponent {
    private EARNED_DEFERRED_INCOME = 'EARNED_DEFERRED_INCOME';
    log = Log.create('EarnedDeferredIncomeSearchComponent');

    earnedDeferredIncomeSearchModel: EarnedDeferredIncomeSearchModel;
    ddOptionsPCenter: DataDropDownOptions;
    ngCenter: any;

    @ViewChild(DataTableDirective) dtElement: DataTableDirective;
    @ViewChild('earnedDeferredIncomeList') EarnedDeferredIncomeTemplate;
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
        private earnedDeferredIncomeSearchService: EarnedDeferredIncomeSearchService) {
        super(loaderService, changeService, saveSearchService, earnedDeferredIncomeSearchService, globalService);
        this.log.color = 'lightblue';
        this.doInitialSetup();
    }

    doInInitLoad() {

    }
    getDatePicker(): CzDatePickerComponent {
        return this.czDatePicker;
    }

    checkchange(e) {
        if (e.target.checked) {
            this.log.i('checked');
            this.earnedDeferredIncomeSearchModel.includeTax = {
                'id': 'true',
                'desc': 'Include Tax',
                'columnName': 'includeTax'
            };

        } else {
            this.log.i('unchecked');
            this.earnedDeferredIncomeSearchModel.includeTax = '';
        }
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

    // baseProcessData() {
    //     this.listData = ProjectUtils.mySumFunction(this.listData, ['tax', 'total_liability'], 'orderNo', 'Total');
    // }

    baseProcessData() {
        const toSum = ['deferred_liability', 'earned_revenue', 'qty_deferred', 'qty_earned', 'qty_ordered', 'total_liability'];
        const keys = ['oc_description'];
        return ProjectUtils.mySumFunction2(this.listData, toSum, 'oc_description', 'Total:', 'Grand Total', keys);
    }

    // override
    getLoaderName(): string {
        return 'earned-deferred-income-search';
    }
    // override
    getReportTitle(): string {
        return 'Earned Deferred Income Search Report';
    }
    getReportIcon(): string {
        return 'fa fa-calculator';
    }
    // override
    getReportFileName(): string {
        return 'earnedDeferredIncomeSearchReport';
    }

    // override
    getSearchModel(): any {
        if (ProjectUtils.isEmpty(this.earnedDeferredIncomeSearchModel)) {
            this.earnedDeferredIncomeSearchModel = <EarnedDeferredIncomeSearchModel>ProjectUtils.getEarnedDeferredIncomeSearch(this.sessionObject);
            if (ProjectUtils.isEmpty(this.earnedDeferredIncomeSearchModel)) {
                this.earnedDeferredIncomeSearchModel = new EarnedDeferredIncomeSearchModel();
                this.earnedDeferredIncomeSearchModel.limit = this.sessionObject.limit;
            }
            this.ngCenter = this.earnedDeferredIncomeSearchModel.profitCentre;
        }
        this.log.i('this.earnedDeferredIncomeSearchModel', this.earnedDeferredIncomeSearchModel);
        return this.earnedDeferredIncomeSearchModel;
    }

    // override
    getSearchType(): string {
        return 'earnedDeferredIncomeSearch';
    }

    // override
    getTabsComponent(): any {
        return this.tabsComponent;
    }


    // override
    getServiceName(): string {
        return this.EARNED_DEFERRED_INCOME;
    }

    // override
    openListTab() {
        this.tabsComponent.openTab('Earned & Deferred Income List',
            this.EarnedDeferredIncomeTemplate, {}, true, 'earnedDeferredIncomeList');
    }

    // override
    getDispSearch(): ThinkListDisplaySearchComponent {
        return this.dispSearch;
    }

    // override
    setSearchModel(searchModel: any) {
        if (!ProjectUtils.isEmpty(searchModel)) {
            if (typeof searchModel === 'string') {
                this.earnedDeferredIncomeSearchModel = JSON.parse(searchModel);
            } else {
                this.earnedDeferredIncomeSearchModel = searchModel;
            }
        }
        if (this.earnedDeferredIncomeSearchModel.limit === '') {
            this.earnedDeferredIncomeSearchModel.limit = 0;
        }
        this.log.i('setSearchModel', this.earnedDeferredIncomeSearchModel);
        this.ngCenter = this.setDropDownComponentValue('profitCentre');
        ProjectUtils.setEarnedDeferredIncomeSearch(this.sessionObject, this.earnedDeferredIncomeSearchModel);
    }

    getDataElement(whichService: string): DataTableDirective {
        if (whichService === this.EARNED_DEFERRED_INCOME) {
            return this.dtElement;
        }
    }

    // override
    getBodyData(): string {
        let body = '';
        body += this.earnedDeferredIncomeSearchService.getDateSearchParam(this.earnedDeferredIncomeSearchModel, body);
        body += this.earnedDeferredIncomeSearchService.getDropDownSearchParam(body, 'profitCentre', this.earnedDeferredIncomeSearchModel);
        body += this.earnedDeferredIncomeSearchService.getDropDownSearchParam(body, 'includeTax', this.earnedDeferredIncomeSearchModel);
        body += this.getBodyLimit(body, this.earnedDeferredIncomeSearchModel.limit);

        return body;
    }

    doOnReset() {
        this.earnedDeferredIncomeSearchModel['profitCentre'] = null;
        this.earnedDeferredIncomeSearchModel.limit = this.sessionObject.limit;
        this.ngCenter = [];
        this.czDatePicker.calendarCanceled(this);
    }

}
