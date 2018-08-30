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

import { LoaderService } from '../../../../core/loader/loader.service';
import { BaseComponent } from '../../../../core/base/base.component';
import { ProjectUtils } from '../../../shared/project-utils';
import { Constants } from '../../../shared/constant';

import { ProductSearchModel } from './product-search.model';
import { SessionObject, GlobalSettings } from '../../../shared';

import { ProductListService } from '../product-search/product-search.service';
import { ChangeService } from '../../../shared/change-service';
import { SaveSearchService } from '../../../shared/save-search-service';
import { GlobalService } from '../../../shared/global.service';
import { SalesSummaryListService } from '../../sales/sales-summary-search/sales-summary-search.service';
import { CustomerListService } from '../customer-search/customer-search.service';
import { Logger, MyClientServices } from '../../../../core';

@Component({
    selector: 'app-product-search',
    templateUrl: './product-search.component.html',
    styleUrls: ['./product-search.component.css'],
    providers: [ProductListService, SalesSummaryListService, CustomerListService]
})
export class ProductSearchComponent extends BaseComponent {
    private PRODUCT_LIST = 'PRODUCT_LIST';
    private SALES_REPORT = 'SALES_REPORT';
    private CUST_LIST = 'CUST_LIST';
    private GC_ORDER = 'GC_ORDER';
    private GT_ORDER = 'GT_ORDER';
    private RATE_CARD = 'RATE_CARD';
    private ORDER_DETAILS = 'ORDER_DETAILS';
    private PRICE_LIST = 'PRICE_LIST';



    ngProductTyp: any;
    ngProductCode: any;
    ngProductCat: any;
    dtSalesOptions: any = {};
    dtCustListOptions: any = {};
    dtGTOrderOptions: any = {};
    dtGCOrderOptions: any = {};
    dtRateCardOptions: any = {};
    dtOrderDetailsOptions: any = {};
    dtPriceListOptions: any = {};


    @ViewChild(DataTableDirective) dtElement: DataTableDirective;
    @ViewChild('prodList') prodListTemplate;
    @ViewChild(TabsComponent) tabsComponent;
    @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;
    @ViewChild('salesReport') salesReportTemplate;
    @ViewChild('salesReportData', { read: DataTableDirective }) dtSalesElement: DataTableDirective;
    @ViewChild('custList') custListTemplate;
    @ViewChild('custListData', { read: DataTableDirective }) dtCustListElement: DataTableDirective;
    @ViewChild('gtOrder') gtOrderTemplate;
    @ViewChild('gtOrderData', { read: DataTableDirective }) dtGTOrderElement: DataTableDirective;
    @ViewChild('gcOrder') gcOrderTemplate;
    @ViewChild('gcOrderData', { read: DataTableDirective }) dtGCOrderElement: DataTableDirective;
    @ViewChild('orderDetails') orderDetailsTemplate;
    @ViewChild('orderDetailsData', { read: DataTableDirective }) dtOrderDetailsElement: DataTableDirective;
    @ViewChild('priceList') priceListTemplate;
    @ViewChild('priceListData', { read: DataTableDirective }) dtPriceListElement: DataTableDirective;

    @ViewChild('rateCard') rateCardTemplate;
    @ViewChild('rateCardData', { read: DataTableDirective }) dtRateCardElement: DataTableDirective;
    @ViewChild('product_code', { read: DataDropDownComponent }) ddProductCode: DataDropDownComponent;
    @ViewChild('productType', { read: DataDropDownComponent }) ddProductType: DataDropDownComponent;
    @ViewChild('productCat', { read: DataDropDownComponent }) ddProductCat: DataDropDownComponent;
    // @ViewChild('top_n_product', { read: DataDropDownComponent }) ddTopNProduct: DataDropDownComponent;


