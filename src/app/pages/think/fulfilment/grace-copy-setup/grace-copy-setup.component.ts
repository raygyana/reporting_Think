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
import { SessionObject } from '../../../shared/session-object';
import { GlobalService } from '../../../shared/global.service';
import { SearchModelType } from '../../../shared/search-model-type';
import { ChangeService } from '../../../shared/change-service';
import { SaveSearchService } from '../../../shared/save-search-service';
import { Log, Level } from 'ng2-logger';
import { Logger as Loggerr } from '../../../../core/logger/logger';
import { ThinkListDisplaySearchComponent } from '../../../../components/think-list-display-search/think-list-display-search.component';
import { DataDropDownComponent } from '../../../../components/data-drop-down/data-drop-down.component';
import { GraceCopySetupService } from './grace-copy-setup.service';
import { GraceCopySetupModel } from './grace-copy-setup.model';
@Component({
    selector: 'app-grace-copy-setup',
    templateUrl: './grace-copy-setup.component.html',
    styleUrls: ['./grace-copy-setup.component.css'],
    providers: [GraceCopySetupService]
})
export class GraceCopySetupComponent extends BaseComponent {
    GRACE_COPY_SETUP = 'GRACE_COPY_SETUP';
    log = Log.create('GraceCopySetupComponent');

    graceCopySetupModel: any;
    ngProduct: any;
    ddOptionsProduct: DataDropDownOptions;
    @ViewChild(DataTableDirective) dtElement: DataTableDirective;
    @ViewChild('graceCopySetupList') graceCopySetupListTemplate;
    @ViewChild(TabsComponent) tabsComponent;
    @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;
    @ViewChild('product', { read: DataDropDownComponent }) ddProduct: DataDropDownComponent;

    constructor(private router: Router,
        private graceCopySetupService: GraceCopySetupService,
        protected globalService: GlobalService,
        private _logger: Logger,
        protected changeService: ChangeService,
        protected saveSearchService: SaveSearchService,
        protected loaderService: LoaderService) {
        super(loaderService, changeService, saveSearchService, graceCopySetupService, globalService);
        this.doInitialSetup();
        this.log.color = 'lightblue';
    }

    doInitialSetup() {
        this.ddOptionsProduct = new DataDropDownOptions();
        this.ddOptionsProduct.serviceURL = Constants.TK_SALE_JOURNAL_LIST_URL;
        this.ddOptionsProduct.keyName = 'ocID';
        this.ddOptionsProduct.keyDesc = 'description';
        this.ddOptionsProduct.baseComponent = this;
        this.ddOptionsProduct.modelName = 'productId';
        this.ddOptionsProduct.selectMulti = true;
    }

    getLoaderName(): string {
        return 'grace-copy-setup-component';
    }

    getSearchModel(): any {
        if (ProjectUtils.isEmpty(this.graceCopySetupModel)) {
            this.graceCopySetupModel = ProjectUtils.getGraceSetupSearch(this.sessionObject);
            if (ProjectUtils.isEmpty(this.graceCopySetupModel)) {
                this.graceCopySetupModel = new GraceCopySetupModel();
                this.graceCopySetupModel.limit = this.sessionObject.limit;
            }
            this.ngProduct = this.graceCopySetupModel.productId;
        }
        this.log.i('getSearchModel', this.graceCopySetupModel);
        return this.graceCopySetupModel;
    }

    getSearchType(): string {
        return 'graceCopySetup';
    }

    doInInitLoad() {
        this.hideLoader();
    }
    getTabsComponent(): any {
        return this.tabsComponent;
    }

    // override
    openListTab() {
        this.tabsComponent.openTab('Grace Copy Setup List',
            this.graceCopySetupListTemplate, {}, true, 'graceCopySetupList');
    }
    // override
    getDispSearch(): ThinkListDisplaySearchComponent {
        return this.dispSearch;
    }
    // override
    getReportTitle(): string {
        return 'Grace Copy Setup Report';
    }
    getReportIcon(): string {
        return 'fa fa-edit';
    }
    // override
    getReportFileName(): string {
        return 'graceCopySetupReport';
    }
    getServiceName(): string {
        return this.GRACE_COPY_SETUP;
    }

    // override
    setSearchModel(searchModel: any) {
        if (!ProjectUtils.isEmpty(searchModel)) {
            if (typeof searchModel === 'string') {
                this.graceCopySetupModel = JSON.parse(searchModel);
            } else {
                this.graceCopySetupModel = searchModel;
            }
        }
        if (this.graceCopySetupModel.limit === '') {
            this.graceCopySetupModel.limit = 0;
        }
        this.ngProduct = this.setDropDownComponentValue('productId');
        this.log.i('setSearchModel', this.graceCopySetupModel);
        ProjectUtils.setGraceSetUpSearch(this.sessionObject, this.graceCopySetupModel);
    }

    // override
    getDataElement(whichService: string): DataTableDirective {
        return this.dtElement;
    }

    getBodyData(): string {
        let body = '';
        body += this.graceCopySetupService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());
        body += this.getBodyLimit(body, this.graceCopySetupModel.limit);
        body += this.graceCopySetupService.getDropDownSearchParam(body, 'productId', this.graceCopySetupModel);
        return body;
    }
    doOnReset() {
        this.graceCopySetupModel['productId'] = null;
        this.ngProduct = [];
        this.graceCopySetupModel.limit = this.sessionObject.limit;
    }



}
