import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { ParamMap } from '@angular/router';
import { DatePipe } from '@angular/common';
// Import from III party
import { DataTableDirective } from 'angular-datatables';
import {
  TabsetComponent, TabsComponent, DataDropDownOptions,
  DataDropDownComponent, ThinkListDisplaySearchComponent, CzDatePickerComponent
} from '../../../../components';
import { Logger, LoaderService, BaseComponent, } from '../../../../core';
import {
  ProjectUtils, Constants, SessionObject,
  GlobalService, ChangeService, SaveSearchService,
  GlobalSettings
} from '../../../shared';
import { YTDOrdersByCustomerService } from './ytd-orders-by-customer.service';
import { YTDOrdersByCustomerModel } from './ytd-orders-by-customer.model';

@Component({
  selector: 'app-ytd-orders-by-customer',
  templateUrl: './ytd-orders-by-customer.component.html',
  styleUrls: ['./ytd-orders-by-customer.component.css'],
  providers: [YTDOrdersByCustomerService]
})
export class YtdOrdersByCustomerComponent extends BaseComponent implements OnInit {

  fetchSourceData: any;
  dtSrcDataOptions: any;
  ngVolYear: any;
  ngRevMethod: any;
  ngMarketSector: any;
  ngOrderStatus: any;
  ngPrCategory: any;
  ngPaymentStatus: any;
  isrequired: boolean;
  defaultInput: any = {};
  private YTD_ORDERS_BY_CUSTOMER_REPORT = 'ytdOrdersByCustomerReport';
  private YTD_ORDERS_BY_CUSTOMER_SOURCE_CODE_REPORT = 'YTD_ORDERS_BY_CUSTOMER_SOURCE_CODE_REPORT';

  ytdOrdersByCustomerModel: YTDOrdersByCustomerModel;
  ddOptionsexpyear: DataDropDownOptions;
  ddOptionsMarketSector: DataDropDownOptions;
  ddOptionsOrderStatus: DataDropDownOptions;
  ddOptionsRevenueMethod: DataDropDownOptions;
  ddOptionsPaymentStatus: DataDropDownOptions;
  ddTriggerRevenueMethod: Subject<any> = new Subject();
  ddTriggerPaymentStatus: Subject<any> = new Subject();
  ddTriggerOrderStatus: Subject<any> = new Subject();
  ddTriggerMarketSector: Subject<any> = new Subject();
  ddTrigger: Subject<any> = new Subject();

  @ViewChild('ytdOrdersByCustomerReportData', { read: DataTableDirective }) dtElement: DataTableDirective;
  @ViewChild('ytdOrdersByCustomerReportList') ytdOrdersByCustomerReportListTemplate;

  @ViewChild('ytdSourceCodeCustomerData', { read: DataTableDirective }) dtSourcedata: DataTableDirective;
  @ViewChild('ytdSourceCodeCustomerList') ytdSourceCodeCustomerListTemplate;

  @ViewChild(TabsComponent) tabsComponent;
  @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;
  @ViewChild('volumeYear', { read: DataDropDownComponent }) ddExpYear: DataDropDownComponent;
  @ViewChild('marketSector', { read: DataDropDownComponent }) ddMarketSector: DataDropDownComponent;
  @ViewChild('orderStatus', { read: DataDropDownComponent }) ddorderStatus: DataDropDownComponent;
  @ViewChild('paymentStatus', { read: DataDropDownComponent }) ddPaymentStatus: DataDropDownComponent;
  @ViewChild('revenueMethod', { read: DataDropDownComponent }) ddRevenueMethod: DataDropDownComponent;

  @ViewChild(CzDatePickerComponent) czDatePicker: CzDatePickerComponent;
  constructor(private router: Router,
    protected loaderService: LoaderService,
    private _logger: Logger,
    protected changeService: ChangeService,
    protected saveSearchService: SaveSearchService,
    private ytdOrdersByCustomerReportService: YTDOrdersByCustomerService,
    protected globalService: GlobalService) {
    super(loaderService, changeService, saveSearchService, ytdOrdersByCustomerReportService, globalService);

    this.sourceCodeListSetup();
    this.doOnIntialSetup();
    this.applyDefaultParameters();
  }
  applyDefaultParameters() {
    if (ProjectUtils.isEmptyObjectExceptKeys(this.sessionObject.ytdOrdersByCustomerSearch, 'limit', 'dbEnd', 'dbStart')) {

      this.defaultInput['startDate'] = GlobalSettings.UCP_UI_SETTING.YTDOrderByCustomer.defaultPara.dataInput.startDate;
      this.defaultInput['endDate'] = GlobalSettings.UCP_UI_SETTING.YTDOrderByCustomer.defaultPara.dataInput.endDate;

      ProjectUtils.assignTillTheseKeys(this.ytdOrdersByCustomerModel, this.fillDefaultValues, 'orderStatus', 'marketSector', 'volumeYear', 'revenueMethod', 'paymentStatus');
    }
  }



