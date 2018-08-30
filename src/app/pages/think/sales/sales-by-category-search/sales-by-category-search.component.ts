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

import { SalesByCategoryService } from './sales-by-category-search.service';
import { SalesByCategorySearchModel } from './sales-by-category-search.model';
import { CzDatePickerComponent } from '../../../../components/cz-date-picker/cz-date-picker.component';

@Component({
    selector: 'app-sales-by-category-search',
    templateUrl: './sales-by-category-search.component.html',
    styleUrls: ['./sales-by-category-search.component.css'],
    providers: [SalesByCategoryService]
})
export class SalesByCategorySearchComponent extends BaseComponent {
    ngCategory: any;
    ngProductName: any;
    private SALES_BY_CATEGORY_SEARCH = 'salesByCategory';
    log = Log.create('SalesByCategorySearchComponent');
    ddOptionscategory: DataDropDownOptions;
    ddOptionsproductName: DataDropDownOptions;
    salesByCategoryModel: any;


    @ViewChild('salesByCategoryData', { read: DataTableDirective }) dtElement: DataTableDirective;
    @ViewChild('salesByCategoryList') salesByCategoryListTemplate;
    @ViewChild(TabsComponent) tabsComponent;
    @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;
    @ViewChild(CzDatePickerComponent) czDatePicker: CzDatePickerComponent;
    @ViewChild('productName', { read: DataDropDownComponent }) ddProductName: DataDropDownComponent;
    @ViewChild('category', { read: DataDropDownComponent }) ddCategory: DataDropDownComponent;

    constructor(private router: Router,
        protected loaderService: LoaderService,
        private _logger: Logger,
        protected changeService: ChangeService,
        protected saveSearchService: SaveSearchService,
        private salesByCategoryService: SalesByCategoryService,
        protected globalService: GlobalService) {
        super(loaderService, changeService, saveSearchService, salesByCategoryService, globalService);
        this.log.color = 'lightblue';
        this.doInitialSetup();
    }

    // override
    getLoaderName(): string {
        return 'sales-by-category-search';
    }

    // // override
    getSearchModel(): any {
        if (ProjectUtils.isEmpty(this.salesByCategoryModel)) {
            this.salesByCategoryModel = this.sessionObject.salesCategorySearch;
            if (ProjectUtils.isEmpty(this.salesByCategoryModel)) {
                this.salesByCategoryModel = new SalesByCategorySearchModel();
                this.calenderSetDefaultValue(this.salesByCategoryModel);
            }
            if (ProjectUtils.isEmpty(this.salesByCategoryModel.catData)) {
                this.salesByCategoryModel.catData = [];
                this.salesByCategoryModel.limit = this.sessionObject.limit;
            }
            this.ngProductName = this.salesByCategoryModel.productName;
            this.ngCategory = this.salesByCategoryModel.category;
        }
        this.log.i('getSearchModel', this.salesByCategoryModel);
        return this.salesByCategoryModel;
    }

    // override
    getSearchType(): string {
        return 'salesByCategory';
    }
    // override
    getDataElement(whichService: string): DataTableDirective {
        return this.dtElement;
    }

    // override
    getServiceName(): string {
        return this.SALES_BY_CATEGORY_SEARCH;
    }
    // override
    getReportIcon(): string {
        return 'fa-pie-chart';
    }

    // override
    openListTab() {
        this.tabsComponent.openTab('Sales By Category List',
            this.salesByCategoryListTemplate, {}, true, 'salesByCategoryList');
    }

    // override
    getDispSearch(): ThinkListDisplaySearchComponent {
        return this.dispSearch;
    }

    // override
    getReportTitle(): string {
        return 'Sales By Category Report';
    }

    // override
    getReportFileName(): string {
        return 'salesByCategoryReport';
    }

    // override
    setSearchModel(searchModel: any) {
        if (!ProjectUtils.isEmpty(searchModel)) {
            if (typeof searchModel === 'string') {
                this.salesByCategoryModel = JSON.parse(searchModel);
            } else {
                this.salesByCategoryModel = searchModel;
            }
        }
        if (this.salesByCategoryModel.limit === '') {
            this.salesByCategoryModel.limit = 0;
        }
        this.log.i('setSearchModel', this.salesByCategoryModel);
        this.ngProductName = this.setDropDownComponentValue('productName');
        this.ngCategory = this.setDropDownComponentValue('category');

        ProjectUtils.setSalesByCategorySearch(this.sessionObject, this.salesByCategoryModel);
    }
    doInInitLoad() {

    }
    getDatePicker(): CzDatePickerComponent {
        return this.czDatePicker;
    }

    getBodyData(): string {
        let body = '';
        body += this.salesByCategoryService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());
        body += this.salesByCategoryService.getDateSearchParam(this.salesByCategoryModel, body);
        body += this.salesByCategoryService.getDropDownSearchParam(body, 'category', this.salesByCategoryModel);
        body += this.salesByCategoryService.getDropDownSearchParam(body, 'productName', this.salesByCategoryModel);
        body += this.getBodyLimit(body, this.salesByCategoryModel.limit);

        return body;
    }

    doInitialSetup() {
        this.ddOptionscategory = new DataDropDownOptions();
        this.ddOptionscategory.serviceURL = Constants.TK_SALE_CATEGORY_DROPDOWN_URL;
        this.ddOptionscategory.keyName = 'subscriptionCategoryId';
        this.ddOptionscategory.keyDesc = 'description';
        this.ddOptionscategory.firstOptionText = 'Select a Category';
        this.ddOptionscategory.modelName = 'category';
        this.ddOptionscategory.baseComponent = this;
        this.ddOptionscategory.selectMulti = true;

        this.ddOptionsproductName = new DataDropDownOptions();
        this.ddOptionsproductName.serviceURL = Constants.TK_SALE_JOURNAL_LIST_URL;
        this.ddOptionsproductName.keyName = 'ocID';
        this.ddOptionsproductName.keyDesc = 'description';
        this.ddOptionsproductName.firstOptionText = 'Select a Product Name';
        this.ddOptionsproductName.modelName = 'productName';
        this.ddOptionsproductName.baseComponent = this;
        this.ddOptionsproductName.selectMulti = true;

        this.displaySearchOptions.noCrossList = [];
        this.displaySearchOptions.noCrossList.push('category');
    }

    doOnReset() {
        this.salesByCategoryModel['productName'] = null;
        this.salesByCategoryModel['category'] = null;
        // this.ddProductName.optionsModel = [];
        // this.ddCategory.optionsModel = [];
        this.ngProductName = [];
        this.ngCategory = [];
        this.calenderSetDefaultValue(this.salesByCategoryModel);
        this.salesByCategoryModel.limit = this.sessionObject.limit;

    }

}
