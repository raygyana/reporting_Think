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
import { YTDAmountByStartYearService } from './ytd-amount-by-start-year.service';
import { YTDAmountByStartYearModel } from './ytd-amount-by-start-year.model';

@Component({
  selector: 'app-ytd-amount-by-start-year',
  templateUrl: './ytd-amount-by-start-year.component.html',
  styleUrls: ['./ytd-amount-by-start-year.component.css'],
  providers: [YTDAmountByStartYearService]

})
export class YtdAmountByStartYearComponent extends BaseComponent implements OnInit {

  dtAccOptions: any;
  ngVolYear: any;
  ngRevMethod: any;
  ngMarketSector: any;
  ngOrderStatus: any;
  ngPrCategory: any;
  ngPaymentStatus: any;
  isrequired: boolean;
  defaultInput: any = {};
  fetchDataSub: any;

  private YTD_AMOUNT_BY_START_YEAR_REPORT = 'YTD_AMOUNT_BY_START_YEAR_REPORT';
  private YTD_AMOUNT_BY_START_YEAR_SOURCE_CODE_REPORT = 'YTD_AMOUNT_BY_START_YEAR_SOURCE_CODE_REPORT';

  ytdAmountByStartYearModel: YTDAmountByStartYearModel;
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

  @ViewChild('ytdAmountByStartYearReportData', { read: DataTableDirective }) dtElement: DataTableDirective;
  @ViewChild('ytdAmountByStartYearReportList') ytdAmountByStartYearReportListTemplate;