    productSearchModel: ProductSearchModel;
    dataProductCategory: any;
    dataProductType: any;
    dataProductCode: any;
    ddOptionsProdCat: DataDropDownOptions;
    ddOptionsProdType: DataDropDownOptions;
    ddOptionsProdCode: DataDropDownOptions;
    ddOptionsTopN: DataDropDownOptions;
    ddTriggerTopN: Subject<any> = new Subject();
    isProductCatgVisible = true;
    constructor(private router: Router,
        protected loaderService: LoaderService,
        private productListService: ProductListService,
        private customerListService: CustomerListService,
        protected changeService: ChangeService,
        protected salesSummaryListService: SalesSummaryListService,
        protected saveSearchService: SaveSearchService,
        protected myClientServices: MyClientServices,
        protected globalService: GlobalService,
        private _logger: Logger) {
        super(loaderService, changeService, saveSearchService, productListService,
            globalService, myClientServices);
        this.doInitialSetup();


        this.isProductCatgVisible = this.sessionObject.clientSettings.PRODUCT_SEARCH.productCatg.visible;
        console.log('isProductCatgVisible', this.isProductCatgVisible, this.sessionObject.clientSettings)
    }

    doInitialSetup() {
        this.ddOptionsProdCat = new DataDropDownOptions();
        this.ddOptionsProdCat.serviceURL = Constants.TK_PRODUCT_CATEGORY_URL;
        this.ddOptionsProdCat.keyName = 'typeID';
        this.ddOptionsProdCat.keyDesc = 'description';
        this.ddOptionsProdCat.firstOptionText = 'Select a Category';
        this.ddOptionsProdCat.baseComponent = this;
        this.ddOptionsProdCat.modelName = 'productCat';


        this.ddOptionsProdType = new DataDropDownOptions();
        this.ddOptionsProdType.serviceURL = Constants.TK_PRODUCT_TYPE_URL;
        this.ddOptionsProdType.keyName = 'typeID';
        this.ddOptionsProdType.keyDesc = 'description';
        this.ddOptionsProdType.firstOptionText = 'Select a Type';
        this.ddOptionsProdType.baseComponent = this;
        this.ddOptionsProdType.modelName = 'productType';

        this.ddOptionsProdCode = new DataDropDownOptions();
        // this.ddOptionsProdCode.serviceURL = Constants.TK_PRODUCT_CODE_URL;
        this.ddOptionsProdCode.serviceURL = Constants.TK_SALE_JOURNAL_LIST_URL;
        this.ddOptionsProdCode.keyName = 'ocID';
        this.ddOptionsProdCode.keyDesc = 'code';
        this.ddOptionsProdCode.firstOptionText = 'Select a Code';
        this.ddOptionsProdCode.baseComponent = this;
        this.ddOptionsProdCode.modelName = 'productCode';
        this.ddOptionsProdCode.combineThem = ['code', 'description']
        this.ddOptionsProdCode.sort = true;
        this.ddOptionsProdCode.sortKey = 'code';
        this.ddOptionsProdCode.sortOrder = 'asc';

        this.ddOptionsTopN = new DataDropDownOptions();
        this.ddOptionsTopN.serviceURL = Constants.TK_COUNTRY_SEARCH_URL;
        this.ddOptionsTopN.keyName = 'id';
        this.ddOptionsTopN.keyDesc = 'value';
        this.ddOptionsTopN.firstOptionText = 'Select a Top N Products';
        this.ddOptionsTopN.baseComponent = this;
        this.ddOptionsTopN.modelName = 'topNProduct';

        this.productListSetup();
    }
    // override
    getLoaderName(): string {
        return 'product-search';
    }

    // override
    getSearchModel(): any {
        // console.log('productSearchModel 1 ', this.productSearchModel);
        if (ProjectUtils.isEmpty(this.productSearchModel)) {
            this.productSearchModel = <ProductSearchModel>this.sessionObject.productSearch;
            if (ProjectUtils.isEmpty(this.productSearchModel)) {
                this.productSearchModel = new ProductSearchModel();
                this.productSearchModel.limit = this.sessionObject.limit

            }
            this.ngProductTyp = this.productSearchModel.productType;
            this.ngProductCode = this.productSearchModel.product_code;
            this.ngProductCat = this.productSearchModel.productCat;
        }
        // console.log('productSearchModel 2 ', this.productSearchModel);
        return this.productSearchModel;
    }

