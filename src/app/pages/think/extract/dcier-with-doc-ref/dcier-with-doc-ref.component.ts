import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { ParamMap } from '@angular/router';
import { DatePipe } from '@angular/common';
// Import from III party
import { DataTableDirective } from 'angular-datatables';
import { TabsetComponent, ModalModelOptions } from '../../../../components';
import { TabsComponent } from '../../../../components/ng-tabs/tabs.component';
import { DataDropDownOptions } from '../../../../components/data-drop-down/data-drop-down.model';
import { DataDropDownComponent } from '../../../../components/data-drop-down/data-drop-down.component';
import { ThinkListDisplaySearchComponent } from '../../../../components/think-list-display-search/think-list-display-search.component';

import { Logger } from '../../../../core/logger/logger';
import { LoaderService } from '../../../../core/loader/loader.service';
import { BaseComponent } from '../../../../core/base/base.component';
import { ProjectUtils } from '../../../shared/project-utils';
import { Constants } from '../../../shared/constant';
import { SessionObject } from '../../../shared/session-object';
import { GlobalService } from '../../../shared/global.service';

import { ChangeService } from '../../../shared/change-service';
import { SaveSearchService } from '../../../shared/save-search-service';

import { DCIERWithDocRefService } from './dcier-with-doc-ref.service';
import { DCIERWithDocRefModel } from './dcier-with-doc-ref.model';
import { CzDatePickerComponent } from '../../../../components/cz-date-picker/cz-date-picker.component';



@Component({
  selector: 'app-dcier-with-doc-ref',
  templateUrl: './dcier-with-doc-ref.component.html',
  styleUrls: ['./dcier-with-doc-ref.component.css'],
  providers: [DCIERWithDocRefService]
})
export class DcierWithDocRefComponent extends BaseComponent implements OnInit, AfterViewInit {
  // showInfoPopUp: ModalModelOptions;
  // creditOrdersData: any;
  ngProduct: any;
  ngVolYear: any;
  ngOrderType: any;
  ngPrCategory: any;
  // ngRevMethod: any;
  ngsalesRep: any;

  private DCIER_WITH_DOC_REF = 'dcierWithDocRef';

  dCIERWithDocRefModel: DCIERWithDocRefModel;

  ddOptionsexpyear: DataDropDownOptions;
  ddOptionscategory: DataDropDownOptions;
  ddOptionsproductName: DataDropDownOptions;
  ddOptionsOrderType: DataDropDownOptions;
  ddOptionsRevenueMethod: DataDropDownOptions;
  // ddTriggerRevenueMethod: Subject<any> = new Subject();
  ddOptionsSalesRep: DataDropDownOptions;
  ddTriggerOrderType: Subject<any> = new Subject();

  isSalesRepDisable: boolean;


  @ViewChild('dcierWithDocRefData', { read: DataTableDirective }) dtElement: DataTableDirective;
  @ViewChild('dcierWithDocRefList') dcierWithDocRefListTemplate;
  @ViewChild(TabsComponent) tabsComponent;
  @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;
  @ViewChild('volYear', { read: DataDropDownComponent }) ddExpYear: DataDropDownComponent;
  @ViewChild('productName', { read: DataDropDownComponent }) ddProductName: DataDropDownComponent;
  @ViewChild('prCategory', { read: DataDropDownComponent }) ddCategory: DataDropDownComponent;
  @ViewChild('orderType', { read: DataDropDownComponent }) ddOrderType: DataDropDownComponent;
  @ViewChild('salesRep', { read: DataDropDownComponent }) ddSalesRep: DataDropDownComponent;
  @ViewChild(CzDatePickerComponent) czDatePicker: CzDatePickerComponent;

  constructor(
    private router: Router,
    protected loaderService: LoaderService,
    private _logger: Logger,
    protected changeService: ChangeService,
    protected saveSearchService: SaveSearchService,
    private dcierWithDocRefService: DCIERWithDocRefService,
    protected globalService: GlobalService) {
    super(loaderService, changeService, saveSearchService, dcierWithDocRefService, globalService);

    this.isSalesRepDisable = this.sessionObject.clientSettings.SALES_DECIR.salesRep.disabled;

    this.doOnIntialSetup();
    //this.createModalPopUp();
  }

  ngAfterViewInit() {

  }

  // createModalPopUp() {
  //   this.showInfoPopUp = new ModalModelOptions();
  //   this.showInfoPopUp.captionHeading = 'Information';
  //   this.showInfoPopUp.bodyMessage = 'DCIER With Doc Ref detail for various order statuses, Order Placed, Active/Shipping and Complete';
  //   this.showInfoPopUp.button1 = null;
  //   this.showInfoPopUp.button2 = 'Ok';
  // }

  doInInitLoad() {
    this.globalService.getOrderTypeData(this.sessionObject.clientID, this.ddTriggerOrderType);

    // this.creditOrdersData = this.globalService.getOrderTypeData(this.sessionObject.clientID, this.ddTriggerOrderType);
    // this.ddTriggerOrderType.next(this.creditOrdersData);
    // this.hideLoader();
  }

  // override
  getLoaderName(): string {
    return 'dcier-with-doc-ref-report';
  }

