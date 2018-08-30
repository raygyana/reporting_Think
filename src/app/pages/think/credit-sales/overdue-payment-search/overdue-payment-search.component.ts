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


import { OverduePaymentSearchService } from './overdue-payment-search.service';
import { OverduePaymentSearchModel } from './overdue-payment-search.model';
import { GlobalService } from '../../../shared/global.service';
import { ChangeService } from '../../../shared/change-service';
import { SaveSearchService } from '../../../shared/save-search-service';
import { CzDatePickerComponent } from '../../../../components/cz-date-picker/cz-date-picker.component';
@Component({
    selector: 'app-overdue-payment-search',
    templateUrl: './overdue-payment-search.component.html',
    styleUrls: ['./overdue-payment-search.component.css'],
    providers: [OverduePaymentSearchService]
})
export class OverduePaymentSearchComponent extends BaseComponent {
    ngterms: any;
    private serviceName = 'OVERDUE_PAYMENT';
    log = Log.create('OverduePaymentSearchComponent');

    overduePaymentSearchModel: OverduePaymentSearchModel;

    @ViewChild(DataTableDirective) dtElement: DataTableDirective;
    @ViewChild('overduePaymentList') OverduePaymentTemplate;
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
        private overduePaymentSearchService: OverduePaymentSearchService) {
        super(loaderService, changeService, saveSearchService, overduePaymentSearchService, globalService);

        this.log.color = 'lightblue';
        this.doInitialSetup();
    }

    getDatePicker(): CzDatePickerComponent {
        return this.czDatePicker;
    }


    doInInitLoad() {
        this.globalService.getTermsData(this.ddTriggerTerms);
        this.hideLoader();
    }


    doInitialSetup() {
        this.ddOptionsTerms = ProjectUtils.getOptionTerms(this);
        this.ddOptionsTerms.selectMulti = true;
        this.ddOptionsTerms.firstOptionText = 'Select  Term';
        this.displaySearchOptions.noCrossList = [];
        this.displaySearchOptions.noCrossList.push('term');
    }
    // override
    getReportIcon(): string {
        return 'fa-credit-card';
    }

    // override
    getLoaderName(): string {
        return 'overdue-payment-search';
    }

    // override
    getSearchModel(): any {

        console.log(this.overduePaymentSearchModel);
        if (ProjectUtils.isEmpty(this.overduePaymentSearchModel)) {
            this.overduePaymentSearchModel = <OverduePaymentSearchModel>ProjectUtils.getOverduePaymentSearch(this.sessionObject);
            if (ProjectUtils.isEmpty(this.overduePaymentSearchModel)) {
                this.overduePaymentSearchModel = new OverduePaymentSearchModel();
                this.overduePaymentSearchModel.limit = this.sessionObject.limit
            }
            this.ngterms = this.overduePaymentSearchModel.terms
        }
        this.log.i('getSearchModel', this.overduePaymentSearchModel);
        return this.overduePaymentSearchModel;
    }

    // override
    getSearchType(): string {
        return 'overduePaymentSearch';
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
        this.tabsComponent.openTab('Overdue Payment List',
            this.OverduePaymentTemplate, {}, true, 'overduePaymentList');
    }

    // override
    getDispSearch(): ThinkListDisplaySearchComponent {
        return this.dispSearch;
    }

    // override
    getReportTitle(): string {
        return 'Overdue Payment Report';
    }

    // override
    getReportFileName(): string {
        return 'OverduePaymentReport';
    }

    // override
    setSearchModel(searchModel: any) {
        console.log('setSearchModel: searchModel', searchModel);
        if (!ProjectUtils.isEmpty(searchModel)) {
            if (typeof searchModel === 'string') {
                this.overduePaymentSearchModel = JSON.parse(searchModel);
            } else {
                this.overduePaymentSearchModel = searchModel;
            }
        }
        if (this.overduePaymentSearchModel.limit === '') {
            this.overduePaymentSearchModel.limit = 0;
        }
        this.ngterms = this.setDropDownComponentValue('term');

        ProjectUtils.setOverduePaymentSearch(this.sessionObject, this.overduePaymentSearchModel);
    }

    getDataElement(whichService: string): DataTableDirective {
        if (whichService === this.serviceName) {
            return this.dtElement;
        }
    }

    // override
    getBodyData(): string {
        let body = '';
        body += this.overduePaymentSearchService.getDateSearchParam(this.overduePaymentSearchModel, body);
        body += this.overduePaymentSearchService.getDropDownSearchParam(body, 'term', this.overduePaymentSearchModel);
        body += this.getBodyLimit(body, this.overduePaymentSearchModel.limit);
        body += this.overduePaymentSearchService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());
        return body;
    }

    doOnReset() {
        this.overduePaymentSearchModel['term'] = null;
        this.ngterms = [];
        this.czDatePicker.calendarCanceled(this);
        this.overduePaymentSearchModel.limit = this.sessionObject.limit;
    }

}
