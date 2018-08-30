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

import { SalesSummaryForCancelOrdersSearchService } from './sales-summary-for-cancel-orders.service';
import { SalesSummaryForCancelOrdersSearchModel } from './sales-summary-for-cancel-orders.model';
import { GlobalService } from '../../../shared/global.service';
import { ChangeService } from '../../../shared/change-service';
import { SaveSearchService } from '../../../shared/save-search-service';
import { CzDatePickerComponent } from '../../../../components/cz-date-picker/cz-date-picker.component';

@Component({
  selector: 'app-sales-summary-for-cancel-orders',
  templateUrl: './sales-summary-for-cancel-orders.component.html',
  styleUrls: ['./sales-summary-for-cancel-orders.component.css'],
  providers: [SalesSummaryForCancelOrdersSearchService]
})
export class SalesSummaryForCancelOrdersComponent extends BaseComponent {

  private SALES_SUMMARY_FOR_CANCEL_ORDERS_LIST = 'SALES_SUMMARY_FOR_CANCEL_ORDERS_LIST';

  salesSummaryForCancelOrdersSearchModel: SalesSummaryForCancelOrdersSearchModel;

  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  @ViewChild('salessummaryforcancelordersList') salessummaryforcancelordersListTemplate;
  @ViewChild(CzDatePickerComponent) czDatePicker: CzDatePickerComponent;
  @ViewChild(TabsComponent) tabsComponent;
  @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;

  constructor(private router: Router,
    protected loaderService: LoaderService,
    private _logger: Logger,
    protected globalService: GlobalService,
    protected changeService: ChangeService,
    protected saveSearchService: SaveSearchService,
    private salesSummaryForCancelOrdersSearchService: SalesSummaryForCancelOrdersSearchService) {

    super(loaderService, changeService, saveSearchService, salesSummaryForCancelOrdersSearchService, globalService);
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
    return 'Sales Summary For Cancel Orders Report';
  }
  getReportIcon(): string {
    return 'fa fa-calculator';
  }
  // override
  getReportFileName(): string {
    return 'salesSummaryForCancelOrdersReport';
  }

  // override
  getLoaderName(): string {
    return 'sales-summary-for-cancel-orders-search';
  }

  // override
  getSearchModel(): any {
    if (ProjectUtils.isEmpty(this.salesSummaryForCancelOrdersSearchModel)) {
      this.salesSummaryForCancelOrdersSearchModel = <SalesSummaryForCancelOrdersSearchModel>ProjectUtils.getSalesSummaryForCancelOrdersSearch(this.sessionObject);
      if (ProjectUtils.isEmpty(this.salesSummaryForCancelOrdersSearchModel)) {
        this.salesSummaryForCancelOrdersSearchModel = new SalesSummaryForCancelOrdersSearchModel();
        this.salesSummaryForCancelOrdersSearchModel.limit = this.sessionObject.limit;
      }
    }
    this.log.i('this.salesSummaryForCancelOrdersSearchModel', this.salesSummaryForCancelOrdersSearchModel);
    return this.salesSummaryForCancelOrdersSearchModel;
  }

  // override
  getSearchType(): string {
    return 'salesSummaryForCancelOrdersSearch';
  }

  // override
  getTabsComponent(): any {
    return this.tabsComponent;
  }

  // override
  getServiceName(): string {
    return this.SALES_SUMMARY_FOR_CANCEL_ORDERS_LIST;
  }

  // override
  openListTab() {
    this.tabsComponent.openTab('Sales Summary For Cancel Orders List',
      this.salessummaryforcancelordersListTemplate, {}, true, 'salessummaryforcancelordersList');
  }

  // override
  getDispSearch(): ThinkListDisplaySearchComponent {
    return this.dispSearch;
  }

  // override
  setSearchModel(searchModel: any) {
    if (!ProjectUtils.isEmpty(searchModel)) {
      if (typeof searchModel === 'string') {
        this.salesSummaryForCancelOrdersSearchModel = JSON.parse(searchModel);
      } else {
        this.salesSummaryForCancelOrdersSearchModel = searchModel;
      }
    }
    if (this.salesSummaryForCancelOrdersSearchModel.limit === '') {
      this.salesSummaryForCancelOrdersSearchModel.limit = 0;
    }

    ProjectUtils.setSalesSummaryForCancelOrdersSearch(this.sessionObject, this.salesSummaryForCancelOrdersSearchModel);
  }

  getDataElement(whichService: string): DataTableDirective {
    if (whichService === this.SALES_SUMMARY_FOR_CANCEL_ORDERS_LIST) {
      return this.dtElement;
    }
  }

  // override
  getBodyData(): string {
    let body = '';
    body += this.salesSummaryForCancelOrdersSearchService.getDateSearchParam(this.salesSummaryForCancelOrdersSearchModel, body);
    body += this.getBodyLimit(body, this.salesSummaryForCancelOrdersSearchModel.limit);
    return body;
  }
  doOnReset() {
    this.salesSummaryForCancelOrdersSearchModel.limit = this.sessionObject.limit;
    this.czDatePicker.calendarCanceled(this);
  }


}

