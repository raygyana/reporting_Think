import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { XHRBackend, RequestOptions } from '@angular/http';
// import { DataTablesModule } from 'angular-datatables';

import { HttpService } from './http.service';
import { httpServiceFactory } from './http-service.factory';
// import { AngularReduxRequestOptions } from './angular-redux-request.options';
import { LoaderService } from './loader/loader.service';
import { LoaderComponent } from './loader/loader.component';
import { Logger } from './logger/logger';
import { RecordDataTableComponent } from './record-data-table/record-data-table.component';
// import {DataTableModule} from 'angular-4-data-table-bootstrap-4';
import { TimeOutService } from './timeOut/timeOut.service';

import { HttpHandler, HttpClient } from '@angular/common/http';
import { CustomInterceptorProvider } from './customHttp.interceptor';
// import { DownloadFileService } from './Services/download';
@NgModule({
    imports: [
        CommonModule
        //  DataTableModule
    ],
    exports: [
        LoaderComponent,
        RecordDataTableComponent
    ],
    declarations: [
        LoaderComponent,
        RecordDataTableComponent
    ],
    providers: [
        CustomInterceptorProvider,
  //      DownloadFileService,
        LoaderService, Logger,
        {
            provide: HttpService,
            useFactory: httpServiceFactory,
            deps: [HttpClient, LoaderService, TimeOutService, Logger]
            // deps: [XHRBackend, RequestOptions, LoaderService, TimeOutService, Logger]
        }
    ]
})

export class CoreModule { }
