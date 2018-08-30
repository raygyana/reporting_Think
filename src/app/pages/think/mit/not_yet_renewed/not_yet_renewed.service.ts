import { Injectable } from '@angular/core';
import { Constants } from '../../../shared/constant';
import { BaseService } from '../../../../core/base/base.service';

@Injectable()
export class NotYetRenewedService extends BaseService {

    getServiceURL(): string {
        return Constants.TK_NOT_YET_RENEWED_URL;
    }

    addColumnsOption(dtOptions: any) {
        dtOptions['columns'] = [

            {
                'data': 'customer_id',
                'title': 'Customer ID'
            },
            {
                'data': 'journal_description',
                'title': 'Product Name'
            },
            {
                'data': 'count_order_category',
                'title': 'Count Order Category'
            },
            {
                'data': 'ratio',
                'title': 'Ratio'
            },
            {
                'data': 'oc',
                'title': 'OC Description'
            },
            {
                'data': 'order_item_type',
                'title': 'Order Item Type'
            },
            {
                'data': 'order_has_been_renewed',
                'title': 'Order Renew Status'
            },
            {
                'data': 'issue_close_date',
                'title': 'Issue Close Date',
                'type': 'datetime',
                'render': this.dateFormateMMDDYYYY
            },
            {
                'data': 'issue_date',
                'title': 'Issue Date',
                'type': 'datetime',
                'render': this.dateFormateMMDDYYYY
            },
            {
                'data': 'order_category',
                'title': 'Order Category'
            },
            {
                'data': 'order_status',
                'title': 'Order Status'
            },
            {
                'data': 'profit_center',
                'title': 'Profit Center'
            }

        ];
    }
}

