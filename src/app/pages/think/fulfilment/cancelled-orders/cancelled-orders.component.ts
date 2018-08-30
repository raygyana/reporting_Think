import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
// Import from III party
import { DataTableDirective } from 'angular-datatables';
import { TabsetComponent } from '../../../../components/ngtabs';
import { TabsComponent } from '../../../../components/ng-tabs/tabs.component';
import { GlobalService } from '../../../shared/global.service';
import { Logger } from '../../../../core/logger/logger';
import { LoaderService } from '../../../../core/loader/loader.service';
import { BaseComponent } from '../../../../core/base/base.component';
import { ProjectUtils } from '../../../shared/project-utils';
import { Constants } from '../../../shared/constant';
import { DataDropDownOptions } from '../../../../components/data-drop-down/data-drop-down.model';
import { DataDropDownComponent } from '../../../../components/data-drop-down/data-drop-down.component';
import { CancelledOrdersService } from './cancelled-orders.service';
import { CancelledOrdersModel } from './cancelled-orders.model';

import { ChangeService } from '../../../shared/change-service';
import { SaveSearchService } from '../../../shared/save-search-service';
import { Log, Level } from 'ng2-logger';
import { Logger as Loggerr } from '../../../../core/logger/logger';

import { ThinkListDisplaySearchComponent } from '../../../../components/think-list-display-search/think-list-display-search.component';
import { SalesSummaryListService } from '../../sales/sales-summary-search/sales-summary-search.service';
import { CzDatePickerComponent } from '../../../../components/cz-date-picker/cz-date-picker.component';

@Component({
    selector: 'app-cancelled-orders',
    templateUrl: './cancelled-orders.component.html',
    styleUrls: ['./cancelled-orders.component.css'],
    providers: [CancelledOrdersService]
})
export class CancelledOrdersComponent extends BaseComponent {
    public CANCELLED_ORDERS_LIST = 'cancelledOrderslist';
    log = Log.create('CancelledOrdersComponent');
    ngProduct: any;

    tableColumns: any;
    myDdOption: any;
    cancelledOrderSearchModel: CancelledOrdersModel;
    ddOptionsproductName: DataDropDownOptions;

    @ViewChild('cancelledOrdersListData', { read: DataTableDirective }) dtElement: DataTableDirective;
    @ViewChild('cancelledOrdersList') cancelledOrdersListTemplate;
    @ViewChild(TabsComponent) tabsComponent;
    @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;
    @ViewChild('productName', { read: DataDropDownComponent }) ddProductName: DataDropDownComponent;
    @ViewChild(CzDatePickerComponent) czDatePicker: CzDatePickerComponent;

    constructor(private router: Router,
        protected loaderService: LoaderService,
        private _logger: Logger,
        protected globalService: GlobalService,
        protected changeService: ChangeService,
        protected saveSearchService: SaveSearchService,
        private cancelledOrdersService: CancelledOrdersService) {

        super(loaderService, changeService, saveSearchService, cancelledOrdersService, globalService);
        this.doOnIntialSetup();
        this.log.color = 'lightblue';

        this.tableColumns = this.cancelledOrdersService.addColumnsOption();

        const dtTaks = (dt) => {
            dt['aaSorting'] = [];
            dt['aoColumnDefs'] = [
                { 'bSortable': false, 'aTargets': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] }
            ];
        }

        this.myDdOption = ProjectUtils.doOptionSettings('Cancelled Orders', 'Cancelled Orders', dtTaks);

