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
import { GratisOrdersModel } from './gratis-orders.model';
import { GratisOrdersService } from './gratis-orders.service';

@Component({
  selector: 'app-gratis-orders',
  templateUrl: './gratis-orders.component.html',
  styleUrls: ['./gratis-orders.component.css'],
  providers: [GratisOrdersService]
})
export class GratisOrdersComponent extends BaseComponent {
  private GRATIS_ORDERS = 'GRATIS_ORDERS';
  log = Log.create('GratisOrdersComponent');
  ngProduct: any;
  ngYear: any;


  gratisOrdersModel: GratisOrdersModel;

  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  @ViewChild('gratisOrdersList') gratisOrdersTemplate;
  @ViewChild(TabsComponent) tabsComponent;
  @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;
  ddOptionsProduct: DataDropDownOptions;
  ddOptionsYear: DataDropDownOptions;

  @ViewChild('volYear', { read: DataDropDownComponent }) ddVolYear: DataDropDownComponent;
  @ViewChild('productName', { read: DataDropDownComponent }) ddProduct: DataDropDownComponent;
  @ViewChild(CzDatePickerComponent) czDatePicker: CzDatePickerComponent;

  constructor(private router: Router,
    protected loaderService: LoaderService,
    private _logger: Logger,
    protected globalService: GlobalService,
    protected changeService: ChangeService,
    protected saveSearchService: SaveSearchService,
    private gratisOrdersService: GratisOrdersService) {
    super(loaderService, changeService, saveSearchService, gratisOrdersService, globalService);
    this.log.color = 'lightblue';
    this.doInitialSetup();
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
    return 'gratis-orders';
  }

  // override
  getSearchModel(): any {
    if (ProjectUtils.isEmpty(this.gratisOrdersModel)) {
      this.gratisOrdersModel = <GratisOrdersModel>this.sessionObject.gratisOrdersSearch;
      if (ProjectUtils.isEmpty(this.gratisOrdersModel)) {
        this.gratisOrdersModel = new GratisOrdersModel();
        this.gratisOrdersModel.limit = this.sessionObject.limit

      }
      this.ngProduct = this.gratisOrdersModel.productName;
      this.ngYear = this.gratisOrdersModel.volYear;

    }
    this.log.i('getSearchModel', this.gratisOrdersModel);
    return this.gratisOrdersModel;
  }


  // override
  getSearchType(): string {
    return 'gratisOrdersSearch';
  }

  // override
  getTabsComponent(): any {
    return this.tabsComponent;
  }


  // override
  getServiceName(): string {
    return this.GRATIS_ORDERS;
  }

  // override
  openListTab() {
    this.tabsComponent.openTab('Gratis Orders List',
      this.gratisOrdersTemplate, {}, true, 'gratisOrdersList');
  }

  // override
  getDispSearch(): ThinkListDisplaySearchComponent {
    return this.dispSearch;
  }

  // override
  setSearchModel(searchModel: any) {
    if (!ProjectUtils.isEmpty(searchModel)) {
      if (typeof searchModel === 'string') {
        this.gratisOrdersModel = JSON.parse(searchModel);
      } else {
        this.gratisOrdersModel = searchModel;
      }
    }
    if (this.gratisOrdersModel.limit === '') {
      this.gratisOrdersModel.limit = 0;
    }
    this.ngProduct = this.setDropDownComponentValue('productName');
    this.ngYear = this.setDropDownComponentValue('volYear');
    ProjectUtils.setGratisOrdersSearch(this.sessionObject, this.gratisOrdersModel);
  }

  getDataElement(whichService: string): DataTableDirective {
    if (whichService === this.GRATIS_ORDERS) {
      return this.dtElement;
    }
  }
  // override
  getReportTitle(): string {
    return 'Gratis Orders Report';
  }
  getReportIcon(): string {
    return 'fa fa-file-text-o';
  }
  // override
  getReportFileName(): string {
    return 'gratisOrdersReport';
  }
  // override
  getBodyData(): string {
    let body = '';
    body += this.gratisOrdersService.getDateSearchParam(this.gratisOrdersModel, body);
    body += this.gratisOrdersService.getDropDownSearchParam(body, 'productName', this.gratisOrdersModel);
    body += this.gratisOrdersService.getDropDownSearchParam(body, 'volYear', this.gratisOrdersModel);
    body += this.getBodyLimit(body, this.gratisOrdersModel.limit);

    return body;
  }

  doOnReset() {
    this.gratisOrdersModel['productName'] = null;
    this.gratisOrdersModel['volYear'] = null;
    this.czDatePicker.calendarCanceled(this);
    this.ngProduct = [];
    this.ngYear = [];
    this.gratisOrdersModel.limit = this.sessionObject.limit
  }

}

