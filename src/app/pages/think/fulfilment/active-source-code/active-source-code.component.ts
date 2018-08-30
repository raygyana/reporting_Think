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
import { ActiveSourceCodeService } from './active-source-code.service';
import { ActiveSourceCodeModel } from './active-source-code.model';

@Component({
    selector: 'app-active-source-code',
    templateUrl: './active-source-code.component.html',
    styleUrls: ['./active-source-code.component.css'],
    providers: [ActiveSourceCodeService]
})
export class ActiveSourceCodeComponent extends BaseComponent {

    ngProductTitle: any;
    ngActiveSearch: any;
    ngFormat: any;


    ACTIVE_SOURCE_CODE = 'activeSourceCode';
    log = Log.create('ActiveSourceCodeComponent');

    activeSourceCodeModel: ActiveSourceCodeModel;

    activeData: any;
    ddOptionsFormat: DataDropDownOptions;
    ddOptionsproductName: DataDropDownOptions;
    ddActiveSearch: DataDropDownOptions;
    ddTriggerActive: Subject<any> = new Subject();

    @ViewChild('activeSourceCodeListData', { read: DataTableDirective }) dtElement: DataTableDirective;
    @ViewChild('activeSourceCodeList') activeSourceCodeTemplate;
    @ViewChild(TabsComponent) tabsComponent;
    @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;
    @ViewChild('format', { read: DataDropDownComponent }) ddFormat: DataDropDownComponent;
    @ViewChild('active', { read: DataDropDownComponent }) ddActive: DataDropDownComponent;
    @ViewChild('productTitle', { read: DataDropDownComponent }) ddProductName: DataDropDownComponent;
    @ViewChild(CzDatePickerComponent) czDatePicker: CzDatePickerComponent;

    constructor(private router: Router,
        protected loaderService: LoaderService,
        private _logger: Logger,
        protected changeService: ChangeService,
        protected globalService: GlobalService,
        protected saveSearchService: SaveSearchService,
        private activeSourceCodeService: ActiveSourceCodeService) {
        super(loaderService, changeService, saveSearchService, activeSourceCodeService, globalService);
        this.doInitialSetup();
        this.log.color = 'lightblue';

    }

    getLoaderName(): string {
        return 'active-source-code';
    }

    getSearchModel(): any {

        console.log(this.activeSourceCodeModel);

        if (ProjectUtils.isEmpty(this.activeSourceCodeModel)) {
            this.activeSourceCodeModel = <ActiveSourceCodeModel>this.sessionObject.activeSourceCodeSearch;
            if (ProjectUtils.isEmpty(this.activeSourceCodeModel)) {
                this.activeSourceCodeModel = new ActiveSourceCodeModel();
                this.activeSourceCodeModel.limit = this.sessionObject.limit;

            }
            this.ngProductTitle = this.activeSourceCodeModel.productTitle;
            this.ngActiveSearch = this.activeSourceCodeModel.active;
            this.ngFormat = this.activeSourceCodeModel.format;
        }
        console.log(this.activeSourceCodeModel);
        if (ProjectUtils.isEmpty(this.activeSourceCodeModel.active)) {

            this.activeSourceCodeModel['active'] = [{
                'id': '100',
                'desc': 'All',
                'columnName': 'active'
            }];
            // this.ddActive.optionsModel = ['100'];
        }

        this.log.i('getSearchModel', this.activeSourceCodeModel);
        return this.activeSourceCodeModel;
    }

    getSearchType(): string {
        return 'activeSourceCode';
    }
    // override
    getReportTitle(): string {
        return 'Active Source Code Report';
    }
    getReportIcon(): string {
        return 'fa fa-edit';
    }
    // override
    getReportFileName(): string {
        return 'activeSourceCodeReport';
    }

