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

import { RMGRWatchListService } from './rmgr_watch_list.service';
import { CzDatePickerComponent } from '../../../../components/cz-date-picker/cz-date-picker.component';
import { RMGRWatchListModel } from './rmgr_watch_list.model';
@Component({
    selector: 'app-rmgr-watch-list',
    templateUrl: './rmgr_watch_list.component.html',
    styleUrls: ['./rmgr_watch_list.component.css'],
    providers: [RMGRWatchListService]
})
export class RMGRWatchListComponent extends BaseComponent {
    private RMGR_WATCH_LIST_SEARCH = 'rmgrWatchListSearch';
    log = Log.create('RMGRWatchListComponent');
    rmgrWatchListModel: RMGRWatchListModel;


    @ViewChild('rmgrWatchListData', { read: DataTableDirective }) dtElement: DataTableDirective;
    @ViewChild('rmgrWatchList') rmgrWatchListTemplate;
    @ViewChild(TabsComponent) tabsComponent;
    @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;
    @ViewChild(CzDatePickerComponent) czDatePicker: CzDatePickerComponent;



    constructor(private rmgrWatchListService: RMGRWatchListService,
        protected globalService: GlobalService,
        private _logger: Logger,
        private router: Router,
        protected changeService: ChangeService,
        protected saveSearchService: SaveSearchService,
        protected loaderService: LoaderService) {
        super(loaderService, changeService, saveSearchService, rmgrWatchListService, globalService);
        this.log.color = 'lightblue';

    }
    doPreInitLoad() {
        this.hideLoader();
    }
    // override
    getLoaderName(): string {
        return 'rmgr-watch-list';
    }

    // override
    getSearchModel(): any {
        if (ProjectUtils.isEmpty(this.rmgrWatchListModel)) {
            this.rmgrWatchListModel = this.sessionObject.rmgrWatchListSearch;
            if (ProjectUtils.isEmpty(this.rmgrWatchListModel)) {
                this.rmgrWatchListModel = new RMGRWatchListModel();
                this.rmgrWatchListModel.limit = this.sessionObject.limit;
            }
        }
        this.log.i('getSearchModel', this.rmgrWatchListModel);
        return this.rmgrWatchListModel;
    }

    // override
    getSearchType(): string {
        return 'rmgrWatchList';
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
        return this.RMGR_WATCH_LIST_SEARCH;
    }
    getDatePicker(): CzDatePickerComponent {
        return this.czDatePicker;
    }

    // override
    openListTab() {
        this.tabsComponent.openTab('RMGR Watch Search List',
            this.rmgrWatchListTemplate, {}, true, 'rmgrWatchList');
    }

    // override
    getDispSearch(): ThinkListDisplaySearchComponent {
        return this.dispSearch;
    }

    // override
    getReportTitle(): string {
        return 'RMGR Watch List Report';
    }
    getReportIcon(): string {
        return 'fa-file-text-o';
    }
    // override
    getReportFileName(): string {
        return 'rmgrWatchListReport';
    }

    // override
    setSearchModel(searchModel: any) {
        if (!ProjectUtils.isEmpty(searchModel)) {
            if (typeof searchModel === 'string') {
                this.rmgrWatchListModel = JSON.parse(searchModel);
            } else {
                this.rmgrWatchListModel = searchModel;
            }
        }
        if (this.rmgrWatchListModel.limit === '') {
            this.rmgrWatchListModel.limit = 0;
        }
        this.log.i('setSearchModel', this.rmgrWatchListModel);

        ProjectUtils.setRMGRWatchListSearch(this.sessionObject, this.rmgrWatchListModel);
    }

    getBodyData(): string {
        let body = '';
        body += this.rmgrWatchListService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());
        body += this.rmgrWatchListService.getSingleDateSearchParam(this.rmgrWatchListModel, body, 'startDate');
        body += this.rmgrWatchListService.setParamValue(body, 'customerId', this.rmgrWatchListModel.customerId);
        body += this.rmgrWatchListService.setParamValue(body, 'order_code', this.rmgrWatchListModel.order_code);
        body += this.getBodyLimit(body, this.rmgrWatchListModel.limit);

        return body;
    }


    doOnReset() {

        this.czDatePicker.calendarCanceled(this);
        this.rmgrWatchListModel.limit = this.sessionObject.limit;
    }
}