  // override
  getSearchModel(): any {
    if (ProjectUtils.isEmpty(this.dCIERWithDocRefModel)) {
      this.dCIERWithDocRefModel = <DCIERWithDocRefModel>this.sessionObject.dcierWithDocRefSearch;
      if (ProjectUtils.isEmpty(this.dCIERWithDocRefModel)) {
        this.dCIERWithDocRefModel = new DCIERWithDocRefModel();
        this.dCIERWithDocRefModel.limit = this.sessionObject.limit;
      }
      this.ngVolYear = this.dCIERWithDocRefModel.volYear;
      this.ngProduct = this.dCIERWithDocRefModel.productName;
      this.ngPrCategory = this.dCIERWithDocRefModel.prCategory;
      this.ngOrderType = this.dCIERWithDocRefModel.orderType;
      this.ngsalesRep = this.dCIERWithDocRefModel.salesRep;
    }
    return this.dCIERWithDocRefModel;
  }

  // override
  getSearchType(): string {
    return 'dcierWithDocRefSearch';
  }

  getServiceName(): string {
    return this.DCIER_WITH_DOC_REF;
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
    this.tabsComponent.openTab('DCIER With Doc Ref List',
      this.dcierWithDocRefListTemplate, {}, true, 'dcierWithDocRefList');
  }
  // override
  getDispSearch(): ThinkListDisplaySearchComponent {
    return this.dispSearch;
  }

  // override
  getReportTitle(): string {
    return 'DCIER With Doc Ref Report';
  }

  // override
  getReportFileName(): string {
    return 'dCIERWithDocRefReport';
  }

  // override
  setSearchModel(searchModel: any) {
    if (!ProjectUtils.isEmpty(searchModel)) {
      if (typeof searchModel === 'string') {
        this.dCIERWithDocRefModel = JSON.parse(searchModel);
      } else {
        this.dCIERWithDocRefModel = searchModel;
      }
    }
    if (this.dCIERWithDocRefModel.limit === '') {
      this.dCIERWithDocRefModel.limit = 0;
    }
    console.log('setSearchModel', this.dCIERWithDocRefModel);

    this.ngVolYear = this.setDropDownComponentValue('volYear');
    this.ngProduct = this.setDropDownComponentValue('productName');
    this.ngPrCategory = this.setDropDownComponentValue('prCategory');
    this.ngOrderType = this.setDropDownComponentValue('orderType');
    this.ngsalesRep = this.setDropDownComponentValue('salesRep');

    console.log('setSearchModel', this.dCIERWithDocRefModel);
    ProjectUtils.setDcierWithDocRefSearch(this.sessionObject, this.dCIERWithDocRefModel);
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
    //this.ddOptionsOrderType.serviceURL = Constants.TK_SALE_JOURNAL_LIST_URL;
    this.ddOptionsOrderType.keyName = 'id';
    this.ddOptionsOrderType.keyDesc = 'value';
    this.ddOptionsOrderType.modelName = 'orderType';
    this.ddOptionsOrderType.baseComponent = this;
    this.ddOptionsOrderType.selectMulti = true;


    // this.ddOptionsRevenueMethod = new DataDropDownOptions();
    // this.ddOptionsRevenueMethod.serviceURL = Constants.TK_SALE_JOURNAL_LIST_URL;
    // this.ddOptionsRevenueMethod.keyName = 'id';
    // this.ddOptionsRevenueMethod.keyDesc = 'value';
    // this.ddOptionsRevenueMethod.modelName = 'revMethod';
    // this.ddOptionsRevenueMethod.baseComponent = this;
    // this.ddOptionsRevenueMethod.selectMulti = true;


    this.ddOptionsSalesRep = new DataDropDownOptions();
    this.ddOptionsSalesRep.serviceURL = Constants.TK_ER_SALES_REP_URL;
    this.ddOptionsSalesRep.keyName = 'sales_representative_id';
    this.ddOptionsSalesRep.keyDesc = 'sales_representative';
    this.ddOptionsSalesRep.modelName = 'salesRep';
    this.ddOptionsSalesRep.baseComponent = this;
    this.ddOptionsSalesRep.selectMulti = true;
  }

  getBodyData(): string {
    let body = '';
    body += this.dcierWithDocRefService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());
    body += this.dcierWithDocRefService.getDateSearchParam(this.dCIERWithDocRefModel, body);
    body += this.dcierWithDocRefService.getDropDownSearchParam(body, 'prCategory', this.dCIERWithDocRefModel);
    body += this.dcierWithDocRefService.getDropDownSearchParam(body, 'productName', this.dCIERWithDocRefModel);
    body += this.dcierWithDocRefService.getDropDownSearchParam(body, 'volYear', this.dCIERWithDocRefModel);
    body += this.dcierWithDocRefService.getDropDownSearchParam(body, 'orderType', this.dCIERWithDocRefModel);
    body += this.dcierWithDocRefService.getDropDownSearchParam(body, 'salesRep', this.dCIERWithDocRefModel);
    // body += this.dcierWithDocRefService.getDropDownSearchParam(body, 'revMethod', this.dCIERWithDocRefModel);

    body += this.getBodyLimit(body, this.dCIERWithDocRefModel.limit);

    return body;
  }

  doOnReset() {
    console.log('doOnReset');
    this.dCIERWithDocRefModel['volYear'] = null;
    this.dCIERWithDocRefModel['productName'] = null;
    this.dCIERWithDocRefModel['prCategory'] = null;
    this.dCIERWithDocRefModel['orderType'] = null;
    // this.dCIERWithDocRefModel['revMethod'] = null;
    this.ngVolYear = [];
    this.ngProduct = [];
    this.ngPrCategory = [];
    this.ngOrderType = [];
    // this.ngRevMethod = [];
    this.ngsalesRep = [];
    this.czDatePicker.calendarCanceled(this);
    this.dCIERWithDocRefModel.limit = this.sessionObject.limit;
  }

}
