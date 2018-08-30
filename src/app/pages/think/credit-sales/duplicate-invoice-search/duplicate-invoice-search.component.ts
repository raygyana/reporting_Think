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
import { DuplicateInvoiceSearchService } from './duplicate-invoice-search.service';
import { DuplicateInvoiceSearchModel } from './duplicate-invoice-search.model';
import { GlobalService } from '../../../shared/global.service';
import { ChangeService } from '../../../shared/change-service';
import { SaveSearchService } from '../../../shared/save-search-service';
import { CzDatePickerComponent } from '../../../../components/cz-date-picker/cz-date-picker.component';
import { styleDuplicateInvoice } from './duplicate-invoice-print-view/data';


@Component({
    selector: 'app-duplicate-invoice-search',
    templateUrl: './duplicate-invoice-search.component.html',
    styleUrls: ['./duplicate-invoice-search.component.css'],
    providers: [DuplicateInvoiceSearchService]
})
export class DuplicateInvoiceSearchComponent extends BaseComponent {
    // ngformat: any;
    private serviceName = 'DUPLICATE_INVOICE';
    log = Log.create('DuplicateInvoiceSearchComponent');
    styleDuplicateInvoice = styleDuplicateInvoice;

    duplicateInvoiceSearchModel: DuplicateInvoiceSearchModel;

    @ViewChild(DataTableDirective) dtElement: DataTableDirective;
    @ViewChild('duplicateInvoiceSearchList') DuplicateInvoiceSearchTemplate;
    @ViewChild(TabsComponent) tabsComponent;
    @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;

    ddOptionsFormat: DataDropDownOptions;
    ddTriggerFormat: Subject<any> = new Subject();
    @ViewChild('format', { read: DataDropDownComponent }) ddTerms: DataDropDownComponent;
    @ViewChild(CzDatePickerComponent) czDatePicker: CzDatePickerComponent;



    constructor(private router: Router,
        protected loaderService: LoaderService,
        private _logger: Logger,
        protected globalService: GlobalService,
        protected changeService: ChangeService,
        protected saveSearchService: SaveSearchService,
        private duplicateInvoiceSearchService: DuplicateInvoiceSearchService) {
        super(loaderService, changeService, saveSearchService, duplicateInvoiceSearchService, globalService);

        this.log.color = 'lightblue';
        this.doInitialSetup();
    }
    doInInitLoad() {
        this.globalService.getFormatData(this.ddTriggerFormat);
        this.hideLoader();
    }

    getDatePicker(): CzDatePickerComponent {
        return this.czDatePicker;
    }

    doInitialSetup() {
        this.ddOptionsFormat = new DataDropDownOptions();
        this.ddOptionsFormat.serviceURL = Constants.TK_PROFITCENTER_URL;
        this.ddOptionsFormat.keyName = 'id';
        this.ddOptionsFormat.keyDesc = 'value';
        this.ddOptionsFormat.firstOptionText = 'Select a Format';
        this.ddOptionsFormat.modelName = 'format';
        this.ddOptionsFormat.baseComponent = this;

        this.displaySearchOptions.noCrossList = [];
        this.displaySearchOptions.noCrossList.push('invoiceNumber');
    }

    checkchange(e) {
        if (e.target.checked) {
            console.log('checked');
            this.duplicateInvoiceSearchModel.show_item_price = {
                'id': 'true',
                'desc': 'Show Item Price',
                'columnName': 'show_item_price'
            };

        } else {
            console.log('unchecked');
            this.duplicateInvoiceSearchModel.show_item_price = '';
        }
    }

    // override
    getLoaderName(): string {
        return 'duplicate-invoice-search';
    }

    // override
    getSearchModel(): any {
        if (ProjectUtils.isEmpty(this.duplicateInvoiceSearchModel)) {
            this.duplicateInvoiceSearchModel = <DuplicateInvoiceSearchModel>this.sessionObject.duplicateInvoiceSearch;
            console.log(this.duplicateInvoiceSearchModel);
            if (ProjectUtils.isEmpty(this.duplicateInvoiceSearchModel)) {
                this.duplicateInvoiceSearchModel = new DuplicateInvoiceSearchModel();
                this.duplicateInvoiceSearchModel.limit = this.sessionObject.limit
            }
            // this.ngformat = this.duplicateInvoiceSearchModel.format
        }
        this.log.i('getSearchModel', this.duplicateInvoiceSearchModel);
        return this.duplicateInvoiceSearchModel;
    }

    // override
    getSearchType(): string {
        return 'duplicateInvoiceSearch';
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
        this.tabsComponent.openTab('Duplicate Invoice List',
            this.DuplicateInvoiceSearchTemplate, {}, true, 'duplicateInvoiceSearchList');
    }

    // override
    getDispSearch(): ThinkListDisplaySearchComponent {
        return this.dispSearch;
    }


    // override
    getReportTitle(): string {
        return 'Duplicate-Invoice Report';
    }
    // override
    getReportIcon(): string {
        return 'fa-credit-card';
    }
    // override
    getReportFileName(): string {
        return 'DuplicateInvoiceReport';
    }

    // override
    setSearchModel(searchModel: any) {
        console.log('setSearchModel: searchModel', searchModel);
        if (!ProjectUtils.isEmpty(searchModel)) {

            if (typeof searchModel === 'string') {
                this.duplicateInvoiceSearchModel = JSON.parse(searchModel);
            } else {
                this.duplicateInvoiceSearchModel = searchModel;
            }
        }
        if (this.duplicateInvoiceSearchModel.limit === '') {
            this.duplicateInvoiceSearchModel.limit = 0;
        }


        // this.ngformat = this.setDropDownComponentValue('format');

        ProjectUtils.setDuplicateInvoiceSearch(this.sessionObject, this.duplicateInvoiceSearchModel);
    }

    getDataElement(whichService: string): DataTableDirective {
        if (whichService === this.serviceName) {
            return this.dtElement;
        }
    }

    // override
    getBodyData(): string {
        let body = '';
        // body += this.duplicateInvoiceSearchService.getDropDownSearchParam(body, 'format', this.duplicateInvoiceSearchModel);
        body += this.duplicateInvoiceSearchService.getDropDownSearchParam(body, 'show_item_price', this.duplicateInvoiceSearchModel);
        body += this.duplicateInvoiceSearchService.setParamValue(body, 'invoice_number', this.duplicateInvoiceSearchModel['invoiceNumber']);
        body += this.getBodyLimit(body, this.duplicateInvoiceSearchModel.limit);
        body += this.duplicateInvoiceSearchService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());
        return body;
    }

    doOnReset() {
        this.duplicateInvoiceSearchModel['format'] = null;
        //  this.ngformat = [];
        this.duplicateInvoiceSearchModel.limit = this.sessionObject.limit;
    }


    dtTaskFunc(dtOptions, titleName, fileName) {
        return ProjectUtils.dtEnablePDF(dtOptions, titleName, fileName);
    }




    printInvoice() {
        ProjectUtils.PrintElem('duplicateInvoice', this.styleDuplicateInvoice);
    }

}
