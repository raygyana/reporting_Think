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
import { ClaimsByCountryModel } from '../claims-by-country/claims-by-country.model';
import { ClaimsByCountryListService } from './claims-by-country.service';
import { CzDatePickerComponent } from '../../../../components/cz-date-picker/cz-date-picker.component';

@Component({
  selector: 'app-claims-by-country',
  templateUrl: './claims-by-country.component.html',
  styleUrls: ['./claims-by-country.component.css'],
  providers: [ClaimsByCountryListService]
})
export class ClaimsByCountryComponent extends BaseComponent {
  private CLAIMS_BY_Country = 'claimsByCountry';
  log = Log.create('ClaimsByCountryComponent');
  claimsByCountryModel: ClaimsByCountryModel;
  ddOptionsCountryList: DataDropDownOptions;
  ddOptionsJournalName: DataDropDownOptions;
  ngCountryList: any;
  ngJournalName: any;
  @ViewChild('claimsByCountryData', { read: DataTableDirective }) dtElement: DataTableDirective;
  @ViewChild('claimsByCountryList') claimsByCountryListTemplate;
  @ViewChild(TabsComponent) tabsComponent;
  @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;
  @ViewChild(CzDatePickerComponent) czDatePicker: CzDatePickerComponent;

  constructor(private router: Router,
    private claimsByCountryListService: ClaimsByCountryListService,
    private _logger: Logger,
    protected globalService: GlobalService,
    protected changeService: ChangeService,
    protected saveSearchService: SaveSearchService,
    protected loaderService: LoaderService) {
    super(loaderService, changeService, saveSearchService, claimsByCountryListService, globalService);
    this.log.color = 'lightblue';
    this.doInitialSetup();
  }

  // override
  getLoaderName(): string {
    return 'claims-by-country';
  }
  doInitialSetup() {

    this.ddOptionsCountryList = new DataDropDownOptions();
    this.ddOptionsCountryList.serviceURL = Constants.MIT_STATE_LIST_URL;
    this.ddOptionsCountryList.keyName = 'state';
    this.ddOptionsCountryList.keyDesc = 'description';
    this.ddOptionsCountryList.firstOptionText = 'Select a State';
    this.ddOptionsCountryList.modelName = 'state';
    this.ddOptionsCountryList.baseComponent = this;


    this.ddOptionsJournalName = new DataDropDownOptions();
    this.ddOptionsJournalName.serviceURL = Constants.TK_SALE_JOURNAL_LIST_URL;
    this.ddOptionsJournalName.keyName = 'ocID';
    this.ddOptionsJournalName.keyDesc = 'description';
    // this.ddOptionsJournalName.keyName = 'region';
    // this.ddOptionsJournalName.keyDesc = 'description';
    this.ddOptionsJournalName.modelName = 'title';
    this.ddOptionsJournalName.firstOptionText = 'Select a Product';
    this.ddOptionsJournalName.baseComponent = this;
    this.ddOptionsJournalName.sort = true;
    this.ddOptionsJournalName.sortKey = 'description';
    this.ddOptionsJournalName.sortOrder = 'asc';
  }

  // override
  getSearchModel(): any {
    if (ProjectUtils.isEmpty(this.claimsByCountryModel)) {
      this.claimsByCountryModel = this.sessionObject.claimsByCountrySearch;
      if (ProjectUtils.isEmpty(this.claimsByCountryModel)) {
        this.claimsByCountryModel = new ClaimsByCountryModel();
        this.claimsByCountryModel.limit = this.sessionObject.limit;
      }
      this.ngCountryList = this.claimsByCountryModel.state;
      this.ngJournalName = this.claimsByCountryModel.title;
    }
    this.log.i('getSearchModel', this.claimsByCountryModel);
    return this.claimsByCountryModel;
  }

  // override
  getSearchType(): string {
    return 'claimsByCountry';
  }

  // override
  getDataElement(whichService: string): DataTableDirective {
    return this.dtElement;
  }

  // override
  getServiceName(): string {
    return this.CLAIMS_BY_Country;
  }

  // override
  openListTab() {
    this.tabsComponent.openTab('Claims For All Countries List',
      this.claimsByCountryListTemplate, {}, true, 'claimsByCountryList');
  }

  // override
  getDispSearch(): ThinkListDisplaySearchComponent {
    return this.dispSearch;
  }

  // override
  getReportTitle(): string {
    return 'Claims For All Countries Report';
  }
  getReportIcon(): string {
    return 'fa-file-text-o';
  }
  // override
  getReportFileName(): string {
    return 'claimsForAllCountriesReport';
  }

  // override
  setSearchModel(searchModel: any) {
    if (!ProjectUtils.isEmpty(searchModel)) {
      if (typeof searchModel === 'string') {
        this.claimsByCountryModel = JSON.parse(searchModel);
      } else {
        this.claimsByCountryModel = searchModel;
      }
    }
    if (this.claimsByCountryModel.limit === '') {
      this.claimsByCountryModel.limit = 0;
    }
    this.ngCountryList = this.setDropDownComponentValue('state');
    this.ngJournalName = this.setDropDownComponentValue('title');
    this.log.i('setSearchModel', this.claimsByCountryModel);
    ProjectUtils.setClaimsByCountrySearch(this.sessionObject, this.claimsByCountryModel);
  }

  doPreInitLoad() {
    this.hideLoader();
  }

  getDatePicker(): CzDatePickerComponent {
    return this.czDatePicker;
  }

  getBodyData(): string {
    let body = '';
    body += this.claimsByCountryListService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());
    body += this.claimsByCountryListService.getDateSearchParam(this.claimsByCountryModel, body);

    body += this.getBodyLimit(body, this.claimsByCountryModel.limit);
    body += this.claimsByCountryListService.getDropDownSearchParam(body, 'state', this.claimsByCountryModel);
    body += this.claimsByCountryListService.getDropDownSearchParam(body, 'title', this.claimsByCountryModel);

    return body;
  }

  doOnReset() {
    this.claimsByCountryModel['state'] = null;
    this.ngCountryList = [];
    this.claimsByCountryModel['title'] = null;
    this.ngJournalName = [];
    this.czDatePicker.calendarCanceled(this);
    this.claimsByCountryModel.limit = this.sessionObject.limit;

  }
}
