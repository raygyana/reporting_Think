import { Injectable } from '@angular/core';
import { Constants } from '../../../shared/constant';
import { BaseService } from '../../../../core/base/base.service';

// const salesByCatJSON = 'assets/json/salesbycat.json';

@Injectable()
export class VatExemptService extends BaseService {

    getServiceURL(): string {
        return Constants.TK_VAT_EXEMPT_SEARCH_URL;
    }

    addColumnsOption(dtOptions: any) {
        dtOptions['columns'] = [

            {
                'data': 'name',
                'title': 'Cust. Id Name'
            }, {
                'data': 'address1',
                'title': 'Street Address'
            }, {
                'data': 'zip',
                'title': 'Postal Code'
            }, {
                'data': 'city',
                'title': 'City'
            }, {
                'data': 'tax_id_number',
                'title': 'Tax ID Number'
            }, {
                'data': 'currency',
                'title': 'Curr'
            }, {
                'data': 'order_id',
                'title': 'Order Number'
            }, {
                'data': 'order_total',
                'title': 'Base Amount'
            }, {
                'data': 'local_total',
                'title': 'Local Amount'
            }, {
                'data': 'bill_to_customer_id',
                'title': 'End User Cust Id'
            }

        ];
    }

}
