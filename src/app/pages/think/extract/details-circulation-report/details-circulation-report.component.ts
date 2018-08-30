import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { ParamMap } from '@angular/router';
import { DatePipe } from '@angular/common';
// Import from III party
import { DataTableDirective } from 'angular-datatables';
import { TabsetComponent, ModalModelOptions, TabsComponent, DataDropDownOptions, DataDropDownComponent, ThinkListDisplaySearchComponent, CzDatePickerComponent } from '../../../../components';
import { Logger, LoaderService, BaseComponent, } from '../../../../core';
import { ProjectUtils, Constants, SessionObject, GlobalService, ChangeService, SaveSearchService } from '../../../shared';
import { DetailsCirculationReportService } from './details-circulation-report.service';
import { DetailsCirculationReportModel } from './details-circulation-report.model';

@Component({
    selector: 'app-details-circulation-report',
    templateUrl: './details-circulation-report.component.html',
    styleUrls: ['./details-circulation-report.component.css'],
    providers: [DetailsCirculationReportService]
})
export class DetailsCirculationReportComponent extends BaseComponent {

    showInfoPopUp: ModalModelOptions;

    ngProduct: any;
    ngVolYear: any;
    ngOrderType: any;
    ngPrCategory: any;
    ngRevMethod: any;
    ngsalesRep: any;

    private DETAILS_CIRCULATION_REPORT = 'detailsCirculationReport';

    detailsCirculationReportModel: DetailsCirculationReportModel;

    ddOptionsexpyear: DataDropDownOptions;
    ddOptionscategory: DataDropDownOptions;
    ddOptionsproductName: DataDropDownOptions;
    ddOptionsOrderType: DataDropDownOptions;
    ddOptionsRevenueMethod: DataDropDownOptions;
    ddTriggerRevenueMethod: Subject<any> = new Subject();
    ddOptionsSalesRep: DataDropDownOptions;
    ddTriggerOrderType: Subject<any> = new Subject();

    isSalesRepDisable: false;
    isRevenueDisable: false;

    @ViewChild('detailsCirculationReportData', { read: DataTableDirective }) dtElement: DataTableDirective;
    @ViewChild('detailsCirculationReportList') detailsCirculationReportListTemplate;
    @ViewChild(TabsComponent) tabsComponent;
    @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;
    @ViewChild('volYear', { read: DataDropDownComponent }) ddExpYear: DataDropDownComponent;
    @ViewChild('productName', { read: DataDropDownComponent }) ddProductName: DataDropDownComponent;
    @ViewChild('prCategory', { read: DataDropDownComponent }) ddCategory: DataDropDownComponent;
    @ViewChild('orderType', { read: DataDropDownComponent }) ddOrderType: DataDropDownComponent;
    @ViewChild('revMethod', { read: DataDropDownComponent }) ddRevenueMethod: DataDropDownComponent;
    @ViewChild('salesRep', { read: DataDropDownComponent }) ddSalesRep: DataDropDownComponent;
    @ViewChild(CzDatePickerComponent) czDatePicker: CzDatePickerComponent;

    constructor(
        private router: Router,
        protected loaderService: LoaderService,
        private _logger: Logger,
        protected changeService: ChangeService,
        protected saveSearchService: SaveSearchService,
        private detailsCirculationReportService: DetailsCirculationReportService,
        protected globalService: GlobalService) {
        super(loaderService, changeService, saveSearchService, detailsCirculationReportService, globalService);
        this.isRevenueDisable = this.sessionObject.clientSettings.SALES_DECIR.revenueMethod.disabled;
        this.isSalesRepDisable = this.sessionObject.clientSettings.SALES_DECIR.salesRep.disabled;
        this.getSearchModel();
        this.doOnIntialSetup();
        const sessionObject: SessionObject = SessionObject.getSessionObject();
        if (sessionObject.clientID === 'ucp') {
            this.detailsCirculationReportService.addColumnsOptionUCP(this.dtOptions);
        } else {
            this.detailsCirculationReportService.addColumnsOption(this.dtOptions);
        }

        this.createModalPopUp();
    }

    createModalPopUp() {
        this.showInfoPopUp = new ModalModelOptions();
        this.showInfoPopUp.captionHeading = 'Information';
        this.showInfoPopUp.bodyMessage = 'Order circulation detail for various order statuses, Order Placed, Active/Shipping and Complete';
        this.showInfoPopUp.button1 = null;
        this.showInfoPopUp.button2 = 'Ok';
    }