  fillDefaultValues = () => {
    this.ngVolYear = GlobalSettings.UCP_UI_SETTING.YTDOrderByCustomer.defaultPara.ngVolYear;
    this.ngRevMethod = GlobalSettings.UCP_UI_SETTING.YTDOrderByCustomer.defaultPara.ngRevMethod;
    this.ngMarketSector = GlobalSettings.UCP_UI_SETTING.YTDOrderByCustomer.defaultPara.ngMarketSector;
    this.ngOrderStatus = GlobalSettings.UCP_UI_SETTING.YTDOrderByCustomer.defaultPara.ngOrderStatus;
    this.ngPaymentStatus = GlobalSettings.UCP_UI_SETTING.YTDOrderByCustomer.defaultPara.ngPaymentStatus;
  }


  getddTrigger() {
    return this.ddTrigger;
  }

  doInInitLoad() {

    this.globalService.getYTDRevenueMethodData(this.ddTriggerRevenueMethod);
    this.globalService.getMarketSectorData(this.ddTriggerMarketSector);
    this.globalService.getYTDOrderStatusData(this.ddTriggerOrderStatus);
    this.globalService.getPaymentStatusData(this.ddTriggerPaymentStatus);

    this.hideLoader();
  }

  // override
  getLoaderName(): string {
    return 'ytd-orders-by-customer-report';
  }

  // override
  getSearchModel(): any {
    if (ProjectUtils.isEmpty(this.ytdOrdersByCustomerModel)) {
      this.ytdOrdersByCustomerModel = <YTDOrdersByCustomerModel>this.sessionObject.ytdOrdersByCustomerSearch;
      if (ProjectUtils.isEmpty(this.ytdOrdersByCustomerModel)) {
        this.ytdOrdersByCustomerModel = new YTDOrdersByCustomerModel();
        this.ytdOrdersByCustomerModel.limit = this.sessionObject.limit;
      }
      this.ngVolYear = this.ytdOrdersByCustomerModel.volumeYear;
      this.ngMarketSector = this.ytdOrdersByCustomerModel.marketSector;
      this.ngOrderStatus = this.ytdOrdersByCustomerModel.orderStatus;
      this.ngPaymentStatus = this.ytdOrdersByCustomerModel.paymentStatus;
      this.ngRevMethod = this.ytdOrdersByCustomerModel.revenueMethod;
    }
    console.log('getSearchModel::this.ytdOrdersByCustomerModel', this.ytdOrdersByCustomerModel);
    return this.ytdOrdersByCustomerModel;
  }
  // override
  getSearchType(): string {
    return 'ytdOrdersByCustomerSearch';
  }

  getServiceName(): string {
    return this.YTD_ORDERS_BY_CUSTOMER_REPORT;
  }

  // override
  getTabsComponent(): any {
    return this.tabsComponent;
  }
  // override
  getReportIcon(): string {
    return 'fa-pie-chart';
  }
  // override
  openListTab() {
    this.tabsComponent.openTab('YTD Orders By Customer Report List',
      this.ytdOrdersByCustomerReportListTemplate, {}, true, 'ytdOrdersByCustomerReportList');
  }
  // override
  getDispSearch(): ThinkListDisplaySearchComponent {
    return this.dispSearch;
  }

  // override
  getReportTitle(): string {
    return 'YTD Orders By Customer Report';
  }

  // override
  getReportFileName(): string {
    return 'ytdOrdersByCustomerReport';
  }

