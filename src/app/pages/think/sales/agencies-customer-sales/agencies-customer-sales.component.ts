import { Component, OnInit, ViewChild } from '@angular/core';
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
import { ProjectUtils } from '../../../shared/project-utils';
import { Constants } from '../../../shared/constant';
import { SessionObject } from '../../../shared/session-object';
import { GlobalService } from '../../../shared/global.service';
import { SearchModelType } from '../../../shared/search-model-type';
import { ChangeService } from '../../../shared/change-service';
import { SaveSearchService } from '../../../shared/save-search-service';
import { AgenciesCustomerSalesService } from './agencies-customer-sales.service';
import { CzDatePickerComponent } from '../../../../components/cz-date-picker/cz-date-picker.component';

@Component({
  selector: 'app-agencies-customer-sales',
  templateUrl: './agencies-customer-sales.component.html',
  styleUrls: ['./agencies-customer-sales.component.css'],
  providers: [AgenciesCustomerSalesService]
})
export class AgenciesCustomerSalesComponent extends BaseComponent {
  private AGENCIES_CUSTOMER_SALES = 'agenciesCustomerSearch';
  log = Log.create('FutureExpiresComponent');
  ddOptionsproductName: DataDropDownOptions;
  agenciesCustomerSearchModel: any;
  productData: any; // same as Journal
  ngNNumbers: any;

  @ViewChild('agenciesCustomerSalesData', { read: DataTableDirective }) dtElement: DataTableDirective;
  @ViewChild('agenciesCustomerSalesList') agenciesCustomerSalesListTemplate;
  @ViewChild(TabsComponent) tabsComponent;
  @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;
  @ViewChild(CzDatePickerComponent) czDatePicker: CzDatePickerComponent;
  @ViewChild('journalId', { read: DataDropDownComponent }) ddProductName: DataDropDownComponent;

  constructor(private agenciesCustomerSalesService: AgenciesCustomerSalesService,
    protected globalService: GlobalService,
    private _logger: Logger,
    private router: Router,
    protected changeService: ChangeService,
    protected saveSearchService: SaveSearchService,
    protected loaderService: LoaderService) {
    super(loaderService, changeService, saveSearchService, agenciesCustomerSalesService, globalService);
    this.log.color = 'lightblue';
    this.doInitialSetup();
  }

  // override
  getLoaderName(): string {
    return 'gencies-customer-sales-component';
  }

  // override
  getSearchModel(): any {
    if (ProjectUtils.isEmpty(this.agenciesCustomerSearchModel)) {
      this.agenciesCustomerSearchModel = this.sessionObject.agenciesCustomerSearch;
      if (ProjectUtils.isEmpty(this.agenciesCustomerSearchModel)) {
        this.agenciesCustomerSearchModel = {};
        this.agenciesCustomerSearchModel.limit = this.sessionObject.limit;
        this.calenderSetDefaultValue(this.agenciesCustomerSearchModel);
      }
      this.ngNNumbers = this.agenciesCustomerSearchModel.journalId;
    }
    this.log.i('getSearchModel', this.agenciesCustomerSearchModel);
    return this.agenciesCustomerSearchModel;
  }

  // override
  getSearchType(): string {
    return 'futureExpire';
  }

  // override
  getDataElement(whichService: string): DataTableDirective {
    return this.dtElement;
  }
  // override
  getReportIcon(): string {
    return 'fa-pie-chart';
  }
  // override
  getTabsComponent(): any {
    return this.tabsComponent;
  }

  // override
  getServiceName(): string {
    return this.AGENCIES_CUSTOMER_SALES;
  }

  // override
  openListTab() {
    this.tabsComponent.openTab('Agencies Customer Sales List',
      this.agenciesCustomerSalesListTemplate, {}, true, 'agenciesCustomerSalesList');
  }

  // override
  getDispSearch(): ThinkListDisplaySearchComponent {
    return this.dispSearch;
  }

  // override
  getReportTitle(): string {
    return 'Agencies Customer Sales Report';
  }

  // override
  getReportFileName(): string {
    return 'futureExpiresReport';
  }

  doInitialSetup() {
    this.ddOptionsproductName = new DataDropDownOptions();
    this.ddOptionsproductName.serviceURL = Constants.TK_SALE_JOURNAL_LIST_URL;
    this.ddOptionsproductName.keyName = 'ocID';
    this.ddOptionsproductName.keyDesc = 'description';
    this.ddOptionsproductName.modelName = 'journalId';
    this.ddOptionsproductName.baseComponent = this;
    this.ddOptionsproductName.firstOptionText = 'Select a Product';
    this.ddOptionsproductName.multipleState = true;
    this.ddOptionsproductName.selectMulti = true;
  }

  // override
  setSearchModel(searchModel: any) {
    if (!ProjectUtils.isEmpty(searchModel)) {
      if (typeof searchModel === 'string') {
        this.agenciesCustomerSearchModel = JSON.parse(searchModel);
      } else {
        this.agenciesCustomerSearchModel = searchModel;
      }
    }
    if (this.agenciesCustomerSearchModel.limit === '') {
      this.agenciesCustomerSearchModel.limit = 0;
    }
    this.log.i('setSearchModel', this.agenciesCustomerSearchModel);
    this.ngNNumbers = this.setDropDownComponentValue('journalId');

    ProjectUtils.setAgenciesCustomerSalesSearch(this.sessionObject, this.agenciesCustomerSearchModel);
  }

  getDatePicker(): CzDatePickerComponent {
    return this.czDatePicker;
  }

  getBodyData(): string {
    let body = '';
    body += this.agenciesCustomerSalesService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());
    body += this.agenciesCustomerSalesService.getDateSearchParam(this.agenciesCustomerSearchModel, body);
    body += this.agenciesCustomerSalesService.getDropDownSearchParam(body, 'journalId', this.agenciesCustomerSearchModel);
    body += this.getBodyLimit(body, this.agenciesCustomerSearchModel.limit);

    return body;
  }

  doOnReset() {
    this.agenciesCustomerSearchModel['journalId'] = null;
    this.calenderSetDefaultValue(this.agenciesCustomerSearchModel);
    this.agenciesCustomerSearchModel.limit = this.sessionObject.limit;
    this.ngNNumbers = [];
  }
}
