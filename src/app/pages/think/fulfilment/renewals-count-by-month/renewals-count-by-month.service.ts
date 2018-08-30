import { Injectable } from '@angular/core';
import { ProjectUtils } from '../../../shared/project-utils';
import { Constants } from '../../../shared/constant';
import { BaseService } from '../../../../core/base/base.service';

@Injectable()
export class RenewalCountByMonthService extends BaseService {

    // This service URL is not to use
    getServiceURL(): string {
        return Constants.TK_FULFILMENT_RENEWAL_COUNT_BY_MONTH_REPORT_URL;
    }



    addColumnsOption(dtOptions: any) {
        dtOptions['columns'] = [
            {
                'data': 'customerID',
                'title': 'Renew to Customer ID'
            }, {
                'data': 'customerName',
                'title': 'Renew to Customer Name'
            }, {
                'data': 'company',
                'title': 'Renew to Company'
            }, {
                'data': 'agency_code',
                'title': 'Agency Code'
            }, {
                'data': 'productName',
                'title': 'Product Name'
            }, {
                'data': 'orderNumber',
                'title': 'Orderhdr Id'
            }, {
                'data': 'effortNumber',
                'title': 'Effort Number'
            }, {
                'data': 'currency',
                'title': 'Currency'
            }, {
                'data': 'netBaseAmount',
                'title': 'Price',
                'render': ProjectUtils.toFixedIfNumber
            }
        ];

    }
}
