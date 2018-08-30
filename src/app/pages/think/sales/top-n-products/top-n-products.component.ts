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
import { Logger as Loggerr } from '../../../../core/logger/logger';
import { LoaderService } from '../../../../core/loader/loader.service';
import { BaseComponent } from '../../../../core/base/base.component';
import { ProjectUtils } from '../../../shared/project-utils';
import { Constants } from '../../../shared/constant';
import { SessionObject } from '../../../shared/session-object';

import { GlobalService } from '../../../shared/global.service';
import { SearchModelType } from '../../../shared/search-model-type';
import { ChangeService } from '../../../shared/change-service';
import { SaveSearchService } from '../../../shared/save-search-service';

import { TopNProductsModel } from './top-n-products.model';
import { TopNProductsService } from './top-n-products.service';
import { CzDatePickerComponent } from '../../../../components/cz-date-picker/cz-date-picker.component';


@Component({
    selector: 'app-top-n-products',
    templateUrl: './top-n-products.component.html',
    styleUrls: ['./top-n-products.component.css'],
    providers: [TopNProductsService]
})
export class TopNProductsComponent extends BaseComponent {
    private TOP_N_PRODUCTS = 'topNProducts';
    log = Log.create('TopNProductsComponent');
    ngNNumbers: any;
    ngRegionId: any;
    ngCountry: any;
    ngProductTypeID: any;
    ngCategoryID: any;
    topNProductsModel: any;
    nNumbersData: any;
    ddOptionsReg: DataDropDownOptions;
    ddOptionsCountry: DataDropDownOptions;
    ddOptionsTopN: DataDropDownOptions;
    ddOptionsProd: DataDropDownOptions;
    ddOptionsCat: DataDropDownOptions;
    ddTrigger: Subject<any> = new Subject();
    ddTriggerTopN: Subject<any> = new Subject();

    @ViewChild('topNProductsListData', { read: DataTableDirective }) dtElement: DataTableDirective;
    @ViewChild('topNProductsList') topNProductsListTemplate;
    @ViewChild(TabsComponent) tabsComponent;
    @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;
    @ViewChild(CzDatePickerComponent) czDatePicker: CzDatePickerComponent;
    @ViewChild('nNumbers', { read: DataDropDownComponent }) ddTopNProduct: DataDropDownComponent;
    @ViewChild('regionId', { read: DataDropDownComponent }) ddRegion: DataDropDownComponent;
    @ViewChild('country', { read: DataDropDownComponent }) ddCountry: DataDropDownComponent;
    @ViewChild('productTypeID', { read: DataDropDownComponent }) productTypeID: DataDropDownComponent;
    @ViewChild('categoryID', { read: DataDropDownComponent }) categoryID: DataDropDownComponent;

    constructor(private router: Router,
        private topNProductsService: TopNProductsService,
        protected globalService: GlobalService,
        private logger: Loggerr,
        protected changeService: ChangeService,
        protected saveSearchService: SaveSearchService,
        protected loaderService: LoaderService) {
        super(loaderService, changeService, saveSearchService, topNProductsService, globalService);
        this.log.color = 'lightblue';
        this.doInitialSetup();
    }

    // override
    getLoaderName(): string {
        return 'top-n-products-component';
    }

    // override
    getSearchModel(): any {
        if (ProjectUtils.isEmpty(this.topNProductsModel)) {
            this.topNProductsModel = this.sessionObject.topNProductsSearch;
            if (ProjectUtils.isEmpty(this.topNProductsModel)) {
                this.topNProductsModel = {};
                this.calenderSetDefaultValue(this.topNProductsModel);
            }
            this.ngNNumbers = this.topNProductsModel.nNumbers;
            this.ngCategoryID = this.topNProductsModel.categoryID;
            this.ngProductTypeID = this.topNProductsModel.productTypeID;
            this.ngRegionId = this.topNProductsModel.regionId;
            this.ngCountry = this.topNProductsModel.country;


        }
        this.log.i('getSearchModel', this.topNProductsModel);
        return this.topNProductsModel;
    }

    // override
    getSearchType(): string {
        return 'topNProducts';
    }
    // override
    getReportIcon(): string {
        return 'fa-pie-chart';
    }
    // override
    getDataElement(whichService: string): DataTableDirective {
        return this.dtElement;
    }

    // override
    getTabsComponent(): any {
        return this.tabsComponent;
    }

    // override
    getServiceName(): string {
        return this.TOP_N_PRODUCTS;
    }

    // override
    openListTab() {
        this.tabsComponent.openTab('Top N Products List',
            this.topNProductsListTemplate, {}, true, 'topNProductsList');
    }

    // override
    getDispSearch(): ThinkListDisplaySearchComponent {
        return this.dispSearch;
    }

    // override
    getReportTitle(): string {
        return 'Top N Products Report';
    }

    // override
    getReportFileName(): string {
        return 'topNProductsReport';
    }

