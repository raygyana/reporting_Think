import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { ParamMap } from '@angular/router';
import { DatePipe } from '@angular/common';
// Import from III party
import { DataTableDirective } from 'angular-datatables';
import { TabsetComponent } from '../../../../components/ngtabs';
import { TabsComponent } from '../../../../components/ng-tabs/tabs.component';

import { Logger } from '../../../../core/logger/logger';
import { LoaderService } from '../../../../core/loader/loader.service';
import { BaseComponent } from '../../../../core/base/base.component';
import { ProjectUtils } from '../../../shared/project-utils';
import { Constants } from '../../../shared/constant';
import { DataDropDownOptions } from '../../../../components/data-drop-down/data-drop-down.model';
import { DataDropDownComponent } from '../../../../components/data-drop-down/data-drop-down.component';
import { SessionObject } from '../../../shared/session-object';
import { GlobalService } from '../../../shared/global.service';
import { SearchModelType } from '../../../shared/search-model-type';
import { ChangeService } from '../../../shared/change-service';
import { SaveSearchService } from '../../../shared/save-search-service';
import { Log, Level } from 'ng2-logger';
import { Logger as Loggerr } from '../../../../core/logger/logger';
import { ThinkListDisplaySearchComponent } from '../../../../components/think-list-display-search/think-list-display-search.component';

import { RenewalCountByMonthModel } from './renewals-count-by-month.model';
import { RenewalCountByMonthService } from './renewals-count-by-month.service';

@Component({
    selector: 'app-renewals-count-by-month',
    templateUrl: './renewals-count-by-month.component.html',
    styleUrls: ['./renewals-count-by-month.component.css'],
    providers: [RenewalCountByMonthService]
})
export class RenewalsCountByMonthComponent extends BaseComponent {

    private RENEWAL_COUNT_BY_MONTH = 'renewalCountByMonth';
    log = Log.create('RenewalsCountByMonthComponent');
    renewalCountByMonthModel: RenewalCountByMonthModel;
    renewalEffortData: any;
    ngProductName: any;
    ngEffort: any;

    ddOptionsEff: DataDropDownOptions;
    ddOptionsProd: DataDropDownOptions;
    ddTriggerEff: Subject<any> = new Subject();

    @ViewChild(DataTableDirective) dtElement: DataTableDirective;
    @ViewChild(TabsComponent) tabsComponent;
    @ViewChild('renewalCountByMonthList') renewalCountByMonthListTemplate;
    @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;
    @ViewChild('renewalCountByMonthData', { read: DataTableDirective }) dtSalesElement: DataTableDirective;
    @ViewChild('renewalEffort', { read: DataDropDownComponent }) ddRenewalEffort: DataDropDownComponent;
    @ViewChild('productName', { read: DataDropDownComponent }) ddProductName: DataDropDownComponent;

    constructor(private router: Router,
        private renewalCountByMonthService: RenewalCountByMonthService,
        private _logger: Logger,
        protected globalService: GlobalService,
        protected changeService: ChangeService,
        protected saveSearchService: SaveSearchService,
        protected loaderService: LoaderService) {
        super(loaderService, changeService, saveSearchService, renewalCountByMonthService, globalService);
        this.doInitialSetup();
        this.log.color = 'lightblue';
    }

    getLoaderName(): string {
        return 'renewals-count-by-month-component';
    }

    getSearchModel(): any {
        if (ProjectUtils.isEmpty(this.renewalCountByMonthModel)) {
            this.renewalCountByMonthModel = <RenewalCountByMonthModel>this.sessionObject.renewalCountByMonthSearch;
            if (ProjectUtils.isEmpty(this.renewalCountByMonthModel)) {
                this.renewalCountByMonthModel = new RenewalCountByMonthModel();
                this.renewalCountByMonthModel.limit = this.sessionObject.limit;
            }
            this.ngProductName = this.renewalCountByMonthModel.oc_id;
            this.ngEffort = this.renewalCountByMonthModel.renewalEffort;

        }

        if (ProjectUtils.isEmpty(this.renewalCountByMonthModel.renewalEffort)) {
            this.renewalCountByMonthModel['renewalEffort'] = [{
                'id': 1,
                'desc': 'Renewal Letter',
                'columnName': 'renewalEffort'
            }];
        }

        this.log.i('getSearchModel', this.renewalCountByMonthModel);
        return this.renewalCountByMonthModel;
    }

