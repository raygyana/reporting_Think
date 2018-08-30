import { Component, ViewChild, AfterContentInit, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { ParamMap } from '@angular/router';
import { DatePipe } from '@angular/common';
// Import from III party
import { DataTableDirective } from 'angular-datatables';
import { TabsetComponent } from '../../../../components/ngtabs';
import { TabsComponent } from '../../../../components/ng-tabs/tabs.component';

import { Logger } from '../../../../core/logger/logger';
import { LoaderService } from '../../../../core/loader/loader.service';
import { BaseComponent } from '../../../../core/base/base.component';
import { ProjectUtils } from '../../../shared/project-utils';
import { Constants } from '../../../shared/constant';
import { DataDropDownOptions } from '../../../../components/data-drop-down/data-drop-down.model';
import { DataDropDownComponent } from '../../../../components/data-drop-down/data-drop-down.component';
import { SessionObject } from '../../../shared/session-object';
import { GlobalService } from '../../../shared/global.service';
import { SearchModelType } from '../../../shared/search-model-type';
import { ChangeService } from '../../../shared/change-service';
import { SaveSearchService } from '../../../shared/save-search-service';
import { Log, Level } from 'ng2-logger';
import { Logger as Loggerr } from '../../../../core/logger/logger';
import { ThinkListDisplaySearchComponent } from '../../../../components/think-list-display-search/think-list-display-search.component';

import { AgencyDetailService } from './agency-detail.service';
import { AgencyDetail } from './agency-detail.model';
import { CzDatePickerComponent } from '../../../../components/cz-date-picker/cz-date-picker.component';

@Component({
  selector: 'app-agency-detail',
  templateUrl: './agency-detail.component.html',
  styleUrls: ['./agency-detail.component.css'],
  providers: [AgencyDetailService]
})
export class AgencyDetailComponent extends BaseComponent implements OnInit, AfterViewInit {

  private AGENCY_DETAILS = 'AGENCY_DETAILS';

  creditOrdersData: any;
  ngcustomerStatus: any;
  agencyDetailModel: AgencyDetail;

  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  @ViewChild('agencyDetailList') agencyDetailListTemplate;
  @ViewChild(TabsComponent) tabsComponent;
  @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;
  ddOptionsOrderType: DataDropDownOptions;

  ddTriggerOrderType: Subject<any> = new Subject();
  @ViewChild('customerStatus', { read: DataDropDownComponent }) ddOrderType: DataDropDownComponent;

  constructor(private router: Router,
    protected loaderService: LoaderService,
    private _logger: Logger,
    protected globalService: GlobalService,
    protected changeService: ChangeService,
    protected saveSearchService: SaveSearchService,
    private agencyDetailService: AgencyDetailService) {
    super(loaderService, changeService, saveSearchService, agencyDetailService, globalService);

    const sessionObject: SessionObject = SessionObject.getSessionObject();
    if (sessionObject.clientID === 'ucp') {
      this.agencyDetailService.addColumnsOptionUcp(this.dtOptions);
    } else {
      this.agencyDetailService.addColumnsOption2(this.dtOptions);
    }
    this.doInitialSetup();
  }

  ngAfterViewInit() {
    this.getCustomerStatusData();
  }

  doInitialSetup() {
    this.ddOptionsOrderType = new DataDropDownOptions();
    this.ddOptionsOrderType.keyName = 'id';
    this.ddOptionsOrderType.keyDesc = 'value';
    this.ddOptionsOrderType.firstOptionText = 'Select a value';
    this.ddOptionsOrderType.modelName = 'customerStatus';
    this.ddOptionsOrderType.baseComponent = this;
    this.ddOptionsOrderType.selectMulti = false;
  }

  getCustomerStatusData() {
    this.creditOrdersData = this.globalService.getCustomerStatusData();
    this.ddTriggerOrderType.next(this.creditOrdersData);
  }
  // override
  getLoaderName(): string {
    return 'Agency-Detail';
  }


  // override
  getSearchModel(): any {
    if (ProjectUtils.isEmpty(this.agencyDetailModel)) {
      this.agencyDetailModel = <AgencyDetail>this.sessionObject.agencyDetail;
      if (ProjectUtils.isEmpty(this.agencyDetailModel)) {
        this.agencyDetailModel = new AgencyDetail();
      }
      this.ngcustomerStatus = this.agencyDetailModel.customerStatus;
      this.agencyDetailModel.limit = this.sessionObject.limit;
    }
    this.log.i('getSearchModel', this.agencyDetailModel);
    return this.agencyDetailModel;
  }


  // override
  getSearchType(): string {
    return 'agencyDetail';
  }

  // override
  getTabsComponent(): any {
    return this.tabsComponent;
  }


  // override
  getServiceName(): string {
    return this.AGENCY_DETAILS;
  }

  // override
  openListTab() {
    this.tabsComponent.openTab('Agency Detail List',
      this.agencyDetailListTemplate, {}, true, 'agencyDetailList');
  }

  // override
  getDispSearch(): ThinkListDisplaySearchComponent {
    return this.dispSearch;
  }

  // override
  setSearchModel(searchModel: any) {
    if (!ProjectUtils.isEmpty(searchModel)) {
      if (typeof searchModel === 'string') {
        this.agencyDetailModel = JSON.parse(searchModel);
      } else {
        this.agencyDetailModel = searchModel;
      }
    }
    if (this.agencyDetailModel.limit === '') {
      this.agencyDetailModel.limit = 0;
    }
    this.ngcustomerStatus = this.setDropDownComponentValue('customerStatus');
    ProjectUtils.setAgencyDetails(this.sessionObject, this.agencyDetailModel);
  }

  getDataElement(whichService: string): DataTableDirective {
    if (whichService === this.AGENCY_DETAILS) {
      return this.dtElement;
    }
  }
  // override
  getReportTitle(): string {
    return 'Agency Detail Report';
  }
  getReportIcon(): string {
    return 'fa fa-file-text-o';
  }
  // override
  getReportFileName(): string {
    return 'Agency Detail';
  }
  // override
  getBodyData(): string {
    let body = '';
    body += this.agencyDetailService.getDateSearchParam(this.agencyDetailModel, body);
    body += this.agencyDetailService.getDropDownSearchParam(body, 'customerStatus', this.agencyDetailModel);
    body += this.getBodyLimit(body, this.agencyDetailModel.limit);

    return body;
  }

  doOnReset() {
    this.agencyDetailModel['customerStatus'] = null;
    this.ngcustomerStatus = [];
    this.agencyDetailModel.limit = this.sessionObject.limit
  }

}
