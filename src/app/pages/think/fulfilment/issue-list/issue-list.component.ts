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
import { DataDropDownOptions } from '../../../../components/data-drop-down/data-drop-down.model';
import { DataDropDownComponent } from '../../../../components/data-drop-down/data-drop-down.component';
import { SessionObject } from '../../../shared/session-object';
import { GlobalService } from '../../../shared/global.service';
import { SearchModelType } from '../../../shared/search-model-type';
import { ChangeService } from '../../../shared/change-service';
import { SaveSearchService } from '../../../shared/save-search-service';
import { Log, Level } from 'ng2-logger';
import { Logger as Loggerr } from '../../../../core/logger/logger';
import { ThinkListDisplaySearchComponent } from '../../../../components/think-list-display-search/think-list-display-search.component';
import { CzDatePickerComponent } from '../../../../components/cz-date-picker/cz-date-picker.component';
import { IssueListService } from './issue-list.service';
import { IssueListModel } from './issue-list.model';
@Component({
    selector: 'app-issue-list',
    templateUrl: './issue-list.component.html',
    styleUrls: ['./issue-list.component.css'],
    providers: [IssueListService]
})
export class IssueListComponent extends BaseComponent {
    ISSUE_LIST = 'issueList';
    log = Log.create('IssueListComponent');

    issueSearchModel: IssueListModel;
    ngProductName: any;

    ddOptionsProduct: DataDropDownOptions;

    @ViewChild('issueListData', { read: DataTableDirective }) dtElement: DataTableDirective;
    @ViewChild('issueList') issueListTemplate;
    @ViewChild(TabsComponent) tabsComponent;
    @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;
    @ViewChild('product', { read: DataDropDownComponent }) ddProduct: DataDropDownComponent;
    @ViewChild(CzDatePickerComponent) czDatePicker: CzDatePickerComponent;

    constructor(private router: Router,
        protected loaderService: LoaderService,
        private _logger: Logger,
        protected changeService: ChangeService,
        protected globalService: GlobalService,
        protected saveSearchService: SaveSearchService,
        private issueListService: IssueListService) {
        super(loaderService, changeService, saveSearchService, issueListService, globalService);
        this.log.color = 'lightblue';
        this.doInitialSetup();
    }

    getLoaderName(): string {
        return 'issue-list';
    }

    getSearchModel(): any {
        if (ProjectUtils.isEmpty(this.issueSearchModel)) {
            this.issueSearchModel = this.sessionObject.issueListSearch;
            if (ProjectUtils.isEmpty(this.issueSearchModel)) {
                this.issueSearchModel = new IssueListModel();
                this.issueSearchModel.limit = this.sessionObject.limit;
            }
            this.ngProductName = this.issueSearchModel.productId;
        }
        this.log.i('getSearchModel', this.issueSearchModel);
        return this.issueSearchModel;
    }

    getSearchType(): string {
        return 'issueList';
    }

    getDatePicker(): CzDatePickerComponent {
        return this.czDatePicker;
    }
    getServiceName(): string {
        return this.ISSUE_LIST;
    }

    goToSearch() {
        this.tabsComponent.selectTab(this.tabsComponent.tabs.first);
    }
    // override
    getReportTitle(): string {
        return 'Issue List Report';
    }
    getReportIcon(): string {
        return 'fa fa-edit';
    }
    // override
    getReportFileName(): string {
        return 'issueListReport';
    }


    getTabsComponent(): any {
        return this.tabsComponent;
    }


    // override
    openListTab() {
        this.tabsComponent.openTab('Issue Search List',
            this.issueListTemplate, {}, true, 'issueList');
    }
    // override
    getDispSearch(): ThinkListDisplaySearchComponent {
        return this.dispSearch;
    }

    // override
    setSearchModel(searchModel: any) {
        if (!ProjectUtils.isEmpty(searchModel)) {
            if (typeof searchModel === 'string') {
                this.issueSearchModel = JSON.parse(searchModel);
            } else {
                this.issueSearchModel = searchModel;
            }
        }
        if (this.issueSearchModel.limit === '') {
            this.issueSearchModel.limit = 0;
        }
        this.ngProductName = this.setDropDownComponentValue('productId');
        this.log.i('setSearchModel', this.issueSearchModel);
        ProjectUtils.setIssueListSearch(this.sessionObject, this.issueSearchModel);
    }

    getDataElement(whichService: string): DataTableDirective {
        return this.dtElement;
    }

    getBodyData(): string {
        let body = '';
        body += this.issueListService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());
        body += this.issueListService.getDateSearchParam(this.issueSearchModel, body);
        body += this.issueListService.setParamValue(body, 'volumeNo', this.issueSearchModel['vol']);
        body += this.issueListService.setParamValue(body, 'issueNo', this.issueSearchModel['issue_no']);
        body += this.issueListService.getDropDownSearchParam(body, 'productId', this.issueSearchModel);
        body += this.getBodyLimit(body, this.issueSearchModel.limit);
        return body;
    }
    doInitialSetup() {
        this.ddOptionsProduct = new DataDropDownOptions();
        this.ddOptionsProduct.serviceURL = Constants.TK_SALE_JOURNAL_LIST_URL;
        this.ddOptionsProduct.keyName = 'ocID';
        this.ddOptionsProduct.keyDesc = 'description';
        this.ddOptionsProduct.baseComponent = this;
        this.ddOptionsProduct.modelName = 'productId';
        this.ddOptionsProduct.firstOptionText = 'Select a product';
        this.ddOptionsProduct.selectMulti = true;
    }

    doOnReset() {
        this.issueSearchModel['productId'] = null;
        this.ngProductName = [];
        this.issueSearchModel.limit = this.sessionObject.limit;
        this.czDatePicker.calendarCanceled(this);
    }

}