  // override
  setSearchModel(searchModel: any) {

    if (!ProjectUtils.isEmpty(searchModel)) {
      if (typeof searchModel === 'string') {
        this.ytdOrdersByCustomerModel = JSON.parse(searchModel);
      } else {
        this.ytdOrdersByCustomerModel = searchModel;
      }
    }
    if (this.ytdOrdersByCustomerModel.limit === '') {
      this.ytdOrdersByCustomerModel.limit = 0;
    }
    console.log('setSearchModel', this.ytdOrdersByCustomerModel);

    this.ngVolYear = this.setDropDownComponentValue('volumeYear');
    this.ngMarketSector = this.setDropDownComponentValue('marketSector')
    this.ngOrderStatus = this.setDropDownComponentValue('orderStatus');
    this.ngPaymentStatus = this.setDropDownComponentValue('paymentStatus');
    this.ngRevMethod = this.setDropDownComponentValue('revenueMethod');


    console.log('setSearchModel', this.ytdOrdersByCustomerModel);
    ProjectUtils.setYTDOrdersByCustomerSearch(this.sessionObject, this.ytdOrdersByCustomerModel);
  }

  // override
  getDataElement(whichService: string): DataTableDirective {
    if (whichService === this.YTD_ORDERS_BY_CUSTOMER_SOURCE_CODE_REPORT) {
      return this.dtSourcedata;
    } else if (whichService === this.YTD_ORDERS_BY_CUSTOMER_REPORT) {
      return this.dtElement;
    }
  }

  getDatePicker(): CzDatePickerComponent {
    return this.czDatePicker;
  }
  doOnIntialSetup() {

    this.ddOptionsexpyear = new DataDropDownOptions();
    this.ddOptionsexpyear.serviceURL = Constants.TK_SALE_VOLUME_YEAR_URL;
    this.ddOptionsexpyear.keyName = 'volume';
    this.ddOptionsexpyear.keyDesc = 'volume';
    this.ddOptionsexpyear.firstOptionText = 'Select a Year';
    this.ddOptionsexpyear.modelName = 'volumeYear';
    this.ddOptionsexpyear.baseComponent = this;

    this.ddOptionsOrderStatus = new DataDropDownOptions();
    this.ddOptionsOrderStatus.keyName = 'id';
    this.ddOptionsOrderStatus.keyDesc = 'value';
    this.ddOptionsOrderStatus.modelName = 'orderStatus';
    this.ddOptionsOrderStatus.baseComponent = this;
    // this.ddOptionsOrderStatus.selectMulti = true;

    this.ddOptionsMarketSector = new DataDropDownOptions();
    this.ddOptionsMarketSector.keyName = 'id';
    this.ddOptionsMarketSector.keyDesc = 'value';
    this.ddOptionsMarketSector.modelName = 'marketSector';
    this.ddOptionsMarketSector.baseComponent = this;
    //this.ddOptionsMarketSector.selectMulti = true;

    this.ddOptionsPaymentStatus = new DataDropDownOptions();
    this.ddOptionsPaymentStatus.keyName = 'id';
    this.ddOptionsPaymentStatus.keyDesc = 'value';
    this.ddOptionsPaymentStatus.modelName = 'paymentStatus';
    this.ddOptionsPaymentStatus.baseComponent = this;
    //this.ddOptionsPaymentStatus.selectMulti = true;

    this.ddOptionsRevenueMethod = new DataDropDownOptions();
    this.ddOptionsRevenueMethod.keyName = 'id';
    this.ddOptionsRevenueMethod.keyDesc = 'value';
    this.ddOptionsRevenueMethod.modelName = 'revenueMethod';
    this.ddOptionsRevenueMethod.baseComponent = this;
    //this.ddOptionsRevenueMethod.selectMulti = true;


  }

  getBodyData(): string {
    let body = '';
    body += this.ytdOrdersByCustomerReportService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());
    body += this.ytdOrdersByCustomerReportService.getDateSearchParam(this.ytdOrdersByCustomerModel, body);
    body += this.ytdOrdersByCustomerReportService.getDropDownSearchParam(body, 'volumeYear', this.ytdOrdersByCustomerModel);
    body += this.ytdOrdersByCustomerReportService.getDropDownSearchParam(body, 'marketSector', this.ytdOrdersByCustomerModel);
    body += this.ytdOrdersByCustomerReportService.getDropDownSearchParam(body, 'revenueMethod', this.ytdOrdersByCustomerModel);
    body += this.ytdOrdersByCustomerReportService.getDropDownSearchParam(body, 'orderStatus', this.ytdOrdersByCustomerModel);
    body += this.ytdOrdersByCustomerReportService.getDropDownSearchParam(body, 'paymentStatus', this.ytdOrdersByCustomerModel);

