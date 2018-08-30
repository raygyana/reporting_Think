import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { ParamMap } from '@angular/router';
import { DatePipe } from '@angular/common';
// Import from III party
import { DataTableDirective } from 'angular-datatables';
import { TabsetComponent, ModalModelOptions, TabsComponent, DataDropDownOptions, DataDropDownComponent, ThinkListDisplaySearchComponent, CzDatePickerComponent } from '../../../../components';
import { Logger, LoaderService, BaseComponent, } from '../../../../core';
import { ProjectUtils, Constants, SessionObject, GlobalService, ChangeService, SaveSearchService } from '../../../shared';
import { DetailsCircexcldReportService } from './detail-circ.excld-pack.service';
import { DetailsCircexcldPackModel } from './detail-circ.excld-pack.model';

@Component({
  selector: 'app-detail-circ.excld-pack',
  templateUrl: './detail-circ.excld-pack.component.html',
  styleUrls: ['./detail-circ.excld-pack.component.css'],
  providers: [DetailsCircexcldReportService]
})
export class DetailCircExcldPackComponent extends BaseComponent {
  showInfoPopUp: ModalModelOptions;
  ngProduct: any;
  ngVolYear: any;
  ngOrderType: any;
  ngPrCategory: any;
  ngRevMethod: any;
  ngsalesRep: any;

  private DETAILS_CIRCULATION_REPORT = 'detailsCirculationReport';

  detailsCircexcldPackModel: DetailsCircexcldPackModel;
  ddOptionsexpyear: DataDropDownOptions;
  ddOptionscategory: DataDropDownOptions;
  ddOptionsproductName: DataDropDownOptions;
  ddOptionsOrderType: DataDropDownOptions;
  ddOptionsRevenueMethod: DataDropDownOptions;
  ddTriggerRevenueMethod: Subject<any> = new Subject();
  ddOptionsSalesRep: DataDropDownOptions;
  ddTriggerOrderType: Subject<any> = new Subject();
  isSalesRepDisable: false;
  isRevenueDisable: false;

  @ViewChild('detailsCirculationReportData', { read: DataTableDirective }) dtElement: DataTableDirective;
  @ViewChild('detailsCirculationReportList') detailsCirculationReportListTemplate;
  @ViewChild(TabsComponent) tabsComponent;
  @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;
  @ViewChild('volYear', { read: DataDropDownComponent }) ddExpYear: DataDropDownComponent;
  @ViewChild('productName', { read: DataDropDownComponent }) ddProductName: DataDropDownComponent;
  @ViewChild('prCategory', { read: DataDropDownComponent }) ddCategory: DataDropDownComponent;
  @ViewChild('orderType', { read: DataDropDownComponent }) ddOrderType: DataDropDownComponent;
  @ViewChild('revMethod', { read: DataDropDownComponent }) ddRevenueMethod: DataDropDownComponent;
  @ViewChild(CzDatePickerComponent) czDatePicker: CzDatePickerComponent;


  constructor(private router: Router,
    protected loaderService: LoaderService,
    private _logger: Logger,
    protected changeService: ChangeService,
    protected saveSearchService: SaveSearchService,
    private detailsCircexcldReportService: DetailsCircexcldReportService,
    protected globalService: GlobalService) {
    super(loaderService, changeService, saveSearchService, detailsCircexcldReportService, globalService);
    this.isRevenueDisable = this.sessionObject.clientSettings.SALES_DECIR.revenueMethod.disabled;
    this.isSalesRepDisable = this.sessionObject.clientSettings.SALES_DECIR.salesRep.disabled;
    this.getSearchModel();
    this.doOnIntialSetup();
    console.log(this.detailsCircexcldPackModel);
  }

  doInInitLoad() {
    this.globalService.getOrderTypeData(this.sessionObject.clientID, this.ddTriggerOrderType);
    this.globalService.getRevenueMethodData(this.ddTriggerRevenueMethod);
    this.hideLoader();
  }
  // override
  getLoaderName(): string {
    return 'detail-circulation-report';
  }

  // override
  getSearchModel(): any {
    console.log(this.detailsCircexcldPackModel);
    if (ProjectUtils.isEmpty(this.detailsCircexcldPackModel)) {
      this.detailsCircexcldPackModel = <DetailsCircexcldPackModel>this.sessionObject.detailsCirculationReportSearch;
      if (ProjectUtils.isEmpty(this.detailsCircexcldPackModel)) {
        this.detailsCircexcldPackModel = new DetailsCircexcldPackModel();
        this.detailsCircexcldPackModel.limit = this.sessionObject.limit;
      }
      this.ngVolYear = this.detailsCircexcldPackModel.volYear;
      this.ngProduct = this.detailsCircexcldPackModel.productName;
      this.ngPrCategory = this.detailsCircexcldPackModel.prCategory;
      this.ngOrderType = this.detailsCircexcldPackModel.orderType;
      this.ngRevMethod = this.detailsCircexcldPackModel.revMethod;
    }
    console.log('getSearchModel::this.detailsCircexcldPackModel', this.detailsCircexcldPackModel);
    return this.detailsCircexcldPackModel;
  }
  // override
  getSearchType(): string {
    return 'detailsCirc.ExcldReportSearch';
  }