    doInInitLoad() {
        this.globalService.getOrderTypeData(this.sessionObject.clientID, this.ddTriggerOrderType);
        this.globalService.getRevenueMethodData(this.ddTriggerRevenueMethod);
        this.hideLoader();
    }
    // override
    getLoaderName(): string {
        return 'detail-circulation-report';
    }

    // override
    getSearchModel(): any {
        console.log(this.detailsCirculationReportModel);
        if (ProjectUtils.isEmpty(this.detailsCirculationReportModel)) {
            this.detailsCirculationReportModel = <DetailsCirculationReportModel>this.sessionObject.detailsCirculationReportSearch;
            if (ProjectUtils.isEmpty(this.detailsCirculationReportModel)) {
                this.detailsCirculationReportModel = new DetailsCirculationReportModel();
                this.detailsCirculationReportModel.limit = this.sessionObject.limit;
            }
            this.ngVolYear = this.detailsCirculationReportModel.volYear;
            this.ngProduct = this.detailsCirculationReportModel.productName;
            this.ngPrCategory = this.detailsCirculationReportModel.prCategory;
            this.ngOrderType = this.detailsCirculationReportModel.orderType;
            this.ngRevMethod = this.detailsCirculationReportModel.revMethod;
            this.ngsalesRep = this.detailsCirculationReportModel.salesRep;
        }
        console.log('getSearchModel::this.detailsCirculationReportModel', this.detailsCirculationReportModel);
        return this.detailsCirculationReportModel;
    }

    // override
    getSearchType(): string {
        return 'detailsCirculationReportSearch';
    }

    getServiceName(): string {
        return this.DETAILS_CIRCULATION_REPORT;
    }

    // override
    getTabsComponent(): any {
        return this.tabsComponent;
    }
    // override
    getReportIcon(): string {
        return 'fa-pie-chart';
    }
    // override
    openListTab() {
        this.tabsComponent.openTab('Detail Circulation Report List',
            this.detailsCirculationReportListTemplate, {}, true, 'detailsCirculationReportList');
    }
    // override
    getDispSearch(): ThinkListDisplaySearchComponent {
        return this.dispSearch;
    }

    // override
    getReportTitle(): string {
        return 'Detail Circulation Report';
    }

    // override
    getReportFileName(): string {
        return 'detailCirculationReport';
    }

    // override
    setSearchModel(searchModel: any) {
        if (!ProjectUtils.isEmpty(searchModel)) {
            if (typeof searchModel === 'string') {
                this.detailsCirculationReportModel = JSON.parse(searchModel);
            } else {
                this.detailsCirculationReportModel = searchModel;
            }
        }
        if (this.detailsCirculationReportModel.limit === '') {
            this.detailsCirculationReportModel.limit = 0;
        }
        console.log('setSearchModel', this.detailsCirculationReportModel);

        this.ngVolYear = this.setDropDownComponentValue('volYear');
        this.ngProduct = this.setDropDownComponentValue('productName');
        this.ngPrCategory = this.setDropDownComponentValue('prCategory');
        this.ngOrderType = this.setDropDownComponentValue('orderType');
        this.ngRevMethod = this.setDropDownComponentValue('revMethod');
        this.ngsalesRep = this.setDropDownComponentValue('salesRep');

        console.log('setSearchModel', this.detailsCirculationReportModel);
        ProjectUtils.setdetailsCirculationReportSearch(this.sessionObject, this.detailsCirculationReportModel);
    }

