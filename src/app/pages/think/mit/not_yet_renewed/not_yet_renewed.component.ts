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
import { NotYetRenewedService } from './not_yet_renewed.service';
import { NotYetRenewedModel } from './not_yet_renewed.model';
import { CzDatePickerComponent } from '../../../../components/cz-date-picker/cz-date-picker.component';
@Component({
    selector: 'app-not-yet-renewed',
    templateUrl: './not_yet_renewed.component.html',
    styleUrls: ['./not_yet_renewed.component.css'],
    providers: [NotYetRenewedService]
})
export class NotYetRenewedComponent extends BaseComponent {
    private NOT_YET_RENEWED_SEARCH = 'notYetRenewedSearch';
    log = Log.create('NotYetRenewedComponent');
    notYetRenewedModel: NotYetRenewedModel;
    ngOrderStatus: any;
    ngJournalName: any;
    ddOptionOrderStatus: DataDropDownOptions;
    ddOptionsJournalName: DataDropDownOptions;
    @ViewChild('notYetRenewedData', { read: DataTableDirective }) dtElement: DataTableDirective;
    @ViewChild('notYetRenewedList') notYetRenewedListTemplate;
    @ViewChild(TabsComponent) tabsComponent;
    @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;
    @ViewChild(CzDatePickerComponent) czDatePicker: CzDatePickerComponent;
    ddTriggerOrderStatus: Subject<any> = new Subject<any>();


    constructor(private notYetRenewedService: NotYetRenewedService,
        protected globalService: GlobalService,
        private _logger: Logger,
        private router: Router,
        protected changeService: ChangeService,
        protected saveSearchService: SaveSearchService,
        protected loaderService: LoaderService) {
        super(loaderService, changeService, saveSearchService, notYetRenewedService, globalService);
        this.doInitialSetup();
        this.log.color = 'lightblue';

    }
    // override

    doInitialSetup() {

        this.ddOptionOrderStatus = new DataDropDownOptions();
        this.ddOptionOrderStatus.keyName = 'id';
        this.ddOptionOrderStatus.keyDesc = 'value';
        this.ddOptionOrderStatus.firstOptionText = 'Select Order Status';
        this.ddOptionOrderStatus.modelName = 'orderStatus';
        this.ddOptionOrderStatus.baseComponent = this;
        this.ddOptionOrderStatus.sort = true;
        this.ddOptionOrderStatus.sortOrder = 'asc';

        this.ddOptionsJournalName = new DataDropDownOptions();
        this.ddOptionsJournalName.serviceURL = Constants.TK_SALE_JOURNAL_LIST_URL;
        this.ddOptionsJournalName.keyName = 'ocID';
        this.ddOptionsJournalName.keyDesc = 'description';
        // this.ddOptionsJournalName.keyName = 'region';
        // this.ddOptionsJournalName.keyDesc = 'description';
        this.ddOptionsJournalName.modelName = 'journal';
        this.ddOptionsJournalName.firstOptionText = 'Select a Product';
        this.ddOptionsJournalName.sort = true;
        this.ddOptionsJournalName.baseComponent = this;
        this.ddOptionsJournalName.sort = true;
        this.ddOptionsJournalName.sortOrder = 'asc';


    }


    getLoaderName(): string {
        return 'NOT_YET_RENEWED_SEARCH';
    }

    // override
    getSearchModel(): any {
        if (ProjectUtils.isEmpty(this.notYetRenewedModel)) {
            this.notYetRenewedModel = this.sessionObject.notYetRenewedSearch;
            if (ProjectUtils.isEmpty(this.notYetRenewedModel)) {
                this.notYetRenewedModel = new NotYetRenewedModel();
                this.notYetRenewedModel.limit = this.sessionObject.limit;
            }
            this.ngOrderStatus = this.notYetRenewedModel.orderStatus;
            this.ngJournalName = this.notYetRenewedModel.journal;
        }
        this.log.i('getSearchModel', this.notYetRenewedModel);
        return this.notYetRenewedModel;
    }

    // override
    getSearchType(): string {
        return 'notYetRenewed';
    }

    // override
    getDataElement(whichService: string): DataTableDirective {
        return this.dtElement;
    }

    // override
    getServiceName(): string {
        return this.NOT_YET_RENEWED_SEARCH;
    }

    // override
    openListTab() {
        this.tabsComponent.openTab('Not Yet Renewed List',
            this.notYetRenewedListTemplate, {}, true, 'notYetRenewedList');
    }

    // override
    getDispSearch(): ThinkListDisplaySearchComponent {
        return this.dispSearch;
    }

    // override
    getReportTitle(): string {
        return 'Not Yet Renewed Report';
    }
    getReportIcon(): string {
        return 'fa-file-text-o';
    }
    // override
    getReportFileName(): string {
        return 'notYetRenewedReport';
    }

    // override
    setSearchModel(searchModel: any) {
        if (!ProjectUtils.isEmpty(searchModel)) {
            if (typeof searchModel === 'string') {
                this.notYetRenewedModel = JSON.parse(searchModel);
            } else {
                this.notYetRenewedModel = searchModel;
            }
        }
        if (this.notYetRenewedModel.limit === '') {
            this.notYetRenewedModel.limit = 0;
        }
        this.ngOrderStatus = this.setDropDownComponentValue('orderStatus');
        this.ngJournalName = this.setDropDownComponentValue('journal');
        this.log.i('setSearchModel', this.notYetRenewedModel);
        ProjectUtils.setNotYetRenewedSearch(this.sessionObject, this.notYetRenewedModel);
    }
    doPreInitLoad() {

        this.globalService.getOrderStatusData(this.ddTriggerOrderStatus);
        this.hideLoader();
    }
    getDatePicker(): CzDatePickerComponent {
        return this.czDatePicker;
    }
    getBodyData(): string {
        let body = '';
        body += this.notYetRenewedService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());
        body += this.notYetRenewedService.getDateSearchParam(this.notYetRenewedModel, body);
        body += this.notYetRenewedService.setParamValue(body, 'customerId', this.notYetRenewedModel['customerId']);
        body += this.notYetRenewedService.getDropDownSearchParam(body, 'orderStatus', this.notYetRenewedModel);
        body += this.notYetRenewedService.getDropDownSearchParam(body, 'journal', this.notYetRenewedModel);
        body += this.getBodyLimit(body, this.notYetRenewedModel.limit);

        return body;
    }
    doOnReset() {

        this.notYetRenewedModel['orderStatus'] = null;
        this.notYetRenewedModel['journal'] = null;
        this.ngOrderStatus = [];
        this.ngJournalName = [];
        this.czDatePicker.calendarCanceled(this);
        this.notYetRenewedModel.limit = this.sessionObject.limit;
    }
}