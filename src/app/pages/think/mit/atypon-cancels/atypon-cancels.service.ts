import { Injectable } from '@angular/core';
import { Constants } from '../../../shared/constant';
import { BaseService } from '../../../../core/base/base.service';

@Injectable()
export class AtyponCancelsService extends BaseService {

    getServiceURL(): string {
        return Constants.TK_ATYPON_CANCELS_URL;
    }

    addColumnsOption(dtOptions: any) {
        dtOptions['columns'] = [
            {
                'data': 'customerId',
                'title': 'Customer Id'
            },
            {
                'data': 'orderCategory',
                'title': 'Order Category'
            },
            {
                'data': 'issn',
                'title': 'ISSN'
            },
            {
                'data': 'fName',
                'title': 'First Name'
            },
            {
                'data': 'lName',
                'title': 'Last Name'
            },
            {
                'data': 'company',
                'title': 'Company'
            },
            {
                'data': 'address1',
                'title': 'Address1'
            },
            {
                'data': 'address2',
                'title': 'Address2'
            },
            {
                'data': 'city',
                'title': 'City'
            },
            {
                'data': 'state',
                'title': 'State'
            },
            {
                'data': 'zip',
                'title': 'Zip'
            },
            {
                'data': 'country',
                'title': 'Country'
            },
            {
                'data': 'email',
                'title': 'Email'
            },
            {
                'data': 'status',
                'title': 'Status'
            },
            {
                'data': 'startIssVol',
                'title': 'Start Iss Vol'
            },
            {
                'data': 'startIssEnum',
                'title': 'Start Iss Enum'
            },
            {
                'data': 'expIssVol',
                'title': 'Exp Iss Vol'
            },
            {
                'data': 'expIssEnum',
                'title': 'Exp Iss Enum'
            },
            {
                'data': 'issExpireDate',
                'title': 'Iss Expire Date',
                'type': 'datetime',
                'render': this.dateFormateMMDDYYYY
            },
            {
                'data': 'offer',
                'title': 'Offer'
            },
            {
                'data': 'orderDate',
                'title': 'Cancel Date',
                'type': 'datetime',
                'render': this.dateFormateMMDDYYYY
            },
            {
                'data': 'startDate',
                'title': 'Start Date',
                'type': 'datetime',
                'render': this.dateFormateMMDDYYYY
            },
            {
                'data': 'endDate',
                'title': 'Expire Date',
                'type': 'datetime',
                'render': this.dateFormateMMDDYYYY
            }
        ];
    }
}
