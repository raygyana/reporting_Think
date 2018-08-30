import { Injectable } from '@angular/core';
import { BaseService } from '../../core/base/base.service';
import { ProjectUtils } from '../../pages/shared/project-utils';
import { Observable } from 'rxjs/Observable';

export interface MyBodyI {
      key: string;
      value: string;
}


@Injectable()
export class AutoCompleteService extends BaseService {

      getServiceURL(): string {
            return 'not in use';
      }

      getData(serviceURL: string, myBody?: MyBodyI): any {
            let body = this.setParamValue('', 'clientID', ProjectUtils.getClientCode());

            body += this.setParamValue(body, myBody.key, myBody.value);

            return this.getDataWithURL(serviceURL, body);
      }

      // getData(body: any): Observable<any[]> {

      //       return new Observable(o => {
      //             setTimeout(() => {
      //                   o.next(['asfdsf', 'asdfasdf', 'asdfasdf'])
      //             }, 10);
      //       });
      // }

}

