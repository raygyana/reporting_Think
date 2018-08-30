import { Injectable } from '@angular/core';
import { Constants } from '../../../shared/constant';
import { BaseService } from '../../../../core/base/base.service';

@Injectable()
export class ClaimsByCountryListService extends BaseService {

    getServiceURL(): string {
        return Constants.TK_CLAIMS_BY_COUNTRY_SEARCH_REPORT_URL;
    }

    addColumnsOption(dtOptions: any) {
        dtOptions['columns'] = [
            {
                'data': 'customerId',
                'title': 'CustomerID'
            },
            {
                'data': 'title',
                'title': 'Product Name'
            },
            {
                'data': 'serviceCode',
                'title': 'Service Code'
            },
            {
                'data': 'orderHdrId',
                'title': 'Order Holder ID'
            },
            {
                'data': 'userCode',
                'title': 'User Code '
            },
            {
                'data': 'complaintDate',
                'title': 'Complain Date',
                'type': 'datetime',
                'render': this.dateFormateMMDDYYYY
            },
            {
                'data': 'creationDate',
                'title': 'Creation Date',
                'type': 'datetime',
                'render': this.dateFormateMMDDYYYY
            },
            {
                'data': 'state',
                'title': 'State/Country'
            },
            {
                'data': 'noteField',
                'title': 'Note Field'
            }
        ];
    }
}
