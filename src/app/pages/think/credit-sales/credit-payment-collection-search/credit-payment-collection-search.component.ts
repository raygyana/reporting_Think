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

import { CreditPaymentCollectionSearchService } from './credit-payment-collection-search.service';
import { CreditPaymentCollectionSearchModel } from './credit-payment-collection-search.model';
import { GlobalService } from '../../../shared/global.service';
import { ChangeService } from '../../../shared/change-service';
import { SaveSearchService } from '../../../shared/save-search-service';
import { CzDatePickerComponent } from '../../../../components/cz-date-picker/cz-date-picker.component';

@Component({
    selector: 'app-credit-payment-collection-search',
    templateUrl: './credit-payment-collection-search.component.html',
    styleUrls: ['./credit-payment-collection-search.component.css'],
    providers: [CreditPaymentCollectionSearchService]
})
export class CreditPaymentCollectionSearchComponent extends BaseComponent {
    ngterms: any;
    private serviceName = 'CREDIT_PAYMENT_COLLECTION';
    log = Log.create('CreditPaymentCollectionSearchComponent');

    creditPaymentCollectionSearchModel: CreditPaymentCollectionSearchModel;
    DataDropDownComponent;
    @ViewChild(DataTableDirective) dtElement: DataTableDirective;
    @ViewChild('creditPaymentCollectionList') CreditPaymentCollectionTemplate;
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
        private creditPaymentCollectionSearchService: CreditPaymentCollectionSearchService) {
        super(loaderService, changeService, saveSearchService, creditPaymentCollectionSearchService, globalService);
        console.log(this.creditPaymentCollectionSearchService);

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
    getReportIcon(): string {
        return 'fa-credit-card';
    }
    // override
    getLoaderName(): string {
        return 'credit-payment-collection-search';
    }

    // override
    getSearchModel(): any {
        console.log(this.creditPaymentCollectionSearchModel);
        if (ProjectUtils.isEmpty(this.creditPaymentCollectionSearchModel)) {
            this.creditPaymentCollectionSearchModel = <CreditPaymentCollectionSearchModel>ProjectUtils.getCreditPaymentCollectionSearch(this.sessionObject);
            if (ProjectUtils.isEmpty(this.creditPaymentCollectionSearchModel)) {
                this.creditPaymentCollectionSearchModel = new CreditPaymentCollectionSearchModel();
                this.creditPaymentCollectionSearchModel.limit = this.sessionObject.limit
            }
            this.ngterms = this.creditPaymentCollectionSearchModel.terms
        }
        this.log.i('getSearchModel', this.creditPaymentCollectionSearchModel);
        return this.creditPaymentCollectionSearchModel;
    }

    // override
    getSearchType(): string {
        return 'creditPaymentCollectionSearch';
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
        this.tabsComponent.openTab('Credit Payment Collection List',
            this.CreditPaymentCollectionTemplate, {}, true, 'creditPaymentCollectionList');
    }

    // override
    getDispSearch(): ThinkListDisplaySearchComponent {
        return this.dispSearch;
    }
    // override
    getReportTitle(): string {
        return 'Credit-Payment-Collection Report';
    }

    // override
    getReportFileName(): string {
        return 'CreditPaymentCollectionReport';
    }

    // override
    setSearchModel(searchModel: any) {
        console.log('setSearchModel: searchModel', searchModel);
        if (!ProjectUtils.isEmpty(searchModel)) {
            if (typeof searchModel === 'string') {
                this.creditPaymentCollectionSearchModel = JSON.parse(searchModel);
            } else {
                this.creditPaymentCollectionSearchModel = searchModel;
            }
        }
        if (this.creditPaymentCollectionSearchModel.limit === '') {
            this.creditPaymentCollectionSearchModel.limit = 0;
        }

        this.ngterms = this.setDropDownComponentValue('term');
        ProjectUtils.setCreditPaymentCollectionSearch(this.sessionObject, this.creditPaymentCollectionSearchModel);
    }

    getDataElement(whichService: string): DataTableDirective {
        if (whichService === this.serviceName) {
            return this.dtElement;
        }
    }


    // override
    getBodyData(): string {
        let body = '';
        body += this.creditPaymentCollectionSearchService.getDateSearchParam(this.creditPaymentCollectionSearchModel, body);
        body += this.creditPaymentCollectionSearchService.getDropDownSearchParam(body, 'term', this.creditPaymentCollectionSearchModel);
        body += this.getBodyLimit(body, this.creditPaymentCollectionSearchModel.limit);
        return body;
    }

    doOnReset() {
        this.creditPaymentCollectionSearchModel['term'] = null;
        this.ngterms = [];
        this.czDatePicker.calendarCanceled(this);
        this.creditPaymentCollectionSearchModel.limit = this.sessionObject.limit;
    }

}
