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



import { InvoicesByTermsSearchService } from './invoices-by-terms-search.service';
import { InvoicesByTermsSearchModel } from './invoices-by-terms-search.model';
import { GlobalService } from '../../../shared/global.service';
import { ChangeService } from '../../../shared/change-service';
import { SaveSearchService } from '../../../shared/save-search-service';
import { CzDatePickerComponent } from '../../../../components/cz-date-picker/cz-date-picker.component';
@Component({
    selector: 'app-invoices-by-terms-search',
    templateUrl: './invoices-by-terms-search.component.html',
    styleUrls: ['./invoices-by-terms-search.component.css'],
    providers: [InvoicesByTermsSearchService]
})
export class InvoicesByTermsSearchComponent extends BaseComponent {
    ngterms: any;
    private serviceName = 'INVOICE_TERMS';
    log = Log.create('GeneratedCreditNotesSearchComponent');

    invoicesByTermsSearchModel: InvoicesByTermsSearchModel;

    @ViewChild(DataTableDirective) dtElement: DataTableDirective;
    @ViewChild('invoicesByTermsList') InvoicesByTermsTemplate;
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
        private invoicesByTermsSearchService: InvoicesByTermsSearchService) {
        super(loaderService, changeService, saveSearchService, invoicesByTermsSearchService, globalService);
        console.log(this.invoicesByTermsSearchService);

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
        return 'invoices-by-terms-search';
    }
    // override
    getReportIcon(): string {
        return 'fa-credit-card';
    }
    // override
    getSearchModel(): any {

        console.log(this.invoicesByTermsSearchModel);
        if (ProjectUtils.isEmpty(this.invoicesByTermsSearchModel)) {
            this.invoicesByTermsSearchModel = <InvoicesByTermsSearchModel>ProjectUtils.getInvoicesByTermsSearch(this.sessionObject);
            if (ProjectUtils.isEmpty(this.invoicesByTermsSearchModel)) {
                this.invoicesByTermsSearchModel = new InvoicesByTermsSearchModel();
                this.invoicesByTermsSearchModel.limit = this.sessionObject.limit
            }
            this.ngterms = this.invoicesByTermsSearchModel.term
        }
        this.log.i('getSearchModel', this.invoicesByTermsSearchModel);
        return this.invoicesByTermsSearchModel;
    }

    // override
    getSearchType(): string {
        return 'invoicesByTermsSearch';
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
        this.tabsComponent.openTab('Invoices By Terms List',
            this.InvoicesByTermsTemplate, {}, true, 'invoicesByTermsList');
    }

    // override
    getDispSearch(): ThinkListDisplaySearchComponent {
        return this.dispSearch;
    }

    // override
    getReportTitle(): string {
        return 'Invoices By Terms Report';
    }

    // override
    getReportFileName(): string {
        return 'InvoicesByTermsReport';
    }

    // override
    setSearchModel(searchModel: any) {
        console.log('setSearchModel: searchModel', searchModel);
        if (!ProjectUtils.isEmpty(searchModel)) {
            if (typeof searchModel === 'string') {
                this.invoicesByTermsSearchModel = JSON.parse(searchModel);
            } else {
                this.invoicesByTermsSearchModel = searchModel;
            }
        }
        if (this.invoicesByTermsSearchModel.limit === '') {
            this.invoicesByTermsSearchModel.limit = 0;
        }

        this.ngterms = this.setDropDownComponentValue('term');
        ProjectUtils.setInvoicesByTermsSearch(this.sessionObject, this.invoicesByTermsSearchModel);
    }

    getDataElement(whichService: string): DataTableDirective {
        if (whichService === this.serviceName) {
            return this.dtElement;
        }
    }

    // override
    getBodyData(): string {
        let body = '';
        body += this.invoicesByTermsSearchService.getDateSearchParam(this.invoicesByTermsSearchModel, body);
        body += this.invoicesByTermsSearchService.getDropDownSearchParam(body, 'term', this.invoicesByTermsSearchModel);
        body += this.getBodyLimit(body, this.invoicesByTermsSearchModel.limit);
        // body += this.invoicesByTermsSearchService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());
        return body;
    }

    doOnReset() {
        this.invoicesByTermsSearchModel['term'] = null;
        this.ngterms = [];
        this.czDatePicker.calendarCanceled(this);
        this.invoicesByTermsSearchModel.limit = this.sessionObject.limit;
    }

}
