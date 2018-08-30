import { Injectable } from '@angular/core';
import {
      Http, RequestOptions, RequestOptionsArgs,
      Response, Request, Headers,
      XHRBackend, BaseRequestOptions
} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { DataDropDownOptionsI } from './dropdowns';

interface DropdownFillServiceI {
      DropDowns: any;
      fill(params: DataDropDownOptionsI): Observable<any>;
      clearDropdown();
}



@Injectable()
export class DropdownFillService {
      DropDowns: any = {};
      constructor(
            private http: Http
      ) { }

      fill(params: DataDropDownOptionsI): Observable<any> {
            const headers = new Headers({ 'Content-Type': 'application/json' });
            const options = new RequestOptions({ headers: headers });
            return this.http.get(params.serviceURL, options)
                  .map((data: Response) => {
                        let arr: any = data.json();
                        arr = arr.map((item) => {
                              return {
                                    value: item[params.keyName],
                                    display: item[params.keyDesc]
                              };
                        });
                        return [{
                              value: params.firstOptionValue,
                              display: params.firstOptionText
                        }].concat(arr);
                  });
      }

      clearDropdown(...arr) {
            Array.from(arguments)
                  .forEach((item) => {
                        delete this.DropDowns[item];
                  });
      }

      addNewDropDonw(name: string) {
            return this.DropDowns[name] = {};
      }
}
