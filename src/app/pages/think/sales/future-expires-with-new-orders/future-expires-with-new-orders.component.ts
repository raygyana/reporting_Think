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
import { FutureExpiresNewOrderService } from './future-expires-with-new-orders.service';
import { CzDatePickerComponent } from '../../../../components/cz-date-picker/cz-date-picker.component';
@Component({
    selector: 'app-future-expires-with-new-orders',
    templateUrl: './future-expires-with-new-orders.component.html',
    styleUrls: ['./future-expires-with-new-orders.component.css'],
    providers: [FutureExpiresNewOrderService]
})
export class FutureExpiresWithNewOrdersComponent extends BaseComponent {
    private FUTURE_EXPIRE_NEW_ORDER_SEARCH = 'futureExpireNewOrderSearch';
    log = Log.create('FutureExpiresWithNewOrdersComponent');

    futureExpireNewOrderModel: any;
    productData: any; // same as Journal data
    ngNNumbers: any;

    @ViewChild('futureExpireNewOrderData', { read: DataTableDirective }) dtElement: DataTableDirective;
    @ViewChild('futureExpireNewOrderList') futureExpireNewOrderListTemplate;
    @ViewChild(TabsComponent) tabsComponent;
    @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;
    @ViewChild(CzDatePickerComponent) czDatePicker: CzDatePickerComponent;
    ddOptionsproductName: DataDropDownOptions;
    @ViewChild('productName', { read: DataDropDownComponent }) ddProductName: DataDropDownComponent;

    constructor(private futureExpiresNewOrderService: FutureExpiresNewOrderService,
        protected globalService: GlobalService,
        private _logger: Logger,
        private router: Router,
        protected changeService: ChangeService,
        protected saveSearchService: SaveSearchService,
        protected loaderService: LoaderService) {
        super(loaderService, changeService, saveSearchService, futureExpiresNewOrderService, globalService);
        this.log.color = 'lightblue';
        this.doInitialSetup();
    }

    // override
    getLoaderName(): string {
        return 'app-future-expires-with-new-orders';
    }

    // override
    getSearchModel(): any {
        if (ProjectUtils.isEmpty(this.futureExpireNewOrderModel)) {
            this.futureExpireNewOrderModel = this.sessionObject.futureExpiresWithNewOrderSearch;
            if (ProjectUtils.isEmpty(this.futureExpireNewOrderModel)) {
                this.futureExpireNewOrderModel = {};
                this.futureExpireNewOrderModel.limit = this.sessionObject.limit;
                this.calenderSetDefaultValue(this.futureExpireNewOrderModel);
            }
            this.ngNNumbers = this.futureExpireNewOrderModel.journalId;
        }
        this.log.i('getSearchModel', this.futureExpireNewOrderModel);
        return this.futureExpireNewOrderModel;
    }

    // override
    getSearchType(): string {
        return 'futureExpireNewOrder';
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
        return this.FUTURE_EXPIRE_NEW_ORDER_SEARCH;
    }

    // override
    openListTab() {
        this.tabsComponent.openTab('Future Expires With New Order List',
            this.futureExpireNewOrderListTemplate, {}, true, 'futureExpireNewOrderList');
    }

    // override
    getDispSearch(): ThinkListDisplaySearchComponent {
        return this.dispSearch;
    }

    // override
    getReportTitle(): string {
        return 'Future Expires With New Orders Report';
    }

    // override
    getReportFileName(): string {
        return 'futureExpiresWithNewOrdersReport';
    }

    doInitialSetup() {
        this.ddOptionsproductName = new DataDropDownOptions();
        this.ddOptionsproductName.serviceURL = Constants.TK_SALE_JOURNAL_LIST_URL;
        this.ddOptionsproductName.keyName = 'ocID';
        this.ddOptionsproductName.keyDesc = 'description';
        this.ddOptionsproductName.modelName = 'journalId';
        this.ddOptionsproductName.baseComponent = this;
        this.ddOptionsproductName.firstOptionText = 'Select a Product';
        this.ddOptionsproductName.multipleState = true;
        this.ddOptionsproductName.selectMulti = true;
    }

    // override
    setSearchModel(searchModel: any) {
        if (!ProjectUtils.isEmpty(searchModel)) {
            if (typeof searchModel === 'string') {
                this.futureExpireNewOrderModel = JSON.parse(searchModel);
            } else {
                this.futureExpireNewOrderModel = searchModel;
            }
        }
        if (this.futureExpireNewOrderModel.limit === '') {
            this.futureExpireNewOrderModel.limit = 0;
        }
        this.log.i('setSearchModel', this.futureExpireNewOrderModel);
        this.ngNNumbers = this.setDropDownComponentValue('journalId');

        ProjectUtils.setFutureExpiresWithNewOrderSearch(this.sessionObject, this.futureExpireNewOrderModel);
    }

    doInInitLoad() {
    }

    getDatePicker(): CzDatePickerComponent {
        return this.czDatePicker;
    }

    getBodyData(): string {
        let body = '';
        body += this.futureExpiresNewOrderService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());
        body += this.futureExpiresNewOrderService.getDateSearchParam(this.futureExpireNewOrderModel, body);
        body += this.futureExpiresNewOrderService.getDropDownSearchParam(body, 'journalId', this.futureExpireNewOrderModel);
        body += this.getBodyLimit(body, this.futureExpireNewOrderModel.limit);
        return body;
    }

    doOnReset() {
        this.ddProductName.optionsModel = [];
        this.ngNNumbers = [];
        this.futureExpireNewOrderModel['journalId'] = null;
        this.calenderSetDefaultValue(this.futureExpireNewOrderModel);
        this.futureExpireNewOrderModel.limit = this.sessionObject.limit;
    }
}