  @ViewChild('ytdSourceCodeAmountList') ytdSourceCodeAmountListTemplate;
  @ViewChild('ytdSourceCodeAmountData', { read: DataTableDirective }) dtSourceCode: DataTableDirective;

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
    private ytdAmountByStartYearReportService: YTDAmountByStartYearService,
    protected globalService: GlobalService) {
    super(loaderService, changeService, saveSearchService, ytdAmountByStartYearReportService, globalService);

    this.doOnIntialSetup();
    this.applyDefaultParameters();
    this.sourceCodeListSetup();

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

  applyDefaultParameters() {
    if (ProjectUtils.isEmptyObjectExceptKeys(this.sessionObject.ytdAmountByStartYearSearch, 'limit', 'dbEnd', 'dbStart')) {
      this.defaultInput['startDate'] = GlobalSettings.UCP_UI_SETTING.YTDAmountByStartYear.defaultPara.dataInput.startDate;
      this.defaultInput['endDate'] = GlobalSettings.UCP_UI_SETTING.YTDAmountByStartYear.defaultPara.dataInput.endDate;
      ProjectUtils.assignTillTheseKeys(this.ytdAmountByStartYearModel, this.fillDefaultValues, 'orderStatus', 'marketSector', 'volumeYear', 'revenueMethod', 'paymentStatus');
    }
  }

  fillDefaultValues = () => {
    this.ngVolYear = GlobalSettings.UCP_UI_SETTING.YTDAmountByStartYear.defaultPara.ngVolYear;
    this.ngRevMethod = GlobalSettings.UCP_UI_SETTING.YTDAmountByStartYear.defaultPara.ngRevMethod;
    this.ngMarketSector = GlobalSettings.UCP_UI_SETTING.YTDAmountByStartYear.defaultPara.ngMarketSector;
    this.ngOrderStatus = GlobalSettings.UCP_UI_SETTING.YTDAmountByStartYear.defaultPara.ngOrderStatus;
    this.ngPaymentStatus = GlobalSettings.UCP_UI_SETTING.YTDAmountByStartYear.defaultPara.ngPaymentStatus;
  }

  // override
  getLoaderName(): string {
    return 'ytd-amount-by-start-year-report';
  }

  // override
  getSearchModel(): any {
    if (ProjectUtils.isEmpty(this.ytdAmountByStartYearModel)) {
      this.ytdAmountByStartYearModel = <YTDAmountByStartYearModel>this.sessionObject.ytdAmountByStartYearSearch;
      if (ProjectUtils.isEmpty(this.ytdAmountByStartYearModel)) {
        this.ytdAmountByStartYearModel = new YTDAmountByStartYearModel();
        this.ytdAmountByStartYearModel.limit = this.sessionObject.limit;
      }
      this.ngVolYear = this.ytdAmountByStartYearModel.volumeYear;
      this.ngMarketSector = this.ytdAmountByStartYearModel.marketSector;
      this.ngOrderStatus = this.ytdAmountByStartYearModel.orderStatus;
      this.ngPaymentStatus = this.ytdAmountByStartYearModel.paymentStatus;
      this.ngRevMethod = this.ytdAmountByStartYearModel.revenueMethod;
    }
    console.log('getSearchModel::this.ytdAmountByStartYearModel', this.ytdAmountByStartYearModel);
    return this.ytdAmountByStartYearModel;
  }
  // override
  getSearchType(): string {
    return 'ytdAmountByStartYearSearch';
  }

  getServiceName(): string {
    return this.YTD_AMOUNT_BY_START_YEAR_REPORT;
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
    this.tabsComponent.openTab('YTD Amount By Start Year Report List',
      this.ytdAmountByStartYearReportListTemplate, {}, true, 'ytdAmountByStartYearReportList');
  }
  // override
  getDispSearch(): ThinkListDisplaySearchComponent {
    return this.dispSearch;
  }

  // override
  getReportTitle(): string {
    return 'YTD Amount By Start Year Report';
  }

  // override
  getReportFileName(): string {
    return 'ytdAmountByStartYeardReport';
  }

  // override
  setSearchModel(searchModel: any) {

    if (!ProjectUtils.isEmpty(searchModel)) {
      if (typeof searchModel === 'string') {
        this.ytdAmountByStartYearModel = JSON.parse(searchModel);
      } else {
        this.ytdAmountByStartYearModel = searchModel;
      }
    }
    if (this.ytdAmountByStartYearModel.limit === '') {
      this.ytdAmountByStartYearModel.limit = 0;
    }
    console.log('setSearchModel', this.ytdAmountByStartYearModel);

    this.ngVolYear = this.setDropDownComponentValue('volumeYear');
    this.ngMarketSector = this.setDropDownComponentValue('marketSector')
    this.ngOrderStatus = this.setDropDownComponentValue('orderStatus');
    this.ngPaymentStatus = this.setDropDownComponentValue('paymentStatus');
    this.ngRevMethod = this.setDropDownComponentValue('revenueMethod');


    console.log('setSearchModel', this.ytdAmountByStartYearModel);
    ProjectUtils.setYTDAmountByStartYearSearch(this.sessionObject, this.ytdAmountByStartYearModel);
  }

  // override
  getDataElement(whichService: string): DataTableDirective {
    if (whichService === this.YTD_AMOUNT_BY_START_YEAR_SOURCE_CODE_REPORT) {
      return this.dtSourceCode;
    } else if (whichService === this.YTD_AMOUNT_BY_START_YEAR_REPORT) {
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
    // this.ddOptionsexpyear.firstOptionText = 'Select a Year';
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
    // this.ddOptionsMarketSector.selectMulti = true;

    this.ddOptionsPaymentStatus = new DataDropDownOptions();
    this.ddOptionsPaymentStatus.keyName = 'id';
    this.ddOptionsPaymentStatus.keyDesc = 'value';
    this.ddOptionsPaymentStatus.modelName = 'paymentStatus';
    this.ddOptionsPaymentStatus.baseComponent = this;
    // this.ddOptionsPaymentStatus.selectMulti = true;

    this.ddOptionsRevenueMethod = new DataDropDownOptions();
    this.ddOptionsRevenueMethod.keyName = 'id';
    this.ddOptionsRevenueMethod.keyDesc = 'value';
    this.ddOptionsRevenueMethod.modelName = 'revenueMethod';
    this.ddOptionsRevenueMethod.baseComponent = this;
    // this.ddOptionsRevenueMethod.selectMulti = true;


  }

  getBodyData(): string {
    let body = '';
    body += this.ytdAmountByStartYearReportService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());
    body += this.ytdAmountByStartYearReportService.getDateSearchParam(this.ytdAmountByStartYearModel, body);
    body += this.ytdAmountByStartYearReportService.getDropDownSearchParam(body, 'volumeYear', this.ytdAmountByStartYearModel);
    body += this.ytdAmountByStartYearReportService.getDropDownSearchParam(body, 'marketSector', this.ytdAmountByStartYearModel);
    body += this.ytdAmountByStartYearReportService.getDropDownSearchParam(body, 'revenueMethod', this.ytdAmountByStartYearModel);
    body += this.ytdAmountByStartYearReportService.getDropDownSearchParam(body, 'orderStatus', this.ytdAmountByStartYearModel);
    body += this.ytdAmountByStartYearReportService.getDropDownSearchParam(body, 'paymentStatus', this.ytdAmountByStartYearModel);

    body += this.getBodyLimit(body, this.ytdAmountByStartYearModel.limit);

    return body;
  }

  doOnReset() {
    console.log('doOnReset');
    this.ytdAmountByStartYearModel['volumeYear'] = null;
    this.ytdAmountByStartYearModel['orderStatus'] = null;
    this.ytdAmountByStartYearModel['paymentStatus'] = null;
    this.ytdAmountByStartYearModel['revenueMethod'] = null;
    this.ngVolYear = [];
    this.ngOrderStatus = [];
    this.ngPaymentStatus = [];
    this.ngRevMethod = [];
    this.czDatePicker.calendarCanceled(this);
    this.ytdAmountByStartYearModel.limit = this.sessionObject.limit;
  }


  dynamicColumns() {
    const makeColumns = () => {
      this.dtOptions['columns'] = [];

      this.dtOptions['columns'].push({
        'data': 'journalName',
        'title': 'Journal Name'
      })
      this.dtOptions['columns'].push({
        'data': 'amountHeading',
        'title': 'Amount ' + this.ngVolYear[0]
      })
      this.dtOptions['columns'].push({
        'data': 'difference',
        'title': 'Difference'
      })
      this.dtOptions['columns'].push({
        'data': 'variance',
        'title': 'Variance % '
      })
      this.dtOptions['columns'].push({
        'data': 'amountHeadingPrev',
        'title': 'Amount ' + (parseInt(this.ngVolYear[0], 10) - 1)
      })
    }

    ProjectUtils.dynamicColumns(makeColumns, this.dtOptions);
    console.log('baseProcessData', this.listData, this.dtOptions)

  }


  // this.columnNames = [
  //   {
  //     'data': 'journalName',
  //     'title': 'Journal Name'
  //   }, {
  //     'data': 'amountHeading',
  //     'title': 'Amount ' + this.ngVolYear[0]
  //   }, {
  //     'data': 'difference',
  //     'title': 'Difference'
  //   }, {
  //     'data': 'variance',
  //     'title': 'Variance % ',
  //     render: ProjectUtils.toFixedIfNumber
  //   }, {
  //     'data': 'amountHeadingPrev',
  //     'title': 'Amount ' + (parseInt(this.ngVolYear[0], 10) - 1)
  //   }
  // ]

  // baseProcessData() {
  //   this.listData.forEach((item) => {
  //     item['variance'] = ProjectUtils.toFixedIfNumber(item['variance'])
  //   })
  // }

  sourceCodeListSetup() {
    this.dtAccOptions = ProjectUtils.doOptionSettingsFull('sourceCodeAmountReport', 'YTD Amount By Start Year Source Data');
    this.ytdAmountByStartYearReportService.addSourceCodeColumnsOption(this.dtAccOptions);
    this.dtAccOptions['data'] = [];
  }

  doOnSearch() {
    this.tabsComponent.openTab('YTD Amount By Start Year Source Data',
      this.ytdSourceCodeAmountListTemplate, {}, true, 'sourceCodeAmountReport');

    let body: any = '';
    body += this.ytdAmountByStartYearReportService.getDateSearchParam(this.ytdAmountByStartYearModel, body);
    body += this.ytdAmountByStartYearReportService.getDropDownSearchParam(body, 'volumeYear', this.ytdAmountByStartYearModel);
    body += this.ytdAmountByStartYearReportService.getDropDownSearchParam(body, 'marketSector', this.ytdAmountByStartYearModel);
    body += this.ytdAmountByStartYearReportService.getDropDownSearchParam(body, 'revenueMethod', this.ytdAmountByStartYearModel);
    body += this.ytdAmountByStartYearReportService.getDropDownSearchParam(body, 'orderStatus', this.ytdAmountByStartYearModel);
    body += this.ytdAmountByStartYearReportService.getDropDownSearchParam(body, 'paymentStatus', this.ytdAmountByStartYearModel);

    body += this.getBodyLimit(body, this.ytdAmountByStartYearModel.limit);

    this.fetchDataSub = this.ytdAmountByStartYearReportService.toSearchData(body)
      .subscribe(data => {
        this.setListData(this.YTD_AMOUNT_BY_START_YEAR_SOURCE_CODE_REPORT, data);
      }, err => {
        console.log('data is ', 'empty');
      });

  }


}

