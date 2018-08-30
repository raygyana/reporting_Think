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

import { RefundSearchService } from './refund-search.service';
import { RefundSearchModel } from './refund-search.model';
import { GlobalService } from '../../../shared/global.service';
import { ChangeService } from '../../../shared/change-service';
import { SaveSearchService } from '../../../shared/save-search-service';
import { CzDatePickerComponent } from '../../../../components/cz-date-picker/cz-date-picker.component';
@Component({
    selector: 'app-refund-search',
    templateUrl: './refund-search.component.html',
    styleUrls: ['./refund-search.component.css'],
    providers: [RefundSearchService]
})
export class RefundSearchComponent extends BaseComponent {
    private serviceName = 'REFUND_LIST';
    log = Log.create('RefundSearchComponent');

    refundSearchModel: RefundSearchModel;


    @ViewChild(DataTableDirective) dtElement: DataTableDirective;
    @ViewChild('refundsList') RefundTemplate;
    @ViewChild(TabsComponent) tabsComponent;
    @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;
    @ViewChild(CzDatePickerComponent) czDatePicker: CzDatePickerComponent;

    constructor(private router: Router,
        protected loaderService: LoaderService,
        private _logger: Logger,
        protected globalService: GlobalService,
        protected changeService: ChangeService,
        protected saveSearchService: SaveSearchService,
        private refundSearchService: RefundSearchService) {
        super(loaderService, changeService, saveSearchService, refundSearchService, globalService);
        this.log.color = 'lightblue';
        this.doInitialSetup();
    }

    doInInitLoad() {
        this.hideLoader();
    }


    doInitialSetup() {

    }
    getDatePicker(): CzDatePickerComponent {
        return this.czDatePicker;
    }

    // override
    getLoaderName(): string {
        return 'refund-search';
    }
    // override
    getReportTitle(): string {
        return 'Refund Search Report';
    }
    getReportIcon(): string {
        return 'fa fa-calculator';
    }
    // override
    getReportFileName(): string {
        return 'refundSearchReport';
    }

    // override
    getSearchModel(): any {
        if (ProjectUtils.isEmpty(this.refundSearchModel)) {
            this.refundSearchModel = <RefundSearchModel>ProjectUtils.getRefundSearch(this.sessionObject);
            if (ProjectUtils.isEmpty(this.refundSearchModel)) {
                this.refundSearchModel = new RefundSearchModel();
                this.refundSearchModel.limit = this.sessionObject.limit;
            }
        }
        this.log.i('this.refundSearchModel', this.refundSearchModel);
        return this.refundSearchModel;
    }

    baseProcessData() {
        const toSum = ['amount'];
        const keys = [];
        return ProjectUtils.mySumFunction2(this.listData, toSum, 'journal', 'Total:', 'Grand Total', keys);
    }


    // override
    getSearchType(): string {
        return 'refundSearch';
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
        this.tabsComponent.openTab('Refunds List',
            this.RefundTemplate, {}, true, 'refundsList');
    }

    // override
    getDispSearch(): ThinkListDisplaySearchComponent {
        return this.dispSearch;
    }

    // override
    setSearchModel(searchModel: any) {
        if (!ProjectUtils.isEmpty(searchModel)) {
            if (typeof searchModel === 'string') {
                this.refundSearchModel = JSON.parse(searchModel);
            } else {
                this.refundSearchModel = searchModel;
            }
        }
        if (this.refundSearchModel.limit === '') {
            this.refundSearchModel.limit = 0;
        }


        ProjectUtils.setRefundSearch(this.sessionObject, this.refundSearchModel);
    }

    getDataElement(whichService: string): DataTableDirective {
        if (whichService === this.serviceName) {
            return this.dtElement;
        }
    }

    // override
    getBodyData(): string {
        let body = '';
        body += this.refundSearchService.getDateSearchParam(this.refundSearchModel, body);
        body += this.getBodyLimit(body, this.refundSearchModel.limit);

        return body;
    }

    doOnReset() {
        this.czDatePicker.calendarCanceled(this);
        this.refundSearchModel.limit = this.sessionObject.limit;
    }
}