    // override
    getDataElement(whichService: string): DataTableDirective {
        return this.dtElement;
    }
    getDatePicker(): CzDatePickerComponent {
        return this.czDatePicker;
    }
    doOnIntialSetup() {

        this.ddOptionsexpyear = new DataDropDownOptions();
        this.ddOptionsexpyear.serviceURL = Constants.TK_SALE_VOLUME_YEAR_URL;
        this.ddOptionsexpyear.keyName = 'volume';
        this.ddOptionsexpyear.keyDesc = 'volume';
        this.ddOptionsexpyear.firstOptionText = 'Select a Year';
        this.ddOptionsexpyear.modelName = 'volYear';
        this.ddOptionsexpyear.baseComponent = this;

        this.ddOptionscategory = new DataDropDownOptions();
        this.ddOptionscategory.serviceURL = Constants.TK_SALE_CATEGORY_DROPDOWN_URL;
        this.ddOptionscategory.keyName = 'subscriptionCategoryId';
        this.ddOptionscategory.keyDesc = 'description';
        this.ddOptionscategory.modelName = 'prCategory';
        this.ddOptionscategory.baseComponent = this;
        this.ddOptionscategory.selectMulti = true;


        this.ddOptionsproductName = new DataDropDownOptions();
        this.ddOptionsproductName.serviceURL = Constants.TK_SALE_JOURNAL_LIST_URL;
        this.ddOptionsproductName.keyName = 'ocID';
        this.ddOptionsproductName.keyDesc = 'description';
        this.ddOptionsproductName.modelName = 'productName';
        this.ddOptionsproductName.baseComponent = this;
        this.ddOptionsproductName.selectMulti = true;

        this.ddOptionsOrderType = new DataDropDownOptions();
        this.ddOptionsOrderType.serviceURL = Constants.TK_SALE_JOURNAL_LIST_URL;
        this.ddOptionsOrderType.keyName = 'id';
        this.ddOptionsOrderType.keyDesc = 'value';
        this.ddOptionsOrderType.modelName = 'orderType';
        this.ddOptionsOrderType.baseComponent = this;
        this.ddOptionsOrderType.selectMulti = true;


        this.ddOptionsRevenueMethod = new DataDropDownOptions();
        this.ddOptionsRevenueMethod.serviceURL = Constants.TK_SALE_JOURNAL_LIST_URL;
        this.ddOptionsRevenueMethod.keyName = 'id';
        this.ddOptionsRevenueMethod.keyDesc = 'value';
        this.ddOptionsRevenueMethod.modelName = 'revMethod';
        this.ddOptionsRevenueMethod.baseComponent = this;
        this.ddOptionsRevenueMethod.selectMulti = true;


        this.ddOptionsSalesRep = new DataDropDownOptions();
        this.ddOptionsSalesRep.serviceURL = Constants.TK_ER_SALES_REP_URL;
        this.ddOptionsSalesRep.keyName = 'sales_representative_id';
        this.ddOptionsSalesRep.keyDesc = 'sales_representative';
        this.ddOptionsSalesRep.modelName = 'salesRep';
        this.ddOptionsSalesRep.baseComponent = this;
        this.ddOptionsSalesRep.selectMulti = true;
    }

    getBodyData(): string {
        let body = '';
        body += this.detailsCirculationReportService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());
        body += this.detailsCirculationReportService.getDateSearchParam(this.detailsCirculationReportModel, body);
        body += this.detailsCirculationReportService.getDropDownSearchParam(body, 'prCategory', this.detailsCirculationReportModel);
        body += this.detailsCirculationReportService.getDropDownSearchParam(body, 'productName', this.detailsCirculationReportModel);
        body += this.detailsCirculationReportService.getDropDownSearchParam(body, 'volYear', this.detailsCirculationReportModel);
        body += this.detailsCirculationReportService.getDropDownSearchParam(body, 'orderType', this.detailsCirculationReportModel);
        body += this.detailsCirculationReportService.getDropDownSearchParam(body, 'salesRep', this.detailsCirculationReportModel);
        body += this.detailsCirculationReportService.getDropDownSearchParam(body, 'revMethod', this.detailsCirculationReportModel);

        body += this.getBodyLimit(body, this.detailsCirculationReportModel.limit);

        return body;
    }

    doOnReset() {
        console.log('doOnReset');
        this.detailsCirculationReportModel['volYear'] = null;
        this.detailsCirculationReportModel['productName'] = null;
        this.detailsCirculationReportModel['prCategory'] = null;
        this.detailsCirculationReportModel['orderType'] = null;
        this.detailsCirculationReportModel['revMethod'] = null;
        this.ngVolYear = [];
        this.ngProduct = [];
        this.ngPrCategory = [];
        this.ngOrderType = [];
        this.ngRevMethod = [];
        this.ngsalesRep = [];
        this.czDatePicker.calendarCanceled(this);
        this.detailsCirculationReportModel.limit = this.sessionObject.limit;
    }

}
