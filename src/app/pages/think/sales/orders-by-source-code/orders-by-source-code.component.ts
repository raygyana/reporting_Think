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
import { OrdersBySourceCodeService } from './orders-by-source-code.service';
import { CzDatePickerComponent } from '../../../../components/cz-date-picker/cz-date-picker.component';
@Component({
    selector: 'app-orders-by-source-code',
    templateUrl: './orders-by-source-code.component.html',
    styleUrls: ['./orders-by-source-code.component.css'],
    providers: [OrdersBySourceCodeService]
})
export class OrdersBySourceCodeComponent extends BaseComponent {
    private ORDERS_BY_SOURCE_CODE_DETAILS = 'orderBySourceCodeDetails';

    isOrderTypDisable: false;

    ngNNumbers: any;
    orderTypeData: any;
    ngSourcecode: any;
    ngOrdertype: any;
    ordersBySourceCodeModel: any;
    productData: any; // same as Journal data
    sourceCodeData: any;
    ddOptionsSourceCode: DataDropDownOptions;
    ddOptionsOrderType: DataDropDownOptions;
    ddOptionsProduct: DataDropDownOptions;
    ddTriggerReport: Subject<any> = new Subject();
    @ViewChild(CzDatePickerComponent) czDatePicker: CzDatePickerComponent;
    @ViewChild('ordersBySourceCodeData', { read: DataTableDirective }) dtElement: DataTableDirective;
    @ViewChild('ordersBySourceCodeDetails') ordersBySourceCodeTemplate;
    @ViewChild(TabsComponent) tabsComponent;
    @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;
    @ViewChild('product', { read: DataDropDownComponent }) ddProduct: DataDropDownComponent;
    @ViewChild('Source', { read: DataDropDownComponent }) ddSource: DataDropDownComponent;

    constructor(protected globalService: GlobalService,
        private _logger: Logger,
        private router: Router,
        protected orderBySourceCodeService: OrdersBySourceCodeService,
        protected changeService: ChangeService,
        protected saveSearchService: SaveSearchService,
        protected loaderService: LoaderService) {
        super(loaderService, changeService, saveSearchService, orderBySourceCodeService, globalService);


        const sessionObject: SessionObject = SessionObject.getSessionObject();
        if (sessionObject.clientID === 'ucp') {
            this.isOrderTypDisable = this.sessionObject.clientSettings.ORDER_TYPE_UCP.orderType.disabled;

            this.orderBySourceCodeService.addColumnsOption2(this.dtOptions);
        } else {
            this.orderBySourceCodeService.addColumnsOption(this.dtOptions);
        }
        this.doInitialSetup();

    }

    doPreInitLoad() {
        this.getOrderTypeSalesData();
    }

    // override
    getLoaderName(): string {
        return 'app-order-by-source-code';
    }

    // override
    getSearchModel(): any {
        if (ProjectUtils.isEmpty(this.ordersBySourceCodeModel)) {
            this.ordersBySourceCodeModel = this.sessionObject.ordersBySourceCodeSearch;
            if (ProjectUtils.isEmpty(this.ordersBySourceCodeModel)) {
                this.ordersBySourceCodeModel = {};
                this.ordersBySourceCodeModel.limit = this.sessionObject.limit;
                this.calenderSetDefaultValue(this.ordersBySourceCodeModel);
            }
            this.ngNNumbers = this.ordersBySourceCodeModel.journalId;
            this.ngSourcecode = this.ordersBySourceCodeModel.sourceCode;
            this.ngOrdertype = this.ordersBySourceCodeModel.orderType;
        }
        console.log(this.ordersBySourceCodeModel);
        return this.ordersBySourceCodeModel;
    }

    // override
    getSearchType(): string {
        return 'ordersBySourceCode';
    }

    getDataElement(whichService: string): DataTableDirective {
        return this.dtElement;
    }
    // override
    getReportIcon(): string {
        return 'fa-pie-chart';
    }

    // override
    getTabsComponent(): any {
        return this.tabsComponent;
    }

    // override
    getServiceName(): string {
        return this.ORDERS_BY_SOURCE_CODE_DETAILS;
    }

    // override
    openListTab() {
        this.tabsComponent.openTab('Orders By Source Code List',
            this.ordersBySourceCodeTemplate, {}, true, 'ordersBySourceCodeDetails');
    }

    // override
    getDispSearch(): ThinkListDisplaySearchComponent {
        return this.dispSearch;
    }

