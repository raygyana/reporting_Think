import { Injectable } from '@angular/core';
import { Constants } from '../../../shared/constant';
import { BaseService } from '../../../../core/base/base.service';

@Injectable()
export class AtyponTrialsService extends BaseService {


    getServiceURL(): string {
        return Constants.TK_ATYPON_TRIALS_URL;
    }


    addColumnsOption(dtOptions: any) {
        dtOptions['columns'] = [
            {
                'data': 'customerId',
                'title': 'Customer ID'
            },
            {
                'data': 'orderCategory',
                'title': 'Order Category'
            },
            {
                'data': 'initial',
                'title': 'Initial'
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
            }, {
                'data': 'country',
                'title': 'Country'
            },
            {
                'data': 'zip',
                'title': 'Zip Code'
            },
            {
                'data': 'email',
                'title': 'Email'
            },
            {
                'data': 'issn',
                'title': 'ISSN'
            },
            {
                'data': 'startIssEnum',
                'title': 'Start Issue Enum'
            },
            {
                'data': 'startIssVol',
                'title': 'Start Issue Volume'
            },
            {
                'data': 'expIssEnum',
                'title': 'Exp Iss Enum'
            },
            {
                'data': 'expIssVol',
                'title': 'Exp Iss Vol'
            },
            {
                'data': 'issExpireDate',
                'title': 'Issue Expire Date',
                'type': 'datetime',
                'render': this.dateFormateMMDDYYYY
            },
            {
                'data': 'offer',
                'title': 'Offer'
            },
            {
                'data': 'status',
                'title': 'Status'
            },
            {
                'data': 'orderDate',
                'title': 'Order Date',
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
