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

import { DeferredLiabilitySummarySearchService } from './deferred-liability-summary-search.service';
import { DeferredLiabilitySummarySearchModel } from './deferred-liability-summary-search.model';
import { GlobalService } from '../../../shared/global.service';
import { ChangeService } from '../../../shared/change-service';
import { SaveSearchService } from '../../../shared/save-search-service';
import { CzDatePickerComponent } from '../../../../components/cz-date-picker/cz-date-picker.component';

@Component({
    selector: 'app-deferred-liability-summary-search',
    templateUrl: './deferred-liability-summary-search.component.html',
    styleUrls: ['./deferred-liability-summary-search.component.css'],
    providers: [DeferredLiabilitySummarySearchService]
})
export class DeferredLiabilitySummarySearchComponent extends BaseComponent {
    private serviceName = 'DEFERRED_LIABILITY_SUMMARY';
    log = Log.create('DeferredLiabilitySummarySearchComponent');

    deferredLiabilitySummarySearchModel: DeferredLiabilitySummarySearchModel;
    ddOptionsPCenter: DataDropDownOptions;
    ngCenter: any;

    @ViewChild(DataTableDirective) dtElement: DataTableDirective;
    @ViewChild('deferredLiabilitySummaryList') DeferredLiabilitySummaryTemplate;
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
        private deferredLiabilitySummarySearchService: DeferredLiabilitySummarySearchService) {
        super(loaderService, changeService, saveSearchService, deferredLiabilitySummarySearchService, globalService);
        this.log.color = 'lightblue';
        this.doInitialSetup();
    }
    doInInitLoad() {
        this.hideLoader();
        this.displaySearchOptions.noCrossList = [];
        this.displaySearchOptions.noCrossList.push('profitCentre');
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
        const toSum = ['credit_liability', 'cash_liability', 'total_liability', 'total_remaining_copies', 'average_liability_copy'];
        const keys = [];
        return ProjectUtils.mySumFunction2(this.listData, toSum, 'description', 'Total:', 'Grand Total', keys);
    }

    // override
    getLoaderName(): string {
        return 'deferred-liability-summary-search';
    }
    // override
    getReportTitle(): string {
        return 'Deferred Liability Summary Report';
    }
    getReportIcon(): string {
        return 'fa fa-calculator';
    }
    // override
    getReportFileName(): string {
        return 'deferredLiabilitySummaryReport';
    }

    // override
    getSearchModel(): any {
        if (ProjectUtils.isEmpty(this.deferredLiabilitySummarySearchModel)) {
            this.deferredLiabilitySummarySearchModel = this.sessionObject.deferredLiabilitySummarySearch;
            if (ProjectUtils.isEmpty(this.deferredLiabilitySummarySearchModel)) {
                this.deferredLiabilitySummarySearchModel = new DeferredLiabilitySummarySearchModel();
                this.deferredLiabilitySummarySearchModel.limit = this.sessionObject.limit;
            }
            this.ngCenter = this.deferredLiabilitySummarySearchModel.profitCentre;
        }
        this.log.i('this.deferredLiabilitySummarySearchModel', this.deferredLiabilitySummarySearchModel);
        return this.deferredLiabilitySummarySearchModel;
    }

    // override
    getSearchType(): string {
        return 'deferredLiabilitySummarySearch';
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
        this.tabsComponent.openTab('Deferred Liability Summary List',
            this.DeferredLiabilitySummaryTemplate, {}, true, 'deferredLiabilitySummaryList');
    }

    // override
    getDispSearch(): ThinkListDisplaySearchComponent {
        return this.dispSearch;
    }

    // override
    setSearchModel(searchModel: any) {
        if (!ProjectUtils.isEmpty(searchModel)) {
            if (typeof searchModel === 'string') {
                this.deferredLiabilitySummarySearchModel = JSON.parse(searchModel);
            } else {
                this.deferredLiabilitySummarySearchModel = searchModel;
            }
        }
        if (this.deferredLiabilitySummarySearchModel.limit === '') {
            this.deferredLiabilitySummarySearchModel.limit = 0;
        }
        this.log.i('setSearchModel', this.deferredLiabilitySummarySearchModel);
        this.ngCenter = this.setDropDownComponentValue('profitCentre');
        ProjectUtils.setDeferredLiabilitySummarySearch(this.sessionObject, this.deferredLiabilitySummarySearchModel);
    }

    getDataElement(whichService: string): DataTableDirective {
        if (whichService === this.serviceName) {
            return this.dtElement;
        }
    }

    // override
    getBodyData(): string {
        let body = '';
        body += this.deferredLiabilitySummarySearchService.getDateSearchParam(this.deferredLiabilitySummarySearchModel, body);
        body += this.deferredLiabilitySummarySearchService.getDropDownSearchParam(body, 'profitCentre', this.deferredLiabilitySummarySearchModel);
        body += this.getBodyLimit(body, this.deferredLiabilitySummarySearchModel.limit);

        return body;
    }

    doOnReset() {
        this.deferredLiabilitySummarySearchModel['profitCentre'] = null;
        this.czDatePicker.calendarCanceled(this);
        this.deferredLiabilitySummarySearchModel.limit = this.sessionObject.limit;
        this.ngCenter = [];
        this.deferredLiabilitySummarySearchModel = new DeferredLiabilitySummarySearchModel();
    }

}
