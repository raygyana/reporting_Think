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

import { SalesSummarySearchService } from './sales-summary.service';
import { SalesSummarySearchModel } from './sales-summary.model';
import { GlobalService } from '../../../shared/global.service';
import { ChangeService } from '../../../shared/change-service';
import { SaveSearchService } from '../../../shared/save-search-service';
import { CzDatePickerComponent } from '../../../../components/cz-date-picker/cz-date-picker.component';

@Component({
  selector: 'app-sales-summary',
  templateUrl: './sales-summary.component.html',
  styleUrls: ['./sales-summary.component.css'],
  providers: [SalesSummarySearchService]
})
export class SalesSummaryComponent extends BaseComponent {

  private SALES_SUMMARY_LIST = 'SALES_SUMMARY_LIST';
  // log = Log.create('PaymentByCurrencyComponent');
  salesSummarySearchModel: SalesSummarySearchModel;

  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  @ViewChild('salessummaryList') salessummaryListTemplate;
  @ViewChild(CzDatePickerComponent) czDatePicker: CzDatePickerComponent;
  @ViewChild(TabsComponent) tabsComponent;
  @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;

  constructor(private router: Router,
    protected loaderService: LoaderService,
    private _logger: Logger,
    protected globalService: GlobalService,
    protected changeService: ChangeService,
    protected saveSearchService: SaveSearchService,
    private salesSummarySearchService: SalesSummarySearchService) {

    super(loaderService, changeService, saveSearchService, salesSummarySearchService, globalService);
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
    return 'Sales Summary Report';
  }
  getReportIcon(): string {
    return 'fa fa-calculator';
  }
  // override
  getReportFileName(): string {
    return 'salesSummaryReport';
  }

  // override
  getLoaderName(): string {
    return 'sales-summary-search';
  }

  // override
  getSearchModel(): any {
    if (ProjectUtils.isEmpty(this.salesSummarySearchModel)) {
      this.salesSummarySearchModel = <SalesSummarySearchModel>ProjectUtils.getSalesSummarySearch(this.sessionObject);
      if (ProjectUtils.isEmpty(this.salesSummarySearchModel)) {
        this.salesSummarySearchModel = new SalesSummarySearchModel();
        this.salesSummarySearchModel.limit = this.sessionObject.limit;
      }
    }
    this.log.i('this.salesSummarySearchModel', this.salesSummarySearchModel);
    return this.salesSummarySearchModel;
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
    return this.SALES_SUMMARY_LIST;
  }

  // override
  openListTab() {
    this.tabsComponent.openTab('Sales Summary List',
      this.salessummaryListTemplate, {}, true, 'salessummaryList');
  }

  // override
  getDispSearch(): ThinkListDisplaySearchComponent {
    return this.dispSearch;
  }

  // override
  setSearchModel(searchModel: any) {
    if (!ProjectUtils.isEmpty(searchModel)) {
      if (typeof searchModel === 'string') {
        this.salesSummarySearchModel = JSON.parse(searchModel);
      } else {
        this.salesSummarySearchModel = searchModel;
      }
    }
    if (this.salesSummarySearchModel.limit === '') {
      this.salesSummarySearchModel.limit = 0;
    }

    ProjectUtils.setSalesSummaryPhpSearch(this.sessionObject, this.salesSummarySearchModel);
  }

  getDataElement(whichService: string): DataTableDirective {
    if (whichService === this.SALES_SUMMARY_LIST) {
      return this.dtElement;
    }
  }

  // override
  getBodyData(): string {
    let body = '';
    body += this.salesSummarySearchService.getDateSearchParam(this.salesSummarySearchModel, body);
    body += this.getBodyLimit(body, this.salesSummarySearchModel.limit);
    return body;
  }
  doOnReset() {
    this.salesSummarySearchModel.limit = this.sessionObject.limit;
    this.czDatePicker.calendarCanceled(this);
  }


}






