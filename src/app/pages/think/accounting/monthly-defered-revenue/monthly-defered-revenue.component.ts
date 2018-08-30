import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { ParamMap } from '@angular/router';
import { DatePipe } from '@angular/common';
import { DataTableDirective } from 'angular-datatables';

import { TabsetComponent } from '../../../../components/ngtabs';
import { TabsComponent } from '../../../../components/ng-tabs/tabs.component';
import { DataDropDownOptions } from '../../../../components/data-drop-down/data-drop-down.model';
import { DataDropDownComponent } from '../../../../components/data-drop-down/data-drop-down.component';
import { ThinkListDisplaySearchComponent } from '../../../../components/think-list-display-search/think-list-display-search.component';

import { Logger } from '../../../../core/logger/logger';
import { LoaderService } from '../../../../core/loader/loader.service';
import { BaseComponent } from '../../../../core/base/base.component';
import { SessionObject } from '../../../shared/session-object';
import { ProjectUtils } from '../../../shared/project-utils';
import { Constants } from '../../../shared/constant';
import { Log, Level } from 'ng2-logger';
import { Logger as Loggerr } from '../../../../core/logger/logger';
import { GlobalService } from '../../../shared/global.service';
import { ChangeService } from '../../../shared/change-service';
import { SaveSearchService } from '../../../shared/save-search-service';

import { MonthlyDeferedRevenueService } from './monthly-defered-revenue.service';
import { MonthlyDeferedRevenueSearchModel } from './monthly-defered-revenue.model';
import { CzDatePickerComponent } from '../../../../components/cz-date-picker/cz-date-picker.component';

@Component({
	selector: 'app-monthly-defered-revenue',
	templateUrl: './monthly-defered-revenue.component.html',
	styleUrls: ['./monthly-defered-revenue.component.css'],
	providers: [MonthlyDeferedRevenueService]
})
export class MonthlyDeferedRevenueComponent extends BaseComponent {

	ngProfitCentre: any;
	ngYear: any;
	ngMonth: any;
	private serviceName = 'Monthly_Defered_Revenue';
	log = Log.create('MonthlyDeferedRevenueComponent');

	monthlyDeferedRevenueSearchModel: MonthlyDeferedRevenueSearchModel;
	ddOptionsPCenter: DataDropDownOptions;
	ddOptionsYear: DataDropDownOptions;
	ddOptionsMonth: DataDropDownOptions;
	ddTriggerMonth: Subject<any> = new Subject();
	monthData: any;

	@ViewChild('monthlyDeferedRevenueListData', { read: DataTableDirective }) dtElement: DataTableDirective;
	@ViewChild('monthlyDeferedRevenueList') MonthlyDeferedRevenueTemplate;
	@ViewChild(TabsComponent) tabsComponent;
	@ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;
	@ViewChild('profitCentre', { read: DataDropDownComponent }) ddProfitCentre: DataDropDownComponent;
	@ViewChild('Month', { read: DataDropDownComponent }) ddMonth: DataDropDownComponent;
	@ViewChild('prevYear', { read: DataDropDownComponent }) ddYear: DataDropDownComponent;
	@ViewChild(CzDatePickerComponent) czDatePicker: CzDatePickerComponent;

	constructor(private router: Router,
		protected loaderService: LoaderService,
		private _logger: Logger,
		protected globalService: GlobalService,
		protected changeService: ChangeService,
		protected saveSearchService: SaveSearchService,
		private monthlyDeferedRevenueService: MonthlyDeferedRevenueService) {
		super(loaderService, changeService, saveSearchService, monthlyDeferedRevenueService, globalService);
		this.log.color = 'lightblue';
		this.doInitialSetup();
	}

	doInitialSetup() {
		this.ddOptionsPCenter = new DataDropDownOptions();
		this.ddOptionsPCenter.serviceURL = Constants.TK_PROFITCENTER_URL;
		this.ddOptionsPCenter.keyName = 'profit_center';
		this.ddOptionsPCenter.keyDesc = 'description';
		this.ddOptionsPCenter.firstOptionText = 'Select a Profit Center';
		this.ddOptionsPCenter.modelName = 'profitCentre';
		this.ddOptionsPCenter.baseComponent = this;

		this.ddOptionsYear = new DataDropDownOptions();
		this.ddOptionsYear.serviceURL = Constants.TK_SALE_VOLUME_YEAR_URL;
		this.ddOptionsYear.keyName = 'volume';
		this.ddOptionsYear.keyDesc = 'volume';
		this.ddOptionsYear.firstOptionText = 'Select a Year';
		this.ddOptionsYear.modelName = 'year';
		this.ddOptionsYear.baseComponent = this;

		this.ddOptionsMonth = new DataDropDownOptions();
		this.ddOptionsMonth.keyName = 'id';
		this.ddOptionsMonth.keyDesc = 'value';
		this.ddOptionsMonth.firstOptionText = 'Select a Month';
		this.ddOptionsMonth.modelName = 'month';
		this.ddOptionsMonth.baseComponent = this;
	}

