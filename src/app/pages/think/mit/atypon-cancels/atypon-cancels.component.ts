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
import { AtyponCancelsService } from './atypon-cancels.service';
import { AtyponCancelsModel } from './atypon-cancels.model';
import { CzDatePickerComponent } from '../../../../components/cz-date-picker/cz-date-picker.component';
@Component({
    selector: 'app-atypon-cancels',
    templateUrl: './atypon-cancels.component.html',
    styleUrls: ['./atypon-cancels.component.css'],
    providers: [AtyponCancelsService]
})
export class AtyponCancelsComponent extends BaseComponent {
    private ATYPON_CANCELS_SEARCH = 'atyponCancelsSearch';
    log = Log.create('AtyponCancelsComponent');
    ddOptionsCountryList: DataDropDownOptions;
    atyponCancelsModel: AtyponCancelsModel;
    ngCountryList: any;


    @ViewChild(DataTableDirective) dtElement: DataTableDirective;
    @ViewChild(TabsComponent) tabsComponent;
    @ViewChild('atyponCancelsList') atyponCancelsListTemplate;
    @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;
    @ViewChild('atyponCancelsData', { read: DataTableDirective }) dtSalesElement: DataTableDirective;
    @ViewChild('region', { read: DataDropDownComponent }) ddOptionsRegion: DataDropDownComponent;
    @ViewChild(CzDatePickerComponent) czDatePicker: CzDatePickerComponent;

    constructor(private router: Router,
        private atyponCancelsService: AtyponCancelsService,
        private _logger: Logger,
        protected globalService: GlobalService,
        protected changeService: ChangeService,
        protected saveSearchService: SaveSearchService,
        protected loaderService: LoaderService) {
        super(loaderService, changeService, saveSearchService, atyponCancelsService, globalService);
        this.doInitialSetup();
        this.log.color = 'lightblue';
    }

    getLoaderName(): string {
        return 'atypon-cancels-component';
    }

    getSearchModel(): any {
        if (ProjectUtils.isEmpty(this.atyponCancelsModel)) {
            this.atyponCancelsModel = <AtyponCancelsModel>this.sessionObject.atyponCancelsSearch;
            if (ProjectUtils.isEmpty(this.atyponCancelsModel)) {
                this.atyponCancelsModel = new AtyponCancelsModel();
                this.atyponCancelsModel.limit = this.sessionObject.limit;
            }
            this.ngCountryList = this.atyponCancelsModel.country;
        }

        this.log.i('getSearchModel', this.atyponCancelsModel);
        return this.atyponCancelsModel;
    }

    getSearchType(): string {
        return 'atyponCancelsSearch';
    }

    getTabsComponent(): any {
        return this.tabsComponent;
    }

    // override
    getReportTitle(): string {
        return 'Atypon Cancels Report';
    }

    // override
    getReportFileName(): string {
        return 'atyponCancelsReport';
    }

    getReportIcon(): string {
        return 'fa-file-text-o';
    }

    getServiceName(): string {
        return this.ATYPON_CANCELS_SEARCH;
    }

    getDatePicker(): CzDatePickerComponent {
        return this.czDatePicker;
    }
    // override
    openListTab() {
        this.tabsComponent.openTab('Atypon Cancels List',
            this.atyponCancelsListTemplate, {}, true, 'atyponCancelsList');
    }
    // override
    getDispSearch(): ThinkListDisplaySearchComponent {
        return this.dispSearch;
    }

    // override
    setSearchModel(searchModel: any) {
        if (!ProjectUtils.isEmpty(searchModel)) {
            if (typeof searchModel === 'string') {
                this.atyponCancelsModel = JSON.parse(searchModel);
            } else {
                this.atyponCancelsModel = searchModel;
            }
        }
        if (this.atyponCancelsModel.limit === '') {
            this.atyponCancelsModel.limit = 0;
        }
        this.log.i('setSearchModel', this.atyponCancelsModel);
        this.ngCountryList = this.setDropDownComponentValue('country');
        ProjectUtils.setAtyponCancelsSearch(this.sessionObject, this.atyponCancelsModel);
    }

    doInitialSetup() {

        this.ddOptionsCountryList = new DataDropDownOptions();
        this.ddOptionsCountryList.serviceURL = Constants.MIT_COUNTRY_LIST_URL;
        this.ddOptionsCountryList.keyName = 'country';
        this.ddOptionsCountryList.keyDesc = 'country';
        this.ddOptionsCountryList.firstOptionText = 'Select a Country';
        this.ddOptionsCountryList.modelName = 'country';
        this.ddOptionsCountryList.baseComponent = this;

    }

    getDataElement(whichService: string): DataTableDirective {
        return this.dtElement;
    }

    getBodyData(): string {
        let body = '';
        body += this.atyponCancelsService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());
        body += this.atyponCancelsService.getDateSearchParam(this.atyponCancelsModel, body);
        body += this.atyponCancelsService.setParamValue(body, 'customerId', this.atyponCancelsModel['customerId']);
        body += this.atyponCancelsService.setParamValue(body, 'issn', this.atyponCancelsModel['issn']);
        body += this.atyponCancelsService.getDropDownSearchParam(body, 'country', this.atyponCancelsModel);

        body += this.getBodyLimit(body, this.atyponCancelsModel.limit);

        return body;
    }


    doOnReset() {

        this.atyponCancelsModel['country'] = null;
        this.ngCountryList = [];
        this.czDatePicker.calendarCanceled(this);
        this.atyponCancelsModel.limit = this.sessionObject.limit;

    }
}