    // override
    getReportTitle(): string {
        return 'Orders By Source Code Report';
    }

    // override
    getReportFileName(): string {
        return 'ordersBySourceCodeReport';
    }

    // override
    setSearchModel(searchModel: any) {
        console.log('setSearchModel: searchModel', searchModel);
        if (!ProjectUtils.isEmpty(searchModel)) {
            if (typeof searchModel === 'string') {
                this.ordersBySourceCodeModel = JSON.parse(searchModel);
            } else {
                this.ordersBySourceCodeModel = searchModel;
            }
        }
        if (this.ordersBySourceCodeModel.limit === '') {
            this.ordersBySourceCodeModel.limit = 0;
        }
        console.log('setSearchModel', this.ordersBySourceCodeModel);

        this.ngSourcecode = this.setDropDownComponentValue('sourceCode');
        this.ngNNumbers = this.setDropDownComponentValue('journalId');
        this.ngOrdertype = this.setDropDownComponentValue('orderType');

        ProjectUtils.setOrdersBySourceCodeSearch(this.sessionObject, this.ordersBySourceCodeModel);
    }

    doInInitLoad() {
    }

    getDatePicker(): CzDatePickerComponent {
        return this.czDatePicker;
    }

    getBodyData(): string {
        let body = '';
        body += this.orderBySourceCodeService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());
        body += this.orderBySourceCodeService.getDateSearchParam(this.ordersBySourceCodeModel, body);
        body += this.orderBySourceCodeService.getDropDownSearchParam(body, 'journalId', this.ordersBySourceCodeModel);
        body += this.orderBySourceCodeService.getDropDownSearchParam(body, 'sourceCode', this.ordersBySourceCodeModel);
        body += this.orderBySourceCodeService.getDropDownSearchParam(body, 'orderType', this.ordersBySourceCodeModel);
        body += this.getBodyLimit(body, this.ordersBySourceCodeModel.limit);

        return body;
    }

    getOrderTypeSalesData() {
        this.orderTypeData = this.globalService.getOrderTypeSalesData();
        this.log.i('getOrderTypeSalesData', this.ddTriggerReport, this.orderTypeData);
        this.ddTriggerReport.next(this.orderTypeData);
    }


    doInitialSetup() {

        this.ddOptionsSourceCode = new DataDropDownOptions();
        this.ddOptionsSourceCode.serviceURL = Constants.TK_SALE_SOURCE_CODE_URL;
        this.ddOptionsSourceCode.keyName = 'sourceCodeId';
        this.ddOptionsSourceCode.keyDesc = 'sourceCode';
        this.ddOptionsSourceCode.modelName = 'sourceCode';
        this.ddOptionsSourceCode.firstOptionText = 'Select a Source Code';
        this.ddOptionsSourceCode.baseComponent = this;
        this.ddOptionsSourceCode.multipleState = true;
        this.ddOptionsSourceCode.selectMulti = true;

        this.ddOptionsProduct = new DataDropDownOptions();
        this.ddOptionsProduct.serviceURL = Constants.TK_SALE_JOURNAL_LIST_URL;
        this.ddOptionsProduct.keyName = 'ocID';
        this.ddOptionsProduct.keyDesc = 'description';
        this.ddOptionsProduct.modelName = 'journalId';
        this.ddOptionsProduct.firstOptionText = 'Select a Product';
        this.ddOptionsProduct.baseComponent = this;
        this.ddOptionsProduct.multipleState = true;
        this.ddOptionsProduct.selectMulti = true;


        this.ddOptionsOrderType = new DataDropDownOptions();
        this.ddOptionsOrderType.keyName = 'id';
        this.ddOptionsOrderType.keyDesc = 'value';
        this.ddOptionsOrderType.firstOptionText = 'Select Order Type';
        this.ddOptionsOrderType.modelName = 'orderType';
        this.ddOptionsOrderType.baseComponent = this;

        this.displaySearchOptions.noCrossList = [];
        this.displaySearchOptions.noCrossList.push('sourceCode');
    }

    doOnReset() {
        this.ordersBySourceCodeModel['sourceCode'] = null;
        this.ordersBySourceCodeModel['journalId'] = null;
        this.ngNNumbers = [];
        this.ngSourcecode = [];
        this.ngOrdertype = [];
        this.calenderSetDefaultValue(this.ordersBySourceCodeModel);
        this.ordersBySourceCodeModel.limit = this.sessionObject.limit;
    }
}
