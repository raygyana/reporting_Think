import { Injectable } from '@angular/core';
import { Constants } from '../../../shared/constant';
import { BaseService } from '../../../../core/base/base.service';

@Injectable()
export class WebOrdersByMonthNonSubsService extends BaseService {

    getServiceURL(): string {
        return Constants.TK_WEB_ORDER_BY_MONTH_NON_SUBS_URL;
    }

    addColumnsOption(dtOptions: any) {
        dtOptions['aaSorting'] = [];  // for disable starting sort
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
                'title': 'Order Code '
            },
            {
                'data': 'source_code',
                'title': 'Source Code'
            },
            {
                'data': 'state',
                'title': 'Country'
            },
            {
                'data': 'price',
                'title': 'Price'
                //,                'render': this.decimaltwoplace
            },
            {
                'data': 'delivery',
                'title': 'Delivery'
                //,                'render': this.decimaltwoplace
            },
            {
                'data': 'tax',
                'title': 'Tax'
                //,                 'render': this.decimaltwoplace
            },
            {
                'data': 'total',
                'title': 'Total'
                //,                'render': this.decimaltwoplace
            }
        ];
    }
}

