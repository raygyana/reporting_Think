// import { XHRBackend } from '@angular/http';
// import { AngularReduxRequestOptions } from '../core/angular-redux-request.options';
import { HttpService } from '../core/http.service';
import { LoaderService } from '../core/loader/loader.service';

import { TimeOutService } from './timeOut/timeOut.service';
import { Logger } from '../core/logger/logger';

import { HttpHandler, HttpClient } from '@angular/common/http';

// function httpServiceFactory(backend: XHRBackend, options: AngularReduxRequestOptions, loaderService: LoaderService, timeOutService: TimeOutService, logger: Logger) {
//     return new HttpService(backend, options, loaderService, timeOutService, logger);
// }

function httpServiceFactory(/*handler: HttpHandler, */http: HttpClient, loaderService: LoaderService, timeOutService: TimeOutService, logger: Logger) {
    return new HttpService( /*handler, */ http, loaderService, timeOutService, logger);
}

export { httpServiceFactory };
