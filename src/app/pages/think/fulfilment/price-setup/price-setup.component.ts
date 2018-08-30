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
import { Log, Level } from 'ng2-logger';
import { Logger as Loggerr } from '../../../../core/logger/logger';
import { SaveSearchService } from '../../../shared/save-search-service';
import { ThinkListDisplaySearchComponent } from '../../../../components/think-list-display-search/think-list-display-search.component';
//import { CzDatePickerComponent } from '../../../../components/cz-date-picker/cz-date-picker.component';

import { PriceSetupModel } from './price-setup.model';
import { PriceListService } from './price-setup.service';

@Component({
    selector: 'app-price-setup',
    templateUrl: './price-setup.component.html',
    styleUrls: ['./price-setup.component.css'],
    providers: [PriceListService]
})
export class PriceSetupComponent extends BaseComponent {
    private PRICE_LIST = 'PRICE_LIST';
    log = Log.create('PriceSetupComponent');

    priceSetupModel: PriceSetupModel;
    currentDate: any;
    ngNNumbers: any;
    ngProduct: any;
    ddOptionsproductName: DataDropDownOptions;
    ddOptionsexpyear: DataDropDownOptions;

    @ViewChild('priceListData', { read: DataTableDirective }) dtElement: DataTableDirective;
    @ViewChild(TabsComponent) tabsComponent;
    @ViewChild('priceList') priceListTemplate;
    @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;
    @ViewChild('expYear', { read: DataDropDownComponent }) ddExpYear: DataDropDownComponent;
    @ViewChild('productName', { read: DataDropDownComponent }) ddProductName: DataDropDownComponent;

    constructor(
        private pricesetupService: PriceListService,
        private _logger: Logger,
        private router: Router,
        protected globalService: GlobalService,
        protected changeService: ChangeService,
        protected saveSearchService: SaveSearchService,
        protected loaderService: LoaderService) {

        super(loaderService, changeService, saveSearchService, pricesetupService, globalService);
        this.currentDate = Date.now();
        this.doOnIntialSetup();
        this.log.color = 'lightblue';
    }

    // override
    getLoaderName(): string {
        return 'price-setup-component';
    }

    // override
    getSearchModel(): any {
        if (ProjectUtils.isEmpty(this.priceSetupModel)) {
            this.priceSetupModel = this.sessionObject.priceSetupSearch;
            if (ProjectUtils.isEmpty(this.priceSetupModel)) {
                this.priceSetupModel = new PriceSetupModel();
                this.priceSetupModel.limit = this.sessionObject.limit;
            }
            this.ngNNumbers = this.priceSetupModel.year;
            this.ngProduct = this.priceSetupModel.productName;
        }
        this.log.i('getSearchModel', this.priceSetupModel);
        return this.priceSetupModel;
    }

    // override
    getSearchType(): string {
        return 'priceSetup';
    }
    // override
    getReportTitle(): string {
        return 'Price Setup Report';
    }
    getReportIcon(): string {
        return 'fa fa-edit';
    }
    // override
    getReportFileName(): string {
        return 'priceSetupReport';
    }

    // override
    getTabsComponent(): any {
        return this.tabsComponent;
    }


    // override
    openListTab() {
        this.tabsComponent.openTab('Price Setup List',
            this.priceListTemplate, {}, true, 'priceList');
    }
    // override
    getDispSearch(): ThinkListDisplaySearchComponent {
        return this.dispSearch;
    }

    getServiceName(): string {
        return this.PRICE_LIST;
    }


    // override
    setSearchModel(searchModel: any) {
        if (!ProjectUtils.isEmpty(searchModel)) {
            if (typeof searchModel === 'string') {
                this.priceSetupModel = JSON.parse(searchModel);
            } else {
                this.priceSetupModel = searchModel;
            }
        }
        if (this.priceSetupModel.limit === '') {
            this.priceSetupModel.limit = 0;
        }

        this.ngProduct = this.setDropDownComponentValue('productName');
        this.ngNNumbers = this.setDropDownComponentValue('year');
        this.log.i('setSearchModel', this.priceSetupModel);
        ProjectUtils.setPriceSetupSearch(this.sessionObject, this.priceSetupModel);
    }

    // override
    getDataElement(whichService: string): DataTableDirective {

        return this.dtElement;

    }
    doInInitLoad() {
        this.displaySearchOptions.noCrossList = [];
        this.displaySearchOptions.noCrossList.push('year');
    }

    doOnIntialSetup() {

        this.ddOptionsexpyear = new DataDropDownOptions();
        this.ddOptionsexpyear.serviceURL = Constants.TK_SALE_VOLUME_YEAR_URL;
        this.ddOptionsexpyear.keyName = 'volume';
        this.ddOptionsexpyear.keyDesc = 'volume';
        this.ddOptionsexpyear.firstOptionText = 'Select a Year';
        this.ddOptionsexpyear.modelName = 'year';
        this.ddOptionsexpyear.baseComponent = this;
        this.ddOptionsexpyear.selectMulti = true;

        this.ddOptionsproductName = new DataDropDownOptions();
        this.ddOptionsproductName.serviceURL = Constants.TK_SALE_JOURNAL_LIST_URL;
        this.ddOptionsproductName.keyName = 'ocID';
        this.ddOptionsproductName.keyDesc = 'description';
        this.ddOptionsproductName.modelName = 'productName';
        this.ddOptionsproductName.firstOptionText = 'Select a Product';
        this.ddOptionsproductName.baseComponent = this;
        this.ddOptionsproductName.selectMulti = true;
    }



    getBodyData(): string {
        let body = '';
        body += this.pricesetupService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());
        body += this.pricesetupService.getDropDownSearchParam(body, 'productName', this.priceSetupModel);
        body += this.pricesetupService.getDropDownSearchParam(body, 'year', this.priceSetupModel);
        body += this.getBodyLimit(body, this.priceSetupModel.limit);

        return body;
    }
    doOnReset() {
        this.priceSetupModel['year'] = null;
        this.ddExpYear.optionsModel = [];
        this.ngProduct = [];
        this.ngNNumbers = [];
        this.ddProductName.optionsModel = [];
        this.priceSetupModel['productName'] = null;
        this.priceSetupModel.limit = this.sessionObject.limit;
    }
}
