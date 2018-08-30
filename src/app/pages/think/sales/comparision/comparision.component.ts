import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { ParamMap } from '@angular/router';
import { DatePipe } from '@angular/common';
// Import from III party
import { DataTableDirective } from 'angular-datatables';
import { TabsetComponent, ModalModelOptions } from '../../../../components';
import { TabsComponent } from '../../../../components/ng-tabs/tabs.component';
import { Log, Level } from 'ng2-logger';
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
import { ThinkListDisplaySearchComponent } from '../../../../components/think-list-display-search/think-list-display-search.component';

import { ComparisionModel } from './comparision.model';
import { ComparsionService } from './comparision.service';
import { Utils } from '../../../shared';


enum CN {
    Journal,
    Subscription,
    Category,
    base_EU,
    base_ROW,
    base_UK,
    base_USA,
    base_Sub_Total,
    current_EU,
    current_ROW,
    current_UK,
    current_USA,
    current_Sub_Total,
    next_EU,
    next_ROW,
    next_UK,
    next_USA,
    next_Sub_Total,
    base_Change,
    base_Change_perc,
    next_PYTD_YTD_Number,
    next_PYTD_YTD_Number_perc
}

@Component({
    selector: 'app-comparision',
    templateUrl: './comparision.component.html',
    styleUrls: ['./comparision.component.css'],
    providers: [ComparsionService]
})

export class ComparisionComponent extends BaseComponent {

    dtOptions = {};
    TC: Array<any> = [];

    showInfoPopUp: ModalModelOptions;
    private COMPARISION: 'comparision';
    log = Log.create('ComparisionComponent');
    comparisionSalesModel: any;
    monthData: any;
    reportData: any;
    ngmonthData: any;
    ngNNumbers: any;
    ngyearData: any;
    ngreportData: any;
    ngcuurentmon: any;
    ngcuurentyear: any;
    ddOptionsBaseMonth: DataDropDownOptions;
    ddOptionsCompareMonth: DataDropDownOptions;
    ddOptionsBaseYear: DataDropDownOptions;
    ddOptionsCompareYear: DataDropDownOptions;
    ddOptionsReport: DataDropDownOptions;
    ddProductName: DataDropDownOptions;
    ddTriggerBaseMonth: Subject<any> = new Subject();
    ddTriggerYear: Subject<any> = new Subject();
    ddTriggerCompareMonth: Subject<any> = new Subject();
    ddTriggerReport: Subject<any> = new Subject();


    @ViewChild('comparisonListData', { read: DataTableDirective }) dtElement: DataTableDirective;
    @ViewChild('comparisonList') comparisonListTemplate;
    @ViewChild(TabsComponent) tabsComponent;
    @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;
    @ViewChild('prevMonth', { read: DataDropDownComponent }) ddBaseMonth: DataDropDownComponent;
    @ViewChild('prevYear', { read: DataDropDownComponent }) ddBaseYear: DataDropDownComponent;
    @ViewChild('currMonth', { read: DataDropDownComponent }) ddCompareMonth: DataDropDownComponent;
    @ViewChild('currYear', { read: DataDropDownComponent }) ddCompYear: DataDropDownComponent;
    @ViewChild('ocID', { read: DataDropDownComponent }) ddProduct: DataDropDownComponent;
    @ViewChild('reportBy', { read: DataDropDownComponent }) ddReportBy: DataDropDownComponent;

    constructor(
        private router: Router,
        private comparsionService: ComparsionService,
        protected globalService: GlobalService,
        private _logger: Logger,
        protected changeService: ChangeService,
        protected saveSearchService: SaveSearchService,
        protected loaderService: LoaderService) {
        super(loaderService, changeService, saveSearchService, comparsionService, globalService);
        this.log.color = 'lightblue';
        this.doInitialSetup();
        this.createModalPopUp();

        this.dtOptions = ProjectUtils.doOptionSettings();
        ProjectUtils.dtDisableSorting(this.dtOptions, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);

    }