    doInitialSetup() {
        this.ddOptionsFormat = new DataDropDownOptions();
        this.ddOptionsFormat.serviceURL = Constants.TK_FULFILMENTREPORT_FORMAT_URL;
        this.ddOptionsFormat.keyName = 'format';
        this.ddOptionsFormat.keyDesc = 'formatDesc';
        this.ddOptionsFormat.firstOptionText = 'Select a Format';
        this.ddOptionsFormat.baseComponent = this;
        this.ddOptionsFormat.modelName = 'format';

        this.ddOptionsproductName = new DataDropDownOptions();
        this.ddOptionsproductName.serviceURL = Constants.TK_SALE_JOURNAL_LIST_URL;
        this.ddOptionsproductName.keyName = 'ocID';
        this.ddOptionsproductName.keyDesc = 'description';
        this.ddOptionsproductName.modelName = 'productTitle';
        this.ddOptionsproductName.baseComponent = this;
        this.ddOptionsproductName.firstOptionText = 'Select a Product Title';


        this.ddActiveSearch = new DataDropDownOptions();
        this.ddActiveSearch.keyName = 'id';
        this.ddActiveSearch.keyDesc = 'value';
        this.ddActiveSearch.firstOptionText = 'Select ..';
        // this.ddActiveSearch.firstOptionValue = '-100';
        this.ddActiveSearch.baseComponent = this;
        this.ddActiveSearch.modelName = 'active';



    }


    doPreInitLoad() {
        // this.getActiveData();

        this.globalService.getActiveData(this.ddTriggerActive);

    }


    getDatePicker(): CzDatePickerComponent {
        return this.czDatePicker;
    }

    // getActiveData() {
    //      this.activeData = this.globalService.getActiveData();
    //      this.ddTriggerActive.next(this.activeData);
    //  }

    goToSearch() {
        this.tabsComponent.selectTab(this.tabsComponent.tabs.first);
    }

    getTabsComponent(): any {
        return this.tabsComponent;
    }

    getServiceName(): string {
        return this.ACTIVE_SOURCE_CODE;
    }
    // override
    openListTab() {
        this.tabsComponent.openTab('Active Source Code List',
            this.activeSourceCodeTemplate, {}, true, 'activeSourceCodeList');
    }
    // override
    getDispSearch(): ThinkListDisplaySearchComponent {
        return this.dispSearch;
    }

    // override
    setSearchModel(searchModel: any) {
        if (!ProjectUtils.isEmpty(searchModel)) {
            if (typeof searchModel === 'string') {
                this.activeSourceCodeModel = JSON.parse(searchModel);
            } else {
                this.activeSourceCodeModel = searchModel;
            }
        }
        if (this.activeSourceCodeModel.limit === '') {
            this.activeSourceCodeModel.limit = 0;
        }
        this.ngProductTitle = this.setDropDownComponentValue('productTitle');
        this.ngFormat = this.setDropDownComponentValue('format');
        this.ngActiveSearch = this.setDropDownComponentValue('active');
        ProjectUtils.setActiveSourceCodeSearch(this.sessionObject, this.activeSourceCodeModel);
    }

    doOnReset() {

        this.activeSourceCodeModel['productTitle'] = null;
        this.activeSourceCodeModel['format'] = null;
        this.activeSourceCodeModel['active'] = null;

        this.ngProductTitle = [];
        this.ngFormat = [];

        this.activeSourceCodeModel['active'] = [{
            'id': '100',
            'desc': 'All',
            'columnName': 'active'
        }];


        //this.ddActive.optionsModel = ['100'];
        this.ngActiveSearch = ['100'];
        this.activeSourceCodeModel.limit = this.sessionObject.limit;
        this.czDatePicker.calendarCanceled(this);

    }

    getDataElement(whichService: string): DataTableDirective {
        return this.dtElement;
    }

    getBodyData(): string {
        let body = '';
        body += this.activeSourceCodeService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());
        body += this.activeSourceCodeService.getDateSearchParam(this.activeSourceCodeModel, body);
        body += this.activeSourceCodeService.setParamValue(body, 'sourceCode', this.activeSourceCodeModel['sourceCode']);
        body += this.activeSourceCodeService.getDropDownSearchParam(body, 'productTitle', this.activeSourceCodeModel);
        body += this.activeSourceCodeService.getDropDownSearchParam(body, 'format', this.activeSourceCodeModel);

        // console.log(this.activeSourceCodeModel.active[0].id != '-100');

        if (!ProjectUtils.isEmpty(this.activeSourceCodeModel.active) && this.activeSourceCodeModel.active.id != '100') {
            body += this.activeSourceCodeService.getDropDownSearchParam(body, 'active', this.activeSourceCodeModel);
        }

        body += this.getBodyLimit(body, this.activeSourceCodeModel.limit);
        return body;
    }

}
