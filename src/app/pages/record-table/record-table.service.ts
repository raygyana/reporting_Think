import { Injectable } from '@angular/core';
import { Constants } from '../shared/constant';
import { BaseService } from '../../core/base/base.service';

@Injectable()
export class RecordTableService extends BaseService {

    serviceURL: string;
    setRecordTableServiceURL(newServiceURL: string) {
        this.serviceURL = newServiceURL;
        console.log(this.serviceURL);
    }
    getServiceURL(): string {
        console.log(this.serviceURL);
        return this.serviceURL;
    }

    // addColumnsOption(dtOptions: any) {
    //     dtOptions['buttons'] = []
    //     dtOptions['columns'] = [
    //         {
    //             'data': 'checkbox',
    //             'title': 'checkbox'
    //         },
    //         {
    //             'data': 'First Name',
    //             'title': 'FIRST NAME'
    //         },
    //         {
    //             'data': 'Last Name',
    //             'title': 'LAST NAME'
    //         },
    //         {
    //             'data': 'Email ID',
    //             'title': 'EMAIL'
    //         }
    //     ];
    // }
}
