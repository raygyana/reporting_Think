import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { ParamMap } from '@angular/router';
import { DatePipe } from '@angular/common';
// Import from III party
import { DataTableDirective } from 'angular-datatables';
import { TabsetComponent } from '../../../../components/ngtabs';
import { TabsComponent } from '../../../../components/ng-tabs/tabs.component';

import { Logger } from '../../../../core/logger/logger';
import { LoaderService } from '../../../../core/loader/loader.service';
import { BaseComponent } from '../../../../core/base/base.component';
import { ProjectUtils } from '../../../shared/project-utils';
import { Constants } from '../../../shared/constant';
import { DataDropDownOptions } from '../../../../components/data-drop-down/data-drop-down.model';
import { DataDropDownComponent } from '../../../../components/data-drop-down/data-drop-down.component';
import { SessionObject } from '../../../shared/session-object';
import { GlobalService } from '../../../shared/global.service';
import { SearchModelType } from '../../../shared/search-model-type';
import { ChangeService } from '../../../shared/change-service';
import { Log, Level } from 'ng2-logger';
import { Logger as Loggerr } from '../../../../core/logger/logger';
import { SaveSearchService } from '../../../shared/save-search-service';
import { ThinkListDisplaySearchComponent } from '../../../../components/think-list-display-search/think-list-display-search.component';

import { FutureEarningModel } from './future-earning.model';
import { FutureEarningService } from './future-earning.service';



@Component({
    selector: 'app-future-earning',
    templateUrl: './future-earning.component.html',
    styleUrls: ['./future-earning.component.css'],
    providers: [FutureEarningService]
})
export class FutureEarningComponent extends BaseComponent {

    private FUTURE_EARNING = 'FUTURE_EARNING';
    log = Log.create('FutureEarningComponent');

    futureEaringModel: FutureEarningModel;
    currentDate: any;
    ddOptionsproductName: DataDropDownOptions;
    ddOptionsPCenter: DataDropDownOptions;
    ddOptionsYear: DataDropDownOptions;
    ddOptionsMonth: DataDropDownOptions;
    ddTriggerMonth: Subject<any> = new Subject();
    ddTriggerProductName: Subject<any> = new Subject();
    monthData: any;
    ngCenter: any;
    ngProduct: any;
    ngYear: any;
    ngMonth: any;
    productName: any;
    data: any;
    productArray = new Array();

    @ViewChild('futureEarningData', { read: DataTableDirective }) dtElement: DataTableDirective;
    @ViewChild(TabsComponent) tabsComponent;
    @ViewChild('futureEarningList') futureEarningListTemplate;
    @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;
    @ViewChild('productName', { read: DataDropDownComponent }) ddProductName: DataDropDownComponent;
    @ViewChild('profitCentre', { read: DataDropDownComponent }) ddProfitCentre: DataDropDownComponent;
    @ViewChild('Month', { read: DataDropDownComponent }) ddMonth: DataDropDownComponent;
    @ViewChild('Year', { read: DataDropDownComponent }) ddYear: DataDropDownComponent;
    constructor(
        private fututeearningService: FutureEarningService,
        private _logger: Logger,
        private router: Router,
        protected globalService: GlobalService,
        protected changeService: ChangeService,
        protected saveSearchService: SaveSearchService,
        protected loaderService: LoaderService) {

        super(loaderService, changeService, saveSearchService, fututeearningService, globalService);
        this.currentDate = Date.now();
        this.doOnIntialSetup();
        this.log.color = 'lightblue';
        console.log('ProductName', this.ngProduct);
    }
    doInInitLoad() {
        this.getproductname();
        this.getMonthData();
        this.displaySearchOptions.noCrossList = []; this.displaySearchOptions.noCrossList.push('product_id');
        this.displaySearchOptions.noCrossList.push('year');
        this.displaySearchOptions.noCrossList.push('profitCentre');
        this.displaySearchOptions.noCrossList.push('month');
    }

    // override
    getLoaderName(): string {
        return 'future-earning-component';
    }
    // override
    getReportTitle(): string {
        return 'Future Earning Report';
    }
    getReportIcon(): string {
        return 'fa fa-calculator';
    }
    // override
    getReportFileName(): string {
        return 'futureEarningReport';
    }
    getServiceName(): string {
        return this.FUTURE_EARNING;
    }

    // override
    getSearchModel(): any {
        if (ProjectUtils.isEmpty(this.futureEaringModel)) {
            this.futureEaringModel = this.sessionObject.futureEarningSearch;
            if (ProjectUtils.isEmpty(this.futureEaringModel)) {
                this.futureEaringModel = new FutureEarningModel();
                this.futureEaringModel.limit = this.sessionObject.limit;
            }
            this.ngCenter = this.futureEaringModel.profitCentre;
            this.ngProduct = this.futureEaringModel.product_id;
            this.ngYear = this.futureEaringModel.year;
            this.ngMonth = this.futureEaringModel.month;
        }
        this.log.i('this.futureEaringModel', this.futureEaringModel);
        return this.futureEaringModel;
    }

