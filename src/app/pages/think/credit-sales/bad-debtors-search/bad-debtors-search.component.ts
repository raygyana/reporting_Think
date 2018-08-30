import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
// Import from III party
import { DataTableDirective } from 'angular-datatables';
import { TabsetComponent } from '../../../../components/ngtabs';
import { TabsComponent } from '../../../../components/ng-tabs/tabs.component';
import { ThinkListDisplaySearchComponent } from '../../../../components/think-list-display-search/think-list-display-search.component';
import { DataDropDownOptions } from '../../../../components/data-drop-down/data-drop-down.model';
import { DataDropDownComponent } from '../../../../components/data-drop-down/data-drop-down.component';
import { Logger } from '../../../../core/logger/logger';
import { LoaderService } from '../../../../core/loader/loader.service';
import { BaseComponent } from '../../../../core/base/base.component';

import { ProjectUtils } from '../../../shared/project-utils';
import { Constants } from '../../../shared/constant';
import { Log, Level } from 'ng2-logger';
import { Logger as Loggerr } from '../../../../core/logger/logger';

import { BadDebtorsSearchService } from './bad-debtors-search.service';
import { BadDebtorsSearchModel } from './bad-debtors-search.model';
import { GlobalService } from '../../../shared/global.service';
import { ChangeService } from '../../../shared/change-service';
import { SaveSearchService } from '../../../shared/save-search-service';
import { CzDatePickerComponent } from '../../../../components/cz-date-picker/cz-date-picker.component';


@Component({
    selector: 'app-bad-debtors-search',
    templateUrl: './bad-debtors-search.component.html',
    styleUrls: ['./bad-debtors-search.component.css'],
    providers: [BadDebtorsSearchService]
})
export class BadDebtorsSearchComponent extends BaseComponent {
    ngterms: any;
    private serviceName = 'BAD_DEBTORS';
    log = Log.create('BadDebtorsSearchComponent');

    badDebtorsSearchModel: BadDebtorsSearchModel;

    @ViewChild(DataTableDirective) dtElement: DataTableDirective;
    @ViewChild('badDebtorNotesList') BadDebtorsTemplate;
    @ViewChild(TabsComponent) tabsComponent;
    @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;
    ddOptionsTerms: DataDropDownOptions;
    ddTriggerTerms: Subject<any> = new Subject();
    @ViewChild('terms', { read: DataDropDownComponent }) ddTerms: DataDropDownComponent;
    @ViewChild(CzDatePickerComponent) czDatePicker: CzDatePickerComponent;

    constructor(private router: Router,
        protected loaderService: LoaderService,
        private _logger: Logger,
        protected globalService: GlobalService,
        protected changeService: ChangeService,
        protected saveSearchService: SaveSearchService,
        private badDebtorsSearchService: BadDebtorsSearchService) {
        super(loaderService, changeService, saveSearchService, badDebtorsSearchService, globalService);
        console.log(this.badDebtorsSearchService);

        this.log.color = 'lightblue';
        this.doInitialSetup();
    }
    doInInitLoad() {
        this.globalService.getTermsData(this.ddTriggerTerms);
        this.hideLoader();
    }
    getDatePicker(): CzDatePickerComponent {
        return this.czDatePicker;
    }


    doInitialSetup() {
        this.ddOptionsTerms = ProjectUtils.getOptionTerms(this);
        this.ddOptionsTerms.selectMulti = true;
        this.ddOptionsTerms.firstOptionText = 'Select  Term';
        this.displaySearchOptions.noCrossList = [];
        this.displaySearchOptions.noCrossList.push('term');
    }

    // override
    getLoaderName(): string {
        return 'bad-debtors-search';
    }

    // override
    getSearchModel(): any {
        console.log(this.badDebtorsSearchModel);
        if (ProjectUtils.isEmpty(this.badDebtorsSearchModel)) {
            this.badDebtorsSearchModel = <BadDebtorsSearchModel>ProjectUtils.getBadDebtorsSearch(this.sessionObject);
            if (ProjectUtils.isEmpty(this.badDebtorsSearchModel)) {
                this.badDebtorsSearchModel = new BadDebtorsSearchModel();
                this.badDebtorsSearchModel.limit = this.sessionObject.limit
            }
            this.ngterms = this.badDebtorsSearchModel.terms
        }
        this.log.i('getSearchModel', this.badDebtorsSearchModel);
        return this.badDebtorsSearchModel;
    }

    // override
    getSearchType(): string {
        return 'badDebtorsSearch';
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
        this.tabsComponent.openTab('Bad Debtors Notes List',
            this.BadDebtorsTemplate, {}, true, 'badDebtorNotesList');
    }

    // override
    getDispSearch(): ThinkListDisplaySearchComponent {
        return this.dispSearch;
    }

    // override
    getReportTitle(): string {
        return 'Bad-Debtors Report';
    }
    // override
    getReportIcon(): string {
        return 'fa-credit-card';
    }
    // override
    getReportFileName(): string {
        return 'bad-debtorNoteReport';
    }


    // override
    setSearchModel(searchModel: any) {
        console.log('setSearchModel: searchModel', searchModel);
        if (!ProjectUtils.isEmpty(searchModel)) {
            if (typeof searchModel === 'string') {
                this.badDebtorsSearchModel = JSON.parse(searchModel);
            } else {
                this.badDebtorsSearchModel = searchModel;
            }
        }

        if (this.badDebtorsSearchModel.limit === '') {
            this.badDebtorsSearchModel.limit = 0;
        }
        this.ngterms = this.setDropDownComponentValue('term');
        ProjectUtils.setBadDebtorsSearch(this.sessionObject, this.badDebtorsSearchModel);
    }

    getDataElement(whichService: string): DataTableDirective {
        if (whichService === this.serviceName) {
            return this.dtElement;
        }
    }

    // override
    getBodyData(): string {
        let body = '';
        body += this.badDebtorsSearchService.getDropDownSearchParam(body, 'term', this.badDebtorsSearchModel);
        body += this.getBodyLimit(body, this.badDebtorsSearchModel.limit);
        return body;
    }

    doOnReset() {
        this.badDebtorsSearchModel['term'] = null;
        this.ngterms = [];
        this.badDebtorsSearchModel.limit = this.sessionObject.limit;
    }

}