    // override
    getSearchType(): string {
        return 'prodSearch';
    }

    // override
    getTabsComponent(): any {
        return this.tabsComponent;
    }

    // override
    getServiceName(): string {
        return this.PRODUCT_LIST;
    }

    // override
    openListTab() {
        this.tabsComponent.openTab('Product Search List',
            this.prodListTemplate, {}, true, 'prodList');
    }

    // override
    getDispSearch(): ThinkListDisplaySearchComponent {
        return this.dispSearch;
    }
    // override
    getReportTitle(): string {
        return 'Product Search Report';
    }
    getReportIcon(): string {
        return 'fa fa-search';
    }
    // override
    getReportFileName(): string {
        return 'productSearchReport';
    }
    // override
    setSearchModel(searchModel: any) {
        // console.log('setSearchModel: searchModel', searchModel);
        if (!ProjectUtils.isEmpty(searchModel)) {
            if (typeof searchModel === 'string') {
                this.productSearchModel = JSON.parse(searchModel);
            } else {
                this.productSearchModel = searchModel;
            }
        }
        // console.log('setSearchModel', this.productSearchModel);
        if (this.productSearchModel.limit === '') {
            this.productSearchModel.limit = 0;
        }
        this.ngProductCat = this.setDropDownComponentValue('productCat');
        this.ngProductCode = this.setDropDownComponentValue('productCode');
        this.ngProductTyp = this.setDropDownComponentValue('productType');
        // console.log(this.ddTopNProduct.value);
        // this.setDropDownComponentValue(this.ddTopNProduct, 'topNProduct');
        // console.log(this.ddTopNProduct.value);
        ProjectUtils.setProductSearch(this.sessionObject, this.productSearchModel);
    }


    doInInitLoad() {
        this.gettopNProductsData();
    }

    productListSetup() {
        this.dtSalesOptions = ProjectUtils.doOptionSettingsFull('productSalesReport', 'Product Sales Report');
        this.salesSummaryListService.addColumnsOption(this.dtSalesOptions);
        this.dtCustListOptions = ProjectUtils.doOptionSettingsFull('productCustomerList', 'Product Customer List');
        this.customerListService.addColumnsOptionPL(this.dtCustListOptions);
        this.dtGCOrderOptions = ProjectUtils.doOptionSettingsFull('productGraceOrderList', 'Product Grace Order List');
        this.productListService.addColumnsOptionGC(this.dtGCOrderOptions);
        this.dtGTOrderOptions = ProjectUtils.doOptionSettingsFull('productGratisOrderList', 'Product Gratis Order List');
        this.productListService.addColumnsOptionGT(this.dtGTOrderOptions);
        this.dtRateCardOptions = ProjectUtils.doOptionSettingsFull('productRateCardList', 'Product Rate Card List');
        this.productListService.addColumnsOptionRC(this.dtRateCardOptions);

        this.dtOrderDetailsOptions = ProjectUtils.doOptionSettingsFull('productOrderDetailsList', 'Product Order Details List');
        this.productListService.addColumnsOptionOD(this.dtOrderDetailsOptions);

        this.dtPriceListOptions = ProjectUtils.doOptionSettingsFull('productPriceList', 'Product Price List');
        this.productListService.addColumnsOptionPL(this.dtPriceListOptions);

        this.dtSalesOptions['data'] = [];
        this.dtCustListOptions['data'] = [];
        this.dtGCOrderOptions['data'] = [];
        this.dtGTOrderOptions['data'] = [];
        this.dtRateCardOptions['data'] = [];
        this.dtOrderDetailsOptions['data'] = [];
        this.dtPriceListOptions['data'] = [];
    }

    gettopNProductsData() {
        const topNNumbersData = this.globalService.gettopNProducts();
        // console.log(this.ddTriggerTopN, topNNumbersData);

        this.ddTriggerTopN.next(topNNumbersData);

    }

