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
import { DiscountSummaryReportService } from './discount-summary-report.service';
import { DiscountSummaryReportModel } from './discount-summary-report.model';
import { CzDatePickerComponent } from '../../../../components/cz-date-picker/cz-date-picker.component';

@Component({
    selector: 'app-discount-summary-report',
    templateUrl: './discount-summary-report.component.html',
    styleUrls: ['./discount-summary-report.component.css'],
    providers: [DiscountSummaryReportService]
})
export class DiscountSummaryReportComponent extends BaseComponent {
    private DISCOUNT_SUMMARY_REPORT_SEARCH = 'discountSummaryReportSearch';
    log = Log.create('DiscountSummaryReportComponent');
    discountSummaryReportModel: DiscountSummaryReportModel;
    ddOptionsJournalName: DataDropDownOptions;
    ngJournalName: any;
    ddOptionsDiscountStatus: DataDropDownOptions;
    ngDiscountStatus: any;
    ddTriggerActive: Subject<any> = new Subject();

    @ViewChild(DataTableDirective) dtElement: DataTableDirective;
    @ViewChild(TabsComponent) tabsComponent;
    @ViewChild('discountSummaryReportList') discountSummaryReportListTemplate;
    @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;
    @ViewChild('discountSummaryReportData', { read: DataTableDirective }) dtSalesElement: DataTableDirective;
    @ViewChild('discountStatus', { read: DataDropDownComponent }) ddOptionsDiscount: DataDropDownComponent;
    @ViewChild('journalName', { read: DataDropDownComponent }) ddOptionsJournal: DataDropDownComponent;
    @ViewChild(CzDatePickerComponent) czDatePicker: CzDatePickerComponent;

    constructor(private router: Router,
        private discountSummaryReportService: DiscountSummaryReportService,
        private _logger: Logger,
        protected globalService: GlobalService,
        protected changeService: ChangeService,
        protected saveSearchService: SaveSearchService,
        protected loaderService: LoaderService) {
        super(loaderService, changeService, saveSearchService, discountSummaryReportService, globalService);
        this.doInitialSetup();
        this.log.color = 'lightblue';
    }

    getLoaderName(): string {
        return 'discount-summary-report-component';
    }

    getSearchModel(): any {
        if (ProjectUtils.isEmpty(this.discountSummaryReportModel)) {
            this.discountSummaryReportModel = <DiscountSummaryReportModel>this.sessionObject.discountSummaryReportSearch;
            if (ProjectUtils.isEmpty(this.discountSummaryReportModel)) {
                this.discountSummaryReportModel = new DiscountSummaryReportModel();
                this.discountSummaryReportModel.limit = this.sessionObject.limit;
            }
            this.ngJournalName = this.discountSummaryReportModel.journalName;
            this.ngDiscountStatus = this.discountSummaryReportModel.discountStatus;
        }

        this.log.i('getSearchModel', this.discountSummaryReportModel);
        return this.discountSummaryReportModel;
    }

    getSearchType(): string {
        return 'discountSummaryReportSearch';
    }

    getTabsComponent(): any {
        return this.tabsComponent;
    }
    doPreInitLoad() {

        this.globalService.getMITActiveData(this.ddTriggerActive);

    }
    // override
    getReportTitle(): string {
        return 'Discount Code Report';
    }
    getReportIcon(): string {
        return 'fa-file-text-o';
    }
    // override
    getReportFileName(): string {
        return 'discountCodeReport';
    }

    getServiceName(): string {
        return this.DISCOUNT_SUMMARY_REPORT_SEARCH;
    }

    getDatePicker(): CzDatePickerComponent {
        return this.czDatePicker;
    }

    // override
    openListTab() {
        this.tabsComponent.openTab('Discount Code Report List',
            this.discountSummaryReportListTemplate, {}, true, 'discountSummaryReportList');
    }
    // override
    getDispSearch(): ThinkListDisplaySearchComponent {
        return this.dispSearch;
    }

    // override
    setSearchModel(searchModel: any) {
        if (!ProjectUtils.isEmpty(searchModel)) {
            if (typeof searchModel === 'string') {
                this.discountSummaryReportModel = JSON.parse(searchModel);
            } else {
                this.discountSummaryReportModel = searchModel;
            }
        }
        if (this.discountSummaryReportModel.limit === '') {
            this.discountSummaryReportModel.limit = 0;
        }
        this.log.i('setSearchModel', this.discountSummaryReportModel);
        this.ngJournalName = this.setDropDownComponentValue('journalName');
        this.ngDiscountStatus = this.setDropDownComponentValue('discountStatus');
        ProjectUtils.setDiscountSummaryReportSearch(this.sessionObject, this.discountSummaryReportModel);
    }

    doInitialSetup() {

        this.ddOptionsJournalName = new DataDropDownOptions();
        this.ddOptionsJournalName.serviceURL = Constants.TK_SALE_JOURNAL_LIST_URL;
        this.ddOptionsJournalName.keyName = 'ocID';
        this.ddOptionsJournalName.keyDesc = 'description';
        // this.ddOptionsJournalName.keyName = 'region';
        // this.ddOptionsJournalName.keyDesc = 'description';
        this.ddOptionsJournalName.modelName = 'journalName';
        this.ddOptionsJournalName.firstOptionText = 'Select a Product';
        this.ddOptionsJournalName.baseComponent = this;
        this.ddOptionsJournalName.sort = true;
        this.ddOptionsJournalName.sortKey = 'description';
        this.ddOptionsJournalName.sortOrder = 'asc';


        this.ddOptionsDiscountStatus = new DataDropDownOptions();
        // this.ddOptionsDiscountStatus.serviceURL = Constants.TK_REGION_SEARCH_URL;
        this.ddOptionsDiscountStatus.keyName = 'id';
        this.ddOptionsDiscountStatus.keyDesc = 'value';
        this.ddOptionsDiscountStatus.firstOptionText = 'Select a Status';
        this.ddOptionsDiscountStatus.modelName = 'discountStatus';
        this.ddOptionsDiscountStatus.baseComponent = this;
    }

    getDataElement(whichService: string): DataTableDirective {
        return this.dtElement;
    }

    getBodyData(): string {
        let body = '';
        body += this.discountSummaryReportService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());
        body += this.discountSummaryReportService.getDateSearchParam(this.discountSummaryReportModel, body);
        body += this.discountSummaryReportService.getDropDownSearchParam(body, 'journalName', this.discountSummaryReportModel);
        body += this.discountSummaryReportService.getDropDownSearchParam(body, 'discountStatus', this.discountSummaryReportModel);
        body += this.getBodyLimit(body, this.discountSummaryReportModel.limit);

        return body;
    }


    doOnReset() {

        this.discountSummaryReportModel['journalName'] = null;
        this.ngJournalName = [];
        this.discountSummaryReportModel['discountStatus'] = null;
        this.ngDiscountStatus = [];
        this.czDatePicker.calendarCanceled(this);
        this.discountSummaryReportModel.limit = this.sessionObject.limit;

    }
}
