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

import { TaxLiabilitySearchService } from './tax-liability-search.service';
import { TaxLiabilitySearchModel } from './tax-liability-search.model';
import { GlobalService } from '../../../shared/global.service';
import { ChangeService } from '../../../shared/change-service';
import { SaveSearchService } from '../../../shared/save-search-service';
import { CzDatePickerComponent } from '../../../../components/cz-date-picker/cz-date-picker.component';
@Component({
    selector: 'app-tax-liability-search',
    templateUrl: './tax-liability-search.component.html',
    styleUrls: ['./tax-liability-search.component.css'],
    providers: [TaxLiabilitySearchService]
})
export class TaxLiabilitySearchComponent extends BaseComponent {
    ngTaxProfitCentre: any;
    private serviceName = 'TAX_LIABILITY_LIST';
    log = Log.create('TaxLiabilitySearchComponent');

    taxLiabilitySearchModel: TaxLiabilitySearchModel;
    ddOptionsPCenter: DataDropDownOptions;
    @ViewChild(CzDatePickerComponent) czDatePicker: CzDatePickerComponent;
    @ViewChild(DataTableDirective) dtElement: DataTableDirective;
    @ViewChild('taxLiabilityList') TaxLiabilityTemplate;
    @ViewChild(TabsComponent) tabsComponent;
    @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;
    @ViewChild('profitCentre', { read: DataDropDownComponent }) ddProfitCentre: DataDropDownComponent;


    constructor(private router: Router,
        protected loaderService: LoaderService,
        private _logger: Logger,
        protected globalService: GlobalService,
        protected changeService: ChangeService,
        protected saveSearchService: SaveSearchService,
        private taxLiabilitySearchService: TaxLiabilitySearchService) {
        super(loaderService, changeService, saveSearchService, taxLiabilitySearchService, globalService);
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

    baseProcessData() {
        this.listData = ProjectUtils.mySumFunction(this.listData, ['tax', 'orderAmount'], 'orderNo', 'Total');
    }

    // override
    getReportTitle(): string {
        return 'Tax Liability Search Report';
    }
    getReportIcon(): string {
        return 'fa fa-calculator';
    }
    // override
    getReportFileName(): string {
        return 'taxLiabilitySearchReport';
    }


    // override
    getLoaderName(): string {
        return 'tax-liability-search';
    }

    // override
    getSearchModel(): any {

        if (ProjectUtils.isEmpty(this.taxLiabilitySearchModel)) {
            this.taxLiabilitySearchModel = <TaxLiabilitySearchModel>ProjectUtils.getTaxLiabilitySearch(this.sessionObject);
            if (ProjectUtils.isEmpty(this.taxLiabilitySearchModel)) {
                this.taxLiabilitySearchModel = new TaxLiabilitySearchModel();
                this.taxLiabilitySearchModel.limit = this.sessionObject.limit;
            }
            this.ngTaxProfitCentre = this.taxLiabilitySearchModel.profitCentre
        }
        this.log.i('this.taxLiabilitySearchModel    ', this.taxLiabilitySearchModel);
        return this.taxLiabilitySearchModel;
    }

    // override
    getSearchType(): string {
        return 'taxLiabilitySearch';
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
        this.tabsComponent.openTab('Tax Liability List',
            this.TaxLiabilityTemplate, {}, true, 'taxLiabilityList');
    }

    // override
    getDispSearch(): ThinkListDisplaySearchComponent {
        return this.dispSearch;
    }

    // override
    setSearchModel(searchModel: any) {
        if (!ProjectUtils.isEmpty(searchModel)) {
            if (typeof searchModel === 'string') {
                this.taxLiabilitySearchModel = JSON.parse(searchModel);
            } else {
                this.taxLiabilitySearchModel = searchModel;
            }
        }
        if (this.taxLiabilitySearchModel.limit === '') {
            this.taxLiabilitySearchModel.limit = 0;
        }
        this.log.i('setSearchModel', this.taxLiabilitySearchModel);
        this.ngTaxProfitCentre = this.setDropDownComponentValue('profitCentre');
        ProjectUtils.setTaxLiabilitySearch(this.sessionObject, this.taxLiabilitySearchModel);
    }

    getDataElement(whichService: string): DataTableDirective {
        if (whichService === this.serviceName) {
            return this.dtElement;
        }
    }

    // override
    getBodyData(): string {
        let body = '';
        body += this.taxLiabilitySearchService.getDateSearchParam(this.taxLiabilitySearchModel, body);
        body += this.taxLiabilitySearchService.getDropDownSearchParam(body, 'profitCentre', this.taxLiabilitySearchModel);
        body += this.getBodyLimit(body, this.taxLiabilitySearchModel.limit);

        return body;
    }

    doOnReset() {
        this.taxLiabilitySearchModel['profitCentre'] = null;
        this.ngTaxProfitCentre = [];
        this.taxLiabilitySearchModel.limit = this.sessionObject.limit;
        this.czDatePicker.calendarCanceled(this);
    }

}
