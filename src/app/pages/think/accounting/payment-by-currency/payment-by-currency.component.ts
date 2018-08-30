import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
// Import from III party
import { DataTableDirective } from 'angular-datatables';
import { TabsetComponent } from '../../../../components/ngtabs';
import { TabsComponent } from '../../../../components/ng-tabs/tabs.component';
import { ThinkListDisplaySearchComponent } from '../../../../components/think-list-display-search/think-list-display-search.component';

import { Logger } from '../../../../core/logger/logger';
import { LoaderService } from '../../../../core/loader/loader.service';
import { BaseComponent } from '../../../../core/base/base.component';

import { ProjectUtils } from '../../../shared/project-utils';
import { Constants } from '../../../shared/constant';
import { Log, Level } from 'ng2-logger';
import { Logger as Loggerr } from '../../../../core/logger/logger';

import { PaymentByCurrencySearchService } from './payment-by-currency.service';
import { PaymentByCurrencySearchModel } from './payment-by-currency.model';
import { GlobalService } from '../../../shared/global.service';
import { ChangeService } from '../../../shared/change-service';
import { SaveSearchService } from '../../../shared/save-search-service';
import { CzDatePickerComponent } from '../../../../components/cz-date-picker/cz-date-picker.component';

@Component({
    selector: 'app-payment-by-currency',
    templateUrl: './payment-by-currency.component.html',
    styleUrls: ['./payment-by-currency.component.css'],
    providers: [PaymentByCurrencySearchService]
})
export class PaymentByCurrencyComponent extends BaseComponent {
    private serviceName = 'PAYMENTBYCURRENCY_LIST';
    log = Log.create('PaymentByCurrencyComponent');

    paymentByCurrencySearchModel: PaymentByCurrencySearchModel;

    @ViewChild(DataTableDirective) dtElement: DataTableDirective;
    @ViewChild('paymentbycurrencyList') PaymentByCurrencyTemplate;
    @ViewChild(CzDatePickerComponent) czDatePicker: CzDatePickerComponent;
    @ViewChild(TabsComponent) tabsComponent;
    @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;

    constructor(private router: Router,
        protected loaderService: LoaderService,
        private _logger: Logger,
        protected globalService: GlobalService,
        protected changeService: ChangeService,
        protected saveSearchService: SaveSearchService,
        private paymentByCurrencySearchService: PaymentByCurrencySearchService) {

        super(loaderService, changeService, saveSearchService, paymentByCurrencySearchService, globalService);
        this.log.color = 'lightblue';
        this.doInitialSetup();
    }
    doInInitLoad() {
        this.hideLoader();
    }
    getDatePicker(): CzDatePickerComponent {
        return this.czDatePicker;
    }

    doInitialSetup() {

    }
    // override
    getReportTitle(): string {
        return 'Payment By Currency Report';
    }
    getReportIcon(): string {
        return 'fa fa-calculator';
    }
    // override
    getReportFileName(): string {
        return 'paymentByCurrencyReport';
    }

    // override
    getLoaderName(): string {
        return 'payment-by-currency-search';
    }

    // override
    getSearchModel(): any {
        if (ProjectUtils.isEmpty(this.paymentByCurrencySearchModel)) {
            this.paymentByCurrencySearchModel = <PaymentByCurrencySearchModel>ProjectUtils.getPaymentByCurrencySearch(this.sessionObject);
            if (ProjectUtils.isEmpty(this.paymentByCurrencySearchModel)) {
                this.paymentByCurrencySearchModel = new PaymentByCurrencySearchModel();
                this.paymentByCurrencySearchModel.limit = this.sessionObject.limit;
            }
        }
        this.log.i('this.paymentbycurrencySearchModel', this.paymentByCurrencySearchModel);
        return this.paymentByCurrencySearchModel;
    }

    // override
    getSearchType(): string {
        return 'paymentByCurrencySearch';
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
        this.tabsComponent.openTab('Payment By Currency List',
            this.PaymentByCurrencyTemplate, {}, true, 'paymentbycurrencyList');
    }

    // override
    getDispSearch(): ThinkListDisplaySearchComponent {
        return this.dispSearch;
    }

    // override
    setSearchModel(searchModel: any) {
        if (!ProjectUtils.isEmpty(searchModel)) {
            if (typeof searchModel === 'string') {
                this.paymentByCurrencySearchModel = JSON.parse(searchModel);
            } else {
                this.paymentByCurrencySearchModel = searchModel;
            }
        }
        if (this.paymentByCurrencySearchModel.limit === '') {
            this.paymentByCurrencySearchModel.limit = 0;
        }

        ProjectUtils.setPaymentByCurrencySearch(this.sessionObject, this.paymentByCurrencySearchModel);
    }

    getDataElement(whichService: string): DataTableDirective {
        if (whichService === this.serviceName) {
            return this.dtElement;
        }
    }

    // override
    getBodyData(): string {
        let body = '';
        body += this.paymentByCurrencySearchService.getDateSearchParam(this.paymentByCurrencySearchModel, body);
        body += this.getBodyLimit(body, this.paymentByCurrencySearchModel.limit);

        return body;
    }
    doOnReset() {
        this.paymentByCurrencySearchModel.limit = this.sessionObject.limit;
        this.czDatePicker.calendarCanceled(this);
    }


    baseProcessData() {
        this.listData = ProjectUtils.mySumFunction(this.listData, ['net_base_amount', 'net_local_payment_amount'], 'currency', 'Total');
    }


}

