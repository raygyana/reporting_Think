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

import { SalesSummaryDetailsSearchService } from './sales-summary-details.service';
import { SalesSummaryDetailsSearchModel } from './sales-summary-details.model';
import { GlobalService } from '../../../shared/global.service';
import { ChangeService } from '../../../shared/change-service';
import { SaveSearchService } from '../../../shared/save-search-service';
import { CzDatePickerComponent } from '../../../../components/cz-date-picker/cz-date-picker.component';

@Component({
  selector: 'app-sales-summary-details',
  templateUrl: './sales-summary-details.component.html',
  styleUrls: ['./sales-summary-details.component.css'],
  providers: [SalesSummaryDetailsSearchService]
})
export class SalesSummaryDetailsComponent extends BaseComponent {

  private SALES_SUMMARY_DETAILS_LIST = 'SALES_SUMMARY_DETAILS_LIST';
  // log = Log.create('PaymentByCurrencyComponent');
  salesSummaryDetailsSearchModel: SalesSummaryDetailsSearchModel;

  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  @ViewChild('salessummarydetailsList') salessummarydetailsListTemplate;
  @ViewChild(CzDatePickerComponent) czDatePicker: CzDatePickerComponent;
  @ViewChild(TabsComponent) tabsComponent;
  @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;

  constructor(private router: Router,
    protected loaderService: LoaderService,
    private _logger: Logger,
    protected globalService: GlobalService,
    protected changeService: ChangeService,
    protected saveSearchService: SaveSearchService,
    private salesSummaryDetailsSearchService: SalesSummaryDetailsSearchService) {

    super(loaderService, changeService, saveSearchService, salesSummaryDetailsSearchService, globalService);
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
    return 'Sales Summary Details Report';
  }
  getReportIcon(): string {
    return 'fa fa-calculator';
  }
  // override
  getReportFileName(): string {
    return 'salesSummaryDetailsReport';
  }

  // override
  getLoaderName(): string {
    return 'sales-summary-details-search';
  }

  // override
  getSearchModel(): any {
    if (ProjectUtils.isEmpty(this.salesSummaryDetailsSearchModel)) {
      this.salesSummaryDetailsSearchModel = <SalesSummaryDetailsSearchModel>ProjectUtils.getSalesSummaryDetailsSearch(this.sessionObject);
      if (ProjectUtils.isEmpty(this.salesSummaryDetailsSearchModel)) {
        this.salesSummaryDetailsSearchModel = new SalesSummaryDetailsSearchModel();
        this.salesSummaryDetailsSearchModel.limit = this.sessionObject.limit;
      }
    }
    this.log.i('this.salesSummaryDetailsSearchModel', this.salesSummaryDetailsSearchModel);
    return this.salesSummaryDetailsSearchModel;
  }

  // override
  getSearchType(): string {
    return 'salesSummaryDetailsSearch';
  }

  // override
  getTabsComponent(): any {
    return this.tabsComponent;
  }

  // override
  getServiceName(): string {
    return this.SALES_SUMMARY_DETAILS_LIST;
  }

  // override
  openListTab() {
    this.tabsComponent.openTab('Sales Summary Details List',
      this.salessummarydetailsListTemplate, {}, true, 'salessummarydetailsList');
  }

  // override
  getDispSearch(): ThinkListDisplaySearchComponent {
    return this.dispSearch;
  }

  // override
  setSearchModel(searchModel: any) {
    if (!ProjectUtils.isEmpty(searchModel)) {
      if (typeof searchModel === 'string') {
        this.salesSummaryDetailsSearchModel = JSON.parse(searchModel);
      } else {
        this.salesSummaryDetailsSearchModel = searchModel;
      }
    }
    if (this.salesSummaryDetailsSearchModel.limit === '') {
      this.salesSummaryDetailsSearchModel.limit = 0;
    }

    ProjectUtils.setSalesSummaryDetailsSearch(this.sessionObject, this.salesSummaryDetailsSearchModel);
  }

  getDataElement(whichService: string): DataTableDirective {
    if (whichService === this.SALES_SUMMARY_DETAILS_LIST) {
      return this.dtElement;
    }
  }

  // override
  getBodyData(): string {
    let body = '';
    body += this.salesSummaryDetailsSearchService.getDateSearchParam(this.salesSummaryDetailsSearchModel, body);
    body += this.getBodyLimit(body, this.salesSummaryDetailsSearchModel.limit);
    return body;
  }
  doOnReset() {
    this.salesSummaryDetailsSearchModel.limit = this.sessionObject.limit;
    this.czDatePicker.calendarCanceled(this);
  }


  // baseProcessData() {
  //   this.listData = ProjectUtils.mySumFunction(this.listData, ['net_base_amount', 'net_local_payment_amount'], 'currency', 'Total');
  // }



}

