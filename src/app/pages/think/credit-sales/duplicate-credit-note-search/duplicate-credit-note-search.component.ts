import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
// Import from III party
import { DataTableDirective } from 'angular-datatables';
import { TabsetComponent } from '../../../../components/ngtabs';
import { TabsComponent } from '../../../../components/ng-tabs/tabs.component';
import { ThinkListDisplaySearchComponent } from '../../../../components/think-list-display-search/think-list-display-search.component';

import { Logger } from '../../../../core/logger/logger';
import { LoaderService } from '../../../../core/loader/loader.service';
import { BaseComponent } from '../../../../core/base/base.component';

import { ProjectUtils } from '../../../shared/project-utils';
import { Constants } from '../../../shared/constant';
import { Log, Level } from 'ng2-logger';
import { Logger as Loggerr } from '../../../../core/logger/logger';

import { DuplicateCreditNoteSearchService } from './duplicate-credit-note-search.service';
import { DuplicateCreditNoteSearchModel } from './duplicate-credit-note-search.model';
import { GlobalService } from '../../../shared/global.service';
import { ChangeService } from '../../../shared/change-service';
import { SaveSearchService } from '../../../shared/save-search-service';
import { CzDatePickerComponent } from '../../../../components/cz-date-picker/cz-date-picker.component';
import { styleDuplicateCreditNote } from './duplicate-credit-note-print-view/data';

@Component({
    selector: 'app-duplicate-credit-note-search',
    templateUrl: './duplicate-credit-note-search.component.html',
    styleUrls: ['./duplicate-credit-note-search.component.css'],
    providers: [DuplicateCreditNoteSearchService]
})
export class DuplicateCreditNoteSearchComponent extends BaseComponent {

    styleDuplicateCreditNote = styleDuplicateCreditNote;

    private serviceName = 'DUBLICATE_CREDIT_NOTE';
    log = Log.create('DuplicateCreditNoteSearchComponent');

    duplicateCreditNoteSearchModel: DuplicateCreditNoteSearchModel;

    @ViewChild(DataTableDirective) dtElement: DataTableDirective;
    @ViewChild('duplicateCreditNoteSearchList') DuplicateCreditNoteSearchTemplate;
    @ViewChild(TabsComponent) tabsComponent;
    @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;
    @ViewChild(CzDatePickerComponent) czDatePicker: CzDatePickerComponent;

    constructor(
        private router: Router,
        protected loaderService: LoaderService,
        private _logger: Logger,
        protected globalService: GlobalService,
        protected changeService: ChangeService,
        protected saveSearchService: SaveSearchService,
        private duplicateCreditNoteSearchService: DuplicateCreditNoteSearchService) {
        super(loaderService, changeService, saveSearchService, duplicateCreditNoteSearchService, globalService);

        this.log.color = 'lightblue';
        this.doInitialSetup();
    }

    doInInitLoad() {
        this.hideLoader();
    }

    getDatePicker(): CzDatePickerComponent {
        return this.czDatePicker;
    }

    doInitialSetup() {
        this.displaySearchOptions.noCrossList = [];
        this.displaySearchOptions.noCrossList.push('creditNoteNo');
    }
    checkchange(e) {
        if (e.target.checked) {
            console.log('checked');
            this.duplicateCreditNoteSearchModel.show_item_price = {
                'id': 'true',
                'desc': 'Show Item Price',
                'columnName': 'show_item_price'
            };
        } else {
            console.log('unchecked');
            this.duplicateCreditNoteSearchModel.show_item_price = '';
        }
    }

    // override
    getLoaderName(): string {
        return 'duplicate-credit-note-search';
    }

    // override
    getSearchModel(): any {
        if (ProjectUtils.isEmpty(this.duplicateCreditNoteSearchModel)) {
            this.duplicateCreditNoteSearchModel = <DuplicateCreditNoteSearchModel>ProjectUtils.getDuplicateCreditNoteSearch(this.sessionObject);
            console.log(this.duplicateCreditNoteSearchModel);
            if (ProjectUtils.isEmpty(this.duplicateCreditNoteSearchModel)) {
                this.duplicateCreditNoteSearchModel = new DuplicateCreditNoteSearchModel();
                this.duplicateCreditNoteSearchModel.limit = this.sessionObject.limit
            }
        }
        this.log.i('getSearchModel', this.duplicateCreditNoteSearchModel);
        return this.duplicateCreditNoteSearchModel;
    }

    // override
    getSearchType(): string {
        return 'duplicateCreditNoteSearch';
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
        this.tabsComponent.openTab('Duplicate Credit Note List',
            this.DuplicateCreditNoteSearchTemplate, {}, true, 'duplicateCreditNoteSearchList');
    }

    // override
    getDispSearch(): ThinkListDisplaySearchComponent {
        return this.dispSearch;
    }
    // override
    getReportIcon(): string {
        return 'fa-credit-card';
    }
    // override

    getReportTitle(): string {
        return 'Duplicate Credit Note Report';
    }

    // override
    getReportFileName(): string {
        return 'DuplicateCreditNoteReport';
    }

    // override
    setSearchModel(searchModel: any) {
        console.log('setSearchModel: searchModel', searchModel);
        if (!ProjectUtils.isEmpty(searchModel)) {
            if (typeof searchModel === 'string') {
                this.duplicateCreditNoteSearchModel = JSON.parse(searchModel);
            } else {
                this.duplicateCreditNoteSearchModel = searchModel;
            }
        }

        if (this.duplicateCreditNoteSearchModel.limit === '') {
            this.duplicateCreditNoteSearchModel.limit = 0;
        }
        ProjectUtils.setDuplicateCreditNoteSearch(this.sessionObject, this.duplicateCreditNoteSearchModel);
    }
    getDataElement(whichService: string): DataTableDirective {
        if (whichService === this.serviceName) {
            return this.dtElement;
        }
    }

    // override
    getBodyData(): string {
        let body = '';
        body += this.duplicateCreditNoteSearchService.setParamValue(body, 'credit_note_number', this.duplicateCreditNoteSearchModel['creditNoteNo']);
        body += this.duplicateCreditNoteSearchService.getDropDownSearchParam(body, 'show_item_price', this.duplicateCreditNoteSearchModel);
        body += this.getBodyLimit(body, this.duplicateCreditNoteSearchModel.limit);
        body += this.duplicateCreditNoteSearchService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());

        return body;
    }
    doOnReset() {
        this.duplicateCreditNoteSearchModel.limit = this.sessionObject.limit;
    }

    dtTaskFunc(dtOptions, titleName, fileName) {
        return ProjectUtils.dtEnablePDF(dtOptions, titleName, fileName);
    }

    printInvoice() {
        ProjectUtils.PrintElem('duplicateCreditNote', this.styleDuplicateCreditNote);
    }

}
