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
import { FutureExpireService } from './future-expires.service';
import { CzDatePickerComponent } from '../../../../components/cz-date-picker/cz-date-picker.component';
@Component({
    selector: 'app-future-expires',
    templateUrl: './future-expires.component.html',
    styleUrls: ['./future-expires.component.css'],
    providers: [FutureExpireService]
})
export class FutureExpiresComponent extends BaseComponent {
    private FUTURE_EXPIRE_SEARCH = 'futureExpireSearch';
    log = Log.create('FutureExpiresComponent');
    ddOptionsproductName: DataDropDownOptions;
    futureExpireModel: any;
    productData: any; // same as Journal
    ngNNumbers: any;

    @ViewChild('futureExpireData', { read: DataTableDirective }) dtElement: DataTableDirective;
    @ViewChild('futureExpireList') futureExpireListTemplate;
    @ViewChild(TabsComponent) tabsComponent;
    @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;
    @ViewChild(CzDatePickerComponent) czDatePicker: CzDatePickerComponent;
    @ViewChild('journalId', { read: DataDropDownComponent }) ddProductName: DataDropDownComponent;


    constructor(private futureExpireService: FutureExpireService,
        protected globalService: GlobalService,
        private _logger: Logger,
        private router: Router,
        protected changeService: ChangeService,
        protected saveSearchService: SaveSearchService,
        protected loaderService: LoaderService) {
        super(loaderService, changeService, saveSearchService, futureExpireService, globalService);
        this.log.color = 'lightblue';
        this.doInitialSetup();
        const sessionObject: SessionObject = SessionObject.getSessionObject();
        if (sessionObject.clientID === 'ucp') {

            this.futureExpireService.addColumnsOptionUcp(this.dtOptions);
        } else {
            this.futureExpireService.addColumnsOption(this.dtOptions);
        }
    }

    // override
    getLoaderName(): string {
        return 'future-expires-component';
    }

    // override
    getSearchModel(): any {
        if (ProjectUtils.isEmpty(this.futureExpireModel)) {
            this.futureExpireModel = this.sessionObject.futureExpireSearch;
            if (ProjectUtils.isEmpty(this.futureExpireModel)) {
                this.futureExpireModel = {};
                this.futureExpireModel.limit = this.sessionObject.limit;
                this.calenderSetDefaultValue(this.futureExpireModel);
            }
            this.ngNNumbers = this.futureExpireModel.journalId;
        }
        this.log.i('getSearchModel', this.futureExpireModel);
        return this.futureExpireModel;
    }

    // override
    getSearchType(): string {
        return 'futureExpire';
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
    getTabsComponent(): any {
        return this.tabsComponent;
    }

    // override
    getServiceName(): string {
        return this.FUTURE_EXPIRE_SEARCH;
    }

    // override
    openListTab() {
        this.tabsComponent.openTab('Future Expires List',
            this.futureExpireListTemplate, {}, true, 'futureExpireList');
    }

    // override
    getDispSearch(): ThinkListDisplaySearchComponent {
        return this.dispSearch;
    }

    // override
    getReportTitle(): string {
        return 'Future Expires Report';
    }

    // override
    getReportFileName(): string {
        return 'futureExpiresReport';
    }

    doInitialSetup() {
        this.ddOptionsproductName = new DataDropDownOptions();
        this.ddOptionsproductName.serviceURL = Constants.TK_SALE_JOURNAL_LIST_URL;
        this.ddOptionsproductName.keyName = 'ocID';
        this.ddOptionsproductName.keyDesc = 'description';
        this.ddOptionsproductName.modelName = 'journalId';
        this.ddOptionsproductName.baseComponent = this;
        this.ddOptionsproductName.firstOptionText = 'Select a Product';
        this.ddOptionsproductName.multipleState = true;
        this.ddOptionsproductName.selectMulti = true;
    }

    // override
    setSearchModel(searchModel: any) {
        if (!ProjectUtils.isEmpty(searchModel)) {
            if (typeof searchModel === 'string') {
                this.futureExpireModel = JSON.parse(searchModel);
            } else {
                this.futureExpireModel = searchModel;
            }
        }
        if (this.futureExpireModel.limit === '') {
            this.futureExpireModel.limit = 0;
        }
        this.log.i('setSearchModel', this.futureExpireModel);
        this.ngNNumbers = this.setDropDownComponentValue('journalId');

        ProjectUtils.setFutureExpireSearch(this.sessionObject, this.futureExpireModel);
    }

    getDatePicker(): CzDatePickerComponent {
        return this.czDatePicker;
    }

    getBodyData(): string {
        let body = '';
        body += this.futureExpireService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());
        body += this.futureExpireService.getDateSearchParam(this.futureExpireModel, body);
        body += this.futureExpireService.getDropDownSearchParam(body, 'journalId', this.futureExpireModel);
        body += this.getBodyLimit(body, this.futureExpireModel.limit);

        return body;
    }

    doOnReset() {
        this.futureExpireModel['journalId'] = null;
        this.calenderSetDefaultValue(this.futureExpireModel);
        this.futureExpireModel.limit = this.sessionObject.limit;
        this.ngNNumbers = [];
    }
}