    createModalPopUp() {
        this.showInfoPopUp = new ModalModelOptions();
        this.showInfoPopUp.captionHeading = 'Information';
        this.showInfoPopUp.bodyMessage = 'Month wise comparison for order count & amount for a journal';
        this.showInfoPopUp.button1 = null;
        this.showInfoPopUp.button2 = 'Ok';
    }

    // override
    getLoaderName(): string {
        return 'comparision-component';
    }

    // override
    getSearchModel(): any {
        if (ProjectUtils.isEmpty(this.comparisionSalesModel)) {
            this.comparisionSalesModel = this.sessionObject.comparisonSearch;
            if (ProjectUtils.isEmpty(this.comparisionSalesModel)) {
                this.comparisionSalesModel = new ComparisionModel();
                this.comparisionSalesModel.limit = this.sessionObject.limit;
            }
            this.ngmonthData = this.comparisionSalesModel.prevMonth;
            this.ngcuurentmon = this.comparisionSalesModel.currMonth;
            this.ngyearData = this.comparisionSalesModel.prevYear;
            this.ngcuurentyear = this.comparisionSalesModel.currYear;
            this.ngreportData = this.comparisionSalesModel.reportBy;
            this.ngNNumbers = this.comparisionSalesModel.ocID;
        }
        this.log.i('getSearchModel', this.comparisionSalesModel);
        return this.comparisionSalesModel;
    }

    // override
    getSearchType(): string {
        return 'comparision';
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
        return this.COMPARISION;
    }

    // override
    openListTab() {
        this.tabsComponent.openTab('Comparison List',
            this.comparisonListTemplate, {}, true, 'comparisonList');
    }

    // override
    getDispSearch(): ThinkListDisplaySearchComponent {
        return this.dispSearch;
    }

    // override
    getReportTitle(): string {
        return 'Comparison Report';
    }
    // override
    getReportIcon(): string {
        return 'fa-pie-chart';
    }

    // override
    getReportFileName(): string {
        return 'comparisionReport';
    }

    // override
    setSearchModel(searchModel: any) {
        if (!ProjectUtils.isEmpty(searchModel)) {
            if (typeof searchModel === 'string') {
                this.comparisionSalesModel = JSON.parse(searchModel);
            } else {
                this.comparisionSalesModel = searchModel;
            }
        }
        this.log.i('setSearchModel', this.comparisionSalesModel);
        this.ngmonthData = this.setDropDownComponentValue('prevMonth');
        this.ngyearData = this.setDropDownComponentValue('prevYear');
        this.ngcuurentmon = this.setDropDownComponentValue('currMonth');
        this.ngcuurentyear = this.setDropDownComponentValue('currYear');
        this.ngNNumbers = this.setDropDownComponentValue('ocID');
        this.ngreportData = this.setDropDownComponentValue('reportBy');

        ProjectUtils.setComparisonSearch(this.sessionObject, this.comparisionSalesModel);
    }

