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
import { SingleIssueOrdersModel } from './single-issue-orders.model';
import { SingleIssueOrdersService } from './single-issue-orders.service';

@Component({
  selector: 'app-single-issue-orders',
  templateUrl: './single-issue-orders.component.html',
  styleUrls: ['./single-issue-orders.component.css'],
  providers: [SingleIssueOrdersService]
})
export class SingleIssueOrdersComponent extends BaseComponent {

  private SINGLE_ISSUE_ORDERS = 'SINGLE_ISSUE_ORDERS';
  log = Log.create('SingleIssueOrdersComponent');
  ngProduct: any;
  ngYear: any;


  singleIssueOrdersModel: SingleIssueOrdersModel;

  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  @ViewChild('singleIssueOrdersList') singleIssueOrdersTemplate;
  @ViewChild(TabsComponent) tabsComponent;
  @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;
  ddOptionsProduct: DataDropDownOptions;
  ddOptionsYear: DataDropDownOptions;

  @ViewChild('volYear', { read: DataDropDownComponent }) ddCategory: DataDropDownComponent;
  @ViewChild('productName', { read: DataDropDownComponent }) ddProduct: DataDropDownComponent;
  @ViewChild(CzDatePickerComponent) czDatePicker: CzDatePickerComponent;

  constructor(private router: Router,
    protected loaderService: LoaderService,
    private _logger: Logger,
    protected globalService: GlobalService,
    protected changeService: ChangeService,
    protected saveSearchService: SaveSearchService,
    private singleIssueOrdersService: SingleIssueOrdersService) {
    super(loaderService, changeService, saveSearchService, singleIssueOrdersService, globalService);
    this.log.color = 'lightblue';
    this.doInitialSetup();
    const sessionObject: SessionObject = SessionObject.getSessionObject();
    if (sessionObject.clientID === 'php') {

      this.singleIssueOrdersService.addColumnsOptionPhp(this.dtOptions);
    } else {
      this.singleIssueOrdersService.addColumnsOption(this.dtOptions);
    }
  }

  doInInitLoad() {
    this.hideLoader();
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

  }

  // override
  getLoaderName(): string {
    return 'single-issue-orders';
  }

  // override
  getSearchModel(): any {
    if (ProjectUtils.isEmpty(this.singleIssueOrdersModel)) {
      this.singleIssueOrdersModel = <SingleIssueOrdersModel>this.sessionObject.singleIssueOrdersSearch;
      if (ProjectUtils.isEmpty(this.singleIssueOrdersModel)) {
        this.singleIssueOrdersModel = new SingleIssueOrdersModel();
        this.singleIssueOrdersModel.limit = this.sessionObject.limit

      }
      this.ngProduct = this.singleIssueOrdersModel.productName;
      this.ngYear = this.singleIssueOrdersModel.volYear;

    }
    this.log.i('getSearchModel', this.singleIssueOrdersModel);
    return this.singleIssueOrdersModel;
  }


  // override
  getSearchType(): string {
    return 'singleIssueOrdersSearch';
  }

  // override
  getTabsComponent(): any {
    return this.tabsComponent;
  }


  // override
  getServiceName(): string {
    return this.SINGLE_ISSUE_ORDERS;
  }

  // override
  openListTab() {
    this.tabsComponent.openTab('Single Issue Orders List',
      this.singleIssueOrdersTemplate, {}, true, 'singleIssueOrdersList');
  }

  // override
  getDispSearch(): ThinkListDisplaySearchComponent {
    return this.dispSearch;
  }

  // override
  setSearchModel(searchModel: any) {
    if (!ProjectUtils.isEmpty(searchModel)) {
      if (typeof searchModel === 'string') {
        this.singleIssueOrdersModel = JSON.parse(searchModel);
      } else {
        this.singleIssueOrdersModel = searchModel;
      }
    }
    if (this.singleIssueOrdersModel.limit === '') {
      this.singleIssueOrdersModel.limit = 0;
    }
    this.ngProduct = this.setDropDownComponentValue('productName');
    this.ngYear = this.setDropDownComponentValue('volYear');
    ProjectUtils.setSingleIssueOrdersSearch(this.sessionObject, this.singleIssueOrdersModel);
  }

  getDataElement(whichService: string): DataTableDirective {
    if (whichService === this.SINGLE_ISSUE_ORDERS) {
      return this.dtElement;
    }
  }
  // override
  getReportTitle(): string {
    return 'Single Issue Orders Report';
  }
  getReportIcon(): string {
    return 'fa fa-file-text-o';
  }
  // override
  getReportFileName(): string {
    return 'singleIssueOrdersReport';
  }
  // override
  getBodyData(): string {
    let body = '';
    body += this.singleIssueOrdersService.getDateSearchParam(this.singleIssueOrdersModel, body);
    body += this.singleIssueOrdersService.getDropDownSearchParam(body, 'productName', this.singleIssueOrdersModel);
    body += this.singleIssueOrdersService.getDropDownSearchParam(body, 'volYear', this.singleIssueOrdersModel);
    body += this.getBodyLimit(body, this.singleIssueOrdersModel.limit);
    body += this.singleIssueOrdersService.setParamValue(body, 'issueNo', this.singleIssueOrdersModel['issueNo']);
    body += this.singleIssueOrdersService.setParamValue(body, 'volumnNo', this.singleIssueOrdersModel['volumnNo']);

    return body;
  }

  doOnReset() {
    this.singleIssueOrdersModel['productName'] = null;
    this.singleIssueOrdersModel['volYear'] = null;
    this.czDatePicker.calendarCanceled(this);
    this.ngProduct = [];
    this.ngYear = [];
    this.singleIssueOrdersModel.limit = this.sessionObject.limit
  }

}

