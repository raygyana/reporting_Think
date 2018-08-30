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
import { Logger, LoaderService, BaseComponent } from '../../../../core'
// import { Logger } from '../../../../core/logger/logger';
// import { LoaderService } from '../../../../core/loader/loader.service';
// import { BaseComponent } from '../../../../core/base/base.component';
import { ProjectUtils, SumManupilations } from '../../../shared'
// import { ProjectUtils } from '../../../shared/project-utils';
import { Constants } from '../../../shared/constant';
import { SessionObject } from '../../../shared/session-object';
import { GlobalService } from '../../../shared/global.service';
import { SearchModelType } from '../../../shared/search-model-type';
import { ChangeService } from '../../../shared/change-service';
import { SaveSearchService } from '../../../shared/save-search-service';
import { RMGRCreditCardTS230Service } from './rmgr_credit_card_ts_230.service';
import { CzDatePickerComponent } from '../../../../components/cz-date-picker/cz-date-picker.component';
import { RmgrCreditCardTsModel } from './rmgr_credit_card-ts_230.model';

@Component({
    selector: 'app-rmgr-credit-card-ts-230',
    templateUrl: './rmgr_credit_card_ts_230.component.html',
    styleUrls: ['./rmgr_credit_card_ts_230.component.css'],
    providers: [RMGRCreditCardTS230Service]
})
export class RMGRCreditCardTS230Component extends BaseComponent {
    private RMGR_CREDITCARD_TS_SEARCH = 'rmgrCreditCardTs';
    log = Log.create('RMGRCreditCardTS230Component');
    rmgrCreditCardTsModel: any;


    @ViewChild('rmgrCreditCardTsData', { read: DataTableDirective }) dtElement: DataTableDirective;
    @ViewChild('rmgrCreditCardTsList') rmgrCreditCardTsTemplate;
    @ViewChild(TabsComponent) tabsComponent;
    @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;
    @ViewChild(CzDatePickerComponent) czDatePicker: CzDatePickerComponent;



    constructor(private rmgrCreditCardTS230Service: RMGRCreditCardTS230Service,
        protected globalService: GlobalService,
        private _logger: Logger,
        private router: Router,
        protected changeService: ChangeService,
        protected saveSearchService: SaveSearchService,
        protected loaderService: LoaderService) {
        super(loaderService, changeService, saveSearchService, rmgrCreditCardTS230Service, globalService);
        this.log.color = 'lightblue';

    }
    doPreInitLoad() {
        this.hideLoader();
    }
    // override
    getLoaderName(): string {
        return 'rmgr-rmgr-credit-card-ts-230';
    }

    // override
    getSearchModel(): any {
        if (ProjectUtils.isEmpty(this.rmgrCreditCardTsModel)) {
            this.rmgrCreditCardTsModel = this.sessionObject.rmgrCreditCardTS230Search;
            if (ProjectUtils.isEmpty(this.rmgrCreditCardTsModel)) {
                this.rmgrCreditCardTsModel = new RmgrCreditCardTsModel();
                this.rmgrCreditCardTsModel.limit = this.sessionObject.limit;
            }
        }
        this.log.i('getSearchModel', this.rmgrCreditCardTsModel);
        return this.rmgrCreditCardTsModel;
    }

    // override
    getSearchType(): string {
        return 'rmgrCreditCardTs';
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
        return this.RMGR_CREDITCARD_TS_SEARCH;
    }
    getDatePicker(): CzDatePickerComponent {
        return this.czDatePicker;
    }

    // override
    openListTab() {
        this.tabsComponent.openTab('Daily Credit Cards by Journal List',
            this.rmgrCreditCardTsTemplate, {}, true, 'rmgrCreditCardTs');
    }

    // override
    getDispSearch(): ThinkListDisplaySearchComponent {
        return this.dispSearch;
    }

    // override
    getReportTitle(): string {
        return 'Daily Credit Cards by Journal Report';
    }
    getReportIcon(): string {
        return 'fa-file-text-o';
    }
    // override
    getReportFileName(): string {
        return 'dailyCreditCardsbyJournalReport';
    }

    // override
    setSearchModel(searchModel: any) {
        if (!ProjectUtils.isEmpty(searchModel)) {
            if (typeof searchModel === 'string') {
                this.rmgrCreditCardTsModel = JSON.parse(searchModel);
            } else {
                this.rmgrCreditCardTsModel = searchModel;
            }
        }
        if (this.rmgrCreditCardTsModel.limit === '') {
            this.rmgrCreditCardTsModel.limit = 0;
        }

        this.log.i('setSearchModel', this.rmgrCreditCardTsModel);

        ProjectUtils.setRMGRCreditCardTsSearch(this.sessionObject, this.rmgrCreditCardTsModel);
    }

    getBodyData(): string {
        let body = '';
        body += this.rmgrCreditCardTS230Service.setParamValue(body, 'clientID', ProjectUtils.getClientCode());
        body += this.rmgrCreditCardTS230Service.getSingleDateSearchParam(this.rmgrCreditCardTsModel, body, 'startDate');
        body += this.getBodyLimit(body, this.rmgrCreditCardTsModel.limit);
        body += this.rmgrCreditCardTS230Service.setParamValue(body, 'customerId', this.rmgrCreditCardTsModel['cust_id']);
        body += this.rmgrCreditCardTS230Service.setParamValue(body, 'name', this.rmgrCreditCardTsModel['name']);
        body += this.rmgrCreditCardTS230Service.setParamValue(body, 'order_id', this.rmgrCreditCardTsModel['order_id']);
        body += this.rmgrCreditCardTS230Service.setParamValue(body, 'order_code', this.rmgrCreditCardTsModel['order_code']);
        body += this.rmgrCreditCardTS230Service.setParamValue(body, 'payment_type', this.rmgrCreditCardTsModel['payment_type']);
        body += this.rmgrCreditCardTS230Service.setParamValue(body, 'last_four_digits', this.rmgrCreditCardTsModel['last_four_digits']);
        return body;
    }








    doOnReset() {

        this.czDatePicker.calendarCanceled(this);
        this.rmgrCreditCardTsModel.limit = this.sessionObject.limit;
        this.rmgrCreditCardTsModel['cust_id'] = null;
        this.rmgrCreditCardTsModel['name'] = null;
        this.rmgrCreditCardTsModel['order_id'] = null;
        this.rmgrCreditCardTsModel['order_code'] = null;
        this.rmgrCreditCardTsModel['payment_type'] = null;
        this.rmgrCreditCardTsModel['last_four_digits'] = null;
    }

    baseProcessData() {
        const toSum = ['pay_currency_amount', 'qty', 'tax'];

        const keys = ['order_code'];

        return ProjectUtils.mySumFunction2(this.listData, toSum, 'customer_id', 'Total:', 'Grand Total', keys);
    }



}