    doInitialSetup() {
        this.ddOptionsBaseMonth = new DataDropDownOptions();
        this.ddOptionsBaseMonth.keyName = 'id';
        this.ddOptionsBaseMonth.keyDesc = 'value';
        this.ddOptionsBaseMonth.firstOptionText = 'Select a Month';
        this.ddOptionsBaseMonth.modelName = 'prevMonth';
        this.ddOptionsBaseMonth.baseComponent = this;

        this.ddOptionsBaseYear = new DataDropDownOptions();
        this.ddOptionsBaseYear.serviceURL = Constants.TK_SALE_VOLUME_YEAR_URL;
        this.ddOptionsBaseYear.keyName = 'volume';
        this.ddOptionsBaseYear.keyDesc = 'volume';
        this.ddOptionsBaseYear.firstOptionText = 'Select a Year';
        this.ddOptionsBaseYear.modelName = 'prevYear';
        this.ddOptionsBaseYear.baseComponent = this;
        this.ddOptionsBaseYear.sort = true;
        this.ddOptionsBaseYear.sortKey = 'volume';
        this.ddOptionsBaseYear.sortOrder = 'dsc';


        this.ddOptionsCompareYear = new DataDropDownOptions();
        this.ddOptionsCompareYear.serviceURL = Constants.TK_SALE_VOLUME_YEAR_URL;
        this.ddOptionsCompareYear.keyName = 'volume';
        this.ddOptionsCompareYear.keyDesc = 'volume';
        this.ddOptionsCompareYear.firstOptionText = 'Select a Year';
        this.ddOptionsCompareYear.modelName = 'currYear';
        this.ddOptionsCompareYear.baseComponent = this;
        this.ddOptionsCompareYear.sort = true;
        this.ddOptionsCompareYear.sortKey = 'volume';
        this.ddOptionsCompareYear.sortOrder = 'dsc';


        this.ddOptionsCompareMonth = new DataDropDownOptions();
        this.ddOptionsCompareMonth.keyName = 'id';
        this.ddOptionsCompareMonth.keyDesc = 'value';
        this.ddOptionsCompareMonth.firstOptionText = 'Select a Month';
        this.ddOptionsCompareMonth.modelName = 'currMonth';
        this.ddOptionsCompareMonth.baseComponent = this;

        this.ddOptionsReport = new DataDropDownOptions();
        /*this.ddOptionsReport.serviceURL = Constants.TK_SALES_TOP_N_PRODUCTS_PRODUCT_CATEGORY_URL;*/
        this.ddOptionsReport.keyName = 'id';
        this.ddOptionsReport.keyDesc = 'value';
        this.ddOptionsReport.firstOptionText = 'Select Report By';
        this.ddOptionsReport.modelName = 'reportBy';
        this.ddOptionsReport.baseComponent = this;

        this.ddProductName = new DataDropDownOptions();
        this.ddProductName.serviceURL = Constants.TK_SALE_JOURNAL_LIST_URL;
        this.ddProductName.keyName = 'ocID';
        this.ddProductName.keyDesc = 'description';
        this.ddProductName.modelName = 'ocID';
        this.ddProductName.firstOptionText = 'Select a Product';
        this.ddProductName.baseComponent = this;
        this.ddProductName.multipleState = true;
        this.ddProductName.selectMulti = true;
        this.ddProductName.sort = true;
        this.ddProductName.sortKey = 'description';
        this.ddProductName.sortOrder = 'asc'
    }

    doInInitLoad() {
        // this.getMonthData();
        // this.getReportByData();
        this.displaySearchOptions.noCrossList = [];
        this.displaySearchOptions.noCrossList.push('prevMonth');
        this.displaySearchOptions.noCrossList.push('prevYear');
        this.displaySearchOptions.noCrossList.push('currMonth');
        this.displaySearchOptions.noCrossList.push('currYear');
        this.displaySearchOptions.noCrossList.push('reportBy');
        this.displaySearchOptions.noCrossList.push('ocID');


        this.displaySearchOptions.orderList = [];

        this.displaySearchOptions.orderList.push({ 'prevMonth': '0' });
        this.displaySearchOptions.orderList.push({ 'prevYear': '1' });
        this.displaySearchOptions.orderList.push({ 'currMonth': '2' });
        this.displaySearchOptions.orderList.push({ 'currYear': '3' });
        this.displaySearchOptions.orderList.push({ 'reportBy': '4' });
        this.displaySearchOptions.orderList.push({ 'ocID': '5' });
    }

    doPreInitLoad() {
        this.getMonthData();
        this.getReportByData();
    }



    addTheseKeys(data: Array<any>, outPutKey: string, ...keys) {
        data.forEach((item) => {
            item[outPutKey] = 0;
            keys.forEach((item2) => {
                item[outPutKey] += item[item2];
            });
        });
    }

    changeSubTotal(obj: any, firstKey: string, secKey: string, outPutKey) {
        obj[outPutKey] = (obj[firstKey] - obj[secKey]);
    }
    changePerc(obj: any, firstKey: string, secKey: string, outPutKey) {
        obj[outPutKey] = Utils.toFixedIfNumber((obj[firstKey] / obj[secKey]) * 100); // + '%';
    }


    asignNewCopyNBlankThem(obj) {
        const newObj = Object.assign({}, obj);
        Object.keys(newObj).forEach(k => {
            newObj[k] = ''
        });
        return newObj;
    }


