import { Injectable } from '@angular/core';
import { Constants } from '../../../shared/constant';
import { BaseService } from '../../../../core/base/base.service';

@Injectable()
export class AtyponCompsOfferCodeService extends BaseService {

    getServiceURL(): string {
        return Constants.TK_ATYPONOFFERCOEDE_REPORT_URL;
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
                'data': 'country',
                'title': 'Country'
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
                'data': 'email',
                'title': 'Email'
            },
            {
                'data': 'status',
                'title': 'Status'
            },
            {
                'data': 'startIssEnum',
                'title': 'Start ISS Enum'
            },
            {
                'data': 'startIssVol',
                'title': 'Start ISS Vol'
            },
            {
                'data': 'expIssEnum',
                'title': 'Exp ISS Enum'
            },
            {
                'data': 'expIssVol',
                'title': 'Exp ISS Vol'
            },
            {
                'data': 'issExpireDate',
                'title': 'ISS Expire Date'
            },
            {
                'data': 'issn',
                'title': 'ISSN'
            },
            {
                'data': 'offer',
                'title': 'Offer Code'
            }
            ,
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
