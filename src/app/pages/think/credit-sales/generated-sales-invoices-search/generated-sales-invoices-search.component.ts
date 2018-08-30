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



import { GeneratedSalesInvoicesSearchService } from './generated-sales-invoices-search.service';
import { GeneratedSalesInvoicesSearchModel } from './generated-sales-invoices-search.model';
import { GlobalService } from '../../../shared/global.service';
import { ChangeService } from '../../../shared/change-service';
import { SaveSearchService } from '../../../shared/save-search-service';
import { CzDatePickerComponent } from '../../../../components/cz-date-picker/cz-date-picker.component';

@Component({
    selector: 'app-generated-sales-invoices-search',
    templateUrl: './generated-sales-invoices-search.component.html',
    styleUrls: ['./generated-sales-invoices-search.component.css'],
    providers: [GeneratedSalesInvoicesSearchService]
})
export class GeneratedSalesInvoicesSearchComponent extends BaseComponent {
    ngterms: any;
    private serviceName = 'GENRATED_SALES_INV';
    log = Log.create('GeneratedCreditNotesSearchComponent');

    generatedSalesInvoicesSearchModel: GeneratedSalesInvoicesSearchModel;
    @ViewChild(DataTableDirective) dtElement: DataTableDirective;
    @ViewChild('generatedSalesInvoicesList') GeneratedSalesInvoicesTemplate;
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
        private generatedSalesInvoicesSearchService: GeneratedSalesInvoicesSearchService) {
        super(loaderService, changeService, saveSearchService, generatedSalesInvoicesSearchService, globalService);

        this.log.color = 'lightblue';
        this.doInitialSetup();
    }

    doInInitLoad() {
        this.globalService.getTermsData(this.ddTriggerTerms);
        this.hideLoader();
    }


    doInitialSetup() {
        this.ddOptionsTerms = ProjectUtils.getOptionTerms(this);
        this.ddOptionsTerms.selectMulti = true;
        this.ddOptionsTerms.firstOptionText = 'Select Term';
        this.displaySearchOptions.noCrossList = [];
        this.displaySearchOptions.noCrossList.push('term');
    }

    // override
    getLoaderName(): string {
        return 'generated-sales-invoices-search';
    }

    getDatePicker(): CzDatePickerComponent {
        return this.czDatePicker;
    }

    // override
    getSearchModel(): any {
        console.log(this.generatedSalesInvoicesSearchModel);
        if (ProjectUtils.isEmpty(this.generatedSalesInvoicesSearchModel)) {
            this.generatedSalesInvoicesSearchModel = <GeneratedSalesInvoicesSearchModel>ProjectUtils.getGeneratedSalesInvoicesSearch(this.sessionObject);
            if (ProjectUtils.isEmpty(this.generatedSalesInvoicesSearchModel)) {
                this.generatedSalesInvoicesSearchModel = new GeneratedSalesInvoicesSearchModel();
                this.generatedSalesInvoicesSearchModel.limit = this.sessionObject.limit
            }
            this.ngterms = this.generatedSalesInvoicesSearchModel.terms
        }
        this.log.i('getSearchModel', this.generatedSalesInvoicesSearchModel);
        return this.generatedSalesInvoicesSearchModel;
    }

    // override
    getSearchType(): string {
        return 'generatedSalesInvoicesSearch';
    }

    // override
    getTabsComponent(): any {
        return this.tabsComponent;
    }
    // override
    getReportIcon(): string {
        return 'fa-credit-card';
    }


    // override
    getServiceName(): string {
        return this.serviceName;
    }

    // override
    openListTab() {
        this.tabsComponent.openTab('Generated Sales Invoices List',
            this.GeneratedSalesInvoicesTemplate, {}, true, 'generatedSalesInvoicesList');
    }

    // override
    getDispSearch(): ThinkListDisplaySearchComponent {
        return this.dispSearch;
    }

    // override
    getReportTitle(): string {
        return 'Generated-Sales-Invoices Report';
    }

    // override
    getReportFileName(): string {
        return 'GeneratedSalesInvoicesReport';
    }

    // override
    setSearchModel(searchModel: any) {
        console.log('setSearchModel: searchModel', searchModel);
        if (!ProjectUtils.isEmpty(searchModel)) {
            if (typeof searchModel === 'string') {
                this.generatedSalesInvoicesSearchModel = JSON.parse(searchModel);
            } else {
                this.generatedSalesInvoicesSearchModel = searchModel;
            }
        }
        if (this.generatedSalesInvoicesSearchModel.limit === '') {
            this.generatedSalesInvoicesSearchModel.limit = 0;
        }


        this.ngterms = this.setDropDownComponentValue('term');
        ProjectUtils.setGeneratedSalesInvoicesSearch(this.sessionObject, this.generatedSalesInvoicesSearchModel);
    }

    getDataElement(whichService: string): DataTableDirective {
        if (whichService === this.serviceName) {
            return this.dtElement;
        }
    }

    // override
    getBodyData(): string {
        let body = '';
        body += this.generatedSalesInvoicesSearchService.getDateSearchParam(this.generatedSalesInvoicesSearchModel, body);
        body += this.generatedSalesInvoicesSearchService.getDropDownSearchParam(body, 'term', this.generatedSalesInvoicesSearchModel);
        body += this.getBodyLimit(body, this.generatedSalesInvoicesSearchModel.limit);
        // body += this.generatedSalesInvoicesSearchService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());
        return body;
    }

    doOnReset() {
        this.generatedSalesInvoicesSearchModel['term'] = null;
        this.ngterms = [];
        this.czDatePicker.calendarCanceled(this);
        this.generatedSalesInvoicesSearchModel.limit = this.sessionObject.limit;
    }

}
