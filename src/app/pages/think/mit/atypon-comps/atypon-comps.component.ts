import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { ParamMap } from '@angular/router';
import { DatePipe } from '@angular/common';
// Import from III party
import { DataTableDirective } from 'angular-datatables';
import { TabsetComponent } from '../../../../components/ngtabs';
import { TabsComponent } from '../../../../components/ng-tabs/tabs.component';
import { ThinkListDisplaySearchComponent } from '../../../../components/think-list-display-search/think-list-display-search.component';
import { DataDropDownOptions } from '../../../../components/data-drop-down/data-drop-down.model';
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
import { AtyponCompsModel } from '../atypon-comps/atypon-comps.model';
import { AtyponCompsService } from './atypon-comps.service';
import { CzDatePickerComponent } from '../../../../components/cz-date-picker/cz-date-picker.component';
@Component({
  selector: 'app-atypon-comps',
  templateUrl: './atypon-comps.component.html',
  styleUrls: ['./atypon-comps.component.css'],
  providers: [AtyponCompsService]
})
export class AtyponCompsComponent extends BaseComponent {
  private Atypon_Comps = 'atyponComps';
  log = Log.create('AtyponCompsComponent');
  ngCountryList: any;
  atyponCompsModel: AtyponCompsModel;
  ddOptionsCountryList: DataDropDownOptions;
  @ViewChild('atyponcompsData', { read: DataTableDirective }) dtElement: DataTableDirective;
  @ViewChild('atyponCompsList') atyponCompsListTemplate;
  @ViewChild(TabsComponent) tabsComponent;
  @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;
  @ViewChild(CzDatePickerComponent) czDatePicker: CzDatePickerComponent;

  constructor(private router: Router,
    private atyponCompsService: AtyponCompsService,
    private _logger: Logger,
    protected globalService: GlobalService,
    protected changeService: ChangeService,
    protected saveSearchService: SaveSearchService,
    protected loaderService: LoaderService) {
    super(loaderService, changeService, saveSearchService, atyponCompsService, globalService);

    this.log.color = 'lightblue';
    this.doInitialSetup();
  }

  // override
  getLoaderName(): string {
    return 'atypon-comps';
  }
  doInitialSetup() {



    // this.ddOptionsCountry = new DataDropDownOptions();
    // this.ddOptionsCountry.serviceURL = Constants.TK_COUNTRY_SEARCH_URL;
    // this.ddOptionsCountry.keyName = 'state';
    // this.ddOptionsCountry.keyDesc = 'description';
    // this.ddOptionsCountry.firstOptionText = 'Select a Country';
    // this.ddOptionsCountry.modelName = 'country';
    // this.ddOptionsCountry.baseComponent = this;

    this.ddOptionsCountryList = new DataDropDownOptions();
    this.ddOptionsCountryList.serviceURL = Constants.MIT_COUNTRY_LIST_URL;
    this.ddOptionsCountryList.keyName = 'country';
    this.ddOptionsCountryList.keyDesc = 'country';
    this.ddOptionsCountryList.firstOptionText = 'Select a Country';
    this.ddOptionsCountryList.modelName = 'country';
    this.ddOptionsCountryList.baseComponent = this;


  }

  // override
  getSearchModel(): any {
    if (ProjectUtils.isEmpty(this.atyponCompsModel)) {
      this.atyponCompsModel = this.sessionObject.atyponCompsSearch;
      if (ProjectUtils.isEmpty(this.atyponCompsModel)) {
        this.atyponCompsModel = new AtyponCompsModel();
        this.atyponCompsModel.limit = this.sessionObject.limit;

      }
      this.ngCountryList = this.atyponCompsModel.country;
    }
    this.log.i('getSearchModel', this.atyponCompsModel);
    return this.atyponCompsModel;
  }

  // override
  getSearchType(): string {
    return 'atyponComps';
  }

  // override
  getDataElement(whichService: string): DataTableDirective {
    return this.dtElement;
  }

  // override
  getServiceName(): string {
    return this.Atypon_Comps;
  }

  // override
  openListTab() {

    this.tabsComponent.openTab('Atypon Comps List',
      this.atyponCompsListTemplate, {}, true, 'atyponCompsList');
  }

  // override
  getDispSearch(): ThinkListDisplaySearchComponent {
    return this.dispSearch;
  }

  // override
  getReportTitle(): string {
    return 'Atypon Comps Report';
  }
  getReportIcon(): string {
    return 'fa-file-text-o';
  }

  // override
  getReportFileName(): string {
    return 'atyponCompsReport';
  }

  // override
  setSearchModel(searchModel: any) {
    if (!ProjectUtils.isEmpty(searchModel)) {
      if (typeof searchModel === 'string') {
        this.atyponCompsModel = JSON.parse(searchModel);
      } else {
        this.atyponCompsModel = searchModel;
      }
    }
    if (this.atyponCompsModel.limit === '') {
      this.atyponCompsModel.limit = 0;
    }
    this.ngCountryList = this.setDropDownComponentValue('country');
    this.log.i('setSearchModel', this.atyponCompsModel);
    ProjectUtils.setAtyponCompsSearch(this.sessionObject, this.atyponCompsModel);
  }
  doPreInitLoad() {
  }
  getDatePicker(): CzDatePickerComponent {
    return this.czDatePicker;
  }
  getBodyData(): string {
    let body = '';
    body += this.atyponCompsService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());
    body += this.atyponCompsService.getDateSearchParam(this.atyponCompsModel, body);
    body += this.getBodyLimit(body, this.atyponCompsModel.limit);
    body += this.atyponCompsService.setParamValue(body, 'customerId', this.atyponCompsModel['customerId']);
    body += this.atyponCompsService.getDropDownSearchParam(body, 'country', this.atyponCompsModel);
    body += this.atyponCompsService.setParamValue(body, 'issn', this.atyponCompsModel['issn']);
    return body;
  }
  doOnReset() {
    this.atyponCompsModel['country'] = null;
    this.ngCountryList = [];
    this.atyponCompsModel['customerId'] = null;
    this.atyponCompsModel['issn'] = null;
    this.czDatePicker.calendarCanceled(this);
    this.atyponCompsModel.limit = this.sessionObject.limit;

  }
}
