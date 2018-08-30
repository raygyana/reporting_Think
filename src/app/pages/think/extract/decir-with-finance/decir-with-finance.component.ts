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

import { DecirWithFinanceService } from './decir-with-finance.service';
import { DecirWithFinanceModel } from './decir-with-finance.model';
import { CzDatePickerComponent } from '../../../../components/cz-date-picker/cz-date-picker.component';

@Component({
  selector: 'app-decir-with-finance',
  templateUrl: './decir-with-finance.component.html',
  styleUrls: ['./decir-with-finance.component.css'],
  providers: [DecirWithFinanceService]
})
export class DecirWithFinanceComponent extends BaseComponent {

  private DECIR_WITH_FINANCE = 'DECIR_WITH_FINANCE';
  log = Log.create('DecirWithFinanceComponent');
  creditOrdersData: any;
  ngCategory: any;
  ngCenter: any;
  ngSaleReps: any;
  ngOrders: any;


  decirWithFinanceModel: DecirWithFinanceModel;

  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  @ViewChild('decirWithFinanceList') decirWithFinanceTemplate;
  @ViewChild(TabsComponent) tabsComponent;
  @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;
  ddOptionsCategory: DataDropDownOptions;
  ddOptionsProduct: DataDropDownOptions;
  ddOptionsSaleReps: DataDropDownOptions;
  ddOptionsOrderType: DataDropDownOptions;
  // ddTriggerCashOrders: Subject<any> = new Subject();
  // ddTriggerOrdDue: Subject<any> = new Subject();
  // ddTriggerDetails: Subject<any> = new Subject();
  ddTriggerOrderType: Subject<any> = new Subject();

  @ViewChild('price_category_id', { read: DataDropDownComponent }) ddCategory: DataDropDownComponent;
  @ViewChild('productId', { read: DataDropDownComponent }) ddProduct: DataDropDownComponent;
  @ViewChild('sale_reps', { read: DataDropDownComponent }) ddSaleReps: DataDropDownComponent;
  @ViewChild('order_type', { read: DataDropDownComponent }) ddOrderType: DataDropDownComponent;
  @ViewChild(CzDatePickerComponent) czDatePicker: CzDatePickerComponent;

  constructor(private router: Router,
    protected loaderService: LoaderService,
    private _logger: Logger,
    protected globalService: GlobalService,
    protected changeService: ChangeService,
    protected saveSearchService: SaveSearchService,
    private decirWithFinanceService: DecirWithFinanceService) {
    super(loaderService, changeService, saveSearchService, decirWithFinanceService, globalService);
    this.log.color = 'lightblue';
    this.doInitialSetup();
  }

  doInInitLoad() {
    this.getOrdersData();
    this.hideLoader();
  }
  getDatePicker(): CzDatePickerComponent {
    return this.czDatePicker;
  }

  doInitialSetup() {

    this.ddOptionsProduct = new DataDropDownOptions();
    this.ddOptionsProduct.serviceURL = Constants.TK_SALE_JOURNAL_LIST_URL;
    this.ddOptionsProduct.keyName = 'ocID';
    this.ddOptionsProduct.keyDesc = 'description';
    this.ddOptionsProduct.firstOptionText = 'Select a value';
    this.ddOptionsProduct.modelName = 'product_id';
    this.ddOptionsProduct.baseComponent = this;
    this.ddOptionsProduct.selectMulti = true;

    this.ddOptionsCategory = new DataDropDownOptions();
    this.ddOptionsCategory.serviceURL = Constants.TK_SALE_CATEGORY_DROPDOWN_URL;
    this.ddOptionsCategory.keyName = 'subscriptionCategoryId';
    this.ddOptionsCategory.keyDesc = 'description';
    this.ddOptionsCategory.firstOptionText = 'Select a value';
    this.ddOptionsCategory.modelName = 'price_category_id';
    this.ddOptionsCategory.baseComponent = this;
    this.ddOptionsCategory.selectMulti = true;

    this.ddOptionsSaleReps = new DataDropDownOptions();
    this.ddOptionsSaleReps.serviceURL = Constants.TK_ER_SALES_REP_URL;
    this.ddOptionsSaleReps.keyName = 'sales_representative_id';
    this.ddOptionsSaleReps.keyDesc = 'sales_representative';
    this.ddOptionsSaleReps.firstOptionText = 'Select a value';
    this.ddOptionsSaleReps.modelName = 'sale_reps_id';
    this.ddOptionsSaleReps.baseComponent = this;
    this.ddOptionsSaleReps.selectMulti = true;

    this.ddOptionsOrderType = new DataDropDownOptions();
    this.ddOptionsOrderType.keyName = 'id';
    this.ddOptionsOrderType.keyDesc = 'value';
    this.ddOptionsOrderType.firstOptionText = 'Select a value';
    this.ddOptionsOrderType.modelName = 'order_type';
    this.ddOptionsOrderType.baseComponent = this;
    this.ddOptionsOrderType.selectMulti = true;
  }