    baseProcessData() {




        const { splitArrays, splitKeys } = ProjectUtils.splitArray(this.listData, 'Journal');

        const searchModel = this.getSearchModel();
        const compMonth = searchModel.currMonth[0].desc;
        const baseMonth = searchModel.prevMonth[0].desc;
        const compYear = searchModel.currYear[0].desc;
        const baseYear = searchModel.prevYear[0].desc;

        const baseColumn = baseYear + ' ' + baseMonth;
        const compColumn = compYear + ' ' + compMonth;

        console.log(searchModel, 'baseProcessData');



        let outputData = [];
        const splitKeysLen = splitKeys.length;
        splitKeys.forEach((key, index) => {
            const ret = this.generateReport(splitArrays[splitKeys[splitKeysLen - (index + 1)]], baseYear);
            outputData = outputData.concat(ret);
        });


        console.log('outputData', outputData)


        this.listData = outputData;

        // const sumSubTotal = Object.assign({}, lastObj);
        // Object.keys(sumSubTotal).forEach(k => {
        //     sumSubTotal[k] = ''
        // });

        // const sumSubTotalPerc = Object.assign({}, lastObj);
        // Object.keys(sumSubTotalPerc).forEach(k => {
        //     sumSubTotalPerc[k] = ''
        // });



        // const sumSubTotalPercYTD = Object.assign({}, lastObj);
        // Object.keys(sumSubTotalPerc).forEach(k => {
        //     sumSubTotalPerc[k] = ''
        // });



        // const sumSubTotalYTD = Object.assign({}, lastObj);
        // Object.keys(sumSubTotalPerc).forEach(k => {
        //     sumSubTotalPerc[k] = ''
        // });

        // BASE-EU:2233.44
        // BASE-ROW:10413.19
        // BASE-UK:13529.31
        // BASE-USA:908.31
        // BM-EU:2233.44
        // BM-ROW:14124.97
        // BM-UK:17270.07
        // BM-USA:908.31
        // CM-EU:2255.79
        // CM-ROW:14091.7
        // CM-UK:14561.13
        // CM-USA:1234.27
        // Category:"Online Only"
        // Journal:"Injectable Drugs Guide (IDG)"
        // Subscription:"Academic"

        // const singleObj = Utils.assignNewCopy(this.listData[0]);
        // this.TC = [];

        // const temp = Utils.testFn(singleObj, this.TC);




        // Utils.arr_Obj_Process_Keys(this.listData, temp);
        // const labelCol = 'Category';
        // const labelAdd = 'Sub Total';
        // const grandTotalLabel = 'Grand Total';
        // const keys = ['Journal']
        // 
        // const keysToSum = this.TC.splice(3, this.TC.length);
        // this.listData = Utils.mySumFunctionWithOutBold(this.listData, keysToSum, labelCol, labelAdd, grandTotalLabel, keys, false);
        // this.TC = this.TC.concat(keysToSum);







        // 
        // const lastObj = this.listData[this.listData.length - 1];
        // const bObj = Object.assign({}, lastObj);
        // Object.keys(bObj).forEach(k => {
        //     bObj[k] = parseFloat(bObj[k])
        // });


        // const sumSubTotal = Object.assign({}, lastObj);
        // Object.keys(sumSubTotal).forEach(k => {
        //     sumSubTotal[k] = ''
        // });


        // const sumSubTotalPerc = Object.assign({}, lastObj);
        // Object.keys(sumSubTotalPerc).forEach(k => {
        //     sumSubTotalPerc[k] = ''
        // });



        // const sumSubTotalPercYTD = Object.assign({}, lastObj);
        // Object.keys(sumSubTotalPerc).forEach(k => {
        //     sumSubTotalPerc[k] = ''
        // });



        // const sumSubTotalYTD = Object.assign({}, lastObj);
        // Object.keys(sumSubTotalPerc).forEach(k => {
        //     sumSubTotalPerc[k] = ''
        // });

        // 
        // sumSubTotal[this.TC[CN.next_UK]] = bObj[this.TC[CN.base_UK]] - bObj[this.TC[CN.current_UK]];
        // sumSubTotal[this.TC[CN.next_USA]] = bObj[this.TC[CN.base_USA]] - bObj[this.TC[CN.current_USA]];
        // sumSubTotal[this.TC[CN.next_ROW]] = bObj[this.TC[CN.base_ROW]] + bObj[this.TC[CN.current_EU]] - (bObj[this.TC[CN.base_EU]] + bObj[this.TC[CN.current_EU]]);
        // this.listData.push(sumSubTotal);
        // sumSubTotalPerc[this.TC[CN.next_UK]] = ((sumSubTotal[this.TC[CN.next_UK]]) * 100) / bObj[this.TC[CN.base_UK]];
        // sumSubTotalPerc[this.TC[CN.next_USA]] = ((sumSubTotal[this.TC[CN.next_USA]]) * 100) / bObj[this.TC[CN.base_USA]];


        // this.listData.push(sumSubTotal)
        // this.listData.push(sumSubTotalPerc)




        // sumSubTotalPercYTD[this.TC[CN.next_UK]] = ((sumSubTotal[this.TC[CN.next_UK]]) * 100) / bObj[this.TC[CN.base_UK]];



        // sumSubTotalPercYTD[this.TC[CN.next_USA]] = (sumSubTotalPercYTD[this.TC[CN.next_UK]] * 100) / bObj[this.TC[CN.next_UK]];

        this.TC = [
            {
                data: 'Journal',
                title: 'Journal'
            },
            {
                data: 'Subscription',
                title: 'Subscription'
            },
            {
                data: 'Category',
                title: 'Category'
            },

            {
                data: 'BM-UK',
                title: 'UK-' + baseColumn
            },
            {
                data: 'BM-USA',
                title: 'USA-' + baseColumn
            },
            {
                data: 'BM-EU',
                title: 'EU-' + baseColumn
            },
            {
                data: 'BM-ROW',
                title: 'ROW-' + baseColumn
            },
            {
                data: 'BM-Sub Total',
                title: 'Sub Total-' + baseColumn
            },

            {
                data: 'BASE-UK',
                title: 'UK-' + baseYear
            },
            {
                data: 'BASE-USA',
                title: 'USA-' + baseYear
            },
            {
                data: 'BASE-EU',
                title: 'EU-' + baseYear
            },
            {
                data: 'BASE-ROW',
                title: 'ROW-' + baseYear
            },
            {
                data: 'BASE-Sub Total',
                title: 'Sub Total-' + baseYear
            },

            {
                data: 'CM-UK',
                title: 'UK-' + compColumn
            },
            {
                data: 'CM-USA',
                title: 'USA-' + compColumn
            },
            {
                data: 'CM-EU',
                title: 'EU-' + compColumn
            },
            {
                data: 'CM-ROW',
                title: 'ROW-' + compColumn
            },
            {
                data: 'CM-Sub Total',
                title: 'Sub Total-' + compColumn
            },

            {
                data: `Change ${baseYear}-YTD Number`,
                title: `Change ${baseYear}-YTD Number`
            },
            {
                data: `Change ${baseYear}-YTD %`,
                title: `Change ${baseYear}-YTD %`
            },
            {
                data: 'Change PYTD-YTD Number',
                title: 'Change PYTD-YTD Number'
            },
            {
                data: 'Change PYTD-YTD %',
                title: 'Change PYTD-YTD %'
            },
        ];
    }


