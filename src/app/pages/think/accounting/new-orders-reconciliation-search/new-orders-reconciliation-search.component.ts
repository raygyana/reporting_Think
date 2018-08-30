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

import { NewOrdersReconciliationSearchService } from './new-orders-reconciliation-search.service';
import { NewOrdersReconciliationSearchModel } from './new-orders-reconciliation-search.model';
import { GlobalService } from '../../../shared/global.service';
import { ChangeService } from '../../../shared/change-service';
import { SaveSearchService } from '../../../shared/save-search-service';
import { CzDatePickerComponent } from '../../../../components/cz-date-picker/cz-date-picker.component';
@Component({
    selector: 'app-new-orders-reconciliation-search',
    templateUrl: './new-orders-reconciliation-search.component.html',
    styleUrls: ['./new-orders-reconciliation-search.component.css'],
    providers: [NewOrdersReconciliationSearchService]
})
export class NewOrdersReconciliationSearchComponent extends BaseComponent {
    private serviceName = 'NEW_ORDER_RECON';
    log = Log.create('NewOrdersReconciliationSearchComponent');

    newOrdersReconciliationSearchModel: NewOrdersReconciliationSearchModel;
    ddOptionsPCenter: DataDropDownOptions;
    ngTaxProfitCentre: any;

    @ViewChild(DataTableDirective) dtElement: DataTableDirective;
    @ViewChild('newOrdersReconciliationList') NewOrdersReconciliationTemplate;
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
        private newOrdersReconciliationSearchService: NewOrdersReconciliationSearchService) {
        super(loaderService, changeService, saveSearchService, newOrdersReconciliationSearchService, globalService);
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
            this.log.i('checked');
            this.newOrdersReconciliationSearchModel.includeTax = {
                'id': 'true',
                'desc': 'Include Tax',
                'columnName': 'includeTax'
            };

        } else {
            this.log.i('unchecked');
            this.newOrdersReconciliationSearchModel.includeTax = '';
        }
    }
    // override
    getLoaderName(): string {
        return 'new-orders-reconciliation-search';
    }
    // override
    getReportTitle(): string {
        return 'New Orders Reconciliation Search Report';
    }
    getReportIcon(): string {
        return 'fa fa-calculator';
    }
    // override
    getReportFileName(): string {
        return 'newOrdersReconciliationSearchReport';
    }

    // override
    getSearchModel(): any {
        if (ProjectUtils.isEmpty(this.newOrdersReconciliationSearchModel)) {
            this.newOrdersReconciliationSearchModel = <NewOrdersReconciliationSearchModel>ProjectUtils.getNewOrdersReconciliationSearch(this.sessionObject);
            if (ProjectUtils.isEmpty(this.newOrdersReconciliationSearchModel)) {
                this.newOrdersReconciliationSearchModel = new NewOrdersReconciliationSearchModel();
                this.newOrdersReconciliationSearchModel.limit = this.sessionObject.limit;
            }
            this.ngTaxProfitCentre = this.newOrdersReconciliationSearchModel.profitCentre;
        }
        this.log.i('this.newOrdersReconciliationSearchModel', this.newOrdersReconciliationSearchModel);
        return this.newOrdersReconciliationSearchModel;
    }

    // override
    getSearchType(): string {
        return 'newOrdersReconciliationSearch';
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
        this.tabsComponent.openTab('New Orders Reconciliation List',
            this.NewOrdersReconciliationTemplate, {}, true, 'newOrdersReconciliationList');
    }

    // override
    getDispSearch(): ThinkListDisplaySearchComponent {
        return this.dispSearch;
    }

    // override
    setSearchModel(searchModel: any) {
        if (!ProjectUtils.isEmpty(searchModel)) {
            if (typeof searchModel === 'string') {
                this.newOrdersReconciliationSearchModel = JSON.parse(searchModel);
            } else {
                this.newOrdersReconciliationSearchModel = searchModel;
            }
        }
        if (this.newOrdersReconciliationSearchModel.limit === '') {
            this.newOrdersReconciliationSearchModel.limit = 0;
        }
        this.log.i('setSearchModel', this.newOrdersReconciliationSearchModel);
        this.ngTaxProfitCentre = this.setDropDownComponentValue('profitCentre');
        ProjectUtils.setNewOrdersReconciliationSearch(this.sessionObject, this.newOrdersReconciliationSearchModel);
    }

    baseProcessData() {
        const toSum = ['new_order'];
        const keys = ['oc_oc'];
        return ProjectUtils.mySumFunction2(this.listData, toSum, 'oc_oc', 'Total:', 'Grand Total', keys);
    }

    getDataElement(whichService: string): DataTableDirective {
        if (whichService === this.serviceName) {
            return this.dtElement;
        }
    }

    // override
    getBodyData(): string {
        let body = '';
        body += this.newOrdersReconciliationSearchService.getDateSearchParam(this.newOrdersReconciliationSearchModel, body);
        body += this.newOrdersReconciliationSearchService.getDropDownSearchParam(body, 'profitCentre', this.newOrdersReconciliationSearchModel);
        body += this.newOrdersReconciliationSearchService.getDropDownSearchParam(body, 'includeTax', this.newOrdersReconciliationSearchModel);
        body += this.getBodyLimit(body, this.newOrdersReconciliationSearchModel.limit);

        return body;
    }

    doOnReset() {
        this.newOrdersReconciliationSearchModel['profitCentre'] = null;
        this.newOrdersReconciliationSearchModel.limit = this.sessionObject.limit;
        this.ngTaxProfitCentre = [];
        this.czDatePicker.calendarCanceled(this);
    }
}