    // override
    getSearchType(): string {
        return 'futureEarning';
    }

    // override
    getTabsComponent(): any {
        return this.tabsComponent;
    }

    // override
    openListTab() {
        this.tabsComponent.openTab('Future Earning List',
            this.futureEarningListTemplate, {}, true, 'futureEarningList');
    }
    // override
    getDispSearch(): ThinkListDisplaySearchComponent {
        return this.dispSearch;
    }

    // override
    setSearchModel(searchModel: any) {
        if (!ProjectUtils.isEmpty(searchModel)) {
            if (typeof searchModel === 'string') {
                this.futureEaringModel = JSON.parse(searchModel);
            } else {
                this.futureEaringModel = searchModel;
            }
        }
        if (this.futureEaringModel.limit === '') {
            this.futureEaringModel.limit = 0;
        }
        this.ngMonth = this.setDropDownComponentValue('month');
        this.ngYear = this.setDropDownComponentValue('year');
        this.ngCenter = this.setDropDownComponentValue('profitCentre');
        this.ngProduct = this.setDropDownComponentValue('product_id');
        this.log.i('setSearchModel', this.futureEaringModel);
        ProjectUtils.setFutureEarningSearch(this.sessionObject, this.futureEaringModel);
    }

    // override
    getDataElement(whichService: string): DataTableDirective {
        // if (whichService === this.FUTURE_EARNING) {
        return this.dtElement;
        // }
    }


    doOnIntialSetup() {

        this.ddOptionsproductName = new DataDropDownOptions();
        // this.ddOptionsproductName.serviceURL = Constants.TK_ACC_PRODUCT_LIST_URL;
        this.ddOptionsproductName.keyName = 'oc_id';
        this.ddOptionsproductName.keyDesc = 'description';
        this.ddOptionsproductName.firstOptionText = 'Select a Product Name';
        this.ddOptionsproductName.modelName = 'product_id';
        this.ddOptionsproductName.baseComponent = this;
        // this.ddOptionsproductName.selectMulti = true;

        this.ddOptionsPCenter = new DataDropDownOptions();
        this.ddOptionsPCenter.serviceURL = Constants.TK_PROFITCENTER_URL;
        this.ddOptionsPCenter.keyName = 'profit_center';
        this.ddOptionsPCenter.keyDesc = 'description';
        this.ddOptionsPCenter.firstOptionText = 'Select a Profit Center';
        this.ddOptionsPCenter.modelName = 'profitCentre';
        this.ddOptionsPCenter.baseComponent = this;

        this.ddOptionsYear = new DataDropDownOptions();
        this.ddOptionsYear.serviceURL = Constants.TK_SALE_VOLUME_YEAR_URL;
        this.ddOptionsYear.keyName = 'volume';
        this.ddOptionsYear.keyDesc = 'volume';
        this.ddOptionsYear.firstOptionText = 'Select a Year';
        this.ddOptionsYear.modelName = 'year';
        this.ddOptionsYear.baseComponent = this;

        this.ddOptionsMonth = new DataDropDownOptions();
        /*this.ddOptionsCompareMonth.serviceURL = Constants.TK_COUNTRY_SEARCH_URL;*/
        this.ddOptionsMonth.keyName = 'id';
        this.ddOptionsMonth.keyDesc = 'value';
        this.ddOptionsMonth.firstOptionText = 'Select a Month';
        this.ddOptionsMonth.modelName = 'month';
        this.ddOptionsMonth.baseComponent = this;
    }
    getMonthData() {
        this.monthData = this.globalService.getMonthData();
        this.ddTriggerMonth.next(this.monthData);
    }

    getProductNameData() {
        this.fututeearningService.getProductData()
            .subscribe(data => {
                this.data = data;
                // console.log('data isssssssss', this.productArray);
                this.productArray = this.data;
                this.productArray = [{
                    'oc_id': '0',
                    'description': 'All'
                }].concat(this.productArray)
                console.log('productArray', this.productArray);
                this.ddTriggerProductName.next(this.productArray);
            });
    }
    getproductname() {
        this.productName = this.getProductNameData();

    }
    getBodyData(): string {
        let body = '';

        body += this.fututeearningService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());
        body += this.fututeearningService.getDropDownSearchParam(body, 'profitCentre', this.futureEaringModel);
        body += this.fututeearningService.getDropDownSearchParam(body, 'month', this.futureEaringModel);
        body += this.fututeearningService.getDropDownSearchParam(body, 'year', this.futureEaringModel);
        body += this.fututeearningService.getDropDownSearchParam(body, 'product_id', this.futureEaringModel);
        body += this.getBodyLimit(body, this.futureEaringModel.limit);

        return body;
    }

    doOnReset() {
        this.futureEaringModel['product_id'] = null;
        this.futureEaringModel['profitCentre'] = null;
        this.futureEaringModel['year'] = null;
        this.futureEaringModel['month'] = null;
        this.ngCenter = [];
        this.ngMonth = [];
        this.ngYear = [];
        this.ngProduct = [];
        this.futureEaringModel.limit = this.sessionObject.limit;
    }
}
