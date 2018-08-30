import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { ParamMap } from '@angular/router';
import { DatePipe } from '@angular/common';
// Import from III party
import { DataTableDirective } from 'angular-datatables';
import { TabsetComponent } from '../../../../components/ngtabs';
import { TabsComponent } from '../../../../components/ng-tabs/tabs.component';
import { DataDropDownOptions } from '../../../../components/data-drop-down/data-drop-down.model'
import { DataDropDownComponent } from '../../../../components/data-drop-down/data-drop-down.component';
import { ThinkListDisplaySearchComponent } from '../../../../components/think-list-display-search/think-list-display-search.component';
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

import { SalesByAgencyService } from './sales-by-agency-details.service';
import { SalesByAgencyDetailsModel } from './sales-by-agency-details.model';
import { CzDatePickerComponent } from '../../../../components/cz-date-picker/cz-date-picker.component';
@Component({
    selector: 'app-sales-by-agency-details',
    templateUrl: './sales-by-agency-details.component.html',
    styleUrls: ['./sales-by-agency-details.component.css'],
    providers: [SalesByAgencyService]
})
export class SalesByAgencyDetailsComponent extends BaseComponent {
    private SALES_BY_AGENCY_DETAILS = 'salesByAgencyDetails';
    log = Log.create('SalesByAgencyDetailsComponent');
    agencySearchModel: any;
    ngjournalData: any;
    ngAgencycode: any;
    ngNNumbers: any;
    // agencyData: any;
    ddOptionsproductName: DataDropDownOptions;
    ddOptionsagency: DataDropDownOptions;
    @ViewChild(CzDatePickerComponent) czDatePicker: CzDatePickerComponent;
    @ViewChild('salesByAgencyDetailsData', { read: DataTableDirective }) dtElement: DataTableDirective;
    @ViewChild('salesByAgencyDetails') salesByAgencyDetailsTemplate;
    @ViewChild(TabsComponent) tabsComponent;
    @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;

    loadJournalDataCompeleted: boolean;
    loadAgencyDataCompeleted: boolean;

    constructor(private router: Router,
        private salesByAgencyService: SalesByAgencyService,
        private _logger: Logger,
        protected globalService: GlobalService,
        protected changeService: ChangeService,
        protected saveSearchService: SaveSearchService,
        protected loaderService: LoaderService) {
        super(loaderService, changeService, saveSearchService, salesByAgencyService, globalService);
        this.log.color = 'lightblue';
        this.doInitialSetup();
    }

    // override
    getLoaderName(): string {
        return 'sales-by-agency';
    }

    // override
    getSearchModel(): any {
        if (ProjectUtils.isEmpty(this.agencySearchModel)) {
            this.agencySearchModel = this.sessionObject.agencyDetailsSearch;
            if (ProjectUtils.isEmpty(this.agencySearchModel)) {
                this.agencySearchModel = {};
                this.agencySearchModel.limit = this.sessionObject.limit;
                this.calenderSetDefaultValue(this.agencySearchModel);
            }
            this.ngjournalData = this.agencySearchModel.ocId;
            this.ngAgencycode = this.agencySearchModel.agency;
        }
        this.log.i('getSearchModel', this.agencySearchModel);
        return this.agencySearchModel;
    }

    // override
    getSearchType(): string {
        return 'agencySearch';
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
    getServiceName(): string {
        return this.SALES_BY_AGENCY_DETAILS;
    }

    // override
    openListTab() {
        this.tabsComponent.openTab('Sales By Agency Details List',
            this.salesByAgencyDetailsTemplate, {}, true, 'salesByAgencyDetails');
    }

    // override
    getDispSearch(): ThinkListDisplaySearchComponent {
        return this.dispSearch;
    }

    // override
    getReportTitle(): string {
        return 'Sales By Agency Details Report';
    }

    // override
    getReportFileName(): string {
        return 'salesByAgencyDetailsReport';
    }

    doInitialSetup() {
        this.ddOptionsproductName = new DataDropDownOptions();
        this.ddOptionsproductName.serviceURL = Constants.TK_SALE_JOURNAL_LIST_URL;
        this.ddOptionsproductName.keyName = 'ocID';
        this.ddOptionsproductName.keyDesc = 'description';
        this.ddOptionsproductName.modelName = 'ocId';
        this.ddOptionsproductName.firstOptionText = 'Select a Product';
        this.ddOptionsproductName.baseComponent = this;
        this.ddOptionsproductName.multipleState = true;
        this.ddOptionsproductName.selectMulti = true;

        this.ddOptionsagency = new DataDropDownOptions();
        this.ddOptionsagency.serviceURL = Constants.TK_SALE_AGENCY_LIST_URL;
        this.ddOptionsagency.keyName = 'customerId';
        this.ddOptionsagency.keyDesc = 'company';
        this.ddOptionsagency.modelName = 'agency';
        this.ddOptionsagency.firstOptionText = 'Select a Agency';
        this.ddOptionsagency.baseComponent = this;
        this.ddOptionsagency.multipleState = true;
        this.ddOptionsagency.selectMulti = true;

        this.displaySearchOptions.noCrossList = [];
        this.displaySearchOptions.noCrossList.push('agency');
    }

    // override
    setSearchModel(searchModel: any) {
        if (!ProjectUtils.isEmpty(searchModel)) {
            if (typeof searchModel === 'string') {
                this.agencySearchModel = JSON.parse(searchModel);
            } else {
                this.agencySearchModel = searchModel;
            }
        }
        if (this.agencySearchModel.limit === '') {
            this.agencySearchModel.limit = 0;
        }
        this.log.i('setSearchModel', this.agencySearchModel);
        this.ngjournalData = this.setDropDownComponentValue('ocId');
        this.ngAgencycode = this.setDropDownComponentValue('agency');

        ProjectUtils.setAgencyDetailsSearch(this.sessionObject, this.agencySearchModel);
    }
    doInInitLoad() {
        this.loadJournalDataCompeleted = false;
        this.loadAgencyDataCompeleted = false;
    }
    getDatePicker(): CzDatePickerComponent {
        return this.czDatePicker;
    }

    stopLoader() {
        if ((this.loadJournalDataCompeleted)
            && (this.loadAgencyDataCompeleted)) {
            this.hideLoader();
        }
    }

    getBodyData(): string {
        let body = '';
        body += this.salesByAgencyService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());
        body += this.salesByAgencyService.getDateSearchParam(this.agencySearchModel, body);
        body += this.salesByAgencyService.getDropDownSearchParam(body, 'ocId', this.agencySearchModel);
        body += this.salesByAgencyService.getDropDownSearchParam(body, 'agency', this.agencySearchModel);
        body += this.getBodyLimit(body, this.agencySearchModel.limit);

        return body;
    }

    doOnReset() {
        this.agencySearchModel['agency'] = null;
        this.agencySearchModel['ocId'] = null;
        this.ngAgencycode = [];
        this.ngjournalData = [];
        this.calenderSetDefaultValue(this.agencySearchModel);
        this.agencySearchModel.limit = this.sessionObject.limit;
    }

    // baseProcessData() {

    //     const constToDecimal = ['netLocalAmount',
    //         'netBaseAmount',
    //         'payCurrencyAmount',
    //         'paymentBaseAmount',
    //         'discount'];

    //     this.listData.forEach(item => {
    //         constToDecimal.forEach((key) => {
    //             item[key] = ProjectUtils.toFixedIfNumber(item[key]) + ''
    //         })

    //     });

    //     console.log(this.listData)
    // }

}
