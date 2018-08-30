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
  GlobalService, ChangeService, SaveSearchService, GlobalSettings
} from '../../../shared';
import { YTDOrdersByStartYearService } from './ytd-orders-by-start-year.service';
import { YTDOrdersByStartYearModel } from './ytd-orders-by-start-year.model';
import { setInterval } from 'timers';

@Component({
  selector: 'app-ytd-orders-by-start-year',
  templateUrl: './ytd-orders-by-start-year.component.html',
  styleUrls: ['./ytd-orders-by-start-year.component.css'],
  providers: [YTDOrdersByStartYearService]
})
export class YtdOrdersByStartYearComponent extends BaseComponent {

  dtSrcDataOptions: any;
  fetchSourceData: any;
  ngVolYear: any;
  ngMarketSector: any;
  ngOrderStatus: any;
  ngPrCategory: any;
  ngPaymentStatus: any;
  ngRevMethod: any;
  defaultInput: any = {};

  private YTD_ORDERS_BY_START_YEAR_REPORT = 'ytdOrdersByStartYearReport';
  private YTD_ORDERS_BY_START_YEAR_SOURCE_CODE_REPORT = 'YTD_ORDERS_BY_START_YEAR_SOURCE_CODE_REPORT';
  ytdOrdersByStartYearModel: YTDOrdersByStartYearModel;
  ddOptionsexpyear: DataDropDownOptions;
  ddOptionMarketSector: DataDropDownOptions;
  ddOptionOrderStatus: DataDropDownOptions;
  ddOptionsRevenueMethod: DataDropDownOptions;
  ddOptionsPaymentStatus: DataDropDownOptions;
  ddTriggerRevenueMethod: Subject<any> = new Subject();
  ddTriggerPaymentStatus: Subject<any> = new Subject();
  ddTriggerOrderStatus: Subject<any> = new Subject();
  ddTriggerMarketSector: Subject<any> = new Subject();


  @ViewChild('ytdOrdersByStartYearReportData', { read: DataTableDirective }) dtElement: DataTableDirective;
  @ViewChild('ytdOrdersByStartYearReportList') ytdOrdersByStartYearReportListTemplate;

  @ViewChild('ytdSourceCodeOrdersData', { read: DataTableDirective }) dtSourcedata: DataTableDirective;
  @ViewChild('ytdSourceCodeOrdersList') ytdSourceCodeOrdersListTemplate;

  @ViewChild(TabsComponent) tabsComponent;
  @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;
  @ViewChild('volYear', { read: DataDropDownComponent }) ddExpYear: DataDropDownComponent;
  @ViewChild('marketSector', { read: DataDropDownComponent }) ddMarketSector: DataDropDownComponent;
  @ViewChild('orderStatus', { read: DataDropDownComponent }) ddorderStatus: DataDropDownComponent;
  @ViewChild('paymentStatus', { read: DataDropDownComponent }) ddPaymentStatus: DataDropDownComponent;
  @ViewChild('revMethod', { read: DataDropDownComponent }) ddRevenueMethod: DataDropDownComponent;

  @ViewChild(CzDatePickerComponent) czDatePicker: CzDatePickerComponent;
  constructor(private router: Router,
    protected loaderService: LoaderService,
    private _logger: Logger,
    protected changeService: ChangeService,
    protected saveSearchService: SaveSearchService,
    private ytdOrdersByStartYearReportService: YTDOrdersByStartYearService,
    protected globalService: GlobalService) {
    super(loaderService, changeService, saveSearchService, ytdOrdersByStartYearReportService, globalService);

    this.doOnIntialSetup();
    this.sourceCodeListSetup();
    this.applyDefaultParameters();


    // setInterval(() => {
    //   console.log(this.ytdOrdersByStartYearModel)
    // }, 3000)
  }
  applyDefaultParameters() {
    if (ProjectUtils.isEmptyObjectExceptKeys(this.sessionObject.ytdOrdersByStartYearSearch, 'limit', 'dbEnd', 'dbStart')) {
      this.defaultInput['startDate'] = GlobalSettings.UCP_UI_SETTING.YTDOrderByStartYear.defaultPara.dataInput.startDate;
      this.defaultInput['endDate'] = GlobalSettings.UCP_UI_SETTING.YTDOrderByStartYear.defaultPara.dataInput.endDate;

      ProjectUtils.assignTillTheseKeys(this.ytdOrdersByStartYearModel, this.fillDefaultValues, 'orderStatus', 'marketSector', 'volumeYear', 'revenueMethod', 'paymentStatus');
    }
  }