  getServiceName(): string {
    return this.DETAILS_CIRCULATION_REPORT;
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
    this.tabsComponent.openTab('Detail Circ.excld Pack Report List',
      this.detailsCirculationReportListTemplate, {}, true, 'detailsCirculationexcldPackReportList');
  }
  // override
  getDispSearch(): ThinkListDisplaySearchComponent {
    return this.dispSearch;
  }

  // override
  getReportTitle(): string {
    return 'Detail Circ.excld Report';
  }

  // override
  getReportFileName(): string {
    return 'detailCirculationExcldReport';
  }

  // override
  setSearchModel(searchModel: any) {
    if (!ProjectUtils.isEmpty(searchModel)) {
      if (typeof searchModel === 'string') {
        this.detailsCircexcldPackModel = JSON.parse(searchModel);
      } else {
        this.detailsCircexcldPackModel = searchModel;
      }
    }
    if (this.detailsCircexcldPackModel.limit === '') {
      this.detailsCircexcldPackModel.limit = 0;
    }
    console.log('setSearchModel', this.detailsCircexcldPackModel);

    this.ngVolYear = this.setDropDownComponentValue('volYear');
    this.ngProduct = this.setDropDownComponentValue('productName');
    this.ngPrCategory = this.setDropDownComponentValue('prCategory');
    this.ngOrderType = this.setDropDownComponentValue('orderType');
    this.ngRevMethod = this.setDropDownComponentValue('revMethod');
    console.log('setSearchModel', this.detailsCircexcldPackModel);
    ProjectUtils.setDetailsCircExcldReportSearch(this.sessionObject, this.detailsCircexcldPackModel);
  }

  // override
  getDataElement(whichService: string): DataTableDirective {
    return this.dtElement;
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
    this.ddOptionsexpyear.modelName = 'volYear';
    this.ddOptionsexpyear.baseComponent = this;

    this.ddOptionscategory = new DataDropDownOptions();
    this.ddOptionscategory.serviceURL = Constants.TK_SALE_CATEGORY_DROPDOWN_URL;
    this.ddOptionscategory.keyName = 'subscriptionCategoryId';
    this.ddOptionscategory.keyDesc = 'description';
    this.ddOptionscategory.modelName = 'prCategory';
    this.ddOptionscategory.baseComponent = this;
    this.ddOptionscategory.selectMulti = true;


    this.ddOptionsproductName = new DataDropDownOptions();
    this.ddOptionsproductName.serviceURL = Constants.TK_SALE_JOURNAL_LIST_URL;
    this.ddOptionsproductName.keyName = 'ocID';
    this.ddOptionsproductName.keyDesc = 'description';
    this.ddOptionsproductName.modelName = 'productName';
    this.ddOptionsproductName.baseComponent = this;
    this.ddOptionsproductName.selectMulti = true;

    this.ddOptionsOrderType = new DataDropDownOptions();
    this.ddOptionsOrderType.keyName = 'id';
    this.ddOptionsOrderType.keyDesc = 'value';
    this.ddOptionsOrderType.modelName = 'orderType';
    this.ddOptionsOrderType.baseComponent = this;
    this.ddOptionsOrderType.selectMulti = true;


    this.ddOptionsRevenueMethod = new DataDropDownOptions();
    this.ddOptionsRevenueMethod.keyName = 'id';
    this.ddOptionsRevenueMethod.keyDesc = 'value';
    this.ddOptionsRevenueMethod.modelName = 'revMethod';
    this.ddOptionsRevenueMethod.baseComponent = this;
    this.ddOptionsRevenueMethod.selectMulti = true;
  }

  getBodyData(): string {
    let body = '';
    body += this.detailsCircexcldReportService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());
    body += this.detailsCircexcldReportService.getDateSearchParam(this.detailsCircexcldPackModel, body);
    body += this.detailsCircexcldReportService.getDropDownSearchParam(body, 'prCategory', this.detailsCircexcldPackModel);
    body += this.detailsCircexcldReportService.getDropDownSearchParam(body, 'productName', this.detailsCircexcldPackModel);
    body += this.detailsCircexcldReportService.getDropDownSearchParam(body, 'volYear', this.detailsCircexcldPackModel);
    body += this.detailsCircexcldReportService.getDropDownSearchParam(body, 'orderType', this.detailsCircexcldPackModel);
    body += this.detailsCircexcldReportService.getDropDownSearchParam(body, 'revMethod', this.detailsCircexcldPackModel);

    body += this.getBodyLimit(body, this.detailsCircexcldPackModel.limit);

    return body;
  }

  doOnReset() {
    console.log('doOnReset');
    this.detailsCircexcldPackModel['volYear'] = null;
    this.detailsCircexcldPackModel['productName'] = null;
    this.detailsCircexcldPackModel['prCategory'] = null;
    this.detailsCircexcldPackModel['orderType'] = null;
    this.detailsCircexcldPackModel['revMethod'] = null;
    this.ngVolYear = [];
    this.ngProduct = [];
    this.ngPrCategory = [];
    this.ngOrderType = [];
    this.ngRevMethod = [];
    // this.ngsalesRep = [];
    this.czDatePicker.calendarCanceled(this);
    this.detailsCircexcldPackModel.limit = this.sessionObject.limit;
  }

}
