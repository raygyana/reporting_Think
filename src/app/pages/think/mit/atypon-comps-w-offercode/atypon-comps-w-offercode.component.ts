import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { ParamMap } from '@angular/router';
import { DatePipe } from '@angular/common';
// Import from III party
import { DataTableDirective } from 'angular-datatables';
import { TabsetComponent } from '../../../../components/ngtabs';
import { TabsComponent } from '../../../../components/ng-tabs/tabs.component';
import { Log, Level } from 'ng2-logger';
import { Logger } from '../../../../core/logger/logger';
import { LoaderService } from '../../../../core/loader/loader.service';
import { BaseComponent } from '../../../../core/base/base.component';
import { ProjectUtils } from '../../../shared/project-utils';
import { Constants } from '../../../shared/constant';
import { DataDropDownOptions } from '../../../../components/data-drop-down/data-drop-down.model';
import { AtyponCompsOfferCodeModel } from '../atypon-comps-w-offercode/atypon-comps-w-offercode.model';
import { DataDropDownComponent } from '../../../../components/data-drop-down/data-drop-down.component';
import { SessionObject } from '../../../shared/session-object';
import { GlobalService } from '../../../shared/global.service';
import { SearchModelType } from '../../../shared/search-model-type';
import { ChangeService } from '../../../shared/change-service';
import { SaveSearchService } from '../../../shared/save-search-service';
import { ThinkListDisplaySearchComponent } from '../../../../components/think-list-display-search/think-list-display-search.component';
import { CzDatePickerComponent } from '../../../../components/cz-date-picker/cz-date-picker.component';
import { AtyponCompsOfferCodeService } from './atypon-comps-w-offercode.service';

@Component({
    selector: 'app-atyponcompswoffercode',
    templateUrl: './atypon-comps-w-offercode.component.html',
    styleUrls: ['./atypon-comps-w-offercode.component.css'],
    providers: [AtyponCompsOfferCodeService]
})

export class AtyponCompsOfferCodeComponent extends BaseComponent {
    private ATYPON_COMPS_OFFEER_CODE_SEARCH = 'atyponCompsOfferCodeSearch';
    log = Log.create('AtyponCompsOfferCodeComponent');
    ddOptionsproductName: DataDropDownOptions;
    atyponCompsOfferCodeModel: AtyponCompsOfferCodeModel;
    ddOptionsOrderCatN: DataDropDownOptions;
    ngOrderCategory: any;

    ddTriggerOrderCatN: Subject<any> = new Subject<any>();


    @ViewChild('AtyponCompsOfferCodeData', { read: DataTableDirective }) dtElement: DataTableDirective;
    @ViewChild('atyponCompsOfferCodeList') atyponCompsOfferCodeTemplate;
    @ViewChild(TabsComponent) tabsComponent;
    @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;
    @ViewChild(CzDatePickerComponent) czDatePicker: CzDatePickerComponent;



    constructor(private atyponCompsOfferCodeService: AtyponCompsOfferCodeService,
        protected globalService: GlobalService,
        private _logger: Logger,
        private router: Router,
        protected changeService: ChangeService,
        protected saveSearchService: SaveSearchService,
        protected loaderService: LoaderService) {
        super(loaderService, changeService, saveSearchService, atyponCompsOfferCodeService, globalService);
        this.doInitialSetup();

    }

    doPreInitLoad() {
        // this.getActiveData();
        this.globalService.getOrderCatData(this.ddTriggerOrderCatN);

    }
    // override
    getLoaderName(): string {
        return 'atypon-comps-w-offercode-component';
    }

