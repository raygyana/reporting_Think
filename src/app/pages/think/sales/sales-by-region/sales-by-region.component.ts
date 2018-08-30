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
import { DataDropDownComponent } from '../../../../components/data-drop-down/data-drop-down.component';
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

import { SalesByRegionService } from './sales-by-region.service';
import { SalesByRegionModel } from './sales-by-region.model';
import { CzDatePickerComponent } from '../../../../components/cz-date-picker/cz-date-picker.component';
@Component({
    selector: 'app-sales-by-region',
    templateUrl: './sales-by-region.component.html',
    styleUrls: ['./sales-by-region.component.css'],
    providers: [SalesByRegionService]
})
export class SalesByRegionComponent extends BaseComponent {
    private SALES_BY_REGION = 'salesByRegion';
    log = Log.create('SalesByRegionComponent');
    ddOptionsproductName: DataDropDownOptions;
    ddOptionsRegion: DataDropDownOptions;
    salesRegionModel: any;
    ngjournalData: any;
    ngregionData: any;

    @ViewChild('salesByRegionListData', { read: DataTableDirective }) dtElement: DataTableDirective;
    @ViewChild('salesByRegionList') salesByRegionListTemplate;
    @ViewChild(TabsComponent) tabsComponent;
    @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;
    @ViewChild(CzDatePickerComponent) czDatePicker: CzDatePickerComponent;

    constructor(private router: Router,
        private salesByRegionService: SalesByRegionService,
        protected globalService: GlobalService,
        private _logger: Logger,
        protected changeService: ChangeService,
        protected saveSearchService: SaveSearchService,
        protected loaderService: LoaderService) {
        super(loaderService, changeService, saveSearchService, salesByRegionService, globalService);
        this.log.color = 'lightblue';
        this.doInitialSetup();
    }

    // override
    getLoaderName(): string {
        return 'sales-by-region-component';
    }

    // override
    getSearchModel(): any {
        if (ProjectUtils.isEmpty(this.salesRegionModel)) {
            this.salesRegionModel = this.sessionObject.salesRegionSearch;
            if (ProjectUtils.isEmpty(this.salesRegionModel)) {
                this.salesRegionModel = {};
                this.salesRegionModel.limit = this.sessionObject.limit;
                this.calenderSetDefaultValue(this.salesRegionModel);
            }
            this.ngjournalData = this.salesRegionModel.journalId;
            this.ngregionData = this.salesRegionModel.regionId;
        }
        this.log.i('getSearchModel', this.salesRegionModel);
        return this.salesRegionModel;
    }

    // override
    getSearchType(): string {
        return 'salesRegion';
    }

    // override
    getDataElement(whichService: string): DataTableDirective {
        return this.dtElement;
    }
    // override
    getReportIcon(): string {
        return 'fa-pie-chart';
    }

    // override
    getServiceName(): string {
        return this.SALES_BY_REGION;
    }

    // override
    openListTab() {
        this.tabsComponent.openTab('Sales By Region List',
            this.salesByRegionListTemplate, {}, true, 'salesByRegionList');
    }

    // override
    getDispSearch(): ThinkListDisplaySearchComponent {
        return this.dispSearch;
    }

    // override
    getReportTitle(): string {
        return 'Sales By Region Report';
    }

    // override
    getReportFileName(): string {
        return 'salesByRegionReport';
    }

    doInitialSetup() {
        this.ddOptionsproductName = new DataDropDownOptions();
        this.ddOptionsproductName.serviceURL = Constants.TK_SALE_JOURNAL_LIST_URL;
        this.ddOptionsproductName.keyName = 'ocID';
        this.ddOptionsproductName.keyDesc = 'description';
        this.ddOptionsproductName.modelName = 'journalId';
        this.ddOptionsproductName.firstOptionText = 'Select a Product';
        this.ddOptionsproductName.baseComponent = this;
        this.ddOptionsproductName.multipleState = true;
        this.ddOptionsproductName.selectMulti = true;

        this.ddOptionsRegion = new DataDropDownOptions();
        this.ddOptionsRegion.serviceURL = Constants.TK_SALE_REGION_LIST_URL;
        this.ddOptionsRegion.keyName = 'region';
        this.ddOptionsRegion.keyDesc = 'description';
        this.ddOptionsRegion.modelName = 'regionId';
        this.ddOptionsRegion.firstOptionText = 'Select a Region';
        this.ddOptionsRegion.baseComponent = this;
        this.ddOptionsRegion.multipleState = true;
        this.ddOptionsRegion.selectMulti = true;

        this.displaySearchOptions.noCrossList = [];
        this.displaySearchOptions.noCrossList.push('regionId');
    }

    // override
    setSearchModel(searchModel: any) {
        if (!ProjectUtils.isEmpty(searchModel)) {
            if (typeof searchModel === 'string') {
                this.salesRegionModel = JSON.parse(searchModel);
            } else {
                this.salesRegionModel = searchModel;
            }
        }
        if (this.salesRegionModel.limit === '') {
            this.salesRegionModel.limit = 0;
        }
        this.log.i('setSearchModel', this.salesRegionModel);
        this.ngjournalData = this.setDropDownComponentValue('journalId');
        this.ngregionData = this.setDropDownComponentValue('regionId');

        ProjectUtils.setSalesRegionSearch(this.sessionObject, this.salesRegionModel);
    }
    doInInitLoad() {
    }

    getDatePicker(): CzDatePickerComponent {
        return this.czDatePicker;
    }

    getBodyData(): string {
        let body = '';
        body += this.salesByRegionService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());
        body += this.salesByRegionService.getDateSearchParam(this.salesRegionModel, body);
        body += this.salesByRegionService.getDropDownSearchParam(body, 'journalId', this.salesRegionModel);
        body += this.salesByRegionService.getDropDownSearchParam(body, 'regionId', this.salesRegionModel);
        body += this.getBodyLimit(body, this.salesRegionModel.limit);
        return body;
    }

    doOnReset() {
        this.salesRegionModel['journalId'] = null;
        this.salesRegionModel['regionId'] = null;
        this.ngjournalData = [];
        this.ngregionData = [];
        this.calenderSetDefaultValue(this.salesRegionModel);
        this.salesRegionModel.limit = this.sessionObject.limit;

    }

}
