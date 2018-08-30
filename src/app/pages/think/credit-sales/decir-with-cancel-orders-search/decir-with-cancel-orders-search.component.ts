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

import { DecirWithCancelOrdersSearchService } from './decir-with-cancel-orders-search.service';
import { DecirWithCancelOrdersSearchModel } from './decir-with-cancel-orders-search.model';
import { GlobalService } from '../../../shared/global.service';
import { ChangeService } from '../../../shared/change-service';
import { SaveSearchService } from '../../../shared/save-search-service';
import { CzDatePickerComponent } from '../../../../components/cz-date-picker/cz-date-picker.component';
@Component({
    selector: 'app-decir-with-cancel-orders-search',
    templateUrl: './decir-with-cancel-orders-search.component.html',
    styleUrls: ['./decir-with-cancel-orders-search.component.css'],
    providers: [DecirWithCancelOrdersSearchService]
})
export class DecirWithCancelOrdersSearchComponent extends BaseComponent {
    ngproduct_id: any;
    ngvolume_year: any;
    ngorder_type: any;
    ngprice_category_id: any;
    ngsales_representative: any;


    private serviceName = 'DECIR_CANCEL_ORDERS';
    log = Log.create('DecirWithCancelOrdersSearchComponent');

    decirWithCancelOrdersSearchModel: DecirWithCancelOrdersSearchModel;

    @ViewChild(DataTableDirective) dtElement: DataTableDirective;
    @ViewChild('decirwithCancelOrdersList') DecirWithCancelOrdersTemplate;
    @ViewChild(TabsComponent) tabsComponent;
    @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;
    ddOptionsPName: DataDropDownOptions;
    ddOptionsPCategory: DataDropDownOptions;
    ddOptionsSRep: DataDropDownOptions;
    ddOptionsVolYear: DataDropDownOptions;
    ddOptionsOrderType: DataDropDownOptions;
    ddTriggerOrderType: Subject<any> = new Subject();
    @ViewChild(CzDatePickerComponent) czDatePicker: CzDatePickerComponent;
    @ViewChild('product', { read: DataDropDownComponent }) ddProductName: DataDropDownComponent;
    @ViewChild('price_category_id', { read: DataDropDownComponent }) ddPriceCategory: DataDropDownComponent;
    @ViewChild('sale_reps_id', { read: DataDropDownComponent }) ddSalesRep: DataDropDownComponent;
    @ViewChild('volumeYear', { read: DataDropDownComponent }) ddVolYear: DataDropDownComponent;
    @ViewChild('order_type', { read: DataDropDownComponent }) ddOrderType: DataDropDownComponent;
    isSalesRepDisable = false;


    constructor(private router: Router,
        protected loaderService: LoaderService,
        private _logger: Logger,
        protected globalService: GlobalService,
        protected changeService: ChangeService,
        protected saveSearchService: SaveSearchService,
        private decirWithCancelOrdersSearchService: DecirWithCancelOrdersSearchService) {
        super(loaderService, changeService, saveSearchService, decirWithCancelOrdersSearchService, globalService);
        this.isSalesRepDisable = this.sessionObject.clientSettings.SALES_DECIR.salesRep.disabled;
        this.log.color = 'lightblue';
        this.doInitialSetup();
    }
    doInInitLoad() {
        this.globalService.getOrderTypeData(this.sessionObject.clientID, this.ddTriggerOrderType);
        this.hideLoader();
    }


    doInitialSetup() {

        this.ddOptionsPName = new DataDropDownOptions();
        this.ddOptionsPName.serviceURL = Constants.TK_PRODUCT_NAME_URL;
        this.ddOptionsPName.keyName = 'oc_id';
        this.ddOptionsPName.keyDesc = 'description';
        this.ddOptionsPName.modelName = 'product_id';
        this.ddOptionsPName.firstOptionText = 'Select Product Name';
        this.ddOptionsPName.baseComponent = this;
        this.ddOptionsPName.selectMulti = true;
        this.ddOptionsPName.sizeCount = 5;

        this.ddOptionsPCategory = new DataDropDownOptions();
        this.ddOptionsPCategory.serviceURL = Constants.TK_PRICE_CATEGORY_URL;
        this.ddOptionsPCategory.keyName = 'subscription_category_id';
        this.ddOptionsPCategory.keyDesc = 'description';
        this.ddOptionsPCategory.modelName = 'price_category_id';
        this.ddOptionsPCategory.firstOptionText = 'Select Price Category';
        this.ddOptionsPCategory.baseComponent = this;
        this.ddOptionsPCategory.selectMulti = true;
        this.ddOptionsPCategory.sizeCount = 5;

        this.ddOptionsSRep = new DataDropDownOptions();
        this.ddOptionsSRep.serviceURL = Constants.TK_ER_SALES_REP_URL;
        this.ddOptionsSRep.keyName = 'sales_representative_id';
        this.ddOptionsSRep.keyDesc = 'sales_representative';
        this.ddOptionsSRep.modelName = 'sale_reps_id';
        this.ddOptionsSRep.firstOptionText = 'Select Sales Representative';
        this.ddOptionsSRep.baseComponent = this;
        this.ddOptionsSRep.selectMulti = true;
        this.ddOptionsSRep.sizeCount = 5;

        this.ddOptionsVolYear = new DataDropDownOptions();
        this.ddOptionsVolYear.serviceURL = Constants.TK_SALE_VOLUME_YEAR_URL;
        this.ddOptionsVolYear.keyName = 'volume';
        this.ddOptionsVolYear.keyDesc = 'volume';
        this.ddOptionsVolYear.firstOptionText = 'Select a Year';
        this.ddOptionsVolYear.modelName = 'volume_year';
        this.ddOptionsVolYear.baseComponent = this;


        this.ddOptionsOrderType = new DataDropDownOptions();
        this.ddOptionsOrderType.keyName = 'id';
        this.ddOptionsOrderType.keyDesc = 'value';
        this.ddOptionsOrderType.firstOptionText = 'Select a Order Type';
        this.ddOptionsOrderType.modelName = 'order_type';
        this.ddOptionsOrderType.baseComponent = this;
    }
    getDatePicker(): CzDatePickerComponent {
        return this.czDatePicker;
    }