    openSalesReport() {
        if (this.isRowSelected()) {
            this.tabsComponent.openTab('Sales Report',
                this.salesReportTemplate, {}, true, 'salesReport');
            this.loadSalesReportFromService();
        }
    }

    openCustList() {
        if (this.isRowSelected()) {
            console.log(this.dtCustListOptions);
            this.tabsComponent.openTab('Customer List',
                this.custListTemplate, {}, true, 'custList');
            this.loadCustomerListFromService();
        }
    }

    openGraceOrder() {
        if (this.isRowSelected()) {
            this.tabsComponent.openTab('Grace Order',
                this.gcOrderTemplate, {}, true, 'gcOrder');
            this.loadGraceOrderFromService();
        }
    }
    openOrderDetails() {
        if (this.isRowSelected()) {
            this.tabsComponent.openTab('Order Details',
                this.orderDetailsTemplate, {}, true, 'orderDetails');
            this.loadOrderDetailsFromService();
        }
    }
    openPriceList() {
        if (this.isRowSelected()) {
            this.tabsComponent.openTab('Price List',
                this.priceListTemplate, {}, true, 'priceList');
            this.loadPriceListFromService();
        }
    }

    openGratisOrder() {
        if (this.isRowSelected()) {
            this.tabsComponent.openTab('Gratis Order',
                this.gtOrderTemplate, {}, true, 'gtOrder');
            this.loadGratisOrderFromService();
        }
    }

    openRateCard() {
        if (this.isRowSelected()) {
            this.tabsComponent.openTab('Rate Card',
                this.rateCardTemplate, {}, true, 'rateCard');
            this.loadRateCardFromService();
        }
    }

    getDataElement(whichService: string): DataTableDirective {
        if (whichService === this.PRODUCT_LIST) {
            return this.dtElement;
        } else if (whichService === this.SALES_REPORT) { // this.SALES_REPORT
            return this.dtSalesElement;
        } else if (whichService === this.CUST_LIST) { // this.CUST_LIST
            return this.dtCustListElement;
        } else if (whichService === this.GC_ORDER) { // this.GC_ORDER
            return this.dtGCOrderElement;
        } else if (whichService === this.GT_ORDER) { // this.GT_ORDER
            return this.dtGTOrderElement;
        } else if (whichService === this.RATE_CARD) { // this.RATE_CARD
            return this.dtRateCardElement;
        } else if (whichService === this.ORDER_DETAILS) { // this.ORDER_DETAILS
            return this.dtOrderDetailsElement;
        } else if (whichService === this.PRICE_LIST) { // this.PRICE_LIST
            return this.dtPriceListElement;
        }


    }