        this.myDdOption = Object.assign({}, this.myDdOption);
        // this.myDdOption // for disable starting sort
        // this.myDdOption['aoColumnDefs'] = [
        //     { 'bSortable': false, 'aTargets': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] }
        // ]
    }

    getLoaderName(): string {
        return 'cancelled-orders';
    }

    getSearchModel(): any {
        if (ProjectUtils.isEmpty(this.cancelledOrderSearchModel)) {
            this.cancelledOrderSearchModel = this.sessionObject.cancelledOrderfullfilmentSearch;
            if (ProjectUtils.isEmpty(this.cancelledOrderSearchModel)) {
                this.cancelledOrderSearchModel = new CancelledOrdersModel();
                this.cancelledOrderSearchModel.limit = this.sessionObject.limit;
            }
            this.ngProduct = this.cancelledOrderSearchModel.productName;
        }
        this.log.i('this.cancelledOrderSearchModel', this.cancelledOrderSearchModel);
        return this.cancelledOrderSearchModel;
    }

    getDatePicker(): CzDatePickerComponent {
        return this.czDatePicker;
    }
    getSearchType(): string {
        return 'cancelledOrders';
    }
    // override
    getReportTitle(): string {
        return 'Cancelled Orders Report';
    }
    getReportIcon(): string {
        return 'fa fa-edit';
    }
    // override
    getReportFileName(): string {
        return 'cancelledOrdersReport';
    }
    getServiceName(): string {
        return this.CANCELLED_ORDERS_LIST;
    }
    // override
    getTabsComponent(): any {
        return this.tabsComponent;
    }
    // override
    openListTab() {
        this.tabsComponent.openTab('Cancelled Orders List ',
            this.cancelledOrdersListTemplate, {}, true, 'cancelledOrdersList');
    }
    // override
    getDispSearch(): ThinkListDisplaySearchComponent {
        return this.dispSearch;
    }

    setListData() {
    }

    // override
    setSearchModel(searchModel: any) {
        if (!ProjectUtils.isEmpty(searchModel)) {
            if (typeof searchModel === 'string') {
                this.cancelledOrderSearchModel = JSON.parse(searchModel);
            } else {
                this.cancelledOrderSearchModel = searchModel;
            }
        }

        if (this.cancelledOrderSearchModel.limit === '') {
            this.cancelledOrderSearchModel.limit = 0;
        }
        this.log.i('setSearchModel', this.cancelledOrderSearchModel);
        this.ngProduct = this.setDropDownComponentValue('productName');

        ProjectUtils.setCancelledOrderfullfilmentSearch(this.sessionObject, this.cancelledOrderSearchModel);
    }



    doOnIntialSetup() {
        this.ddOptionsproductName = new DataDropDownOptions();
        this.ddOptionsproductName.serviceURL = Constants.TK_SALE_JOURNAL_LIST_URL;
        this.ddOptionsproductName.keyName = 'ocID';
        this.ddOptionsproductName.keyDesc = 'description';
        this.ddOptionsproductName.firstOptionText = 'Select a Journal Name';
        this.ddOptionsproductName.modelName = 'productName';
        this.ddOptionsproductName.baseComponent = this;
    }

    getDataElement(whichService: string): DataTableDirective {
        return this.dtElement;
    }

    getBodyData(): string {
        let body = '';
        body += this.cancelledOrdersService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());
        body += this.cancelledOrdersService.getDateSearchParam(this.cancelledOrderSearchModel, body);
        body += this.cancelledOrdersService.getDropDownSearchParam(body, 'productName', this.cancelledOrderSearchModel);
        body += this.getBodyLimit(body, this.cancelledOrderSearchModel.limit);

        return body;
    }

    doOnReset() {
        this.cancelledOrderSearchModel['productName'] = null;
        this.czDatePicker.calendarCanceled(this);
        this.ngProduct = [];
        this.cancelledOrderSearchModel.limit = this.sessionObject.limit;
    }

    doOnProcessComplete() {
        setTimeout(() => {
            this.hideLoader();
        }, 100);

    }

    baseProcessData() {
        if (this.sessionObject.clientSettings.CANCELLED_ORDERS.
            diffrentUrl) {
            return this.baseProcessDataForUCP();
        }
    }


    baseProcessDataForUCP() {
        const data = [];
        // data[0] = {Currency:  USD}
        const emptyObj = ProjectUtils.emptyMyObjectWithZerosNString(this.listData[0]['model'][0], []);

        const emptyObjZero = ProjectUtils.emptyMyObjectWithZerosNString(this.listData[0]['model'][0], [this.tableColumns[1].data, this.tableColumns[3].data]);

        const Currency = ProjectUtils.assignNewCopy(emptyObj);
        Currency[this.tableColumns[0].data] = 'Currency:  USD';
        data[0] = Currency;

        let orderClass;
        let QuantityNPublication;
        //    'orderClass'
        this.listData.forEach((item) => {
            orderClass = ProjectUtils.assignNewCopy(emptyObj);
            orderClass['customerID'] = 'Order Class: ' + item['orderClass'];
            data.push(orderClass);
            item['model'].forEach((val) => {
                data.push(val);
            });
            QuantityNPublication = ProjectUtils.assignNewCopy(emptyObj);
            QuantityNPublication[this.tableColumns[0].data] = 'Total Quantity by Publication';
            QuantityNPublication[this.tableColumns[1].data] = item['count'];

            QuantityNPublication[this.tableColumns[2].data] = 'Total by Publication';
            QuantityNPublication[this.tableColumns[3].data] = item['amount'];

            emptyObjZero[this.tableColumns[1].data] += ProjectUtils.parseFloatIfNumber(item['count']);
            emptyObjZero[this.tableColumns[3].data] += ProjectUtils.parseFloatIfNumber(item['amount']);

            data.push(QuantityNPublication);
        });

        emptyObjZero[this.tableColumns[0].data] = 'Total Quantity by Currency:';
        emptyObjZero[this.tableColumns[2].data] = 'Total by Currency';
        data.push(emptyObjZero);
        return data;
    }

}
