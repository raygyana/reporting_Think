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

import { DetailCirculationService } from './details-circulation-for-pack.service';
import { DetailCirculationModel } from './details-circulation-for-pack.model';
import { CzDatePickerComponent } from '../../../../components/cz-date-picker/cz-date-picker.component';

@Component({
  selector: 'app-details-circulation-for-pack',
  templateUrl: './details-circulation-for-pack.component.html',
  styleUrls: ['./details-circulation-for-pack.component.css'],
  providers: [DetailCirculationService]
})
export class DetailsCirculationForPackComponent extends BaseComponent {

  private DETAIL_CIRCULATION = 'DETAIL_CIRCULATION';
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  @ViewChild('detailCirculationforPackList') detailCirculationforPackTemplate;
  @ViewChild(TabsComponent) tabsComponent;
  @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;
  @ViewChild(CzDatePickerComponent) czDatePicker: CzDatePickerComponent;
  @ViewChild('year', { read: DataDropDownComponent }) ddCategory: DataDropDownComponent;
  @ViewChild('productName', { read: DataDropDownComponent }) ddProduct: DataDropDownComponent;
  @ViewChild('revMethod', { read: DataDropDownComponent }) ddRevenueMethod: DataDropDownComponent;

  ddOptionsProduct: DataDropDownOptions;
  ddOptionsYear: DataDropDownOptions;
  ddOptionsrevMethod: DataDropDownOptions;
  ddTriggerRevenueMethod: Subject<any> = new Subject();
  ngproductName: any;
  ngyear: any;
  ngRevenue: any;
  isRevenueDisable: false;

  detailCirculationModel: any;

  constructor(private router: Router,
    protected loaderService: LoaderService,
    private _logger: Logger,
    protected globalService: GlobalService,
    protected changeService: ChangeService,
    protected saveSearchService: SaveSearchService,
    private decirWithFinanceService: DetailCirculationService) {
    super(loaderService, changeService, saveSearchService, decirWithFinanceService, globalService);
    this.log.color = 'lightblue';
    this.isRevenueDisable = this.sessionObject.clientSettings.SALES_DECIR.revenueMethod.disabled;
    const sessionObject: SessionObject = SessionObject.getSessionObject();
    if (sessionObject.clientID === 'ucp') {
      this.decirWithFinanceService.addColumnsOptionUCP(this.dtOptions);
    } else {
      this.decirWithFinanceService.addColumnsOption(this.dtOptions);
    }
    this.doInitialSetup();
  }

  doInInitLoad() {
    // this.getOrdersData();
    this.globalService.getRevenueMethod1Data(this.ddTriggerRevenueMethod);
    this.hideLoader();
  }
  getDatePicker(): CzDatePickerComponent {
    return this.czDatePicker;
  }

  doInitialSetup() {

    this.ddOptionsProduct = new DataDropDownOptions();
    this.ddOptionsProduct.serviceURL = Constants.TK_DETAILS_CIRCULATION_PACK_PRODUCT_LIST_URL;
    this.ddOptionsProduct.keyName = 'ocID';
    this.ddOptionsProduct.keyDesc = 'description';
    this.ddOptionsProduct.firstOptionText = 'Select a value';
    this.ddOptionsProduct.modelName = 'productName';
    this.ddOptionsProduct.baseComponent = this;
    this.ddOptionsProduct.selectMulti = false;

    this.ddOptionsYear = new DataDropDownOptions();
    this.ddOptionsYear.serviceURL = Constants.TK_SALE_VOLUME_YEAR_URL;
    this.ddOptionsYear.keyName = 'volume';
    this.ddOptionsYear.keyDesc = 'volume';
    this.ddOptionsYear.firstOptionText = 'Select a value';
    this.ddOptionsYear.modelName = 'year';
    this.ddOptionsYear.baseComponent = this;
    this.ddOptionsYear.selectMulti = false;

    this.ddOptionsrevMethod = new DataDropDownOptions();
    this.ddOptionsrevMethod.keyName = 'id';
    this.ddOptionsrevMethod.keyDesc = 'value';
    this.ddOptionsrevMethod.firstOptionText = 'Select a Method';
    this.ddOptionsrevMethod.modelName = 'revMethod';
    this.ddOptionsrevMethod.baseComponent = this;
    this.ddOptionsrevMethod.selectMulti = true;


    this.displaySearchOptions.noCrossList = [];
    this.displaySearchOptions.noCrossList.push('productName');
  }

