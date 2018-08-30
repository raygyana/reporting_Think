import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { ParamMap } from '@angular/router';
import { DatePipe } from '@angular/common';
// Import from III party
import { DataTableDirective } from 'angular-datatables';
import { TabsetComponent } from '../../../../components/ngtabs';
import { TabsComponent } from '../../../../components/ng-tabs/tabs.component';
import { DataDropDownOptions } from '../../../../components/data-drop-down/data-drop-down.model';
import { DataDropDownComponent } from '../../../../components/data-drop-down/data-drop-down.component';
import { ThinkListDisplaySearchComponent } from '../../../../components/think-list-display-search/think-list-display-search.component';
import { Log, Level } from 'ng2-logger';
import { Logger } from '../../../../core/logger/logger';
import { LoaderService } from '../../../../core/loader/loader.service';
import { BaseComponent } from '../../../../core/base/base.component';
import { ProjectUtils } from '../../../shared/project-utils';
import { Constants } from '../../../shared/constant';
import { SessionObject } from '../../../shared/session-object';
import { GlobalService } from '../../../shared/global.service';
import { SearchModelType } from '../../../shared/search-model-type';
import { ChangeService } from '../../../shared/change-service';
import { SaveSearchService } from '../../../shared/save-search-service';

import { AtyponSubsService } from './atypon_subs.service';
import { AtyponSubsModel } from './atypon_subs.model';
import { CzDatePickerComponent } from '../../../../components/cz-date-picker/cz-date-picker.component';


@Component({
  selector: 'app-atypon-subs',
  templateUrl: './atypon-subs.component.html',
  styleUrls: ['./atypon-subs.component.css'],
  providers: [AtyponSubsService]
})
export class AtyponSubsComponent extends BaseComponent {

  private ATYPON_SUBS_SEARCH = 'atyponSubsSearch';
  log = Log.create('AtyponSubsSearchComponent');
  ddOptionsCountryList: DataDropDownOptions;
  atyponSubsModel: AtyponSubsModel;
  ngCountryList: any;


  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  @ViewChild(TabsComponent) tabsComponent;
  @ViewChild('atyponSubsList') atyponSubsListTemplate;
  @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;
  @ViewChild('atyponsSubsData', { read: DataTableDirective }) dtSalesElement: DataTableDirective;
  @ViewChild('region', { read: DataDropDownComponent }) ddOptionsRegion: DataDropDownComponent;
  @ViewChild(CzDatePickerComponent) czDatePicker: CzDatePickerComponent;

  constructor(private router: Router,
    private atyponSubsService: AtyponSubsService,
    private _logger: Logger,
    protected globalService: GlobalService,
    protected changeService: ChangeService,
    protected saveSearchService: SaveSearchService,
    protected loaderService: LoaderService) {
    super(loaderService, changeService, saveSearchService, atyponSubsService, globalService);
    this.doInitialSetup();
    this.log.color = 'lightblue';
  }

  getLoaderName(): string {
    return 'atypon-subs-component';
  }

  getSearchModel(): any {
    if (ProjectUtils.isEmpty(this.atyponSubsModel)) {
      this.atyponSubsModel = <AtyponSubsModel>this.sessionObject.atyponSubsSearch;
      if (ProjectUtils.isEmpty(this.atyponSubsModel)) {
        this.atyponSubsModel = new AtyponSubsModel();
        this.atyponSubsModel.limit = this.sessionObject.limit;
      }
      this.ngCountryList = this.atyponSubsModel.country;
    }

    this.log.i('getSearchModel', this.atyponSubsModel);
    return this.atyponSubsModel;
  }

  getSearchType(): string {
    return 'atyponSubsSearch';
  }

  getTabsComponent(): any {
    return this.tabsComponent;
  }

  // override
  getReportTitle(): string {
    return 'Atypon Subs Report';
  }
  getReportIcon(): string {
    return 'fa-file-text-o';
  }

  getServiceName(): string {
    return this.ATYPON_SUBS_SEARCH;
  }

  // override
  getReportFileName(): string {
    return 'atyponSubsReport';
  }
  getDatePicker(): CzDatePickerComponent {
    return this.czDatePicker;
  }
  // override
  openListTab() {
    this.tabsComponent.openTab('Atypon Subs List',
      this.atyponSubsListTemplate, {}, true, 'atyponSubsList');
  }
  // override
  getDispSearch(): ThinkListDisplaySearchComponent {
    return this.dispSearch;
  }

  // override
  setSearchModel(searchModel: any) {
    if (!ProjectUtils.isEmpty(searchModel)) {
      if (typeof searchModel === 'string') {
        this.atyponSubsModel = JSON.parse(searchModel);
      } else {
        this.atyponSubsModel = searchModel;
      }
    }
    if (this.atyponSubsModel.limit === '') {
      this.atyponSubsModel.limit = 0;
    }
    this.log.i('setSearchModel', this.atyponSubsModel);
    this.ngCountryList = this.setDropDownComponentValue('country');
    ProjectUtils.setAtyponSubsSearch(this.sessionObject, this.atyponSubsModel);
  }

  doInitialSetup() {

    this.ddOptionsCountryList = new DataDropDownOptions();
    this.ddOptionsCountryList.serviceURL = Constants.MIT_COUNTRY_LIST_URL;
    this.ddOptionsCountryList.keyName = 'country';
    this.ddOptionsCountryList.keyDesc = 'country';
    this.ddOptionsCountryList.firstOptionText = 'Select a Country';
    this.ddOptionsCountryList.modelName = 'country';
    this.ddOptionsCountryList.baseComponent = this;


  }

  getDataElement(whichService: string): DataTableDirective {
    return this.dtElement;
  }

  getBodyData(): string {
    let body = '';
    body += this.atyponSubsService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());
    body += this.atyponSubsService.getDateSearchParam(this.atyponSubsModel, body);
    body += this.atyponSubsService.setParamValue(body, 'customerId', this.atyponSubsModel['customerId']);
    body += this.atyponSubsService.setParamValue(body, 'issn', this.atyponSubsModel['issn']);
    body += this.atyponSubsService.getDropDownSearchParam(body, 'country', this.atyponSubsModel);

    body += this.getBodyLimit(body, this.atyponSubsModel.limit);

    return body;
  }


  doOnReset() {

    this.atyponSubsModel['country'] = null;
    this.ngCountryList = [];
    this.czDatePicker.calendarCanceled(this);
    this.atyponSubsModel.limit = this.sessionObject.limit;

  }
}
