import { Injectable } from '@angular/core';
import { Constants } from '../../../shared/constant';
import { BaseService } from '../../../../core/base/base.service';

@Injectable()
export class RMGRCreditCardTS230Service extends BaseService {

    getServiceURL(): string {
        return Constants.TK_RMGR_CREDIT_CARD_URL;
    }

    addColumnsOption(dtOptions: any) {
        dtOptions['aaSorting'] = [];
        dtOptions['aoColumnDefs'] = [
            { 'bSortable': false, 'aTargets': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
        ]
        dtOptions['columns'] = [
            {
                'data': 'customer_id',
                'title': 'Customer ID'
            },
            {
                'data': 'order_id',
                'title': 'Order ID'
            }, {
                'data': 'order_code',
                'title': 'Order Code'
            },
            {
                'data': 'order_date',
                'title': 'Order Date',
                'type': 'datetime',
                'render': this.dateFormateMMDDYYYY
            },

            {
                'data': 'name',
                'title': 'Name'
            },
            {
                'data': 'qty',
                'title': 'QTY'
            },
            {
                'data': 'payment_date',
                'title': 'Payment Date',
                'type': 'datetime',
                'render': this.dateFormateMMDDYYYY
            },
            {
                'data': 'tax',
                'title': 'Tax'
                // ,                'render': this.decimaltwoplace
            },
            {
                'data': 'pay_currency_amount',
                'title': 'Amount'
                // ,                'render': this.decimaltwoplace
            },
            {
                'data': 'payment_type',
                'title': 'Payment Type'
            },
            {
                'data': 'last_four_number',
                'title': 'Last Four Digit'
            }

        ];
    }
}

