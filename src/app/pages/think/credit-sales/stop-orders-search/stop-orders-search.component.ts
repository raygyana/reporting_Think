import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
// Import from III party
import { DataTableDirective } from 'angular-datatables';
import { TabsetComponent } from '../../../../components/ngtabs';
import { TabsComponent } from '../../../../components/ng-tabs/tabs.component';
import { ThinkListDisplaySearchComponent } from '../../../../components/think-list-display-search/think-list-display-search.component';
import { DataDropDownOptions } from '../../../../components/data-drop-down/data-drop-down.model';
import { DataDropDownComponent } from '../../../../components/data-drop-down/data-drop-down.component';
import { Logger } from '../../../../core/logger/logger';
import { LoaderService } from '../../../../core/loader/loader.service';
import { BaseComponent } from '../../../../core/base/base.component';

import { ProjectUtils } from '../../../shared/project-utils';
import { Constants } from '../../../shared/constant';
import { Log, Level } from 'ng2-logger';
import { Logger as Loggerr } from '../../../../core/logger/logger';


import { StopOrdersSearchService } from './stop-orders-search.service';
import { StopOrdersSearchModel } from './stop-orders-search.model';
import { GlobalService } from '../../../shared/global.service';
import { ChangeService } from '../../../shared/change-service';
import { SaveSearchService } from '../../../shared/save-search-service';
import { CzDatePickerComponent } from '../../../../components/cz-date-picker/cz-date-picker.component';


@Component({
    selector: 'app-stop-orders-search',
    templateUrl: './stop-orders-search.component.html',
    styleUrls: ['./stop-orders-search.component.css'],
    providers: [StopOrdersSearchService]
})


export class StopOrdersSearchComponent extends BaseComponent {
    ngterms: any;
    private serviceName = 'STOP_ORDERS';
    log = Log.create('GeneratedCreditNotesSearchComponent');

    stopOrdersSearchModel: StopOrdersSearchModel;

    @ViewChild(DataTableDirective) dtElement: DataTableDirective;
    @ViewChild('stopOrdersList') StopOrdersTemplate;
    @ViewChild(TabsComponent) tabsComponent;
    @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;
    ddOptionsTerms: DataDropDownOptions;
    ddTriggerTerms: Subject<any> = new Subject();
    @ViewChild('terms', { read: DataDropDownComponent }) ddTerms: DataDropDownComponent;
    @ViewChild(CzDatePickerComponent) czDatePicker: CzDatePickerComponent;
    constructor(private router: Router,
        protected loaderService: LoaderService,
        private _logger: Logger,
        protected globalService: GlobalService,
        protected changeService: ChangeService,
        protected saveSearchService: SaveSearchService,
        private stopOrdersSearchService: StopOrdersSearchService) {
        super(loaderService, changeService, saveSearchService, stopOrdersSearchService, globalService);
        console.log(this.stopOrdersSearchService);

        this.log.color = 'lightblue';
        this.doInitialSetup();
    }
    doInInitLoad() {
        this.globalService.getTermsData(this.ddTriggerTerms);
        this.hideLoader();
    }

    getDatePicker(): CzDatePickerComponent {
        return this.czDatePicker;
    }
    doInitialSetup() {
        this.ddOptionsTerms = ProjectUtils.getOptionTerms(this);
        this.ddOptionsTerms.selectMulti = true;
        this.ddOptionsTerms.firstOptionText = 'Select  Term';

        this.displaySearchOptions.noCrossList = [];
        this.displaySearchOptions.noCrossList.push('term');
    }

    // override
    getLoaderName(): string {
        return 'stop-orders-search';
    }

    // override
    getSearchModel(): any {

        console.log(this.stopOrdersSearchModel);
        if (ProjectUtils.isEmpty(this.stopOrdersSearchModel)) {
            this.stopOrdersSearchModel = <StopOrdersSearchModel>ProjectUtils.getStopOrdersSearch(this.sessionObject);
            if (ProjectUtils.isEmpty(this.stopOrdersSearchModel)) {
                this.stopOrdersSearchModel = new StopOrdersSearchModel();
                this.stopOrdersSearchModel.limit = this.sessionObject.limit

            }
            this.ngterms = this.stopOrdersSearchModel.term
        }
        this.log.i('getSearchModel', this.stopOrdersSearchModel);
        return this.stopOrdersSearchModel;
    }

    // override
    getSearchType(): string {
        return 'stopOrdersSearch';
    }

    // override
    getTabsComponent(): any {
        return this.tabsComponent;
    }


    // override
    getServiceName(): string {
        return this.serviceName;
    }

    // override
    openListTab() {
        this.tabsComponent.openTab('Stop Orders List',
            this.StopOrdersTemplate, {}, true, 'stopOrdersList');
    }

    // override
    getDispSearch(): ThinkListDisplaySearchComponent {
        return this.dispSearch;
    }
    // override
    getReportTitle(): string {
        return 'Stop Orders Report';
    }

    // override
    getReportFileName(): string {
        return 'stopOrderReport';
    }
    // override
    getReportIcon(): string {
        return 'fa-credit-card';
    }

    // override
    setSearchModel(searchModel: any) {
        console.log('setSearchModel: searchModel', searchModel);
        if (!ProjectUtils.isEmpty(searchModel)) {
            if (typeof searchModel === 'string') {
                this.stopOrdersSearchModel = JSON.parse(searchModel);
            } else {
                this.stopOrdersSearchModel = searchModel;
            }
        }
        if (this.stopOrdersSearchModel.limit === '') {
            this.stopOrdersSearchModel.limit = 0;
        }

        // this.ngterms = this.setDropDownComponentValue('term');

        ProjectUtils.setStopOrdersSearch(this.sessionObject, this.stopOrdersSearchModel);
    }

    getDataElement(whichService: string): DataTableDirective {
        if (whichService === this.serviceName) {
            return this.dtElement;
        }
    }

    // override
    getBodyData(): string {
        let body = '';
        body += this.stopOrdersSearchService.getDropDownSearchParam(body, 'term', this.stopOrdersSearchModel);
        body += this.getBodyLimit(body, this.stopOrdersSearchModel.limit);
        body += this.stopOrdersSearchService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());
        return body;
    }

    doOnReset() {
        this.stopOrdersSearchModel['term'] = null;
        this.ngterms = [];
        this.stopOrdersSearchModel.limit = this.sessionObject.limit;
    }



}
