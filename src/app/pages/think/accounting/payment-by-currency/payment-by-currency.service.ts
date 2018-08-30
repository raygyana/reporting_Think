import { Injectable } from '@angular/core';
import { Constants } from '../../../shared/constant';
import { BaseService } from '../../../../core/base/base.service';
import { ProjectUtils } from '../../../shared/project-utils';

@Injectable()
export class PaymentByCurrencySearchService extends BaseService {

    getServiceURL(): string {
        return Constants.TK_PAYMENT_BY_CURRENCY_SEARCH_URL;
    }

    addColumnsOption(dtOptions: any) {
        dtOptions['aaSorting'] = [];  // for disable starting sort
        dtOptions['aoColumnDefs'] = [
            { 'bSortable': false, 'aTargets': [0, 1, 2, 3, 4, 5] }
        ]
        dtOptions['columns'] = [
            {
                'data': 'currency',
                'title': 'Currency'
            },
            {
                'data': 'description',
                'title': 'Order Class'
            }, {
                'data': 'base_percentage',
                'title': 'Base Percentage Of Total',
                'render': this.addPercentage
            }, {
                'data': 'net_base_amount',
                'title': 'Net Base Payment Amount',
                'render': ProjectUtils.toFixedIfNumber
            }, {
                'data': 'local_percentage',
                'title': 'Local Percentage',
                'render': this.addPercentage
            }, {
                'data': 'net_local_payment_amount',
                'title': 'Net Local Payment Amount',
                'render': ProjectUtils.toFixedIfNumber
            }
        ];
    }
}
