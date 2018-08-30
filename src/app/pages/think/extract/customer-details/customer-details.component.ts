import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { ParamMap } from '@angular/router';
import { DatePipe } from '@angular/common';
// Import from III party
import { DataTableDirective } from 'angular-datatables';
import { TabsetComponent, TabsComponent, DataDropDownOptions, DataDropDownComponent, ThinkListDisplaySearchComponent } from '../../../../components';
import { } from '../../../../components/ng-tabs/tabs.component';
import { Logger, LoaderService, Logger as Loggerr, BaseComponent, } from '../../../../core';
import { ProjectUtils, Constants, SessionObject, GlobalService, SearchModelType, ChangeService, SaveSearchService } from '../../../shared';
import { Log, Level } from 'ng2-logger';
import { CustomerDetailsModel } from './customer-details.model';
import { CustomerDetailsService } from './customer-details.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css'],
  providers: [CustomerDetailsService]
})
export class CustomerDetailsComponent extends BaseComponent {

  private CUSTOMER_DETAILS = 'CUSTOMER_DETAILS';
  log = Log.create('CustomerDetailsComponent');
  ngStatus: any;
  customerStatusData: any;
  customerDetailsModel: CustomerDetailsModel;

  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  @ViewChild('customerDetailsList') customerDetailsTemplate;
  @ViewChild(TabsComponent) tabsComponent;
  @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;
  ddOptionsStatus: DataDropDownOptions;
  ddTriggerStatus: Subject<any> = new Subject();

  @ViewChild('customerStatus', { read: DataDropDownComponent }) ddCategory: DataDropDownComponent;

  constructor(private router: Router,
    protected loaderService: LoaderService,
    private _logger: Logger,
    protected globalService: GlobalService,
    protected changeService: ChangeService,
    protected saveSearchService: SaveSearchService,
    private customerDetailsService: CustomerDetailsService) {
    super(loaderService, changeService, saveSearchService, customerDetailsService, globalService);
    this.log.color = 'lightblue';
    this.doInitialSetup();
    const sessionObject: SessionObject = SessionObject.getSessionObject();
    if (sessionObject.clientID === 'php') {

      this.customerDetailsService.addColumnsOptionPhp(this.dtOptions);
    } else {
      this.customerDetailsService.addColumnsOption(this.dtOptions);
    }
  }

  doInInitLoad() {
    this.hideLoader();
    this.getCustomerStatusData();
  }

  doInitialSetup() {

    this.ddOptionsStatus = new DataDropDownOptions();
    this.ddOptionsStatus.keyName = 'id';
    this.ddOptionsStatus.keyDesc = 'value';
    this.ddOptionsStatus.firstOptionText = 'Select a Value';
    this.ddOptionsStatus.modelName = 'customerStatus';
    this.ddOptionsStatus.baseComponent = this;

  }
  getCustomerStatusData() {
    this.customerStatusData = this.globalService.getCustomerStatusData();
    this.ddTriggerStatus.next(this.customerStatusData);
  }

  // override
  getLoaderName(): string {
    return 'customer-details';
  }

  // override
  getSearchModel(): any {
    if (ProjectUtils.isEmpty(this.customerDetailsModel)) {
      this.customerDetailsModel = <CustomerDetailsModel>this.sessionObject.customerDetailsSearch;
      if (ProjectUtils.isEmpty(this.customerDetailsModel)) {
        this.customerDetailsModel = new CustomerDetailsModel();
        this.customerDetailsModel.limit = this.sessionObject.limit

      }
      this.ngStatus = this.customerDetailsModel.customerStatus;

    }
    this.log.i('getSearchModel', this.customerDetailsModel);
    return this.customerDetailsModel;
  }


  // override
  getSearchType(): string {
    return 'customerDetailsSearch';
  }

  // override
  getTabsComponent(): any {
    return this.tabsComponent;
  }


  // override
  getServiceName(): string {
    return this.CUSTOMER_DETAILS;
  }

  // override
  openListTab() {
    this.tabsComponent.openTab('Customer Details List',
      this.customerDetailsTemplate, {}, true, 'customerDetailsList');
  }

  // override
  getDispSearch(): ThinkListDisplaySearchComponent {
    return this.dispSearch;
  }

  // override
  setSearchModel(searchModel: any) {
    if (!ProjectUtils.isEmpty(searchModel)) {
      if (typeof searchModel === 'string') {
        this.customerDetailsModel = JSON.parse(searchModel);
      } else {
        this.customerDetailsModel = searchModel;
      }
    }
    if (this.customerDetailsModel.limit === '') {
      this.customerDetailsModel.limit = 0;
    }
    this.ngStatus = this.setDropDownComponentValue('customerStatus');
    ProjectUtils.setCustomerDetailsSearch(this.sessionObject, this.customerDetailsModel);
  }

  getDataElement(whichService: string): DataTableDirective {
    if (whichService === this.CUSTOMER_DETAILS) {
      return this.dtElement;
    }
  }
  // override
  getReportTitle(): string {
    return 'Customer Details Report';
  }
  getReportIcon(): string {
    return 'fa fa-file-text-o';
  }
  // override
  getReportFileName(): string {
    return 'customerDetailsReport';
  }
  // override
  getBodyData(): string {
    let body = '';
    body += this.customerDetailsService.getDateSearchParam(this.customerDetailsModel, body);
    body += this.customerDetailsService.getDropDownSearchParam(body, 'customerStatus', this.customerDetailsModel);
    body += this.getBodyLimit(body, this.customerDetailsModel.limit);

    return body;
  }

  doOnReset() {
    this.customerDetailsModel['customerStatus'] = null;
    this.ngStatus = [];
    this.customerDetailsModel.limit = this.sessionObject.limit
  }

}