    // override
    getSearchModel(): any {
        if (ProjectUtils.isEmpty(this.atyponCompsOfferCodeModel)) {
            this.atyponCompsOfferCodeModel = this.sessionObject.atyponCompsOfferCodeSearch;
            if (ProjectUtils.isEmpty(this.atyponCompsOfferCodeModel)) {
                this.atyponCompsOfferCodeModel = new AtyponCompsOfferCodeModel();
                this.atyponCompsOfferCodeModel.limit = this.sessionObject.limit;
                //  this.calenderSetDefaultValue(this.atyponCancelsModel);
            }
            this.ngOrderCategory = this.atyponCompsOfferCodeModel.orderCategory;
        }

        this.log.i('getSearchModel', this.atyponCompsOfferCodeModel);
        return this.atyponCompsOfferCodeModel;
    }

    doInitialSetup() {

        this.ddOptionsOrderCatN = new DataDropDownOptions();
        this.ddOptionsOrderCatN.keyName = 'id';
        this.ddOptionsOrderCatN.keyDesc = 'value';
        this.ddOptionsOrderCatN.firstOptionText = 'ALL';
        this.ddOptionsOrderCatN.modelName = 'orderCategory';
        this.ddOptionsOrderCatN.baseComponent = this;

    }


    // override
    getSearchType(): string {
        return 'atyponCompsWofferCode';
    }


    // override
    getDataElement(whichService: string): DataTableDirective {
        return this.dtElement;
    }

    // override
    getTabsComponent(): any {
        return this.tabsComponent;
    }

    // override
    getServiceName(): string {
        return this.ATYPON_COMPS_OFFEER_CODE_SEARCH;
    }

    // override
    openListTab() {
        this.tabsComponent.openTab('Atypon Comps W Offer Code List',
            this.atyponCompsOfferCodeTemplate, {}, true, 'atyponCompsOfferCodeList');
    }

    // override
    getDispSearch(): ThinkListDisplaySearchComponent {
        return this.dispSearch;
    }

    // override
    getReportTitle(): string {
        return 'Atypon Comps Offer Code Report';
    }
    getReportIcon(): string {
        return 'fa-file-text-o';
    }

    // override
    getReportFileName(): string {
        return 'atyponCompsOfferCodeReport';
    }

    // override
    setSearchModel(searchModel: any) {
        if (!ProjectUtils.isEmpty(searchModel)) {
            if (typeof searchModel === 'string') {
                this.atyponCompsOfferCodeModel = JSON.parse(searchModel);
            } else {
                this.atyponCompsOfferCodeModel = searchModel;
            }
        }
        if (this.atyponCompsOfferCodeModel.limit === '') {
            this.atyponCompsOfferCodeModel.limit = 0;
        }
        this.log.i('setSearchModel', this.atyponCompsOfferCodeModel);
        this.ngOrderCategory = this.setDropDownComponentValue('orderCategory');
        ProjectUtils.setAtyponCompsOfferCodeSearch(this.sessionObject, this.atyponCompsOfferCodeModel);
    }

    getDatePicker(): CzDatePickerComponent {
        return this.czDatePicker;
    }

    getBodyData(): string {
        let body = '';
        body += this.atyponCompsOfferCodeService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());
        body += this.atyponCompsOfferCodeService.getDateSearchParam(this.atyponCompsOfferCodeModel, body);
        body += this.getBodyLimit(body, this.atyponCompsOfferCodeModel.limit);
        body += this.atyponCompsOfferCodeService.setParamValue(body, 'offerCode', this.atyponCompsOfferCodeModel['offerCode']);
        body += this.atyponCompsOfferCodeService.getDropDownSearchParam(body, 'orderCategory', this.atyponCompsOfferCodeModel);
        body += this.atyponCompsOfferCodeService.setParamValue(body, 'issn', this.atyponCompsOfferCodeModel['issn']);
        return body;
    }


    doOnReset() {
        this.atyponCompsOfferCodeModel['orderCategory'] = null;
        this.ngOrderCategory = [];
        this.atyponCompsOfferCodeModel['offerCode'] = null;
        this.atyponCompsOfferCodeModel['issn'] = null;
        this.czDatePicker.calendarCanceled(this);
        this.atyponCompsOfferCodeModel.limit = this.sessionObject.limit;

    }
}

