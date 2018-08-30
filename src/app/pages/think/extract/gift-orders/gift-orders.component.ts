import { Component, ViewChild } from '@angular/core';
import { Router, ParamMap } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { DatePipe } from '@angular/common';
// Import from III party
import { DataTableDirective } from 'angular-datatables';
import { TabsetComponent, TabsComponent, DataDropDownOptions, DataDropDownComponent, ThinkListDisplaySearchComponent, CzDatePickerComponent } from '../../../../components';
import { Logger, LoaderService, BaseComponent, Logger as Loggerr } from '../../../../core';
import { ProjectUtils, Constants } from '../../../shared';
import { SessionObject, GlobalService, SearchModelType, ChangeService, SaveSearchService } from '../../../shared';
import { Log, Level } from 'ng2-logger';
import { GiftOrdersModel } from './gift-orders.model';
import { GiftOrdersService } from './gift-orders.service';

@Component({
  selector: 'app-gift-orders',
  templateUrl: './gift-orders.component.html',
  styleUrls: ['./gift-orders.component.css'],
  providers: [GiftOrdersService]
})
export class GiftOrdersComponent extends BaseComponent {
  private GIFT_ORDERS = 'GIFT_ORDERS';
  log = Log.create('GiftOrdersComponent');
  ngProduct: any;
  ngYear: any;
  ngOrderType: any;

  giftOrdersModel: GiftOrdersModel;

  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  @ViewChild('giftOrdersList') giftOrdersTemplate;
  @ViewChild(TabsComponent) tabsComponent;
  @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;

  ddOptionsProduct: DataDropDownOptions;
  ddOptionsYear: DataDropDownOptions;
  ddOptionsOrderType: DataDropDownOptions;
  ddTriggerOrderType: Subject<any> = new Subject();

  @ViewChild('volYear', { read: DataDropDownComponent }) ddVolYear: DataDropDownComponent;
  @ViewChild('productName', { read: DataDropDownComponent }) ddProduct: DataDropDownComponent;
  @ViewChild('orderType', { read: DataDropDownComponent }) ddOrder: DataDropDownComponent;
  @ViewChild(CzDatePickerComponent) czDatePicker: CzDatePickerComponent;

  constructor(private router: Router,
    protected loaderService: LoaderService,
    private _logger: Logger,
    protected globalService: GlobalService,
    protected changeService: ChangeService,
    protected saveSearchService: SaveSearchService,
    private giftOrdersService: GiftOrdersService) {
    super(loaderService, changeService, saveSearchService, giftOrdersService, globalService);
    this.log.color = 'lightblue';
    this.doInitialSetup();
  }

  getDatePicker(): CzDatePickerComponent {
    return this.czDatePicker;
  }

  doInitialSetup() {

    this.ddOptionsProduct = new DataDropDownOptions();
    this.ddOptionsProduct.serviceURL = Constants.TK_SINGLE_ISSUE_PRODUCT_URL;
    this.ddOptionsProduct.keyName = 'ocID';
    this.ddOptionsProduct.keyDesc = 'description';
    this.ddOptionsProduct.firstOptionText = 'Select a Value';
    this.ddOptionsProduct.modelName = 'productName';
    this.ddOptionsProduct.baseComponent = this;
    this.ddOptionsProduct.selectMulti = true;

    this.ddOptionsYear = new DataDropDownOptions();
    this.ddOptionsYear.serviceURL = Constants.TK_SALE_VOLUME_YEAR_URL;
    this.ddOptionsYear.keyName = 'volume';
    this.ddOptionsYear.keyDesc = 'volume';
    this.ddOptionsYear.firstOptionText = 'Select a Year';
    this.ddOptionsYear.modelName = 'volYear';
    this.ddOptionsYear.baseComponent = this;

    this.ddOptionsOrderType = new DataDropDownOptions();
    this.ddOptionsOrderType.keyName = 'id';
    this.ddOptionsOrderType.keyDesc = 'value';
    this.ddOptionsOrderType.firstOptionText = 'Select Order Type';
    this.ddOptionsOrderType.modelName = 'orderType';
    this.ddOptionsOrderType.baseComponent = this;

  }

