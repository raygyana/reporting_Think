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

import { Logger } from '../../../../core/logger/logger';
import { LoaderService } from '../../../../core/loader/loader.service';
import { BaseComponent } from '../../../../core/base/base.component';
import { ProjectUtils } from '../../../shared/project-utils';
import { Constants } from '../../../shared/constant';
import { SessionObject } from '../../../shared/session-object';
import { GlobalService } from '../../../shared/global.service';
import { Log, Level } from 'ng2-logger';
import { Logger as Loggerr } from '../../../../core/logger/logger';

import { ChangeService } from '../../../shared/change-service';
import { SaveSearchService } from '../../../shared/save-search-service';

import { LapserReportService } from './lapser-report.service';
import { LapserReportModel } from './lapser-report.model';

@Component({
    selector: 'app-lapser-and-renewal-effort',
    templateUrl: './lapser-report.component.html',
    styleUrls: ['./lapser-report.component.css'],
    providers: [LapserReportService]
})
export class LapserReportComponent extends BaseComponent {

    private LAPSER_REPORT = 'lapserReport';
    log = Log.create('LapserReportComponent');

    lapserReportModel: LapserReportModel;
    ngCategory: any;
    ngYear: any;
    ngCenter: any;
    ddOptionsexpyear: DataDropDownOptions;
    ddOptionscategory: DataDropDownOptions;
    ddOptionsproductName: DataDropDownOptions;

    @ViewChild('lapserReportData', { read: DataTableDirective }) dtElement: DataTableDirective;
    @ViewChild('lapserReportList') lapserReportListTemplate;
    @ViewChild(TabsComponent) tabsComponent;
    @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;
    @ViewChild('expYear', { read: DataDropDownComponent }) ddExpYear: DataDropDownComponent;
    @ViewChild('productName', { read: DataDropDownComponent }) ddProductName: DataDropDownComponent;
    @ViewChild('category', { read: DataDropDownComponent }) ddCategory: DataDropDownComponent;


    constructor(private router: Router,
        protected loaderService: LoaderService,
        private _logger: Logger,
        protected changeService: ChangeService,
        protected saveSearchService: SaveSearchService,
        private lapserReportService: LapserReportService,
        protected globalService: GlobalService) {
        super(loaderService, changeService, saveSearchService, lapserReportService, globalService);
        this.doOnIntialSetup();
        this.log.color = 'lightblue';
    }

    // override
    getLoaderName(): string {
        return 'lapser-report';
    }

    // override
    getSearchModel(): any {
        if (ProjectUtils.isEmpty(this.lapserReportModel)) {
            this.lapserReportModel = <LapserReportModel>this.sessionObject.lapserReportSearch;
            if (ProjectUtils.isEmpty(this.lapserReportModel)) {
                this.lapserReportModel = new LapserReportModel();
                this.lapserReportModel.limit = this.sessionObject.limit;
            }
            this.ngCenter = this.lapserReportModel.productName;
            this.ngCategory = this.lapserReportModel.subsCategory;
            this.ngYear = this.lapserReportModel.expYear;
        }
        this.log.i('this.lapserReportModel', this.lapserReportModel);
        return this.lapserReportModel;
    }

    // override
    getSearchType(): string {
        return 'lapserReportSearch';
    }

    // override
    getTabsComponent(): any {
        return this.tabsComponent;
    }
    // override
    openListTab() {
        this.tabsComponent.openTab('Lapser Report List',
            this.lapserReportListTemplate, {}, true, 'lapserReportList');
    }
    // override
    getDispSearch(): ThinkListDisplaySearchComponent {
        return this.dispSearch;
    }
    // override
    getReportTitle(): string {
        return 'Lapser Report';
    }
    getReportIcon(): string {
        return 'fa fa-edit';
    }
    // override
    getReportFileName(): string {
        return 'lapserReport';
    }

    getServiceName(): string {
        return this.LAPSER_REPORT;
    }

    // override
    setSearchModel(searchModel: any) {
        if (!ProjectUtils.isEmpty(searchModel)) {
            if (typeof searchModel === 'string') {
                this.lapserReportModel = JSON.parse(searchModel);
            } else {
                this.lapserReportModel = searchModel;
            }
        }
        if (this.lapserReportModel.limit === '') {
            this.lapserReportModel.limit = 0;
        }

        this.ngYear = this.setDropDownComponentValue('expYear');
        this.ngCenter = this.setDropDownComponentValue('productName');
        this.ngCategory = this.setDropDownComponentValue('subsCategory');
        this.log.i('setSearchModel', this.lapserReportModel);
        ProjectUtils.setLapserReportSearch(this.sessionObject, this.lapserReportModel);
    }

    // override
    getDataElement(whichService: string): DataTableDirective {
        return this.dtElement;
    }
    doInInitLoad() {
        this.displaySearchOptions.noCrossList = []; this.displaySearchOptions.noCrossList.push('expYear');
    }

    doOnIntialSetup() {

        this.ddOptionsexpyear = new DataDropDownOptions();
        this.ddOptionsexpyear.serviceURL = Constants.TK_SALE_VOLUME_YEAR_URL;
        this.ddOptionsexpyear.keyName = 'volume';
        this.ddOptionsexpyear.keyDesc = 'volume';
        this.ddOptionsexpyear.firstOptionText = 'Select a Year';
        this.ddOptionsexpyear.modelName = 'expYear';
        this.ddOptionsexpyear.baseComponent = this;

        this.ddOptionscategory = new DataDropDownOptions();
        this.ddOptionscategory.serviceURL = Constants.TK_SALE_CATEGORY_DROPDOWN_URL;
        this.ddOptionscategory.keyName = 'subscriptionCategoryId';
        this.ddOptionscategory.keyDesc = 'description';
        this.ddOptionscategory.modelName = 'subsCategory';
        this.ddOptionscategory.firstOptionText = 'Select a Subscription Category';
        this.ddOptionscategory.baseComponent = this;
        this.ddOptionscategory.selectMulti = true;

        this.ddOptionsproductName = new DataDropDownOptions();
        this.ddOptionsproductName.serviceURL = Constants.TK_SALE_JOURNAL_LIST_URL;
        this.ddOptionsproductName.keyName = 'ocID';
        this.ddOptionsproductName.keyDesc = 'description';
        this.ddOptionsproductName.modelName = 'productName';
        this.ddOptionsproductName.firstOptionText = 'Select a Product Name';
        this.ddOptionsproductName.baseComponent = this;
        this.ddOptionsproductName.selectMulti = true;

    }

    getBodyData(): string {
        let body = '';
        body += this.lapserReportService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());
        body += this.lapserReportService.getDateSearchParam(this.lapserReportModel, body);
        body += this.lapserReportService.getDropDownSearchParam(body, 'subsCategory', this.lapserReportModel);
        body += this.lapserReportService.getDropDownSearchParam(body, 'productName', this.lapserReportModel);
        body += this.lapserReportService.getDropDownSearchParam(body, 'expYear', this.lapserReportModel);
        body += this.getBodyLimit(body, this.lapserReportModel.limit);
        return body;
    }

    doOnReset() {
        this.lapserReportModel['expYear'] = null;
        this.lapserReportModel['productName'] = null;
        this.lapserReportModel['subsCategory'] = null;
        this.ngCenter = [];
        this.ngYear = [];
        this.ngCategory = [];
        this.lapserReportModel.limit = this.sessionObject.limit;
    }


}
