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
import { SaveSearchService } from '../../../shared/save-search-service';
import { Log, Level } from 'ng2-logger';
import { Logger as Loggerr } from '../../../../core/logger/logger';
import { ThinkListDisplaySearchComponent } from '../../../../components/think-list-display-search/think-list-display-search.component';

import { InventoryStockListService } from './inventory-stock-list.service';
import { InventoryStockListModel } from './inventory-stock-list.model';

@Component({
    selector: 'app-inventory-stock-list',
    templateUrl: './inventory-stock-list.component.html',
    styleUrls: ['./inventory-stock-list.component.css'],
    providers: [InventoryStockListService]
})
export class InventoryStockListComponent extends BaseComponent {
    INVENTORY_STOCK_LIST = 'inventoryStockList';
    log = Log.create('InventoryStockListComponent');
    ngProductName: any;
    inventorySearchModel: InventoryStockListModel;
    ddOptionsproductName: DataDropDownOptions;

    @ViewChild('inventoryStockListData', { read: DataTableDirective }) dtElement: DataTableDirective;
    @ViewChild('inventoryStockList') inventoryStockListTemplate;
    @ViewChild(TabsComponent) tabsComponent;
    @ViewChild(ThinkListDisplaySearchComponent) dispSearch:
        ThinkListDisplaySearchComponent;
    @ViewChild('productTitle', { read: DataDropDownComponent }) ddProductName: DataDropDownComponent;


    constructor(private router: Router,
        protected loaderService: LoaderService,
        private _logger: Logger,
        protected changeService: ChangeService,
        protected globalService: GlobalService,
        protected saveSearchService: SaveSearchService,
        private inventoryStockListService: InventoryStockListService) {
        super(loaderService, changeService, saveSearchService, inventoryStockListService, globalService);
        this.log.color = 'lightblue';
        this.doInitialSetup();
    }

    getLoaderName(): string {
        return 'inventory-stock-list';
    }

    getSearchModel(): any {
        if (ProjectUtils.isEmpty(this.inventorySearchModel)) {
            this.inventorySearchModel = this.sessionObject.inventoryStockSearch;
            if (ProjectUtils.isEmpty(this.inventorySearchModel)) {
                this.inventorySearchModel = new InventoryStockListModel();
                this.inventorySearchModel.limit = this.sessionObject.limit;
            }
            this.ngProductName = this.inventorySearchModel.productTitle;
        }
        this.log.i('getSearchModel', this.inventorySearchModel);
        return this.inventorySearchModel;
    }

    getSearchType(): string {
        return 'inventoryStockList';
    }
    // override
    getReportTitle(): string {
        return 'Inventory Stock List Report';
    }
    getReportIcon(): string {
        return 'fa fa-edit';
    }
    // override
    getReportFileName(): string {
        return 'inventoryStockListReport';
    }
    getServiceName(): string {
        return this.INVENTORY_STOCK_LIST;
    }

    doInitialSetup() {
        this.ddOptionsproductName = new DataDropDownOptions();
        this.ddOptionsproductName.serviceURL = Constants.TK_SALE_JOURNAL_LIST_URL;
        this.ddOptionsproductName.keyName = 'ocID';
        this.ddOptionsproductName.keyDesc = 'description';
        this.ddOptionsproductName.modelName = 'productTitle';
        this.ddOptionsproductName.baseComponent = this;
        this.ddOptionsproductName.firstOptionText = 'Select a Product';
    }


    goToSearch() {
        this.tabsComponent.selectTab(this.tabsComponent.tabs.first);
    }

    // override
    getTabsComponent(): any {
        return this.tabsComponent;
    }
    // override
    openListTab() {
        this.tabsComponent.openTab('Inventory Stock Search List ',
            this.inventoryStockListTemplate, {}, true, 'inventoryStockList');
    }
    // override
    getDispSearch(): ThinkListDisplaySearchComponent {
        return this.dispSearch;
    }

    // override
    setSearchModel(searchModel: any) {
        if (!ProjectUtils.isEmpty(searchModel)) {
            if (typeof searchModel === 'string') {
                this.inventorySearchModel = JSON.parse(searchModel);
            } else {
                this.inventorySearchModel = searchModel;
            }
        }
        if (this.inventorySearchModel.limit === '') {
            this.inventorySearchModel.limit = 0;
        }
        this.log.i('setSearchModel', this.inventorySearchModel);
        this.ngProductName = this.setDropDownComponentValue('productTitle');
        ProjectUtils.setInventoryStockSearch(this.sessionObject, this.inventorySearchModel);
    }



    getDataElement(whichService: string): DataTableDirective {
        return this.dtElement;
    }


    getBodyData(): string {
        let body = '';
        body += this.inventoryStockListService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());
        body += this.inventoryStockListService.setParamValue(body, 'inventoryCode', this.inventorySearchModel['invent_code']);
        body += this.inventoryStockListService.getDropDownSearchParam(body, 'productTitle', this.inventorySearchModel);
        body += this.getBodyLimit(body, this.inventorySearchModel.limit);
        return body;
    }
    doOnReset() {
        this.inventorySearchModel['productTitle'] = null;
        this.ngProductName = [];
        this.inventorySearchModel.limit = this.sessionObject.limit;


    }

}