    body += this.getBodyLimit(body, this.ytdOrdersByCustomerModel.limit);

    return body;
  }

  doOnReset() {
    console.log('doOnReset');
    this.ytdOrdersByCustomerModel['volumeYear'] = null;
    this.ytdOrdersByCustomerModel['orderStatus'] = null;
    this.ytdOrdersByCustomerModel['paymentStatus'] = null;
    this.ytdOrdersByCustomerModel['revenueMethod'] = null;
    this.ngVolYear = [];
    this.ngOrderStatus = [];
    this.ngPaymentStatus = [];
    this.ngRevMethod = [];
    this.czDatePicker.calendarCanceled(this);
    this.ytdOrdersByCustomerModel.limit = this.sessionObject.limit;
  }


  dynamicColumns() {
    const makeColumns = () => {
      this.dtOptions['columns'] = [];

      this.dtOptions['columns'].push({
        'data': 'endUserCountry',
        'title': 'Country Name'
      })
      this.dtOptions['columns'].push({
        'data': 'endUserCompany',
        'title': 'Company Name'
      })
      this.dtOptions['columns'].push({
        'data': 'journalName',
        'title': 'Journal Name'
      })
      this.dtOptions['columns'].push({
        'data': 'orderHeading',
        'title': 'Order ' + this.ngVolYear[0]
      })
      this.dtOptions['columns'].push({
        'data': 'amountHeading',
        'title': 'Amount ' + this.ngVolYear[0]
      })
      // this.dtOptions['columns'].push({
      //   'data': 'variance',
      //   'title': 'Variance % ' + this.ngVolYear[0]

      // })
      // this.dtOptions['columns'].push({
      //   'data': 'difference',
      //   'title': 'Difference'
      // })
      this.dtOptions['columns'].push({
        'data': 'orderHeadingPrev',
        'title': 'Order ' + (parseInt(this.ngVolYear[0]) - 1)
      })
      this.dtOptions['columns'].push({
        'data': 'amountHeadingPrev',
        'title': 'Amount ' + (parseInt(this.ngVolYear[0]) - 1)
      })
    }

    ProjectUtils.dynamicColumns(makeColumns, this.dtOptions);
    console.log('baseProcessData', this.listData, this.dtOptions)

  }

  sourceCodeListSetup() {
    this.dtSrcDataOptions = ProjectUtils.doOptionSettingsFull('sourceCodeOrdersByCustomerReport', 'YTD Orders By Customer Source Data');
    this.ytdOrdersByCustomerReportService.addSourceCodeColumnsOption(this.dtSrcDataOptions);
    this.dtSrcDataOptions['data'] = [];
  }

  doOnSearch() {
    this.tabsComponent.openTab('YTD Orders By Customer Source Data ',
      this.ytdSourceCodeCustomerListTemplate, {}, true, 'sourceCodeOrdersByCustomerReport');

    let body: any = '';
    body += this.ytdOrdersByCustomerReportService.getDateSearchParam(this.ytdOrdersByCustomerModel, body);
    body += this.ytdOrdersByCustomerReportService.getDropDownSearchParam(body, 'volumeYear', this.ytdOrdersByCustomerModel);
    body += this.ytdOrdersByCustomerReportService.getDropDownSearchParam(body, 'marketSector', this.ytdOrdersByCustomerModel);
    body += this.ytdOrdersByCustomerReportService.getDropDownSearchParam(body, 'revenueMethod', this.ytdOrdersByCustomerModel);
    body += this.ytdOrdersByCustomerReportService.getDropDownSearchParam(body, 'orderStatus', this.ytdOrdersByCustomerModel);
    body += this.ytdOrdersByCustomerReportService.getDropDownSearchParam(body, 'paymentStatus', this.ytdOrdersByCustomerModel);

    body += this.getBodyLimit(body, this.ytdOrdersByCustomerModel.limit);
    this.fetchSourceData = this.ytdOrdersByCustomerReportService.getSourceData(body)
      .subscribe(data => {
        this.setListData(this.YTD_ORDERS_BY_CUSTOMER_SOURCE_CODE_REPORT, data);
      }, err => {
        console.log('data is ', 'empty');
      });

  }

}
