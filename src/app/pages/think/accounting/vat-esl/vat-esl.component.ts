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

import { VatESLModel } from './vat-esl.model';
import { VatESLService } from './vat-esl.service';

@Component({
  selector: 'app-vat-esl',
  templateUrl: './vat-esl.component.html',
  styleUrls: ['./vat-esl.component.css'],
  providers: [VatESLService]
})
export class VatEslComponent extends BaseComponent {

  private VAT_ESL = 'VAT_ESL';
  log = Log.create('VatEslComponent');
  ngCenter: any;
  vatESLModel: VatESLModel;

  @ViewChild('vatESLData', { read: DataTableDirective }) dtElement: DataTableDirective;
  @ViewChild('vatESLList') vatESLListTemplate;
  @ViewChild(TabsComponent) tabsComponent;
  @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;
  ddOptionsProfitCenter: DataDropDownOptions;
  @ViewChild('profitCenter', { read: DataDropDownComponent }) ddProfitCenter: DataDropDownComponent;
  @ViewChild(CzDatePickerComponent) czDatePicker: CzDatePickerComponent;


  constructor(
    private router: Router,
    protected loaderService: LoaderService,
    private _logger: Logger,
    protected globalService: GlobalService,
    protected changeService: ChangeService,
    protected saveSearchService: SaveSearchService,
    private vatESLService: VatESLService) {
    super(loaderService, changeService, saveSearchService, vatESLService, globalService);
    this.doInitialSetup();
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
    return 'vat-esl';
  }

  // override
  getSearchModel(): any {
    if (ProjectUtils.isEmpty(this.vatESLModel)) {
      this.vatESLModel = this.sessionObject.vatESLSearch;
      if (ProjectUtils.isEmpty(this.vatESLModel)) {
        this.vatESLModel = new VatESLModel();
        this.vatESLModel.limit = this.sessionObject.limit;
      }
      this.ngCenter = this.vatESLModel.profitCentre;
    }
    this.log.i('this.vatESLModel', this.vatESLModel);
    return this.vatESLModel;
  }

  // override
  getSearchType(): string {
    return 'vatESLSearch';
  }

  // override
  getTabsComponent(): any {
    return this.tabsComponent;
  }

  // override
  getReportTitle(): string {
    return 'VAT ESL Report';
  }
  getReportIcon(): string {
    return 'fa fa-calculator';
  }
  // override
  getReportFileName(): string {
    return 'VatESLReport';
  }

  getServiceName(): string {
    return this.VAT_ESL;
  }
  // override
  openListTab() {
    this.tabsComponent.openTab('VAT ESL Report List',
      this.vatESLListTemplate, {}, true, 'vatESLList');
  }
  // override
  getDispSearch(): ThinkListDisplaySearchComponent {
    return this.dispSearch;
  }

  // override
  setSearchModel(searchModel: any) {
    if (!ProjectUtils.isEmpty(searchModel)) {
      if (typeof searchModel === 'string') {
        this.vatESLModel = JSON.parse(searchModel);
      } else {
        this.vatESLModel = searchModel;
      }
    }
    if (this.vatESLModel.limit === '') {
      this.vatESLModel.limit = 0;
    }
    this.ngCenter = this.setDropDownComponentValue('profitCentre');
    ProjectUtils.setVatESLSearch(this.sessionObject, this.vatESLModel);
  }

  doInitialSetup() {
    this.ddOptionsProfitCenter = new DataDropDownOptions();
    this.ddOptionsProfitCenter.serviceURL = Constants.TK_PROFITCENTER_URL;
    this.ddOptionsProfitCenter.keyName = 'profit_center';
    this.ddOptionsProfitCenter.keyDesc = 'description';
    this.ddOptionsProfitCenter.firstOptionText = 'Select a Profit Center';
    this.ddOptionsProfitCenter.modelName = 'profitCentre';
    this.ddOptionsProfitCenter.baseComponent = this;
  }

  getDataElement(whichService: string): DataTableDirective {
    return this.dtElement;
  }

  getBodyData(): string {
    let body = '';
    body += this.vatESLService.getDateSearchParam(this.vatESLModel, body);
    body += this.vatESLService.getDropDownSearchParam(body, 'profitCentre', this.vatESLModel);
    body += this.getBodyLimit(body, this.vatESLModel.limit);
    return body;
  }

  doOnReset() {
    this.vatESLModel['profitCentre'] = null;
    this.vatESLModel.limit = this.sessionObject.limit;
    this.ngCenter = [];
    this.czDatePicker.calendarCanceled(this);
  }
}