    loadSalesReportFromService() {
        let body = '';
        body += this.salesSummaryListService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());
        body += this.salesSummaryListService.setParamValue(body, 'productName', this.selectedRow['oc_id']);
        body += this.getBodyLimit(body, this.productSearchModel.limit);
        this.loadDataFromAPIService(this.SALES_REPORT, body, this.salesSummaryListService);
    }

    loadCustomerListFromService() {
        let body = '';
        body += this.customerListService.setParamValue(body, 'oc_id', this.selectedRow['oc_id']);

        body += this.customerListService.setParamValue(body, 'customer_status', '0');
        body += this.customerListService.setParamValue(body, 'subscription_as', '0');

        // this.loadDataFromAPIService(this.CUST_LIST, body, this.customerListService);
        body += this.getBodyLimit(body, this.productSearchModel.limit);
        this.showLoader();
        this.customerListService.getProductCustomerList(body).subscribe(data => {
            console.log(data);
            this.setListData(this.CUST_LIST, data);
        }, err => {
            this._logger.error('ProductListComponent', 'loadData', 'Something went wrong!');
            this.setListData(this.CUST_LIST, []);
        });
    }

    loadOrderDetailsFromService() {
        let body = '';
        body += this.productListService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());
        body += this.productListService.setParamValue(body, 'oc_id', this.selectedRow['oc_id']);
        body += this.productListService.setParamValue(body, 'subscription_as', '0');

        body += this.getBodyLimit(body, this.productSearchModel.limit);
        this.showLoader();
        this.productListService.getOrderDetails(body).subscribe(data => {
            console.log(data);
            this.setListData(this.ORDER_DETAILS, data);
        }, err => {
            this._logger.error('ProductListComponent', 'loadData', 'Something went wrong!');
            this.setListData(this.ORDER_DETAILS, []);
        });
    }
    loadPriceListFromService() {
        let body = '';
        body += this.productListService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());
        body += this.productListService.setParamValue(body, 'oc_id', this.selectedRow['oc_id']);
        body += this.productListService.setParamValue(body, 'year', '2017-18');
        body += this.getBodyLimit(body, this.productSearchModel.limit);
        this.showLoader();
        this.productListService.getPriceList(body).subscribe(data => {
            console.log(data);
            this.setListData(this.PRICE_LIST, data);
        }, err => {
            this._logger.error('ProductListComponent', 'loadData', 'Something went wrong!');
            this.setListData(this.PRICE_LIST, []);
        });
    }

    loadGraceOrderFromService() {
        let body = '';
        body += this.productListService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());
        body += this.productListService.setParamValue(body, 'ocId', this.selectedRow['oc_id']);
        body += this.getBodyLimit(body, this.productSearchModel.limit);
        this.showLoader();
        this.productListService.getGraceOrder(body).subscribe(data => {
            console.log(data);
            this.setListData(this.GC_ORDER, data);
        }, err => {
            this._logger.error('ProductListComponent', 'loadData', 'Something went wrong!');
            this.setListData(this.GC_ORDER, []);
        });
    }

    loadGratisOrderFromService() {
        let body = '';
        body += this.productListService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());
        body += this.productListService.setParamValue(body, 'ocId', this.selectedRow['oc_id']);
        body += this.getBodyLimit(body, this.productSearchModel.limit);
        this.showLoader();
        this.productListService.getGratisOrder(body).subscribe(data => {
            console.log(data);
            this.setListData(this.GT_ORDER, data);
        }, err => {
            this._logger.error('ProductListComponent', 'loadData', 'Something went wrong!');
            this.setListData(this.GT_ORDER, []);
        });
    }

    loadRateCardFromService() {
        let body = '';
        body += this.productListService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());
        body += this.productListService.setParamValue(body, 'ocId', this.selectedRow['oc_id']);
        body += this.getBodyLimit(body, this.productSearchModel.limit);
        this.showLoader();
        this.productListService.getRateCard(body).subscribe(data => {
            console.log(data);
            this.setListData(this.RATE_CARD, data);
        }, err => {
            this._logger.error('ProductListComponent', 'loadData', 'Something went wrong!');
            this.setListData(this.RATE_CARD, []);
        });
    }

    getBodyData(): string {
        let body = '';
        body += this.productListService.getDropDownSearchParam(body, 'productCode', this.productSearchModel);
        body += this.productListService.setParamValue(body, 'title', this.productSearchModel['title']);
        body += this.productListService.setParamValue(body, 'volume', this.productSearchModel['volume']);
        body += this.productListService.getDropDownSearchParam(body, 'productType', this.productSearchModel);
        body += this.productListService.getDropDownSearchParam(body, 'productCat', this.productSearchModel);
        body += this.productListService.setParamValue(body, 'issueNum', this.productSearchModel['issue']);
        body += this.productListService.setParamValue(body, 'issn', this.productSearchModel['issn']);
        body += this.getBodyLimit(body, this.productSearchModel.limit);

        return body;
    }

    doOnReset() {
        this.productSearchModel['productCode'] = null;
        this.productSearchModel['productType'] = null;
        this.productSearchModel['productCat'] = null;
        this.productSearchModel['topNProduct'] = null;
        // this.ddProductCode.optionsModel = [];
        // this.ddProductCat.optionsModel = [];
        // this.ddProductType.optionsModel = [];
        this.ngProductCat = [];
        this.ngProductCode = [];
        this.ngProductTyp = [];
        this.productSearchModel.limit = this.sessionObject.limit;

    }
    getContextMenuRows() {
        return 6;
    }
}
