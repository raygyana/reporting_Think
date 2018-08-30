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
import { Constants } from '../../../shared/constant';
import { SessionObject } from '../../../shared/session-object';
import { GlobalService } from '../../../shared/global.service';
import { SearchModelType } from '../../../shared/search-model-type';
import { ChangeService } from '../../../shared/change-service';
import { SaveSearchService } from '../../../shared/save-search-service';
import { RMGRCreditCardRefundsTS230Service } from './rmgr_credit_card_refunds_ts_230.service';
import { CzDatePickerComponent } from '../../../../components/cz-date-picker/cz-date-picker.component';
import { ProjectUtils, SumManupilations } from '../../../shared'

@Component({
    selector: 'app-rmgr-credit-card-refunds-ts-230',
    templateUrl: './rmgr_credit_card_refunds_ts_230.component.html',
    styleUrls: ['./rmgr_credit_card_refunds_ts_230.component.css'],
    providers: [RMGRCreditCardRefundsTS230Service]
})
export class RMGRCreditCardRefundsTS230Component extends BaseComponent {
    private CREDIT_CARD_REFUNDS_SEARCH = 'creditCardRefundsSearch';
    log = Log.create('CreditCardRefundsComponent');
    ddOptionsproductName: DataDropDownOptions;
    creditCardRefundsModel: any;


    @ViewChild('creditCardRefundsData', { read: DataTableDirective }) dtElement: DataTableDirective;
    @ViewChild('creditCardRefundsList') creditCardRefundsListTemplate;
    @ViewChild(TabsComponent) tabsComponent;
    @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;
    @ViewChild(CzDatePickerComponent) czDatePicker: CzDatePickerComponent;



    constructor(private creditCardRefundsService: RMGRCreditCardRefundsTS230Service,
        protected globalService: GlobalService,
        private _logger: Logger,
        private router: Router,
        protected changeService: ChangeService,
        protected saveSearchService: SaveSearchService,
        protected loaderService: LoaderService) {
        super(loaderService, changeService, saveSearchService, creditCardRefundsService, globalService);
        this.log.color = 'lightblue';

    }
    doPreInitLoad() {
        this.hideLoader();
        console.log('baseProcessData');

    }
    // override
    getLoaderName(): string {
        return 'credit-card-refunds-component';
    }

    // override
    getSearchModel(): any {
        if (ProjectUtils.isEmpty(this.creditCardRefundsModel)) {
            this.creditCardRefundsModel = this.sessionObject.creditCardRefundsSearch;
            if (ProjectUtils.isEmpty(this.creditCardRefundsModel)) {
                this.creditCardRefundsModel = {};
                this.creditCardRefundsModel.limit = this.sessionObject.limit;
            }
        }
        this.log.i('getSearchModel', this.creditCardRefundsModel);
        return this.creditCardRefundsModel;
    }

    // override
    getSearchType(): string {
        return 'creditCardRefundsReport';
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
        return this.CREDIT_CARD_REFUNDS_SEARCH;
    }

    // override
    openListTab() {
        this.tabsComponent.openTab('Daily Credit Card REFUNDS List',
            this.creditCardRefundsListTemplate, {}, true, 'creditCardRefundsList');
    }

    // override
    getDispSearch(): ThinkListDisplaySearchComponent {
        return this.dispSearch;
    }

    // override
    getReportTitle(): string {
        return 'Daily Credit Card REFUNDS Report';
    }
    getReportIcon(): string {
        return 'fa-file-text-o';
    }
    // override
    getReportFileName(): string {
        return ' dailyCreditCardREFUNDSReport';
    }

    // override
    setSearchModel(searchModel: any) {
        if (!ProjectUtils.isEmpty(searchModel)) {
            if (typeof searchModel === 'string') {
                this.creditCardRefundsModel = JSON.parse(searchModel);
            } else {
                this.creditCardRefundsModel = searchModel;
            }
        }
        if (this.creditCardRefundsModel.limit === '') {
            this.creditCardRefundsModel.limit = 0;
        }

        this.log.i('setSearchModel', this.creditCardRefundsModel);

        ProjectUtils.setCreditCardRefundsSearch(this.sessionObject, this.creditCardRefundsModel);
    }

    getDatePicker(): CzDatePickerComponent {
        return this.czDatePicker;
    }

    getBodyData(): string {
        let body = '';
        body += this.creditCardRefundsService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());
        body += this.creditCardRefundsService.getDateSearchParam(this.creditCardRefundsModel, body);
        body += this.creditCardRefundsService.setParamValue(body, 'customerId', this.creditCardRefundsModel['cust_id']);
        body += this.getBodyLimit(body, this.creditCardRefundsModel.limit);
        body += this.creditCardRefundsService.setParamValue(body, 'name', this.creditCardRefundsModel['name']);
        body += this.creditCardRefundsService.setParamValue(body, 'last_four_digits', this.creditCardRefundsModel['last_four_digits']);

        return body;
    }


    doOnReset() {

        this.czDatePicker.calendarCanceled(this);
        this.creditCardRefundsModel.limit = this.sessionObject.limit;
        this.creditCardRefundsModel['cust_id'] = null;
        this.creditCardRefundsModel['name'] = null;
        this.creditCardRefundsModel['last_four_digits'] = null;
    }


    baseProcessData() {
        const toSum = ['pay_currency_amount', 'tax'];
        const keys = ['order_code'];
        return ProjectUtils.mySumFunction2(this.listData, toSum, 'customer_id', 'Total:', 'Grand Total', keys);
    }

}
