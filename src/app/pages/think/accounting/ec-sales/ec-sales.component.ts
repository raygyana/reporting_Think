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
import { CzDatePickerComponent } from '../../../../components/cz-date-picker/cz-date-picker.component';
import { ECSalesService } from './ec-sales.service';
import { ECSalesModel } from './ec-sales.model';

@Component({
  selector: 'app-ec-sales',
  templateUrl: './ec-sales.component.html',
  styleUrls: ['./ec-sales.component.css'],
  providers: [ECSalesService]
})
export class EcSalesComponent extends BaseComponent {

  private EC_SALES = 'EC_SALES';
  log = Log.create('EcSalesComponent');
  // ngCenter: any;
  ecSalesModel: ECSalesModel;

  @ViewChild('ecSalesData', { read: DataTableDirective }) dtElement: DataTableDirective;
  @ViewChild('ecSalesList') ecSalesListTemplate;
  @ViewChild(TabsComponent) tabsComponent;
  @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;
  // ddOptionsProfitCenter: DataDropDownOptions;
  // @ViewChild('profitCenter', { read: DataDropDownComponent }) ddProfitCenter: DataDropDownComponent;
  @ViewChild(CzDatePickerComponent) czDatePicker: CzDatePickerComponent;


  constructor(
    private router: Router,
    protected loaderService: LoaderService,
    private _logger: Logger,
    protected globalService: GlobalService,
    protected changeService: ChangeService,
    protected saveSearchService: SaveSearchService,
    private ecSalesService: ECSalesService) {
    super(loaderService, changeService, saveSearchService, ecSalesService, globalService);
    // this.doInitialSetup();
    this.log.color = 'lightblue';
    const sessionObject: SessionObject = SessionObject.getSessionObject();
    if (sessionObject.clientID === 'ucp') {
      // this.isOrderTypDisable = this.sessionObject.clientSettings.ORDER_TYPE_UCP.orderType.disabled;

      this.ecSalesService.addColumnsOption(this.dtOptions);
    } else {
      this.ecSalesService.addColumnsOption2(this.dtOptions);
    }
  }
  doInInitLoad() {
    this.hideLoader();
  }

  getDatePicker(): CzDatePickerComponent {
    return this.czDatePicker;
  }

  // override
  getLoaderName(): string {
    return 'ec-sales';
  }

  // override
  getSearchModel(): any {
    if (ProjectUtils.isEmpty(this.ecSalesModel)) {
      this.ecSalesModel = this.sessionObject.ecSalesSearch;
      if (ProjectUtils.isEmpty(this.ecSalesModel)) {
        this.ecSalesModel = new ECSalesModel();
        this.ecSalesModel.limit = this.sessionObject.limit;
      }
      // this.ngCenter = this.ecSalesModel.profitCentre;
    }
    this.log.i('this.ecSalesModel', this.ecSalesModel);
    return this.ecSalesModel;
  }

  // override
  getSearchType(): string {
    return 'vatESLSearch';
  }

  // override
  getTabsComponent(): any {
    return this.tabsComponent;
  }

  // override
  getReportTitle(): string {
    return 'EC Sales Report';
  }
  getReportIcon(): string {
    return 'fa fa-calculator';
  }
  // override
  getReportFileName(): string {
    return 'ECSalesReport';
  }

  getServiceName(): string {
    return this.EC_SALES;
  }
  // override
  openListTab() {
    this.tabsComponent.openTab('EC Sales Report List',
      this.ecSalesListTemplate, {}, true, 'ecSalesList');
  }
  // override
  getDispSearch(): ThinkListDisplaySearchComponent {
    return this.dispSearch;
  }

  baseProcessData() {
    const toSum = ['net_mass', 'no_of_cons', 'order_value'];
    const keys = ['description'];
    return ProjectUtils.mySumFunction2(this.listData, toSum, 'description', 'Total:', 'Grand Total', keys);
  }

  // override
  setSearchModel(searchModel: any) {
    if (!ProjectUtils.isEmpty(searchModel)) {
      if (typeof searchModel === 'string') {
        this.ecSalesModel = JSON.parse(searchModel);
      } else {
        this.ecSalesModel = searchModel;
      }
    }
    if (this.ecSalesModel.limit === '') {
      this.ecSalesModel.limit = 0;
    }
    // this.ngCenter = this.setDropDownComponentValue('profitCentre');
    ProjectUtils.setECSalesSearch(this.sessionObject, this.ecSalesModel);
  }

  // doInitialSetup() {
  //   this.ddOptionsProfitCenter = new DataDropDownOptions();
  //   this.ddOptionsProfitCenter.serviceURL = Constants.TK_PROFITCENTER_URL;
  //   this.ddOptionsProfitCenter.keyName = 'profit_center';
  //   this.ddOptionsProfitCenter.keyDesc = 'description';
  //   this.ddOptionsProfitCenter.firstOptionText = 'Select a Profit Center';
  //   this.ddOptionsProfitCenter.modelName = 'profitCentre';
  //   this.ddOptionsProfitCenter.baseComponent = this;
  // }

  getDataElement(whichService: string): DataTableDirective {
    return this.dtElement;
  }

  getBodyData(): string {
    let body = '';
    body += this.ecSalesService.getDateSearchParam(this.ecSalesModel, body);
    // body += this.ecSalesService.getDropDownSearchParam(body, 'profitCentre', this.ecSalesModel);
    body += this.getBodyLimit(body, this.ecSalesModel.limit);
    return body;
  }

  doOnReset() {
    // this.ecSalesModel['profitCentre'] = null;
    this.ecSalesModel.limit = this.sessionObject.limit;
    // this.ngCenter = [];
    this.czDatePicker.calendarCanceled(this);
  }
}


