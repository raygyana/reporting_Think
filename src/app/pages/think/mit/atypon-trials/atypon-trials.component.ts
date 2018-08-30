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

import { AtyponTrialsService } from './atypon-trials.service';
import { AtyponTrialsModel } from './atypon-trials.model';
import { CzDatePickerComponent } from '../../../../components/cz-date-picker/cz-date-picker.component';

@Component({
    selector: 'app-atypon-trials',
    templateUrl: './atypon-trials.component.html',
    styleUrls: ['./atypon-trials.component.css'],
    providers: [AtyponTrialsService]
})
export class AtyponTrialsComponent extends BaseComponent {
    private ATYPON_TRIALS = 'atyponTrials';
    log = Log.create('AtyponTrialsComponent');
    atyponTrialsModel: AtyponTrialsModel;
    ddOptionsCountryList: DataDropDownOptions;
    ngCountryList: any;


    @ViewChild(DataTableDirective) dtElement: DataTableDirective;
    @ViewChild(TabsComponent) tabsComponent;
    @ViewChild('atyponTrialsList') atyponTrialsListTemplate;
    @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;
    @ViewChild('atyponTrialsData', { read: DataTableDirective }) dtSalesElement: DataTableDirective;
    @ViewChild('region', { read: DataDropDownComponent }) ddOptionsRegion: DataDropDownComponent;
    @ViewChild(CzDatePickerComponent) czDatePicker: CzDatePickerComponent;

    constructor(private router: Router,
        private atyponTrialsService: AtyponTrialsService,
        private _logger: Logger,
        protected globalService: GlobalService,
        protected changeService: ChangeService,
        protected saveSearchService: SaveSearchService,
        protected loaderService: LoaderService) {
        super(loaderService, changeService, saveSearchService, atyponTrialsService, globalService);
        this.doInitialSetup();
        this.log.color = 'lightblue';
    }

    getLoaderName(): string {
        return 'atypon-trials-component';
    }

    getSearchModel(): any {
        if (ProjectUtils.isEmpty(this.atyponTrialsModel)) {
            this.atyponTrialsModel = <AtyponTrialsModel>this.sessionObject.atyponTrialsSearch;
            if (ProjectUtils.isEmpty(this.atyponTrialsModel)) {
                this.atyponTrialsModel = new AtyponTrialsModel();
                this.atyponTrialsModel.limit = this.sessionObject.limit;
            }
            this.ngCountryList = this.atyponTrialsModel.country;
        }

        this.log.i('getSearchModel', this.atyponTrialsModel);
        return this.atyponTrialsModel;
    }

    getSearchType(): string {
        return 'atyponTrials';
    }

    getTabsComponent(): any {
        return this.tabsComponent;
    }

    // override
    getReportTitle(): string {
        return 'Atypon Trials Report';
    }
    getReportIcon(): string {
        return 'fa-file-text-o';
    }
    // override
    getReportFileName(): string {
        return 'atyponTrialsReport';
    }

    getServiceName(): string {
        return this.ATYPON_TRIALS;
    }

    getDatePicker(): CzDatePickerComponent {
        return this.czDatePicker;
    }

    // override
    openListTab() {
        this.tabsComponent.openTab('Atypon Trials List',
            this.atyponTrialsListTemplate, {}, true, 'atyponTrialsList');
    }
    // override
    getDispSearch(): ThinkListDisplaySearchComponent {
        return this.dispSearch;
    }

    // override
    setSearchModel(searchModel: any) {
        if (!ProjectUtils.isEmpty(searchModel)) {
            if (typeof searchModel === 'string') {
                this.atyponTrialsModel = JSON.parse(searchModel);
            } else {
                this.atyponTrialsModel = searchModel;
            }
        }
        if (this.atyponTrialsModel.limit === '') {
            this.atyponTrialsModel.limit = 0;
        }
        this.log.i('setSearchModel', this.atyponTrialsModel);
        this.ngCountryList = this.setDropDownComponentValue('country');
        ProjectUtils.setAtyponTrialsSearch(this.sessionObject, this.atyponTrialsModel);
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
        body += this.atyponTrialsService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());
        body += this.atyponTrialsService.getDateSearchParam(this.atyponTrialsModel, body);
        body += this.atyponTrialsService.setParamValue(body, 'customerId', this.atyponTrialsModel['customerId']);
        body += this.atyponTrialsService.setParamValue(body, 'issn', this.atyponTrialsModel['issn']);
        body += this.atyponTrialsService.getDropDownSearchParam(body, 'country', this.atyponTrialsModel);

        body += this.getBodyLimit(body, this.atyponTrialsModel.limit);

        return body;
    }


    doOnReset() {

        this.atyponTrialsModel['country'] = null;
        this.ngCountryList = [];
        this.czDatePicker.calendarCanceled(this);
        this.atyponTrialsModel.limit = this.sessionObject.limit;

    }
}