  // override
  getLoaderName(): string {
    return 'decir-with-finance';
  }

  getSearchModel(): any {
    if (ProjectUtils.isEmpty(this.detailCirculationModel)) {
      this.detailCirculationModel = <DetailCirculationModel>this.sessionObject.detailCirculationSearch;
      if (ProjectUtils.isEmpty(this.detailCirculationModel)) {
        this.detailCirculationModel = new DetailCirculationModel();
        this.detailCirculationModel.limit = this.sessionObject.limit

      }
      this.ngproductName = this.detailCirculationModel.productName;
      this.ngyear = this.detailCirculationModel.year;
      this.ngRevenue = this.detailCirculationModel.revMethod;
    }
    this.log.i('getSearchModel', this.detailCirculationModel);
    return this.detailCirculationModel;
  }
  getSearchType(): string {
    return 'agedArCustomerWiseSearch';
  }

  // override
  getTabsComponent(): any {
    return this.tabsComponent;
  }


  // override
  getServiceName(): string {
    return this.DETAIL_CIRCULATION;
  }

  // override
  openListTab() {
    this.tabsComponent.openTab('Detail Circulation For Pack List',
      this.detailCirculationforPackTemplate, {}, true, 'detailCirculationforPackList');
  }

  // override
  getDispSearch(): ThinkListDisplaySearchComponent {
    return this.dispSearch;
  }


  // override
  setSearchModel(searchModel: any) {
    if (!ProjectUtils.isEmpty(searchModel)) {
      if (typeof searchModel === 'string') {
        this.detailCirculationModel = JSON.parse(searchModel);
      } else {
        this.detailCirculationModel = searchModel;
      }
    }
    // if (this.detailCirculationModel.limit === '') {
    //   this.detailCirculationModel.limit = 0;
    // }
    this.ngproductName = this.setDropDownComponentValue('productName');
    this.ngyear = this.setDropDownComponentValue('year');
    this.ngRevenue = this.setDropDownComponentValue('revMethod');


    ProjectUtils.setDetailCirculationSearch(this.sessionObject, this.detailCirculationModel);
  }

  getDataElement(whichService: string): DataTableDirective {
    if (whichService === this.DETAIL_CIRCULATION) {
      return this.dtElement;
    }
  }
  // override
  getReportTitle(): string {
    return 'Detail Circulation For Pack Report';
  }
  getReportIcon(): string {
    return 'fa fa-file-text-o';
  }
  // override
  getReportFileName(): string {
    return 'detailCirculationForPackReport';
  }
  // override
  getBodyData(): string {
    let body = '';
    body += this.decirWithFinanceService.getDateSearchParam(this.detailCirculationModel, body);
    body += this.decirWithFinanceService.getDropDownSearchParam(body, 'productName', this.detailCirculationModel);
    body += this.decirWithFinanceService.getDropDownSearchParam(body, 'year', this.detailCirculationModel);
    body += this.decirWithFinanceService.getDropDownSearchParam(body, 'revMethod', this.detailCirculationModel);
    body += this.getBodyLimit(body, this.detailCirculationModel.limit);
    return body;
  }

  doOnReset() {
    this.detailCirculationModel['productName'] = null;
    this.detailCirculationModel['year'] = null;
    this.detailCirculationModel['revMethod'] = null;
    this.czDatePicker.calendarCanceled(this);
    this.ngproductName = [];
    this.ngyear = [];
    this.ngRevenue = [];
    // this.detailCirculationModel.limit = this.sessionObject.limit
  }


}