    // override
    getLoaderName(): string {
        return 'decir-with-cancel-orders-search';
    }
    // override
    getReportIcon(): string {
        return 'fa-credit-card';
    }

    // override
    getSearchModel(): any {

        if (ProjectUtils.isEmpty(this.decirWithCancelOrdersSearchModel)) {
            this.decirWithCancelOrdersSearchModel = <DecirWithCancelOrdersSearchModel>ProjectUtils.getDecirWithCancelOrdersSearch(this.sessionObject);
            if (ProjectUtils.isEmpty(this.decirWithCancelOrdersSearchModel)) {
                this.decirWithCancelOrdersSearchModel = new DecirWithCancelOrdersSearchModel();
                this.decirWithCancelOrdersSearchModel.limit = this.sessionObject.limit
            }
            this.ngproduct_id = this.decirWithCancelOrdersSearchModel.product_id
            this.ngvolume_year = this.decirWithCancelOrdersSearchModel.volume_year
            this.ngorder_type = this.decirWithCancelOrdersSearchModel.order_type
            this.ngprice_category_id = this.decirWithCancelOrdersSearchModel.price_category_id
            this.ngsales_representative = this.decirWithCancelOrdersSearchModel.sale_reps_id
        }
        this.log.i('getSearchModel', this.decirWithCancelOrdersSearchModel);
        return this.decirWithCancelOrdersSearchModel;
    }

    // override
    getSearchType(): string {
        return 'decirWithCancelOrdersSearch';
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
        this.tabsComponent.openTab('DECIR with Cancel Orders List',
            this.DecirWithCancelOrdersTemplate, {}, true, 'decirwithCancelOrdersList');
    }

    // override
    getDispSearch(): ThinkListDisplaySearchComponent {
        return this.dispSearch;
    }
    // override
    getReportTitle(): string {
        return 'DECIR with Cancel Orders Report';
    }

    // override
    getReportFileName(): string {
        return 'decirWithCancelordersReport';
    }

    // override
    setSearchModel(searchModel: any) {
        console.log('setSearchModel: searchModel', searchModel);
        if (!ProjectUtils.isEmpty(searchModel)) {
            if (typeof searchModel === 'string') {
                this.decirWithCancelOrdersSearchModel = JSON.parse(searchModel);
            } else {
                this.decirWithCancelOrdersSearchModel = searchModel;
            }
        }
        if (this.decirWithCancelOrdersSearchModel.limit === '') {
            this.decirWithCancelOrdersSearchModel.limit = 0;
        }



        this.ngproduct_id = this.setDropDownComponentValue('product_id');
        this.ngprice_category_id = this.setDropDownComponentValue('price_category_id');
        this.ngsales_representative = this.setDropDownComponentValue('sale_reps_id');
        this.ngvolume_year = this.setDropDownComponentValue('volume_year');
        this.ngorder_type = this.setDropDownComponentValue('order_type');

        ProjectUtils.setDecirWithCancelOrdersSearch(this.sessionObject, this.decirWithCancelOrdersSearchModel);
    }

    getDataElement(whichService: string): DataTableDirective {
        return this.dtElement;
    }

    // override
    getBodyData(): string {
        let body = '';
        body += this.decirWithCancelOrdersSearchService.getDateSearchParam(this.decirWithCancelOrdersSearchModel, body);

        body += this.decirWithCancelOrdersSearchService.getDropDownSearchParam(body, 'product_id', this.decirWithCancelOrdersSearchModel);

        body += this.decirWithCancelOrdersSearchService.getDropDownSearchParam(body, 'price_category_id', this.decirWithCancelOrdersSearchModel);

        body += this.decirWithCancelOrdersSearchService.getDropDownSearchParam(body, 'sale_reps_id', this.decirWithCancelOrdersSearchModel);

        body += this.decirWithCancelOrdersSearchService.getDropDownSearchParam(body, 'volume_year', this.decirWithCancelOrdersSearchModel);

        body += this.decirWithCancelOrdersSearchService.getDropDownSearchParam(body, 'order_type', this.decirWithCancelOrdersSearchModel);

        body += this.getBodyLimit(body, this.decirWithCancelOrdersSearchModel.limit);

        return body;
    }

    doOnReset() {
        this.decirWithCancelOrdersSearchModel['product_id'] = null;
        this.ngproduct_id = [];
        this.decirWithCancelOrdersSearchModel['price_category_id'] = null;
        this.ngprice_category_id = [];
        this.decirWithCancelOrdersSearchModel['sale_reps_id'] = null;
        this.ngsales_representative = [];
        this.decirWithCancelOrdersSearchModel['volume_year'] = null;
        this.ngvolume_year = [];
        this.decirWithCancelOrdersSearchModel['order_type'] = null;
        this.ngorder_type = [];
        this.czDatePicker.calendarCanceled(this);
        this.decirWithCancelOrdersSearchModel.limit = this.sessionObject.limit;
    }

}
