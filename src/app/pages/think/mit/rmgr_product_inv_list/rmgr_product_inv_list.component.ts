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
import { DataDropDownComponent } from '../../../../components/data-drop-down/data-drop-down.component';
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

import { RMGRProductInvListService } from './rmgr_product_inv_list.service';
import { RMGRProductInvListModel } from './rmgr_product_inv_list.model';
@Component({
    selector: 'app-rmgr-product-inv-list',
    templateUrl: './rmgr_product_inv_list.component.html',
    styleUrls: ['./rmgr_product_inv_list.component.css'],
    providers: [RMGRProductInvListService]
})
export class RMGRProductInvListComponent extends BaseComponent {

    private RMGR_PRODUCT_INV_LIST_SEARCH = 'rmgrProductInvListSearch';
    log = Log.create('RMGRProductInvListComponent');
    rmgrProductInvListModel: RMGRProductInvListModel;
    ngTaxProfitCentre: any;
    ngActiveSearch: any;
    @ViewChild('rmgrProductInvListData', { read: DataTableDirective }) dtElement: DataTableDirective;
    @ViewChild('rmgrProductInvList') rmgrProductInvListTemplate;
    @ViewChild(TabsComponent) tabsComponent;
    @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;

    ddOptionsPCenter: DataDropDownOptions;
    ddActiveSearch: DataDropDownOptions;
    ddTriggerActive: Subject<any> = new Subject();

    constructor(private rmgrProductInvListService: RMGRProductInvListService,
        protected globalService: GlobalService,
        private _logger: Logger,
        private router: Router,
        protected changeService: ChangeService,
        protected saveSearchService: SaveSearchService,
        protected loaderService: LoaderService) {
        super(loaderService, changeService, saveSearchService, rmgrProductInvListService, globalService);
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
        this.ddOptionsPCenter.sort = true;
        this.ddOptionsPCenter.sortOrder = 'asc';

        this.ddActiveSearch = new DataDropDownOptions();
        this.ddActiveSearch.keyName = 'id';
        this.ddActiveSearch.keyDesc = 'value';
        this.ddActiveSearch.firstOptionText = 'Select Status';
        // this.ddActiveSearch.firstOptionValue = '-100';
        this.ddActiveSearch.baseComponent = this;
        this.ddActiveSearch.modelName = 'status';

    }


    doPreInitLoad() {
        // this.getActiveData();

        this.globalService.getMitStatusData(this.ddTriggerActive);
        this.hideLoader();
    }



    // override
    getLoaderName(): string {
        return 'rmgr-product-inv-list';
    }

    // override
    getSearchModel(): any {
        if (ProjectUtils.isEmpty(this.rmgrProductInvListModel)) {
            this.rmgrProductInvListModel = <RMGRProductInvListModel>this.sessionObject.rmgrProductInvListSearch;
            if (ProjectUtils.isEmpty(this.rmgrProductInvListModel)) {
                this.rmgrProductInvListModel = new RMGRProductInvListModel();
                this.rmgrProductInvListModel.limit = this.sessionObject.limit;
            }
            this.ngActiveSearch = this.rmgrProductInvListModel.status;
            this.ngTaxProfitCentre = this.rmgrProductInvListModel.profitCentre;
        }

        this.log.i('getSearchModel', this.rmgrProductInvListModel);
        return this.rmgrProductInvListModel;
    }

    // override
    getSearchType(): string {
        return 'rmgrProductInvList';
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
        return this.RMGR_PRODUCT_INV_LIST_SEARCH;
    }

    // override
    openListTab() {
        this.tabsComponent.openTab('Products - Inventory List',
            this.rmgrProductInvListTemplate, {}, true, 'rmgrProductInvList');
    }

    // override
    getDispSearch(): ThinkListDisplaySearchComponent {
        return this.dispSearch;
    }

    // override
    getReportTitle(): string {
        return 'Products - Inventory List Report';
    }
    getReportIcon(): string {
        return 'fa-file-text-o';
    }
    // override
    getReportFileName(): string {
        return 'inventoryList-ProductsReport';
    }

    // override
    setSearchModel(searchModel: any) {
        if (!ProjectUtils.isEmpty(searchModel)) {
            if (typeof searchModel === 'string') {
                this.rmgrProductInvListModel = JSON.parse(searchModel);
            } else {
                this.rmgrProductInvListModel = searchModel;
            }
        }
        if (this.rmgrProductInvListModel.limit === '') {
            this.rmgrProductInvListModel.limit = 0;
        }

        this.log.i('setSearchModel', this.rmgrProductInvListModel);
        this.ngActiveSearch = this.setDropDownComponentValue('status');
        this.ngTaxProfitCentre = this.setDropDownComponentValue('profitCentre');
        ProjectUtils.setRMGRProductInvListSearch(this.sessionObject, this.rmgrProductInvListModel);
    }

    getBodyData(): string {
        let body = '';
        body += this.rmgrProductInvListService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());
        body += this.getBodyLimit(body, this.rmgrProductInvListModel.limit);
        body += this.rmgrProductInvListService.setParamValue(body, 'invent_code', this.rmgrProductInvListModel['invent_code']);
        body += this.rmgrProductInvListService.getDropDownSearchParam(body, 'profitCentre', this.rmgrProductInvListModel);
        body += this.rmgrProductInvListService.getDropDownSearchParam(body, 'status', this.rmgrProductInvListModel);
        return body;
    }


    doOnReset() {
        this.rmgrProductInvListModel['active'] = null;
        this.ngActiveSearch = [];
        this.rmgrProductInvListModel['profitCentre'] = null;
        this.ngTaxProfitCentre = [];
        this.rmgrProductInvListModel.limit = this.sessionObject.limit;
    }
}