  fillDefaultValues = () => {
    this.ngVolYear = GlobalSettings.UCP_UI_SETTING.YTDOrderByStartYear.defaultPara.ngVolYear;
    this.ngRevMethod = GlobalSettings.UCP_UI_SETTING.YTDOrderByStartYear.defaultPara.ngRevMethod;
    this.ngMarketSector = GlobalSettings.UCP_UI_SETTING.YTDOrderByStartYear.defaultPara.ngMarketSector;
    this.ngOrderStatus = GlobalSettings.UCP_UI_SETTING.YTDOrderByStartYear.defaultPara.ngOrderStatus;
    this.ngPaymentStatus = GlobalSettings.UCP_UI_SETTING.YTDOrderByStartYear.defaultPara.ngPaymentStatus;
  }


  doInInitLoad() {

    this.globalService.getMarketSectorData(this.ddTriggerMarketSector)
    this.globalService.getYTDOrderStatusData(this.ddTriggerOrderStatus);
    this.globalService.getPaymentStatusData(this.ddTriggerPaymentStatus);
    this.globalService.getYTDRevenueMethodData(this.ddTriggerRevenueMethod);
    this.hideLoader();
  }

  // override
  getLoaderName(): string {
    return 'ytd-orders-by-start-year-report';
  }

  // override
  getSearchModel(): any {

    if (ProjectUtils.isEmpty(this.ytdOrdersByStartYearModel)) {
      this.ytdOrdersByStartYearModel = <YTDOrdersByStartYearModel>this.sessionObject.ytdOrdersByStartYearSearch;
      if (ProjectUtils.isEmpty(this.ytdOrdersByStartYearModel)) {
        this.ytdOrdersByStartYearModel = new YTDOrdersByStartYearModel();
        this.ytdOrdersByStartYearModel.limit = this.sessionObject.limit;
      }
      this.ngVolYear = this.ytdOrdersByStartYearModel.volumeYear;
      this.ngMarketSector = this.ytdOrdersByStartYearModel.marketSector;
      this.ngOrderStatus = this.ytdOrdersByStartYearModel.orderStatus;
      this.ngPaymentStatus = this.ytdOrdersByStartYearModel.paymentStatus;

      this.ngRevMethod = this.ytdOrdersByStartYearModel.revenueMethod;
    }
    console.log('getSearchModel::this.ytdOrdersByStartYearModel', this.ytdOrdersByStartYearModel);
    return this.ytdOrdersByStartYearModel;
  }
  // override
  getSearchType(): string {
    return 'ytdOrdersByStartYearReportSearch';
  }

  getServiceName(): string {
    return this.YTD_ORDERS_BY_START_YEAR_REPORT;
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
    this.tabsComponent.openTab('YTD Orders By Start Year Report List',
      this.ytdOrdersByStartYearReportListTemplate, {}, true, 'ytdOrdersByStartYearReportList');
  }
  // override
  getDispSearch(): ThinkListDisplaySearchComponent {
    return this.dispSearch;
  }

  // override
  getReportTitle(): string {
    return 'YTD Orders By Start Year Report';
  }

  // override
  getReportFileName(): string {
    return 'ytdOrdersByStartYeardReport';
  }

  // override
  setSearchModel(searchModel: any) {
    if (!ProjectUtils.isEmpty(searchModel)) {
      if (typeof searchModel === 'string') {
        this.ytdOrdersByStartYearModel = JSON.parse(searchModel);
      } else {
        this.ytdOrdersByStartYearModel = searchModel;
      }
    }
    if (this.ytdOrdersByStartYearModel.limit === '') {
      this.ytdOrdersByStartYearModel.limit = 0;
    }

    this.ngVolYear = this.setDropDownComponentValue('volumeYear');
    this.ngMarketSector = this.setDropDownComponentValue('marketSector')
    this.ngOrderStatus = this.setDropDownComponentValue('orderStatus');
    this.ngPaymentStatus = this.setDropDownComponentValue('paymentStatus');
    this.ngRevMethod = this.setDropDownComponentValue('revenueMethod');

    ProjectUtils.setYTDOrdersByStartYearSearch(this.sessionObject, this.ytdOrdersByStartYearModel);
  }

