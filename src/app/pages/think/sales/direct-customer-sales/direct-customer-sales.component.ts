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

import { DirectCustomerSalesListService } from './direct-customer-sales.service';
import { DirectCustomerSalesModel } from './direct-customer-sales.model';
import { CzDatePickerComponent } from '../../../../components/cz-date-picker/cz-date-picker.component';
@Component({
    selector: 'app-direct-customer-sales',
    templateUrl: './direct-customer-sales.component.html',
    styleUrls: ['./direct-customer-sales.component.css'],
    providers: [DirectCustomerSalesListService]
})
export class DirectCustomerSalesComponent extends BaseComponent {
    private DIRECT_CUSTOMER_SALES = 'directCustomerSales';
    log = Log.create('DirectCustomerSalesComponent');
    ddOptionsproductName: DataDropDownOptions;
    directCustomerSalesModel: any;
    productData: any;
    ngNNumbers: any;
    @ViewChild('directCustomerSalesData', { read: DataTableDirective }) dtElement: DataTableDirective;
    @ViewChild('directCustomerSalesList') directCustomerSalesListTemplate;
    @ViewChild(TabsComponent) tabsComponent;
    @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;
    @ViewChild(CzDatePickerComponent) czDatePicker: CzDatePickerComponent;

    @ViewChild('product_name', { read: DataDropDownComponent }) ddProductName: DataDropDownComponent;

    constructor(private router: Router,
        private _logger: Logger,
        private directCustomerSalesListService: DirectCustomerSalesListService,
        protected loaderService: LoaderService,
        protected changeService: ChangeService,
        protected saveSearchService: SaveSearchService,
        protected globalService: GlobalService) {
        super(loaderService, changeService, saveSearchService, directCustomerSalesListService, globalService);
        this.log.color = 'lightblue';
        this.doInitialSetup();
    }

    // override
    getLoaderName(): string {
        return 'direct-customer-sales-search';
    }

    // override
    getSearchModel(): any {
        if (ProjectUtils.isEmpty(this.directCustomerSalesModel)) {
            this.directCustomerSalesModel = this.sessionObject.directCustomerSearch;
            if (ProjectUtils.isEmpty(this.directCustomerSalesModel)) {
                this.directCustomerSalesModel = {};
                this.directCustomerSalesModel.limit = this.sessionObject.limit;
                this.calenderSetDefaultValue(this.directCustomerSalesModel);
            }
            this.ngNNumbers = this.directCustomerSalesModel.journalId;
        }
        this.log.i('getSearchModel', this.directCustomerSalesModel);
        return this.directCustomerSalesModel;
    }

    // override
    getSearchType(): string {
        return 'directCustomerSales';
    }

    // override
    getDataElement(whichService: string): DataTableDirective {
        return this.dtElement;
    }


    // override
    getServiceName(): string {
        return this.DIRECT_CUSTOMER_SALES;
    }

    // override
    openListTab() {
        this.tabsComponent.openTab('Direct Customer Sales List',
            this.directCustomerSalesListTemplate, {}, true, 'directCustomerSalesListList');
    }

    // override
    getDispSearch(): ThinkListDisplaySearchComponent {
        return this.dispSearch;
    }
    // override
    getReportIcon(): string {
        return 'fa-pie-chart';
    }
    // override
    getReportTitle(): string {
        return 'Direct Customer Sales Report';
    }

    // override
    getReportFileName(): string {
        return 'directCustomerSalesReport';
    }

    // override
    setSearchModel(searchModel: any) {
        if (!ProjectUtils.isEmpty(searchModel)) {
            if (typeof searchModel === 'string') {
                this.directCustomerSalesModel = JSON.parse(searchModel);
            } else {
                this.directCustomerSalesModel = searchModel;
            }
        }
        if (this.directCustomerSalesModel.limit === '') {
            this.directCustomerSalesModel.limit = 0;
        }
        this.log.i('setSearchModel', this.directCustomerSalesModel);
        this.ngNNumbers = this.setDropDownComponentValue('journalId');
        ProjectUtils.setDirectCustomerSearch(this.sessionObject, this.directCustomerSalesModel);
    }

    getDatePicker(): CzDatePickerComponent {
        return this.czDatePicker;
    }

    getBodyData(): string {
        let body = '';
        body += this.directCustomerSalesListService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());
        body += this.directCustomerSalesListService.getDateSearchParam(this.directCustomerSalesModel, body);
        body += this.directCustomerSalesListService.getDropDownSearchParam(body, 'journalId', this.directCustomerSalesModel);
        body += this.getBodyLimit(body, this.directCustomerSalesModel.limit);

        return body;
    }

    doInitialSetup() {
        this.ddOptionsproductName = new DataDropDownOptions();
        this.ddOptionsproductName.serviceURL = Constants.TK_SALE_JOURNAL_LIST_URL;
        this.ddOptionsproductName.keyName = 'ocID';
        this.ddOptionsproductName.keyDesc = 'description';
        this.ddOptionsproductName.modelName = 'journalId';
        this.ddOptionsproductName.firstOptionText = 'Select a Product';
        this.ddOptionsproductName.baseComponent = this;
        this.ddOptionsproductName.multipleState = true;
        this.ddOptionsproductName.selectMulti = true;

    }

    doOnReset() {
        this.directCustomerSalesModel['journalId'] = null;
        // this.ddProductName.optionsModel = [];
        this.ngNNumbers = [];
        this.calenderSetDefaultValue(this.directCustomerSalesModel);
        this.directCustomerSalesModel.limit = this.sessionObject.limit;
    }

    baseProcessData() {
        const toSum = ['sumNetBaseAmount', 'countOrderhdrId'];
        const keys = ['ocDescription'];
        return ProjectUtils.mySumFunction2(this.listData, toSum, 'ocDescription', 'Total:', 'Grand Total:', keys, false);
    }

}
