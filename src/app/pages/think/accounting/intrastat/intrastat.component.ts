import { Component, ViewChild } from '@angular/core';
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
import { Log, Level } from 'ng2-logger';
import { Logger as Loggerr } from '../../../../core/logger/logger';
import { SaveSearchService } from '../../../shared/save-search-service';
import { ThinkListDisplaySearchComponent } from '../../../../components/think-list-display-search/think-list-display-search.component';
import { CzDatePickerComponent } from '../../../../components/cz-date-picker/cz-date-picker.component';
import { IntrastatService } from './intrastat.service';
import { IntrastatModel } from './intrastat.model';

@Component({
  selector: 'app-intrastat',
  templateUrl: './intrastat.component.html',
  styleUrls: ['./intrastat.component.css'],
  providers: [IntrastatService]
})
export class IntrastatComponent extends BaseComponent {

  private INTRASTAT_REPORT = 'INTRASTAT_REPORT';
  log = Log.create('IntrastatComponent');
  // ngCenter: any;
  intrastatModel: IntrastatModel;

  @ViewChild('intrastatData', { read: DataTableDirective }) dtElement: DataTableDirective;
  @ViewChild('intrastatList') intrastatListTemplate;
  @ViewChild(TabsComponent) tabsComponent;
  @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;
  // ddOptionsProfitCenter: DataDropDownOptions;
  // @ViewChild('profitCenter', { read: DataDropDownComponent }) ddProfitCenter: DataDropDownComponent;
  @ViewChild(CzDatePickerComponent) czDatePicker: CzDatePickerComponent;


  constructor(
    private router: Router,
    protected loaderService: LoaderService,
    private _logger: Logger,
    protected globalService: GlobalService,
    protected changeService: ChangeService,
    protected saveSearchService: SaveSearchService,
    private intrastatService: IntrastatService) {
    super(loaderService, changeService, saveSearchService, intrastatService, globalService);
    // this.doInitialSetup();
    this.log.color = 'lightblue';
  }
  doInInitLoad() {
    this.hideLoader();
  }

  getDatePicker(): CzDatePickerComponent {
    return this.czDatePicker;
  }

  // override
  getLoaderName(): string {
    return 'intrastat';
  }

  // override
  getSearchModel(): any {
    if (ProjectUtils.isEmpty(this.intrastatModel)) {
      this.intrastatModel = this.sessionObject.intrastatSearch;
      if (ProjectUtils.isEmpty(this.intrastatModel)) {
        this.intrastatModel = new IntrastatModel();
        this.intrastatModel.limit = this.sessionObject.limit;
      }
      // this.ngCenter = this.intrastatModel.profitCentre;
    }
    this.log.i('this.intrastatModel', this.intrastatModel);
    return this.intrastatModel;
  }

  // override
  getSearchType(): string {
    return 'intrastatSearch';
  }

  // override
  getTabsComponent(): any {
    return this.tabsComponent;
  }

  // override
  getReportTitle(): string {
    return 'Intrastat Report';
  }
  getReportIcon(): string {
    return 'fa fa-calculator';
  }
  // override
  getReportFileName(): string {
    return 'IntrastatReport';
  }

  getServiceName(): string {
    return this.INTRASTAT_REPORT;
  }
  // override
  openListTab() {
    this.tabsComponent.openTab('Intrastat Report List',
      this.intrastatListTemplate, {}, true, 'intrastatList');
  }
  // override
  getDispSearch(): ThinkListDisplaySearchComponent {
    return this.dispSearch;
  }

  // override
  setSearchModel(searchModel: any) {
    if (!ProjectUtils.isEmpty(searchModel)) {
      if (typeof searchModel === 'string') {
        this.intrastatModel = JSON.parse(searchModel);
      } else {
        this.intrastatModel = searchModel;
      }
    }
    if (this.intrastatModel.limit === '') {
      this.intrastatModel.limit = 0;
    }
    // this.ngCenter = this.setDropDownComponentValue('profitCentre');
    ProjectUtils.setIntrastatSearch(this.sessionObject, this.intrastatModel);
  }

  // doInitialSetup() {
  //   this.ddOptionsProfitCenter = new DataDropDownOptions();
  //   this.ddOptionsProfitCenter.serviceURL = Constants.TK_PROFITCENTER_URL;
  //   this.ddOptionsProfitCenter.keyName = 'profit_center';
  //   this.ddOptionsProfitCenter.keyDesc = 'description';
  //   this.ddOptionsProfitCenter.firstOptionText = 'Select a Profit Center';
  //   this.ddOptionsProfitCenter.modelName = 'profitCentre';
  //   this.ddOptionsProfitCenter.baseComponent = this;
  // }

  getDataElement(whichService: string): DataTableDirective {
    return this.dtElement;
  }

  baseProcessData() {
    const toSum = ['net_mass', 'no_of_cons', 'order_value'];
    const keys = ['description'];
    return ProjectUtils.mySumFunction2(this.listData, toSum, 'description', 'Total:', 'Grand Total', keys);
  }

  getBodyData(): string {
    let body = '';
    body += this.intrastatService.getDateSearchParam(this.intrastatModel, body);
    // body += this.intrastatService.getDropDownSearchParam(body, 'profitCentre', this.intrastatModel);
    body += this.getBodyLimit(body, this.intrastatModel.limit);
    return body;
  }

  doOnReset() {
    // this.intrastatModel['profitCentre'] = null;
    this.intrastatModel.limit = this.sessionObject.limit;
    // this.ngCenter = [];
    this.czDatePicker.calendarCanceled(this);
  }
}