    generateReport(data: Array<any>, baseYear: any): Array<any> {
        ProjectUtils.sortingAlpha(data, 'Subscription', 'asc')

        this.addTheseKeys(data, 'BASE-Sub Total', 'BASE-EU', 'BASE-ROW', 'BASE-UK', 'BASE-USA');
        this.addTheseKeys(data, 'BM-Sub Total', 'BM-EU', 'BM-ROW', 'BM-UK', 'BM-USA');
        this.addTheseKeys(data, 'CM-Sub Total', 'CM-EU', 'CM-ROW', 'CM-UK', 'CM-USA');

        data.forEach(element => {
            this.changeSubTotal(element, 'CM-Sub Total', 'BASE-Sub Total', `Change ${baseYear}-YTD Number`);

            this.changePerc(element, `Change ${baseYear}-YTD Number`, 'BASE-Sub Total', `Change ${baseYear}-YTD %`);

            this.changeSubTotal(element, 'CM-Sub Total', 'BM-Sub Total', 'Change PYTD-YTD Number');

            this.changePerc(element, 'Change PYTD-YTD Number', 'BM-Sub Total', 'Change PYTD-YTD %');

        });

        //         APR-BASE	Change 2017-YTD/ 2017	APR - FEB	Change PYTD-YTD/ FEB

        console.log(data);

        this.TC = ['Journal', 'Category', 'Subscription',
            'BM-UK', 'BM-USA', 'BM-EU', 'BM-ROW', 'BM-Sub Total',
            'BASE-UK', 'BASE-USA', 'BASE-EU', 'BASE-ROW', 'BASE-Sub Total',
            'CM-UK', 'CM-USA', 'CM-EU', 'CM-ROW', 'CM-Sub Total',
            `Change ${baseYear}-YTD Number`, `Change ${baseYear}-YTD %`, 'Change PYTD-YTD Number', 'Change PYTD-YTD %'
        ];

        const labelCol = 'Category';
        const labelAdd = 'Sub Total';
        const grandTotalLabel = 'Grand Total';
        const keys = ['Subscription']
        const keysToSum = this.TC.splice(3, this.TC.length);
        data = Utils.mySumFunctionWithOutBold(data, keysToSum, labelCol, labelAdd, grandTotalLabel, keys, false);

        const lastOb = data[data.length - 1];
        this.changeSubTotal(lastOb, 'CM-Sub Total', 'BASE-Sub Total', `Change ${baseYear}-YTD Number`);

        this.changePerc(lastOb, `Change ${baseYear}-YTD Number`, 'BASE-Sub Total', `Change ${baseYear}-YTD %`);

        this.changeSubTotal(lastOb, 'CM-Sub Total', 'BM-Sub Total', 'Change PYTD-YTD Number');

        this.changePerc(lastOb, 'Change PYTD-YTD Number', 'BM-Sub Total', 'Change PYTD-YTD %');



        data.forEach((item) => {
            keysToSum.forEach((item2) => {
                item[item2] = ProjectUtils.toFixedIfNumber(item[item2]);
            })
        })

        const keysToFix0 = [`Change ${baseYear}-YTD %`, 'Change PYTD-YTD %'];
        keysToFix0.forEach(key => {
            data.forEach((item) => {
                if (item[key] === 'NaN') {
                    item[key] = '0.00';
                }
                if (item[key] === 'Infinity') {
                    item[key] = '0.00';
                }
            });
        });
        const lastObj = data[data.length - 1];



        const bObj = Object.assign({}, lastObj);


        Object.keys(bObj)
            .forEach((item) => {
                const temp = parseFloat(bObj[item]);
                if (isNaN(temp)) {
                    bObj[item] = ''
                } else {
                    bObj[item] = temp;
                }
            });

        const sumSubTotal = this.asignNewCopyNBlankThem(lastObj);
        const sumSubTotalPerc = this.asignNewCopyNBlankThem(lastObj);
        const sumSubTotalYTD = this.asignNewCopyNBlankThem(lastObj);
        const sumSubTotalPercYTD = this.asignNewCopyNBlankThem(lastObj);
        sumSubTotal['BASE-Sub Total'] = `Change ${baseYear} YTD`;



        sumSubTotal['CM-UK'] = bObj['CM-UK'] - bObj['BASE-UK'];
        sumSubTotal['CM-USA'] = bObj['CM-USA'] - bObj['BASE-USA'];
        sumSubTotal['CM-EU'] = bObj['CM-EU'] + bObj['CM-ROW'] - (bObj['BASE-EU'] + bObj['BASE-ROW']);

        sumSubTotalPerc['CM-UK'] = ((sumSubTotal['CM-UK']) * 100) / bObj['BASE-UK'];
        sumSubTotalPerc['CM-USA'] = ((sumSubTotal['CM-USA']) * 100) / bObj['BASE-USA'];
        sumSubTotalPerc['CM-EU'] = ((sumSubTotal['CM-EU']) * 100) / (bObj['BASE-EU'] + bObj['BASE-ROW']);


        sumSubTotalYTD['BASE-Sub Total'] = 'Change PYTD-YTD';

        sumSubTotalYTD['CM-UK'] = bObj['CM-UK'] - bObj['BM-UK'];
        sumSubTotalYTD['CM-USA'] = bObj['CM-USA'] - bObj['BM-USA'];
        sumSubTotalYTD['CM-EU'] = bObj['CM-EU'] + bObj['CM-ROW'] - (bObj['BM-EU'] + bObj['BM-ROW']);


        sumSubTotalPercYTD['CM-UK'] = ((sumSubTotalYTD['CM-UK']) * 100) / bObj['BM-UK'];
        sumSubTotalPercYTD['CM-USA'] = ((sumSubTotalYTD['CM-USA']) * 100) / bObj['BM-USA'];
        sumSubTotalPercYTD['CM-EU'] = ((sumSubTotalYTD['CM-EU']) * 100) / (bObj['BM-EU'] + bObj['BM-ROW']);


        const tempAraay = [sumSubTotal, sumSubTotalPerc, sumSubTotalYTD, sumSubTotalPercYTD]
        const keysToFix = ['CM-UK', 'CM-USA', 'CM-EU'];



        keysToFix.forEach(key => {
            tempAraay.forEach((item) => {
                if (isNaN(item[key])) {
                    item[key] = '0.00';
                }
                if (!isFinite(item[key])) {
                    item[key] = '0.00';
                }
            });
        });

        tempAraay.forEach((item) => {
            keysToFix.forEach((item2) => {
                item[item2] = ProjectUtils.toFixedIfNumber(item[item2]);
            })
        })

        data = data.concat(tempAraay);
        this.TC = this.TC.concat(keysToSum);


        return Array.from(data);
    }