  // override
  getLoaderName(): string {
    return 'decir-with-finance';
  }

  getOrdersData() {
    this.creditOrdersData = this.globalService.getOrdersData();
    this.ddTriggerOrderType.next(this.creditOrdersData);
  }

  // override
  getSearchModel(): any {
    if (ProjectUtils.isEmpty(this.decirWithFinanceModel)) {
      this.decirWithFinanceModel = <DecirWithFinanceModel>this.sessionObject.decirWithFinanceSearch;
      if (ProjectUtils.isEmpty(this.decirWithFinanceModel)) {
        this.decirWithFinanceModel = new DecirWithFinanceModel();
        this.decirWithFinanceModel.limit = this.sessionObject.limit

      }
      this.ngCategory = this.decirWithFinanceModel.price_category_id;
      this.ngOrders = this.decirWithFinanceModel.order_type;
      this.ngCenter = this.decirWithFinanceModel.product_id;
      this.ngSaleReps = this.decirWithFinanceModel.sale_reps_id;

    }
    this.log.i('getSearchModel', this.decirWithFinanceModel);
    return this.decirWithFinanceModel;
  }


  // override
  getSearchType(): string {
    return 'agedArCustomerWiseSearch';
  }

  // override
  getTabsComponent(): any {
    return this.tabsComponent;
  }


  // override
  getServiceName(): string {
    return this.DECIR_WITH_FINANCE;
  }

  // override
  openListTab() {
    this.tabsComponent.openTab('DECIR With Finance List',
      this.decirWithFinanceTemplate, {}, true, 'decirWithFinanceList');
  }

  // override
  getDispSearch(): ThinkListDisplaySearchComponent {
    return this.dispSearch;
  }

  // override
  setSearchModel(searchModel: any) {
    if (!ProjectUtils.isEmpty(searchModel)) {
      if (typeof searchModel === 'string') {
        this.decirWithFinanceModel = JSON.parse(searchModel);
      } else {
        this.decirWithFinanceModel = searchModel;
      }
    }
    if (this.decirWithFinanceModel.limit === '') {
      this.decirWithFinanceModel.limit = 0;
    }
    this.ngOrders = this.setDropDownComponentValue('order_type');
    this.ngCenter = this.setDropDownComponentValue('product_id');
    this.ngCategory = this.setDropDownComponentValue('price_category_id');
    this.ngSaleReps = this.setDropDownComponentValue('sale_reps_id');
    ProjectUtils.setDecirWithFinanceSearch(this.sessionObject, this.decirWithFinanceModel);
  }

  getDataElement(whichService: string): DataTableDirective {
    if (whichService === this.DECIR_WITH_FINANCE) {
      return this.dtElement;
    }
  }
  // override
  getReportTitle(): string {
    return 'DECIR With Finance Report';
  }
  getReportIcon(): string {
    return 'fa fa-file-text-o';
  }
  // override
  getReportFileName(): string {
    return 'decirWithFinanceReport';
  }
  // override
  getBodyData(): string {
    let body = '';
    body += this.decirWithFinanceService.getDateSearchParam(this.decirWithFinanceModel, body);
    body += this.decirWithFinanceService.getDropDownSearchParam(body, 'price_category_id', this.decirWithFinanceModel);
    body += this.decirWithFinanceService.getDropDownSearchParam(body, 'sale_reps_id', this.decirWithFinanceModel);
    body += this.getBodyLimit(body, this.decirWithFinanceModel.limit);
    body += this.decirWithFinanceService.getDropDownSearchParam(body, 'product_id', this.decirWithFinanceModel);
    body += this.decirWithFinanceService.getDropDownSearchParam(body, 'order_type', this.decirWithFinanceModel);

    return body;
  }

  doOnReset() {
    this.decirWithFinanceModel['price_category_id'] = null;
    this.decirWithFinanceModel['product_id'] = null;
    this.decirWithFinanceModel['sale_reps_id'] = null;
    this.decirWithFinanceModel['order_type'] = null;
    this.czDatePicker.calendarCanceled(this);
    this.ngCategory = [];
    this.ngCenter = [];
    this.ngSaleReps = [];
    this.ngOrders = [];
    this.decirWithFinanceModel.limit = this.sessionObject.limit
  }

}