  // override
  getDataElement(whichService: string): DataTableDirective {
    if (whichService === this.YTD_ORDERS_BY_START_YEAR_SOURCE_CODE_REPORT) {
      return this.dtSourcedata;
    } else if (whichService === this.YTD_ORDERS_BY_START_YEAR_REPORT) {
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

    this.ddOptionOrderStatus = new DataDropDownOptions();
    this.ddOptionOrderStatus.keyName = 'id';
    this.ddOptionOrderStatus.keyDesc = 'value';
    this.ddOptionOrderStatus.modelName = 'orderStatus';
    this.ddOptionOrderStatus.baseComponent = this;
    //this.ddOptionOrderStatus.selectMulti = true;

    this.ddOptionMarketSector = new DataDropDownOptions();
    this.ddOptionMarketSector.keyName = 'id';
    this.ddOptionMarketSector.keyDesc = 'value';
    this.ddOptionMarketSector.modelName = 'marketSector';
    this.ddOptionMarketSector.baseComponent = this;
    //this.ddOptionMarketSector.selectMulti = true;

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
    // this.ddOptionsRevenueMethod.selectMulti = true;


  }

  getBodyData(): string {
    let body = '';
    body += this.ytdOrdersByStartYearReportService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());
    body += this.ytdOrdersByStartYearReportService.getDateSearchParam(this.ytdOrdersByStartYearModel, body);
    body += this.ytdOrdersByStartYearReportService.getDropDownSearchParam(body, 'volumeYear', this.ytdOrdersByStartYearModel);
    body += this.ytdOrdersByStartYearReportService.getDropDownSearchParam(body, 'marketSector', this.ytdOrdersByStartYearModel);

    body += this.ytdOrdersByStartYearReportService.getDropDownSearchParam(body, 'revenueMethod', this.ytdOrdersByStartYearModel);
    body += this.ytdOrdersByStartYearReportService.getDropDownSearchParam(body, 'orderStatus', this.ytdOrdersByStartYearModel);
    body += this.ytdOrdersByStartYearReportService.getDropDownSearchParam(body, 'paymentStatus', this.ytdOrdersByStartYearModel);
    body += this.getBodyLimit(body, this.ytdOrdersByStartYearModel.limit);
    return body;
  }

  doOnReset() {
    console.log('doOnReset');
    this.ytdOrdersByStartYearModel['volumeYear'] = null;
    this.ytdOrdersByStartYearModel['orderStatus'] = null;
    this.ytdOrdersByStartYearModel['paymentStatus'] = null;
    this.ngVolYear = [];
    this.ngOrderStatus = [];
    this.ngPaymentStatus = [];
    this.ngRevMethod = [];
    this.czDatePicker.calendarCanceled(this);

    this.ytdOrdersByStartYearModel.limit = this.sessionObject.limit;

  }




  dynamicColumns() {


    // amountHeading
    // amountHeadingPrev
    // difference
    // endUserCompany
    // endUserCountry
    // journalName
    // orderHeading
    // orderHeadingPrev
    // variance



    const makeColumns = () => {
      this.dtOptions['columns'] = [];

      this.dtOptions['columns'].push({
        'data': 'journalName',
        'title': 'Journal Name'
      })
      this.dtOptions['columns'].push({
        'data': 'orderHeading',
        'title': 'Order ' + this.ngVolYear[0]
      })
      this.dtOptions['columns'].push({
        'data': 'variance',
        'title': 'Variance % '
      })
      this.dtOptions['columns'].push({
        'data': 'difference',
        'title': 'Difference'
      })
      this.dtOptions['columns'].push({
        'data': 'orderHeadingPrev',
        'title': 'Order ' + (parseInt(this.ngVolYear[0], 10) - 1)
      })
    }

    ProjectUtils.dynamicColumns(makeColumns, this.dtOptions);

  }

  sourceCodeListSetup() {
    this.dtSrcDataOptions = ProjectUtils.doOptionSettingsFull('sourceCodeOrdersReport', 'YTD Orders By Start Year Source Data');
    this.ytdOrdersByStartYearReportService.addSourceCodeColumnsOption(this.dtSrcDataOptions);
    this.dtSrcDataOptions['data'] = [];
  }

  doOnSearch() {
    this.tabsComponent.openTab('YTD Orders By Start Year Source Data',
      this.ytdSourceCodeOrdersListTemplate, {}, true, 'sourceCodeOrdersReport');

    let body: any = '';
    body += this.ytdOrdersByStartYearReportService.getDateSearchParam(this.ytdOrdersByStartYearModel, body);
    body += this.ytdOrdersByStartYearReportService.getDropDownSearchParam(body, 'volumeYear', this.ytdOrdersByStartYearModel);
    body += this.ytdOrdersByStartYearReportService.getDropDownSearchParam(body, 'marketSector', this.ytdOrdersByStartYearModel);
    body += this.ytdOrdersByStartYearReportService.getDropDownSearchParam(body, 'revenueMethod', this.ytdOrdersByStartYearModel);
    body += this.ytdOrdersByStartYearReportService.getDropDownSearchParam(body, 'orderStatus', this.ytdOrdersByStartYearModel);
    body += this.ytdOrdersByStartYearReportService.getDropDownSearchParam(body, 'paymentStatus', this.ytdOrdersByStartYearModel);

    body += this.getBodyLimit(body, this.ytdOrdersByStartYearModel.limit);
    this.fetchSourceData = this.ytdOrdersByStartYearReportService.getSourceData(body)
      .subscribe(data => {
        this.setListData(this.YTD_ORDERS_BY_START_YEAR_SOURCE_CODE_REPORT, data);
      }, err => {
        console.log('data is ', 'empty');
      });

  }


}


