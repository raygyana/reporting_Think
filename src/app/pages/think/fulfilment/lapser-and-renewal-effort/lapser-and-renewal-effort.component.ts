import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { ParamMap } from '@angular/router';
import { DatePipe } from '@angular/common';
// Import from III party
import { DataTableDirective } from 'angular-datatables';
import { TabsetComponent } from '../../../../components/ngtabs';
import { TabsComponent } from '../../../../components/ng-tabs/tabs.component';

import { Logger } from '../../../../core/logger/logger';
import { LoaderService } from '../../../../core/loader/loader.service';
import { BaseComponent } from '../../../../core/base/base.component';
import { ProjectUtils } from '../../../shared/project-utils';
import { Constants } from '../../../shared/constant';
import { Log, Level } from 'ng2-logger';
import { Logger as Loggerr } from '../../../../core/logger/logger';
import { DataDropDownOptions } from '../../../../components/data-drop-down/data-drop-down.model';
import { DataDropDownComponent } from '../../../../components/data-drop-down/data-drop-down.component';
import { SessionObject } from '../../../shared/session-object';
import { GlobalService } from '../../../shared/global.service';

// import { CustomerListService } from '../customer-search/customer-search.service';
import { ChangeService } from '../../../shared/change-service';
import { SaveSearchService } from '../../../shared/save-search-service';
import { ThinkListDisplaySearchComponent } from '../../../../components/think-list-display-search/think-list-display-search.component';

import { LapserAndRenewalEffortService } from './lapser-and-renewal-effort.service';
import { LapserAndRenewalEffortModel } from './lapser-and-renewal-effort.model';

@Component({
    selector: 'app-lapser-and-renewal-effort',
    templateUrl: './lapser-and-renewal-effort.component.html',
    styleUrls: ['./lapser-and-renewal-effort.component.css'],
    providers: [LapserAndRenewalEffortService]
})
export class LapserAndRenewalEffortComponent extends BaseComponent {

    private LAPSER_AND_RENEWAL_EFFORT = 'lapserAndRenewalEffort';
    log = Log.create('LapserAndRenewalEffortComponent');
    lapserAndRenewalModel: LapserAndRenewalEffortModel;

    ddOptionsexpyear: DataDropDownOptions;
    ddOptionscategory: DataDropDownOptions;
    ddOptionsproductName: DataDropDownOptions;
    ngCategory: any;
    ngProductName: any;
    ngYear: any;

    @ViewChild('lapserAndRenewalEffortData', { read: DataTableDirective }) dtElement: DataTableDirective;
    @ViewChild('lapserAndRenewalEffortList') lapserAndRenewalEffortListTemplate;
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
        private lapserAndRenewalEffortService: LapserAndRenewalEffortService,
        protected globalService: GlobalService) {
        super(loaderService, changeService, saveSearchService, lapserAndRenewalEffortService, globalService);
        this.doOnIntialSetup();
        this.log.color = 'lightblue';
    }

    getLoaderName(): string {
        return 'lapser-and-renewal-effort';
    }

    getSearchModel(): any {
        if (ProjectUtils.isEmpty(this.lapserAndRenewalModel)) {
            this.lapserAndRenewalModel = <LapserAndRenewalEffortModel>this.sessionObject.lapserAndRenewalEffortSearch;
            if (ProjectUtils.isEmpty(this.lapserAndRenewalModel)) {
                this.lapserAndRenewalModel = new LapserAndRenewalEffortModel();
                this.lapserAndRenewalModel.limit = this.sessionObject.limit

            }
            this.ngProductName = this.lapserAndRenewalModel.productName;
            this.ngCategory = this.lapserAndRenewalModel.subsCategory;
            this.ngYear = this.lapserAndRenewalModel.expYear;

        }
        this.log.i('getSearchModel', this.lapserAndRenewalModel);
        return this.lapserAndRenewalModel;
    }

    getSearchType(): string {
        return 'lapserAndRenewalSearch';
    }
    // override
    getReportTitle(): string {
        return 'Lapser & Renewal Search Report';
    }
    getReportIcon(): string {
        return 'fa fa-edit';
    }
    // override
    getReportFileName(): string {
        return 'lapser&RenewalSearchReport';
    }


    // override
    getTabsComponent(): any {
        return this.tabsComponent;
    }
    // override
    openListTab() {
        this.tabsComponent.openTab('Lapser & Renewal Effort List ',
            this.lapserAndRenewalEffortListTemplate, {}, true, 'lapserAndRenewalEffortList');
    }
    // override
    getDispSearch(): ThinkListDisplaySearchComponent {
        return this.dispSearch;
    }

    getServiceName(): string {
        return this.LAPSER_AND_RENEWAL_EFFORT;
    }

    // override
    setSearchModel(searchModel: any) {
        if (!ProjectUtils.isEmpty(searchModel)) {
            if (typeof searchModel === 'string') {
                this.lapserAndRenewalModel = JSON.parse(searchModel);
            } else {
                this.lapserAndRenewalModel = searchModel;
            }
        }
        if (this.lapserAndRenewalModel.limit === '') {
            this.lapserAndRenewalModel.limit = 0;
        }
        this.ngYear = this.setDropDownComponentValue('expYear');
        this.ngProductName = this.setDropDownComponentValue('productName');
        this.ngCategory = this.setDropDownComponentValue('subsCategory');

        this.log.i('setSearchModel', this.lapserAndRenewalModel);
        ProjectUtils.setLapserAndRenewalSearch(this.sessionObject, this.lapserAndRenewalModel);
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
        this.ddOptionscategory.firstOptionText = 'Select Category';
        this.ddOptionscategory.baseComponent = this;
        this.ddOptionscategory.selectMulti = true;

        this.ddOptionsproductName = new DataDropDownOptions();
        this.ddOptionsproductName.serviceURL = Constants.TK_SALE_JOURNAL_LIST_URL;
        this.ddOptionsproductName.keyName = 'ocID';
        this.ddOptionsproductName.keyDesc = 'description';
        this.ddOptionsproductName.modelName = 'productName';
        this.ddOptionsproductName.firstOptionText = 'Select a Product';
        this.ddOptionsproductName.baseComponent = this;
        this.ddOptionsproductName.selectMulti = true;

    }

    goToSearch() {
        this.tabsComponent.selectTab(this.tabsComponent.tabs.first);
    }

    getDataElement(whichService: string): DataTableDirective {
        return this.dtElement;
    }

    getBodyData(): string {
        let body = '';
        body += this.lapserAndRenewalEffortService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());
        body += this.lapserAndRenewalEffortService.getDateSearchParam(this.lapserAndRenewalModel, body);
        body += this.lapserAndRenewalEffortService.getDropDownSearchParam(body, 'subsCategory', this.lapserAndRenewalModel);
        body += this.lapserAndRenewalEffortService.getDropDownSearchParam(body, 'productName', this.lapserAndRenewalModel);
        body += this.lapserAndRenewalEffortService.getDropDownSearchParam(body, 'expYear', this.lapserAndRenewalModel);
        body += this.getBodyLimit(body, this.lapserAndRenewalModel.limit);
        return body;
    }


    doOnReset() {
        this.lapserAndRenewalModel['expYear'] = null;
        this.lapserAndRenewalModel['productName'] = null;
        this.lapserAndRenewalModel['subsCategory'] = null;
        this.ngProductName = [];
        this.ngCategory = [];
        this.ngYear = [];
        this.lapserAndRenewalModel.limit = this.sessionObject.limit;

    }
}
