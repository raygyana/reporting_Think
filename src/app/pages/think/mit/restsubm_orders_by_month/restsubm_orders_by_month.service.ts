import { Injectable } from '@angular/core';
import { Constants } from '../../../shared/constant';
import { BaseService } from '../../../../core/base/base.service';

@Injectable()
export class RestsubmOrdersByMonthService extends BaseService {


    getServiceURL(): string {
        return Constants.TK_RESTSUBM_ORDERS_BY_MONTH_URL;
    }


    addColumnsOption(dtOptions: any) {
        dtOptions['aaSorting'] = [];
        dtOptions['aoColumnDefs'] = [
            { 'bSortable': false, 'aTargets': [0, 1, 2, 3, 4, 5, 6, 7, 8] }
        ]
        dtOptions['columns'] = [
            {
                'data': 'profit_center',
                'title': 'Profit Center'
            },
            {
                'data': 'month',
                'title': 'Month'
            },
            {
                'data': 'order_code',
                'title': 'Order Code'
            },
            {
                'data': 'state',
                'title': 'Country'
            },
            {
                'data': 'qty',
                'title': 'Quantity '
            },
            {
                'data': 'price',
                'title': 'Price'
                // ,                'render': this.decimaltwoplace
            },
            {
                'data': 'delivery',
                'title': 'Delivery'
                // ,                'render': this.decimaltwoplace
            },
            {
                'data': 'tax',
                'title': 'Tax'
                // ,                'render': this.decimaltwoplace
            },
            {
                'data': 'total',
                'title': 'Total'
                // ,                'render': this.decimaltwoplace
            }
        ];
    }
}
