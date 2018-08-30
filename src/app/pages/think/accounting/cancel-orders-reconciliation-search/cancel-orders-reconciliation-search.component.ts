import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
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
import { Log, Level } from 'ng2-logger';
import { Logger as Loggerr } from '../../../../core/logger/logger';

import { CancelOrdersReconciliationSearchService } from './cancel-orders-reconciliation-search.service';
import { CancelOrdersReconciliationSearchModel } from './cancel-orders-reconciliation-search.model';
import { GlobalService } from '../../../shared/global.service';
import { ChangeService } from '../../../shared/change-service';
import { SaveSearchService } from '../../../shared/save-search-service';
import { CzDatePickerComponent } from '../../../../components/cz-date-picker/cz-date-picker.component';
@Component({
    selector: 'app-cancel-orders-reconciliation-search',
    templateUrl: './cancel-orders-reconciliation-search.component.html',
    styleUrls: ['./cancel-orders-reconciliation-search.component.css'],
    providers: [CancelOrdersReconciliationSearchService]
})
export class CancelOrdersReconciliationSearchComponent extends BaseComponent {
    private serviceName = 'CANCEL_ORDER_RECON';
    log = Log.create('CancelOrdersReconciliationSearchComponent');

    cancelOrdersReconciliationSearchModel: CancelOrdersReconciliationSearchModel;
    ddOptionsPCenter: DataDropDownOptions;
    ngCenter: any;

    @ViewChild(DataTableDirective) dtElement: DataTableDirective;
    @ViewChild('cancelOrdersReconciliationList') CancelOrdersReconciliationTemplate;
    @ViewChild(TabsComponent) tabsComponent;
    @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;
    @ViewChild(CzDatePickerComponent) czDatePicker: CzDatePickerComponent;
    @ViewChild('profitCentre', { read: DataDropDownComponent }) ddProfitCentre: DataDropDownComponent;



    constructor(private router: Router,
        protected loaderService: LoaderService,
        private _logger: Logger,
        protected globalService: GlobalService,
        protected changeService: ChangeService,
        protected saveSearchService: SaveSearchService,
        private cancelOrdersReconciliationSearchService: CancelOrdersReconciliationSearchService) {
        super(loaderService, changeService, saveSearchService, cancelOrdersReconciliationSearchService, globalService);
        this.log.color = 'lightblue';
        this.doInitialSetup();
    }

    doInInitLoad() {

    }

    getDatePicker(): CzDatePickerComponent {
        return this.czDatePicker;
    }


    doInitialSetup() {

        this.ddOptionsPCenter = new DataDropDownOptions();
        this.ddOptionsPCenter.serviceURL = Constants.TK_PROFITCENTER_URL;
        this.ddOptionsPCenter.keyName = 'profit_center';
        this.ddOptionsPCenter.keyDesc = 'description';
        this.ddOptionsPCenter.firstOptionText = 'Select a Profit Center';
        this.ddOptionsPCenter.modelName = 'profitCentre';
        this.ddOptionsPCenter.baseComponent = this;
    }

    checkchange(e) {
        if (e.target.checked) {
            this.log.i('checked', this.cancelOrdersReconciliationSearchModel);
            this.cancelOrdersReconciliationSearchModel.includeTax = {
                'id': 'true',
                'desc': 'Include Tax',
                'columnName': 'includeTax'
            };

        } else {
            this.log.i('unchecked', this.cancelOrdersReconciliationSearchModel);
            this.cancelOrdersReconciliationSearchModel.includeTax = '';
        }
    }

    baseProcessData() {
        const toSum = ['cancelledOrders'];
        const keys = ['journal'];
        return ProjectUtils.mySumFunction2(this.listData, toSum, 'journal', 'Total:', 'Grand Total', keys);
    }

    // override
    getLoaderName(): string {
        return 'cancel-orders-reconciliation-search';
    }
    // override
    getReportTitle(): string {
        return 'Cancel Orders Reconciliation Report';
    }
    getReportIcon(): string {
        return 'fa fa-calculator';
    }
    // override
    getReportFileName(): string {
        return 'cancelOrdersReconciliationReport';
    }

    // override
    getSearchModel(): any {
        if (ProjectUtils.isEmpty(this.cancelOrdersReconciliationSearchModel)) {
            this.cancelOrdersReconciliationSearchModel = <CancelOrdersReconciliationSearchModel>ProjectUtils.getCancelOrdersReconciliationSearch(this.sessionObject);
            if (ProjectUtils.isEmpty(this.cancelOrdersReconciliationSearchModel)) {
                this.cancelOrdersReconciliationSearchModel = new CancelOrdersReconciliationSearchModel();
                this.cancelOrdersReconciliationSearchModel.limit = this.sessionObject.limit
            }
            this.ngCenter = this.cancelOrdersReconciliationSearchModel.profitCentre;
        }
        return this.cancelOrdersReconciliationSearchModel;
    }

    // override
    getSearchType(): string {
        return 'cancelOrdersReconciliationSearch';
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
        this.tabsComponent.openTab('Cancel Orders Reconciliation List',
            this.CancelOrdersReconciliationTemplate, {}, true, 'cancelOrdersReconciliationList');
    }

    // override
    getDispSearch(): ThinkListDisplaySearchComponent {
        return this.dispSearch;
    }

    // override
    setSearchModel(searchModel: any) {
        if (!ProjectUtils.isEmpty(searchModel)) {
            if (typeof searchModel === 'string') {
                this.cancelOrdersReconciliationSearchModel = JSON.parse(searchModel);
            } else {
                this.cancelOrdersReconciliationSearchModel = searchModel;
            }
        }
        if (this.cancelOrdersReconciliationSearchModel.limit === '') {
            this.cancelOrdersReconciliationSearchModel.limit = 0;
        }
        this.log.i('setSearchModel', this.cancelOrdersReconciliationSearchModel);
        this.ngCenter = this.setDropDownComponentValue('profitCentre');
        ProjectUtils.setCancelOrdersReconciliationSearch(this.sessionObject, this.cancelOrdersReconciliationSearchModel);
    }

    getDataElement(whichService: string): DataTableDirective {
        if (whichService === this.serviceName) {
            return this.dtElement;
        }
    }

    // override
    getBodyData(): string {
        let body = '';
        body += this.cancelOrdersReconciliationSearchService.getDateSearchParam(this.cancelOrdersReconciliationSearchModel, body);
        body += this.cancelOrdersReconciliationSearchService.getDropDownSearchParam(body, 'profitCentre', this.cancelOrdersReconciliationSearchModel);
        body += this.cancelOrdersReconciliationSearchService.getDropDownSearchParam(body, 'includeTax', this.cancelOrdersReconciliationSearchModel);
        body += this.getBodyLimit(body, this.cancelOrdersReconciliationSearchModel.limit);
        return body;
    }

    doOnReset() {
        this.cancelOrdersReconciliationSearchModel['profitCentre'] = null;
        this.cancelOrdersReconciliationSearchModel.limit = this.sessionObject.limit;
        this.ngCenter = [];
        this.czDatePicker.calendarCanceled(this);
    }

}
