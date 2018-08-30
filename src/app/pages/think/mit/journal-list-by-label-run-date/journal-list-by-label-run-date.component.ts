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
import { JournalListModel } from './journal-list-by-label-run-date.model';
import { JournalListService } from './journal-list-by-label-run-date.service';
import { CzDatePickerComponent } from '../../../../components/cz-date-picker/cz-date-picker.component';
@Component({
  selector: 'app-journal-list-by-label-run-date',
  templateUrl: './journal-list-by-label-run-date.component.html',
  styleUrls: ['./journal-list-by-label-run-date.component.css'],
  providers: [JournalListService]
})
export class JournalListByLabelRunDateComponent extends BaseComponent {
  private Journal_List = 'journalList';
  log = Log.create('JournalListByLabelRunDateComponent');

  journalListModel: JournalListModel;

  @ViewChild('journalistbylabelrunDateData', { read: DataTableDirective }) dtElement: DataTableDirective;
  @ViewChild('JournalListByLabelRunDateList') JournalListByLabelRunDateListTemplate;
  @ViewChild(TabsComponent) tabsComponent;
  @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;
  @ViewChild(CzDatePickerComponent) czDatePicker: CzDatePickerComponent;
  ddOptionsJournalName: DataDropDownOptions;
  ngJournalName: any;

  constructor(private router: Router,
    private journalListService: JournalListService,
    private _logger: Logger,
    protected globalService: GlobalService,
    protected changeService: ChangeService,
    protected saveSearchService: SaveSearchService,
    protected loaderService: LoaderService) {
    super(loaderService, changeService, saveSearchService, journalListService, globalService);
    this.log.color = 'lightblue';
    this.doInitialSetup();
  }

  doInitialSetup() {

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
    this.ddOptionsJournalName.sortOrder = 'asc';
  }


  getLoaderName(): string {
    return 'journal-list-by-label-run-date';
  }

  // override
  getSearchModel(): any {
    if (ProjectUtils.isEmpty(this.journalListModel)) {
      this.journalListModel = this.sessionObject.journalListSearch;
      if (ProjectUtils.isEmpty(this.journalListModel)) {
        this.journalListModel = new JournalListModel();
        this.journalListModel.limit = this.sessionObject.limit;
      }
      this.ngJournalName = this.journalListModel.title;
    }
    this.log.i('getSearchModel', this.journalListModel);
    return this.journalListModel;
  }

  // override
  getSearchType(): string {
    return 'journalList';
  }

  // override
  getDataElement(whichService: string): DataTableDirective {
    return this.dtElement;
  }

  // override
  getServiceName(): string {
    return this.Journal_List;
  }

  // override
  openListTab() {
    this.tabsComponent.openTab('Journal List By Label Run Date List',
      this.JournalListByLabelRunDateListTemplate, {}, true, 'JournalListByLabelRunDateList');
  }

  // override
  getDispSearch(): ThinkListDisplaySearchComponent {
    return this.dispSearch;
  }

  // override
  getReportTitle(): string {
    return 'Journal List By Label Run Date Report';
  }
  getReportIcon(): string {
    return 'fa-file-text-o';
  }
  // override
  getReportFileName(): string {
    return 'journalListByLabelRunDateReport';
  }

  // override
  setSearchModel(searchModel: any) {
    if (!ProjectUtils.isEmpty(searchModel)) {
      if (typeof searchModel === 'string') {
        this.journalListModel = JSON.parse(searchModel);
      } else {
        this.journalListModel = searchModel;
      }
    }
    if (this.journalListModel.limit === '') {
      this.journalListModel.limit = 0;
    }
    this.ngJournalName = this.setDropDownComponentValue('title');
    this.log.i('setSearchModel', this.journalListModel);
    ProjectUtils.setJournalListSearch(this.sessionObject, this.journalListModel);
  }

  doPreInitLoad() {
    this.hideLoader();
  }

  getDatePicker(): CzDatePickerComponent {
    return this.czDatePicker;
  }

  getBodyData(): string {
    let body = '';
    body += this.journalListService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());
    body += this.journalListService.getDateSearchParam(this.journalListModel, body);
    body += this.journalListService.getDropDownSearchParam(body, 'title', this.journalListModel);
    body += this.getBodyLimit(body, this.journalListModel.limit);
    return body;
  }

  doOnReset() {
    this.journalListModel['title'] = null;
    this.ngJournalName = [];
    this.czDatePicker.calendarCanceled(this);
  }
}