    // override
    setSearchModel(searchModel: any) {

        if (!ProjectUtils.isEmpty(searchModel)) {
            if (typeof searchModel === 'string') {
                this.topNProductsModel = JSON.parse(searchModel);
            } else {
                this.topNProductsModel = searchModel;
            }
        }
        this.ngNNumbers = this.setDropDownComponentValue('nNumbers');
        this.ngCountry = this.setDropDownComponentValue('country');
        this.ngRegionId = this.setDropDownComponentValue('regionId');
        this.ngProductTypeID = this.setDropDownComponentValue('productTypeID');
        this.ngCategoryID = this.setDropDownComponentValue('categoryID');
        this.log.i('%c Imp!', 'background: #222; color: #bada55', this.topNProductsModel);

        ProjectUtils.setTopNProductsSearch(this.sessionObject, this.topNProductsModel);
    }

    // override, used by Country Drop down to populate values
    getddTrigger() {
        return this.ddTrigger;
    }

    doInitialSetup() {
        this.ddOptionsReg = new DataDropDownOptions();
        this.ddOptionsReg.serviceURL = Constants.TK_REGION_SEARCH_URL;
        this.ddOptionsReg.keyName = 'region';
        this.ddOptionsReg.keyDesc = 'description';
        this.ddOptionsReg.firstOptionText = 'Select a Region';
        this.ddOptionsReg.modelName = 'regionId';
        this.ddOptionsReg.baseComponent = this;

        this.ddOptionsCountry = new DataDropDownOptions();
        this.ddOptionsCountry.serviceURL = Constants.TK_COUNTRY_SEARCH_URL;
        this.ddOptionsCountry.keyName = 'country';
        this.ddOptionsCountry.keyDesc = 'description';
        this.ddOptionsCountry.firstOptionText = 'Select a Country';
        this.ddOptionsCountry.modelName = 'country';
        this.ddOptionsCountry.baseComponent = this;

        this.ddOptionsTopN = new DataDropDownOptions();
        this.ddOptionsTopN.keyName = 'id';
        this.ddOptionsTopN.keyDesc = 'value';
        this.ddOptionsTopN.firstOptionText = 'Select a Top N Products';
        this.ddOptionsTopN.modelName = 'nNumbers';
        this.ddOptionsTopN.baseComponent = this;

        this.ddOptionsProd = new DataDropDownOptions();
        this.ddOptionsProd.serviceURL = Constants.TK_SALES_TOP_N_PRODUCTS_PRODUCT_TYPE_URL;
        this.ddOptionsProd.keyName = 'typeID';
        this.ddOptionsProd.keyDesc = 'description';
        this.ddOptionsProd.firstOptionText = 'Select a Product Type';
        this.ddOptionsProd.modelName = 'productTypeID';
        this.ddOptionsProd.baseComponent = this;

        this.ddOptionsCat = new DataDropDownOptions();
        this.ddOptionsCat.serviceURL = Constants.TK_SALES_TOP_N_PRODUCTS_PRODUCT_CATEGORY_URL;
        this.ddOptionsCat.keyName = 'typeID';
        this.ddOptionsCat.keyDesc = 'description';
        this.ddOptionsCat.firstOptionText = 'Select a Product Category';
        this.ddOptionsCat.modelName = 'categoryID';
        this.ddOptionsCat.baseComponent = this;

        this.displaySearchOptions.noCrossList = [];
        this.displaySearchOptions.noCrossList.push('nNumbers');
    }

    doInInitLoad() {
        this.gettopNProductsData();
        if (!ProjectUtils.isEmpty(this.topNProductsModel.regionId)) {
            this.getCountryDropDownData(this.topNProductsModel.regionId[0], false);
        }
    }
    getDatePicker(): CzDatePickerComponent {
        return this.czDatePicker;
    }

    gettopNProductsData() {
        this.nNumbersData = this.globalService.gettopNProducts();
        this.ddTriggerTopN.next(this.nNumbersData);

    }

    getBodyData(): string {
        let body = '';
        body += this.topNProductsService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());
        body += this.topNProductsService.getDateSearchParam(this.topNProductsModel, body);
        body += this.topNProductsService.getDropDownSearchParam(body, 'nNumbers', this.topNProductsModel);
        body += this.topNProductsService.getDropDownSearchParam(body, 'country', this.topNProductsModel);
        body += this.topNProductsService.getDropDownSearchParam(body, 'regionId', this.topNProductsModel);
        body += this.topNProductsService.getDropDownSearchParam(body, 'productTypeID', this.topNProductsModel);
        body += this.topNProductsService.getDropDownSearchParam(body, 'categoryID', this.topNProductsModel);
        return body;
    }
    doOnReset() {
        this.topNProductsModel['nNumbers'] = null;
        this.topNProductsModel['country'] = null;
        this.topNProductsModel['regionId'] = null;
        this.topNProductsModel['productTypeID'] = null;
        this.topNProductsModel['categoryID'] = null;
        // this.ddCountry.value = [];
        this.ngNNumbers = [];
        this.ngCategoryID = [];
        this.ngProductTypeID = [];
        this.ngRegionId = [];
        this.ddRegion.optionsModel = [];
        this.ngCountry = [];
        this.getCountryDropDownData('', true);
        this.calenderSetDefaultValue(this.topNProductsModel);
    }

}
