import { Injectable } from '@angular/core';
import { Constants } from '../../../shared/constant';
import { BaseService } from '../../../../core/base/base.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ComparsionService extends BaseService {

    getServiceURL(): string {
        return Constants.TK_COMPARISION_REPORT_URL;
    }

    // getData(body: any): Observable<any[]> {

    //     return new Observable(o => {
    //         setTimeout(() => {
    //             o.next(this.getabcd())
    //         }, 1000);
    //     });
    // }

    addColumnsOption(dtOptions: any) {
    }

    // getabcd() {
    //     const abc = `     [{"name": "October","subscription": "IND","category": "Single Issue","[July-17:Canada]": 0.0,"[July-17:foreign]": 352.0,"[July-17:USA]": 176.0,"[June-17:Canada]": 0.0,"[June-17:foreign]": 66.0,"[June-17:USA]": 99.2},{"name": "October","subscription": "INST","category": "Pack","[July-17:Canada]": 0.0,"[July-17:foreign]": 0.0,"[July-17:USA]": 0.0,"[June-17:Canada]": 0.0,"[June-17:foreign]": 0.0,"[June-17:USA]": 0.0},{"name": "October","subscription": "INST","category": "Print Only","[July-17:Canada]": 268.8,"[July-17:foreign]": 597.6,"[July-17:USA]": 0.0,"[June-17:Canada]": 537.6,"[June-17:foreign]": 2044.8,"[June-17:USA]": 2968.0},{"name": "October","subscription": "INST","category": "Single Issue","[July-17:Canada]": 0.0,"[July-17:foreign]": 0.0,"[July-17:USA]": 0.0,"[June-17:Canada]": 0.0,"[June-17:foreign]": 76.0,"[June-17:USA]": 0.0},{"name": "October","subscription": "RET","category": "Print Only","[July-17:Canada]": 34.65,"[July-17:foreign]": 0.0,"[July-17:USA]": 0.0,"[June-17:Canada]": 0.0,"[June-17:foreign]": 0.0,"[June-17:USA]": 0.0},{"name": "October","subscription": "SEED","category": "Print Only","[July-17:Canada]": 0.0,"[July-17:foreign]": 0.0,"[July-17:USA]": 0.0,"[June-17:Canada]": 0.0,"[June-17:foreign]": 0.0,"[June-17:USA]": 0.0},{"name": "October","subscription": "STU","category": "Print Only","[July-17:Canada]": 0.0,"[July-17:foreign]": 56.0,"[July-17:USA]": 330.0,"[June-17:Canada]": 0.0,"[June-17:foreign]": 56.0,"[June-17:USA]": 174.9}]`;

    //     return JSON.parse(abc);
    // }



    // keysToFix.forEach(key => {
    //     tempAraay.forEach((item) => {
    //         if (isNaN(item[key])) {
    //             item[key] = '0.00';
    //         }
    //         if (!isFinite(item[key])) {
    //             item[key] = '0.00';
    //         }
    //     });
    // });


    // keysToFix0.forEach(key => {
    //     data.forEach((item) => {
    //         if (item[key] === 'NaN') {
    //             item[key] = '0.00';
    //         }
    //         if (item[key] === 'Infinity') {
    //             item[key] = '0.00';
    //         }
    //     });
    // });




}
