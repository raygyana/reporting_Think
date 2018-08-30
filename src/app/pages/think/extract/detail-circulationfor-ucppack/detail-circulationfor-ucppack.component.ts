import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { ParamMap } from '@angular/router';
import { DatePipe } from '@angular/common';
// Import from III party
import { DataTableDirective } from 'angular-datatables';
import { TabsetComponent, ModalModelOptions, TabsComponent, DataDropDownOptions, DataDropDownComponent, ThinkListDisplaySearchComponent, CzDatePickerComponent } from '../../../../components';
import { Logger, LoaderService, BaseComponent, } from '../../../../core';
import { ProjectUtils, Constants, SessionObject, GlobalService, ChangeService, SaveSearchService } from '../../../shared';
import { DetailsCirculationUcpReportService } from './detail-circulationfor-ucppack.service';
import { DetailsCirculationUcpReportModel } from './detail-circulationfor-ucppack.model';

@Component({
  selector: 'app-detail-circulationfor-ucppack',
  templateUrl: './detail-circulationfor-ucppack.component.html',
  styleUrls: ['./detail-circulationfor-ucppack.component.css'],
  providers: [DetailsCirculationUcpReportService]
})
export class DetailCirculationforUcppackComponent extends BaseComponent {

  showInfoPopUp: ModalModelOptions;
  ngVolYear: any;
  ngOrderType: any;
  ngRevMethod: any;

  private DETAILS_CIRCULATION_REPORT = 'detailsCirculationReport';

  detailsCirculationUcpReportModel: DetailsCirculationUcpReportModel;
  ddOptionsexpyear: DataDropDownOptions;
  ddOptionsOrderType: DataDropDownOptions;
  ddOptionsRevenueMethod: DataDropDownOptions;
  ddTriggerRevenueMethod: Subject<any> = new Subject();
  ddTriggerOrderType: Subject<any> = new Subject();

  @ViewChild('detailsCirculationForUCPReportData', { read: DataTableDirective }) dtElement: DataTableDirective;
  @ViewChild('detailsCirculationUCPReportList') detailsCirculationReportListTemplate;
  @ViewChild(TabsComponent) tabsComponent;
  @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;
  @ViewChild('volYear', { read: DataDropDownComponent }) ddExpYear: DataDropDownComponent;
  @ViewChild('orderType', { read: DataDropDownComponent }) ddOrderType: DataDropDownComponent;
  @ViewChild('revMethod', { read: DataDropDownComponent }) ddRevenueMethod: DataDropDownComponent;
  @ViewChild(CzDatePickerComponent) czDatePicker: CzDatePickerComponent;


  constructor(private router: Router,
    protected loaderService: LoaderService,
    private _logger: Logger,
    protected changeService: ChangeService,
    protected saveSearchService: SaveSearchService,
    private detailsCirculationUcpReportService: DetailsCirculationUcpReportService,
    protected globalService: GlobalService) {
    super(loaderService, changeService, saveSearchService, detailsCirculationUcpReportService, globalService);
    this.getSearchModel();
    this.doOnIntialSetup();
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

  checkchange(e) {
    if (e.target.checked) {
      console.log('checked');
      this.detailsCirculationUcpReportModel.content = {
        'id': '1',
        'desc': 'Show Item Price',
        'columnName': 'content'
      };

    } else {
      console.log('unchecked');
      this.detailsCirculationUcpReportModel.content = '';
    }
  }
  // override
  getSearchModel(): any {
    console.log(this.detailsCirculationUcpReportModel);
    if (ProjectUtils.isEmpty(this.detailsCirculationUcpReportModel)) {
      this.detailsCirculationUcpReportModel = <DetailsCirculationUcpReportModel>this.sessionObject.detailsCirculationReportSearch;
      if (ProjectUtils.isEmpty(this.detailsCirculationUcpReportModel)) {
        this.detailsCirculationUcpReportModel = new DetailsCirculationUcpReportModel();
        this.detailsCirculationUcpReportModel.limit = this.sessionObject.limit;
      }
      this.ngVolYear = this.detailsCirculationUcpReportModel.volYear;
      this.ngOrderType = this.detailsCirculationUcpReportModel.orderType;
      this.ngRevMethod = this.detailsCirculationUcpReportModel.revMethod;
    }
    console.log('getSearchModel::this.detailsCirculationUcpReportModel', this.detailsCirculationUcpReportModel);
    return this.detailsCirculationUcpReportModel;
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
    this.tabsComponent.openTab('detail Circulation for UCP Pack Search List',
      this.detailsCirculationReportListTemplate, {}, true, 'detail detailsCirculationUCPReportList');
  }
  // override
  getDispSearch(): ThinkListDisplaySearchComponent {
    return this.dispSearch;
  }

  // override
  getReportTitle(): string {
    return 'Detail Circulation for UCP Pack';
  }

  // override
  getReportFileName(): string {
    return 'detailCirculationforUCPPack';
  }

  // override
  setSearchModel(searchModel: any) {
    if (!ProjectUtils.isEmpty(searchModel)) {
      if (typeof searchModel === 'string') {
        this.detailsCirculationUcpReportModel = JSON.parse(searchModel);
      } else {
        this.detailsCirculationUcpReportModel = searchModel;
      }
    }
    if (this.detailsCirculationUcpReportModel.limit === '') {
      this.detailsCirculationUcpReportModel.limit = 0;
    }
    console.log('setSearchModel', this.detailsCirculationUcpReportModel);

    this.ngVolYear = this.setDropDownComponentValue('volYear');
    this.ngOrderType = this.setDropDownComponentValue('orderType');
    this.ngRevMethod = this.setDropDownComponentValue('revMethod');
    console.log('setSearchModel', this.detailsCirculationUcpReportModel);
    ProjectUtils.setDetailCirculationforUCPPackSearch(this.sessionObject, this.detailsCirculationUcpReportModel);
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
    body += this.detailsCirculationUcpReportService.getDropDownSearchParam(body, 'content', this.detailsCirculationUcpReportModel);
    body += this.detailsCirculationUcpReportService.getDateSearchParam(this.detailsCirculationUcpReportModel, body);
    body += this.detailsCirculationUcpReportService.getDropDownSearchParam(body, 'volYear', this.detailsCirculationUcpReportModel);
    body += this.detailsCirculationUcpReportService.getDropDownSearchParam(body, 'orderType', this.detailsCirculationUcpReportModel);
    body += this.detailsCirculationUcpReportService.getDropDownSearchParam(body, 'revMethod', this.detailsCirculationUcpReportModel);
    body += this.getBodyLimit(body, this.detailsCirculationUcpReportModel.limit);
    return body;
  }

  doOnReset() {
    this.detailsCirculationUcpReportModel['volYear'] = null;
    this.detailsCirculationUcpReportModel['orderType'] = null;
    this.detailsCirculationUcpReportModel['revMethod'] = null;
    this.ngVolYear = [];
    this.ngOrderType = [];
    this.ngRevMethod = [];
    this.czDatePicker.calendarCanceled(this);
    this.detailsCirculationUcpReportModel.limit = this.sessionObject.limit;
  }
}