  // override
  getLoaderName(): string {
    return 'gift-orders';
  }

  // override
  getSearchModel(): any {
    if (ProjectUtils.isEmpty(this.giftOrdersModel)) {
      this.giftOrdersModel = <GiftOrdersModel>this.sessionObject.giftOrdersSearch;
      if (ProjectUtils.isEmpty(this.giftOrdersModel)) {
        this.giftOrdersModel = new GiftOrdersModel();
        this.giftOrdersModel.limit = this.sessionObject.limit

      }
      this.ngProduct = this.giftOrdersModel.productName;
      this.ngYear = this.giftOrdersModel.volYear;
      this.ngOrderType = this.giftOrdersModel.orderType;

    }
    this.log.i('getSearchModel', this.giftOrdersModel);
    return this.giftOrdersModel;
  }

  // override
  getSearchType(): string {
    return 'giftOrdersSearch';
  }

  // override
  getTabsComponent(): any {
    return this.tabsComponent;
  }

  // override
  getServiceName(): string {
    return this.GIFT_ORDERS;
  }

  // override
  openListTab() {
    this.tabsComponent.openTab('Gift Orders List',
      this.giftOrdersTemplate, {}, true, 'giftOrdersList');
  }
  doInInitLoad() {
    this.globalService.getOrderTypeData(this.sessionObject.clientID, this.ddTriggerOrderType);
    this.hideLoader();
  }

  // override
  getDispSearch(): ThinkListDisplaySearchComponent {
    return this.dispSearch;
  }

  // override
  setSearchModel(searchModel: any) {
    if (!ProjectUtils.isEmpty(searchModel)) {
      if (typeof searchModel === 'string') {
        this.giftOrdersModel = JSON.parse(searchModel);
      } else {
        this.giftOrdersModel = searchModel;
      }
    }
    if (this.giftOrdersModel.limit === '') {
      this.giftOrdersModel.limit = 0;
    }
    this.ngProduct = this.setDropDownComponentValue('productName');
    this.ngYear = this.setDropDownComponentValue('volYear');
    this.ngOrderType = this.setDropDownComponentValue('orderType');
    ProjectUtils.setGiftOrdersSearch(this.sessionObject, this.giftOrdersModel);
  }

  getDataElement(whichService: string): DataTableDirective {
    if (whichService === this.GIFT_ORDERS) {
      return this.dtElement;
    }
  }
  // override
  getReportTitle(): string {
    return 'Gift Orders Report';
  }
  getReportIcon(): string {
    return 'fa fa-file-text-o';
  }
  // override
  getReportFileName(): string {
    return 'giftOrdersReport';
  }
  // override
  getBodyData(): string {
    let body = '';
    body += this.giftOrdersService.getDateSearchParam(this.giftOrdersModel, body);
    body += this.giftOrdersService.getDropDownSearchParam(body, 'productName', this.giftOrdersModel);
    body += this.giftOrdersService.getDropDownSearchParam(body, 'volYear', this.giftOrdersModel);
    body += this.giftOrdersService.getDropDownSearchParam(body, 'orderType', this.giftOrdersModel);
    body += this.getBodyLimit(body, this.giftOrdersModel.limit);

    return body;
  }

  doOnReset() {
    this.giftOrdersModel['productName'] = null;
    this.giftOrdersModel['volYear'] = null;
    this.giftOrdersModel['orderType'] = null;
    this.czDatePicker.calendarCanceled(this);
    this.ngProduct = [];
    this.ngYear = [];
    this.ngOrderType = [];
    this.giftOrdersModel.limit = this.sessionObject.limit
  }

}


