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


import { GeneratedCreditNotesSearchService } from './Generated-credit-notes-search.service';
import { GeneratedCreditNotesSearchModel } from './Generated-credit-notes-search.model';
import { GlobalService } from '../../../shared/global.service';
import { ChangeService } from '../../../shared/change-service';
import { SaveSearchService } from '../../../shared/save-search-service';
import { CzDatePickerComponent } from '../../../../components/cz-date-picker/cz-date-picker.component';
@Component({
    selector: 'app-generated-credit-notes-search',
    templateUrl: './Generated-credit-notes-search.component.html',
    styleUrls: ['./Generated-credit-notes-search.component.css'],
    providers: [GeneratedCreditNotesSearchService]
})
export class GeneratedCreditNotesSearchComponent extends BaseComponent {
    ngterms: any;
    private serviceName = 'GENRATED_CREDIT_NOTES';
    log = Log.create('GeneratedCreditNotesSearchComponent');

    generatedCreditNotesSearchModel: GeneratedCreditNotesSearchModel;
    @ViewChild(CzDatePickerComponent) czDatePicker: CzDatePickerComponent;
    @ViewChild(DataTableDirective) dtElement: DataTableDirective;
    @ViewChild('generatedCreditNotesList') GeneratedCreditNotesTemplate;
    @ViewChild(TabsComponent) tabsComponent;
    @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;
    ddOptionsTerms: DataDropDownOptions;
    ddTriggerTerms: Subject<any> = new Subject();
    @ViewChild('terms', { read: DataDropDownComponent }) ddTerms: DataDropDownComponent;

    constructor(private router: Router,
        protected loaderService: LoaderService,
        private _logger: Logger,
        protected globalService: GlobalService,
        protected changeService: ChangeService,
        protected saveSearchService: SaveSearchService,
        private generatedCreditNotesSearchService: GeneratedCreditNotesSearchService) {
        super(loaderService, changeService, saveSearchService, generatedCreditNotesSearchService, globalService);

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
    getReportIcon(): string {
        return 'fa-credit-card';
    }

    // override
    getLoaderName(): string {
        return 'Generated-credit-notes-search';
    }

    // override
    getSearchModel(): any {

        console.log(this.generatedCreditNotesSearchModel);
        if (ProjectUtils.isEmpty(this.generatedCreditNotesSearchModel)) {
            this.generatedCreditNotesSearchModel = <GeneratedCreditNotesSearchModel>ProjectUtils.getGeneratedCreditNotesSearch(this.sessionObject);
            if (ProjectUtils.isEmpty(this.generatedCreditNotesSearchModel)) {
                this.generatedCreditNotesSearchModel = new GeneratedCreditNotesSearchModel();
                this.generatedCreditNotesSearchModel.limit = this.sessionObject.limit
            }
            this.ngterms = this.generatedCreditNotesSearchModel.terms
        }
        this.log.i('getSearchModel', this.generatedCreditNotesSearchModel);
        return this.generatedCreditNotesSearchModel;
    }

    // override
    getSearchType(): string {
        return 'generatedCreditNotesSearch';
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
        this.tabsComponent.openTab('Generated Credit Notes List',
            this.GeneratedCreditNotesTemplate, {}, true, 'generatedCreditNotesList');
    }

    // override
    getDispSearch(): ThinkListDisplaySearchComponent {
        return this.dispSearch;
    }

    // override
    getReportTitle(): string {
        return 'Generated-Credit-Notes Report';
    }

    // override
    getReportFileName(): string {
        return 'GeneratedCreditNotesReport';
    }

    // override
    setSearchModel(searchModel: any) {
        console.log('setSearchModel: searchModel', searchModel);
        if (!ProjectUtils.isEmpty(searchModel)) {
            if (typeof searchModel === 'string') {
                this.generatedCreditNotesSearchModel = JSON.parse(searchModel);
            } else {
                this.generatedCreditNotesSearchModel = searchModel;
            }
        }
        if (this.generatedCreditNotesSearchModel.limit === '') {
            this.generatedCreditNotesSearchModel.limit = 0;
        }

        this.ngterms = this.setDropDownComponentValue('term');
        ProjectUtils.setGeneratedCreditNotesSearch(this.sessionObject, this.generatedCreditNotesSearchModel);
    }

    getDataElement(whichService: string): DataTableDirective {
        if (whichService === this.serviceName) {
            return this.dtElement;
        }
    }

    // override
    getBodyData(): string {
        let body = '';
        body += this.generatedCreditNotesSearchService.getDateSearchParam(this.generatedCreditNotesSearchModel, body);
        body += this.generatedCreditNotesSearchService.getDropDownSearchParam(body, 'term', this.generatedCreditNotesSearchModel);
        body += this.getBodyLimit(body, this.generatedCreditNotesSearchModel.limit);
        body += this.generatedCreditNotesSearchService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());
        return body;
    }

    doOnReset() {
        this.generatedCreditNotesSearchModel['term'] = null;
        this.ngterms = [];
        this.czDatePicker.calendarCanceled(this);
        this.generatedCreditNotesSearchModel.limit = this.sessionObject.limit;
    }

}
