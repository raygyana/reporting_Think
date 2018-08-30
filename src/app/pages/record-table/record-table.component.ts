import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { SessionObject } from '../shared/session-object';
import { RecordTableService } from './record-table.service';
import { sprintf } from 'sprintf-js';
import { BaseComponent } from '../../core/base/base.component';
import { LoaderService } from '../../core/loader/loader.service';
import { Utils } from '../shared/utils';
import {
    Constants, ProjectUtils, GlobalService, SearchModelType, ChangeService, SaveSearchService,
} from '../shared';

import { Subscription } from 'rxjs/Subscription';
import { DataTableDirective } from 'angular-datatables';
import { DashboardService } from '../dashboard/dashboard.service';

@Component({
    selector: 'app-record-table',
    templateUrl: './record-table.component.html',
    styleUrls: ['./record-table.component.css'],
    providers: [RecordTableService]
})
export class RecordTableComponent extends BaseComponent implements
    OnInit, OnDestroy {

    private req: any;
    _subscription: Subscription;
    dtOptions: any = {};
    dtTrigger: Subject<any> = new Subject();
    increaseTableData: Array<any>;
    tableHeaderData: Array<any>;
    numberOfRecords: number;
    currentMonthStr: string;
    liveYear: string;
    isMore: boolean;
    recordDatas: any;
    columnNames: any = [];
    Year: any;
    ACCOUNT_LIST = 'ACCOUNT_LIST';
    @ViewChild('dynamicReportData', { read: DataTableDirective }) dtElement: DataTableDirective | any;
    @Input() serviceURL: string;
    @Input() messageString: string;
    @Input() headerMessage: string;
    constructor(protected loaderService: LoaderService,
        private _recordTableService: RecordTableService,
        route: ActivatedRoute,
        private dashboardService: DashboardService) {
        super(loaderService);
        console.log(route.snapshot);
        this.isMore = false;

        const sessionObject: SessionObject = SessionObject.getSessionObject();
        this.currentMonthStr = SessionObject.getCurrentMonthStr();

        if (Object.keys(route.snapshot.data).length > 0) {
            this.isMore = route.snapshot.data[0].isMore;
            this.serviceURL = route.snapshot.data[1].serviceURL;
            this.messageString = route.snapshot.data[2].messageString;
        }

        this.numberOfRecords = 10;
        this.Year = SessionObject.liveYear;
    }

    // getLoaderName(): string {
    //     return 'record-table';
    // }

    ngOnInit() {

        this.subFullTestSub();
        if (this.isMore === false) {
            this.doOptionSettings();
        } else {
            this.dtOptions = ProjectUtils.doOptionSettingsFull('libraryUserReport', 'Library User Report');
        }
        this.getDataFromServer();
    }

    xtBaseOnDestroy() {
        this.req.unsubscribe();
    }

    getDataElement(whichService: string): DataTableDirective {
        return this.dtElement;
    }

    getDataFromServer() {
        this.showLoaderDuplicate();
        this._recordTableService.setRecordTableServiceURL(this.serviceURL);
        console.log(this.isMore);
        this.numberOfRecords = (this.isMore) ? 100000 : 10;
        console.log(this.numberOfRecords);
        const sessionObject: SessionObject = SessionObject.getSessionObject();
        if (null !== sessionObject) {
            const webMartId = SessionObject.getSessionObject().activeCurrentUser.webmartID;
            const body = 'webmartID=' + webMartId
                + '&recordCount=' + this.numberOfRecords;
            this.RenderDynamicDatatable = false;
            this.req = this._recordTableService.getData(body)
                .subscribe(data => {
                    this.RenderDynamicDatatable = true;
                    const recordData = data['data'];
                    if (recordData.length > 10) {
                        this.headerMessage = sprintf(this.messageString, recordData.length);
                    }
                    recordData.forEach(element => {
                        Object.keys(element).forEach((key) => {
                            if (key.includes('.')) {
                                element[key.replace('.', ' ')] = element[key];
                                delete element[key];
                            }
                        })
                    });
                    console.log('recordData', recordData);
                    ProjectUtils.dtNoDataAvailable(recordData);
                    this.myDtColumns(recordData[0]);
                    this.recordDatas = recordData;
                    this.setListData(this.ACCOUNT_LIST, this.recordDatas);
                    this.dtTrigger.next();
                    this.Data_TableRowCallBack();
                    this.hideLoaderDuplicate();
                },
                    err => {
                        this.setListData(this.ACCOUNT_LIST, []);
                        console.log('Something went wrong!!');
                        this.dtTrigger.next();
                        this.hideLoaderDuplicate();
                    });
        }
    }

    dtDataReports_CallBackTk(self, event, data, params) {
        if (self.headerMessage === 'Identified Licence Denial') {
            self.makeUrl(event, self, data, 'data')
        }
    }


    Data_TableRowCallBack() {
        this.myCustomRowCallBack(this.dtOptions, '', this.dtDataReports_CallBackTk, 'dtOptions');
    }

    doOptionSettings() {
        this.dtOptions = {
            paging: false,
            fixedHeader: {
                header: true,
                footer: true
            },
            info: false,
            searching: false
        };
    }

    myDtColumns(sigleObj) {
        const makeColumns = () => {
            this.dtOptions['columns'] = [];
            if (sigleObj) {
                Object.keys(sigleObj)
                    .forEach((item) => {
                        console.log('item', item)
                        this.dtOptions['columns'].push({
                            'data': item,
                            'title': item.split('_').join(', ')
                        });
                    })
            }
        }
        ProjectUtils.dynamicColumns(makeColumns, this.dtOptions);
    }

    subFullTestSub() {
        this.dashboardService.fullTextSub
            .subscribe((data) => {
                this.headerMessage = sprintf(this.messageString, this.numberOfRecords);
                if (this.headerMessage.includes('Full-Text')) {
                    this.headerMessage = this.headerMessage.replace('Full-Text', data);
                }
            })
    }

}

