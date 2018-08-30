import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/timeout';
// import {
//     Http, RequestOptions,
//     RequestOptionsArgs, Response,
//     Request, Headers, XHRBackend
// } from '@angular/http';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';

// import { AngularReduxRequestOptions } from './angular-redux-request.options';
import { LoaderService } from './loader/loader.service';
import { TimeOutService } from './timeOut/timeOut.service';
import { Logger as Loggerr } from '../core/logger/logger';
import { Log, Level } from 'ng2-logger'



// const httpOptions = {
//     headers: new HttpHeaders(
//         {
//             'authorization': 'Basic aW5zaWdodHNlcnZpY2U6TXBzSW5zaWdodA==',
//             'Content-Type': 'application/x-www-form-urlencoded',
//         }
//     )

// };

@Injectable()
export class HttpService /*extends HttpClient*/ {

    log = Log.create('HttpService');

    constructor(
        private http: HttpClient,
        //        private handler: HttpHandler,
        // backend: XHRBackend,
        // defaultOptions: AngularReduxRequestOptions,
        private loaderService: LoaderService,
        private timeOutService: TimeOutService,
        private logger: Loggerr
    ) {

        // super(handler);
        //        super(backend, defaultOptions);
        //   console.log('http service');
        this.log.color = 'lightblue';
    }

    extractPostDataInsight(url: string, body: any, tokenId: any, responseType: string = 'json'): Observable<any> {
        this.showLoader();

        this.log.d('extractPostData', url, body);
        const options = this.getHTTPOption(tokenId);
        console.log(this.http);
        options['responseType'] = responseType;
        return this.http.post(url, body, options)
            .catch(this.onCatch)
            .do((res: Response) => {
                //   console.log(res);
                this.onSuccess(res);
            }, (error: any) => {
                console.log('error');
                this.onError(error);
            })
            .finally(() => {
                this.onEnd();
            });


    }

    extractPostData(url: string, body: any, tokenId: any, responseType: string = 'json'): Observable<any> {
        // this.timeOutService.setNewTimeOut()
        //     .then(() => {
        //         console.log('new Time out at http');
        //     })
        //     .catch(() => {
        //         console.log('Catch........................');
        //     })
        this.showLoader();

        this.log.d('extractPostData', url, body);
        const options = this.getHTTPOption(tokenId);
        console.log(this.http);
        options['responseType'] = responseType;
        return this.http.post(url, body, options)
            // return super.get(url, body)
            // .timeout(60000)
            .catch(this.onCatch)
            .do((res: Response) => {
                //   console.log(res);
                this.onSuccess(res);
            }, (error: any) => {
                console.log('error');
                this.onError(error);
            })
            .finally(() => {
                // console.log('final.......................................................');
                this.onEnd();
            });

    }
    /*
        downloadFile(url: string, body: any, options?: RequestOptionsArgs){

            return super.post(url, body, this.requestOptions(options))
                // return super.get(url, body)
                .catch(this.onCatch)
                .do((res: Response) => {
                    console.log(res);
                    this.onSuccess(res);
                }, (error: any) => {
                    this.onError(error);
                })
                .finally(() => {
                    this.onEnd();
                });

            super.get().subscribe(data => this.downloadFile(data)),//console.log(data),
                     error => console.log("Error downloading the file."),
                     () => console.info("OK")
        }


        downloadDataFile(data: Response){
            var blob = new Blob([data], { type: 'text/xls' }
            var url= window.URL.createObjectURL(blob);
            window.open(url);
        }
    */



    // private requestOptions(options?: RequestOptionsArgs): RequestOptionsArgs {

    //     if (options == null) {
    //         options = new AngularReduxRequestOptions(null);
    //     }
    //     //    console.log(options);

    //     return options;
    // }

    private onCatch(error: any, caught: Observable<any>): Observable<any> {
        console.log('Catch, error: ', error);
        return Observable.throw(error);
    }

    private onSuccess(res: Response): void {
        //    console.log('Request successful');
    }

    private onError(res: Response): void {
        console.log('Error, status code: ' + res.status);
    }

    private onEnd(): void {
        this.hideLoader();
    }

    private showLoader(): void {
        //    console.log('called showLoader');
        //    this.loaderService.show();
    }

    private hideLoader(): void {
        //    console.log('called hideLoader');
        //    this.loaderService.hide();
    }

    private getHTTPOption(tokenId: any): any {
        const httpOptions = {
            headers: new HttpHeaders(
                {
                    // 'authorization': 'Basic aW5zaWdodHNlcnZpY2U6TXBzSW5zaWdodA==',
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            )
        };
        if (tokenId) {
            httpOptions.headers = httpOptions.headers.set('token', tokenId);
        }
        return httpOptions;
    }

}