    getSearchType(): string {
        return 'renewalsSearch';
    }

    getTabsComponent(): any {
        return this.tabsComponent;
    }

    // override
    getReportTitle(): string {
        return 'Renewals Count By Month Report';
    }
    getReportIcon(): string {
        return 'fa fa-edit';
    }
    // override
    getReportFileName(): string {
        return 'renewalsCountByMonthReport';
    }
    getServiceName(): string {
        return this.RENEWAL_COUNT_BY_MONTH;
    }

    // override
    openListTab() {
        this.tabsComponent.openTab('Renewal Count By Month List',
            this.renewalCountByMonthListTemplate, {}, true, 'renewalCountByMonthList');
    }
    // override
    getDispSearch(): ThinkListDisplaySearchComponent {
        return this.dispSearch;
    }

    // override
    setSearchModel(searchModel: any) {
        if (!ProjectUtils.isEmpty(searchModel)) {
            if (typeof searchModel === 'string') {
                this.renewalCountByMonthModel = JSON.parse(searchModel);
            } else {
                this.renewalCountByMonthModel = searchModel;
            }
        }
        if (this.renewalCountByMonthModel.limit === '') {
            this.renewalCountByMonthModel.limit = 0;
        }
        this.log.i('setSearchModel', this.renewalCountByMonthModel);
        this.ngEffort = this.setDropDownComponentValue('renewalEffort');
        this.ngProductName = this.setDropDownComponentValue('oc_id');
        ProjectUtils.setRenewalsCountByMonth(this.sessionObject, this.renewalCountByMonthModel);
    }


    doPreInitLoad() {
        // this.getActiveData();

        this.globalService.getRenewalEffortData(this.ddTriggerEff);

    }
    doInitialSetup() {
        this.ddOptionsEff = new DataDropDownOptions();
        this.ddOptionsEff.keyName = 'id';
        this.ddOptionsEff.keyDesc = 'value';
        this.ddOptionsEff.baseComponent = this;
        this.ddOptionsEff.firstOptionText = 'Select...';
        this.ddOptionsEff.modelName = 'renewalEffort';

        this.ddOptionsProd = new DataDropDownOptions();
        this.ddOptionsProd.serviceURL = Constants.TK_SALE_JOURNAL_LIST_URL;
        this.ddOptionsProd.keyName = 'ocID';
        this.ddOptionsProd.keyDesc = 'description';
        this.ddOptionsProd.modelName = 'oc_id';
        this.ddOptionsProd.firstOptionText = 'Select a Product';
        this.ddOptionsProd.baseComponent = this;
        this.ddOptionsProd.selectMulti = true;

        //  this.displaySearchOptions.IgnoreList = [];
        // this.displaySearchOptions.IgnoreList.push('getRenewalEffortDefault');

        //  this.getSearchModel();
    }

    // getRenewalEffortData() {
    //    this.renewalEffortData = this.globalService.getRenewalEffortData(this.ddTriggerEff);
    // this.ddTriggerEff.next(this.renewalEffortData);
    //  }

    getDataElement(whichService: string): DataTableDirective {
        return this.dtElement;
    }

    getBodyData(): string {
        let body = '';
        body += this.renewalCountByMonthService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());
        body += this.renewalCountByMonthService.getDropDownSearchParam(body, 'oc_id', this.renewalCountByMonthModel);
        body += this.renewalCountByMonthService.getDropDownSearchParam(body, 'renewalEffort', this.renewalCountByMonthModel);
        body += this.getBodyLimit(body, this.renewalCountByMonthModel.limit);
        return body;
    }


    doOnReset() {
        this.renewalCountByMonthModel['oc_id'] = null;
        this.renewalCountByMonthModel['renewalEffort'] = null;
        this.renewalCountByMonthModel.limit = this.sessionObject.limit;

        this.ngProductName = [];

        this.renewalCountByMonthModel['renewalEffort'] = [{
            'id': 1,
            'desc': 'Renewal Letter',
            'columnName': 'renewalEffort'
        }];
        this.ngEffort = [1];
    }
}
