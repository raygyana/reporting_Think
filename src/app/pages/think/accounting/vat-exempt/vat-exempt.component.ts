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

import { VatExemptModel } from './vat-exempt.model';
import { VatExemptService } from './vat-exempt..service';


@Component({
  selector: 'app-vat-exempt',
  templateUrl: './vat-exempt.component.html',
  styleUrls: ['./vat-exempt.component.css'],
  providers: [VatExemptService]
})
export class VatExemptComponent extends BaseComponent {
  private VAT_EXEMPT = 'VAT_EXEMPT';
  log = Log.create('VatExemptComponent');
  ngCenter: any;
  vatExemptSearchModel: VatExemptModel;

  @ViewChild('vatExemptData', { read: DataTableDirective }) dtElement: DataTableDirective;
  @ViewChild('vatExemptList') vatExemptListTemplate;
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
    private vatExemptService: VatExemptService) {
    super(loaderService, changeService, saveSearchService, vatExemptService, globalService);
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
    return 'vat-exempt';
  }

  // override
  getSearchModel(): any {
    if (ProjectUtils.isEmpty(this.vatExemptSearchModel)) {
      this.vatExemptSearchModel = this.sessionObject.vatExemptSearch;
      if (ProjectUtils.isEmpty(this.vatExemptSearchModel)) {
        this.vatExemptSearchModel = new VatExemptModel();
        this.vatExemptSearchModel.limit = this.sessionObject.limit;
      }
      this.ngCenter = this.vatExemptSearchModel.profitCentre;
    }
    this.log.i('this.vatExemptSearchModel', this.vatExemptSearchModel);
    return this.vatExemptSearchModel;
  }

  // override
  getSearchType(): string {
    return 'vatExempt';
  }

  // override
  getTabsComponent(): any {
    return this.tabsComponent;
  }

  // override
  getReportTitle(): string {
    return 'Vat Exempt Report';
  }
  getReportIcon(): string {
    return 'fa fa-calculator';
  }
  // override
  getReportFileName(): string {
    return 'VatExemptReport';
  }

  getServiceName(): string {
    return this.VAT_EXEMPT;
  }
  // override
  openListTab() {
    this.tabsComponent.openTab('VAT Exempt Details List',
      this.vatExemptListTemplate, {}, true, 'vatExemptList');
  }
  // override
  getDispSearch(): ThinkListDisplaySearchComponent {
    return this.dispSearch;
  }

  // override
  setSearchModel(searchModel: any) {
    if (!ProjectUtils.isEmpty(searchModel)) {
      if (typeof searchModel === 'string') {
        this.vatExemptSearchModel = JSON.parse(searchModel);
      } else {
        this.vatExemptSearchModel = searchModel;
      }
    }
    if (this.vatExemptSearchModel.limit === '') {
      this.vatExemptSearchModel.limit = 0;
    }
    this.ngCenter = this.setDropDownComponentValue('profitCentre');
    ProjectUtils.setVatExemptSearch(this.sessionObject, this.vatExemptSearchModel);
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
    body += this.vatExemptService.getDateSearchParam(this.vatExemptSearchModel, body);
    body += this.vatExemptService.getDropDownSearchParam(body, 'profitCentre', this.vatExemptSearchModel);
    body += this.getBodyLimit(body, this.vatExemptSearchModel.limit);
    return body;
  }

  doOnReset() {
    this.vatExemptSearchModel['profitCentre'] = null;
    this.vatExemptSearchModel.limit = this.sessionObject.limit;
    this.ngCenter = [];
    this.czDatePicker.calendarCanceled(this);
  }
}