    getMonthData() {
        this.monthData = this.globalService.getMonthData();
        this.log.i('getMonthData', this.ddTriggerBaseMonth, this.monthData);
        this.ddTriggerBaseMonth.next(this.monthData);
        this.ddTriggerCompareMonth.next(this.monthData);
    }
    getReportByData() {
        this.reportData = this.globalService.getReportByData();
        this.log.i('getReportByData', this.ddTriggerReport, this.reportData);
        this.ddTriggerReport.next(this.reportData);
    }

    getBodyData(): string {
        let body = '';
        body += this.comparsionService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());
        body += this.comparsionService.getDateSearchParam(this.comparisionSalesModel, body);
        body += this.comparsionService.getDropDownSearchParam(body, 'prevMonth', this.comparisionSalesModel);
        body += this.comparsionService.getDropDownSearchParam(body, 'prevYear', this.comparisionSalesModel);
        body += this.comparsionService.getDropDownSearchParam(body, 'currMonth', this.comparisionSalesModel);
        body += this.comparsionService.getDropDownSearchParam(body, 'currYear', this.comparisionSalesModel);
        body += this.comparsionService.getDropDownSearchParam(body, 'reportBy', this.comparisionSalesModel);
        body += this.comparsionService.getDropDownSearchParam(body, 'ocID', this.comparisionSalesModel);
        return body;
    }

    doOnReset() {
        this.comparisionSalesModel['prevMonth'] = null;
        this.comparisionSalesModel['prevYear'] = null;
        this.comparisionSalesModel['currMonth'] = null;
        this.comparisionSalesModel['currYear'] = null;
        this.comparisionSalesModel['ocID'] = null;
        this.comparisionSalesModel['reportBy'] = null;
        //  this.ddProduct.optionsModel = [];
        this.ngNNumbers = [];
        this.ngreportData = [];
        this.ngcuurentyear = [];
        this.ngcuurentmon = [];
        this.ngmonthData = [];
        this.ngyearData = [];
        this.comparisionSalesModel.limit = this.sessionObject.limit;
    }
}