	doInInitLoad() {
		this.getMonthData();
		this.displaySearchOptions.noCrossList = [];
		this.displaySearchOptions.noCrossList.push('profitCentre');
		this.displaySearchOptions.noCrossList.push('year');
		this.displaySearchOptions.noCrossList.push('month');
	}
	getDatePicker(): CzDatePickerComponent {
		return this.czDatePicker;
	}

	// override
	getLoaderName(): string {
		return 'monthly-defered-revenue';
	}

	// override
	getSearchModel(): any {
		if (ProjectUtils.isEmpty(this.monthlyDeferedRevenueSearchModel)) {
			this.monthlyDeferedRevenueSearchModel = <MonthlyDeferedRevenueSearchModel>this.sessionObject.monthlyDeferedRevenue;
			if (ProjectUtils.isEmpty(this.monthlyDeferedRevenueSearchModel)) {
				this.monthlyDeferedRevenueSearchModel = new MonthlyDeferedRevenueSearchModel();
				this.monthlyDeferedRevenueSearchModel.limit = this.sessionObject.limit;
			}
			this.ngProfitCentre = this.monthlyDeferedRevenueSearchModel.profitCentre;
			this.ngMonth = this.monthlyDeferedRevenueSearchModel.month;
			this.ngYear = this.monthlyDeferedRevenueSearchModel.year;
		}
		this.log.i('this.monthlyDeferedRevenueSearchModel', this.monthlyDeferedRevenueSearchModel);
		return this.monthlyDeferedRevenueSearchModel;
	}
	// override
	getReportTitle(): string {
		return 'Monthly Defered Revenue Report';
	}
	getReportIcon(): string {
		return 'fa fa-calculator';
	}
	// override
	getReportFileName(): string {
		return 'monthlyDeferedRevenueReport';
	}

	// override
	getSearchType(): string {
		return 'monthlyDeferedRevenue';
	}

	// override
	getTabsComponent(): any {
		return this.tabsComponent;
	}


	// override
	getServiceName(): string {
		return this.serviceName;
	}

	// override
	openListTab() {
		this.tabsComponent.openTab('Monthly Deferred Revenue List',
			this.MonthlyDeferedRevenueTemplate, {}, true, 'monthlyDeferedRevenueList');
	}

	// override
	getDispSearch(): ThinkListDisplaySearchComponent {
		return this.dispSearch;
	}

	baseProcessData() {
		const toSum = ['liability_amount'];
		const keys = ['month_name'];
		return ProjectUtils.mySumFunction2(this.listData, toSum, 'month_name', 'Total:', 'Grand Total', keys);
	}

	// override
	setSearchModel(searchModel: any) {
		if (!ProjectUtils.isEmpty(searchModel)) {
			if (typeof searchModel === 'string') {
				this.monthlyDeferedRevenueSearchModel = JSON.parse(searchModel);
			} else {
				this.monthlyDeferedRevenueSearchModel = searchModel;
			}
		}
		if (this.monthlyDeferedRevenueSearchModel.limit === '') {
			this.monthlyDeferedRevenueSearchModel.limit = 0;
		}
		this.log.i('setSearchModel', this.monthlyDeferedRevenueSearchModel);
		this.ngProfitCentre = this.setDropDownComponentValue('profitCentre');
		this.ngMonth = this.setDropDownComponentValue('month');
		this.ngYear = this.setDropDownComponentValue('year');
		ProjectUtils.setMonthlyDeferedRevenue(this.sessionObject, this.monthlyDeferedRevenueSearchModel);
	}

	getDataElement(whichService: string): DataTableDirective {
		if (whichService === this.serviceName) {
			return this.dtElement;
		}
	}
	getMonthData() {
		this.monthData = this.globalService.getMonthData();
		this.ddTriggerMonth.next(this.monthData);
	}

	// override
	getBodyData(): string {
		let body = '';

		body += this.monthlyDeferedRevenueService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());
		body += this.monthlyDeferedRevenueService.getDropDownSearchParam(body, 'profitCentre', this.monthlyDeferedRevenueSearchModel);
		body += this.monthlyDeferedRevenueService.getDropDownSearchParam(body, 'month', this.monthlyDeferedRevenueSearchModel);
		body += this.monthlyDeferedRevenueService.getDropDownSearchParam(body, 'year', this.monthlyDeferedRevenueSearchModel);
		body += this.getBodyLimit(body, this.monthlyDeferedRevenueSearchModel.limit);

		return body;
	}

	doOnReset() {
		this.monthlyDeferedRevenueSearchModel['profitCentre'] = null;
		this.monthlyDeferedRevenueSearchModel['month'] = null;
		this.monthlyDeferedRevenueSearchModel['year'] = null;
		this.ngProfitCentre = [];
		this.ngMonth = [];
		this.ngYear = [];
		this.monthlyDeferedRevenueSearchModel.limit = this.sessionObject.limit;
	}

}


