import { Injectable } from '@angular/core';
import { Constants } from '../../../shared/constant';
import { BaseService } from '../../../../core/base/base.service';

@Injectable()
export class WebOrdersByMonthService extends BaseService {

    getServiceURL(): string {
        return Constants.TK_WEB_ORDER_BY_MONTH_URL;
    }

    addColumnsOption(dtOptions: any) {
        dtOptions['aaSorting'] = [];
        dtOptions['aoColumnDefs'] = [
            { 'bSortable': false, 'aTargets': [0, 1, 2, 3, 4, 5, 6, 7] }
        ]
        dtOptions['columns'] = [
            {
                'data': 'month',
                'title': 'Month'
            },
            //  {
            //     'data': 'order_date',
            //     'title': 'Order Date',
            //     'type': 'datetime',
            //     'render': this.dateFormateMMDDYYYY
            // },
            {
                'data': 'source_code',
                'title': 'Source Code'
            },
            {
                'data': 'state',
                'title': 'Country'
            },
            {
                'data': 'order_count',
                'title': 'Order Count'
            },
            {
                'data': 'pd_order',
                'title': 'PD Order'
                // ,                'render': this.decimaltwoplace
            },
            {
                'data': 'pd_delivery',
                'title': 'PD Delivery'
                // ,                'render': this.decimaltwoplace
            },
            {
                'data': 'pd_tax',
                'title': 'PD Tax'
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

