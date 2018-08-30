import { Injectable } from '@angular/core';
import { Constants } from '../../../shared/constant';
import { BaseService } from '../../../../core/base/base.service';
import { ProjectUtils } from '../../../shared/project-utils';
import { HttpService } from '../../../../core/http.service';

@Injectable()
export class AgedArCustomerWiseSearchService extends BaseService {

    constructor(
        protected httpService: HttpService
    ) {
        super(httpService)
    }


    getServiceURL(): string {
        return Constants.TK_AGED_AR_CUSTOMERWISE_SEARCH_URL;
    }

    addColumnsOption(dtOptions: any) {
        dtOptions['aaSorting'] = [];  // for disable starting sort
        dtOptions['aoColumnDefs'] = [
            { 'bSortable': false, 'aTargets': [0, 1, 2, 3, 4, 5] }
        ]
        dtOptions['columns'] = [
            {
                'data': 'customer_id',
                'title': 'Customer ID'
            },
            {
                'data': 'customer_name',
                'title': 'Customer Name'
            },
            {
                'data': 'order_id',
                'title': 'Order Number'
            },
            {
                'data': 'company_name',
                'title': 'Company'
            },
            {
                'data': 'invoice_no',
                'title': 'Invoice Number'
            },
            {
                'data': 'invoice_date',
                'title': 'Invoice Date',
                'render': this.dateFormInDatatable
            },
            {
                'data': 'due_date',
                'title': 'Due Date',
                'render': this.dateFormInDatatable
            }, {
                'data': 'original_order_amount',
                'title': 'Order Amount',
                'render': ProjectUtils.toFixedIfNumber
            }, {
                'data': 'amount_due',
                'title': 'Amount Due'
            }, {
                'data': 'zero_to_thirty_days',
                'title': '0-30 Days'
            }, {
                'data': 'thirtyone_to_sixty_days',
                'title': '31-60 Days'
            }, {
                'data': 'sixtyone_to_ninty_days',
                'title': '61-90 Days'
            }, {
                'data': 'nintyone_to_onetwenty_days',
                'title': '91-120 Days'
            }, {
                'data': 'onetwentyone_to_oneeighty_days',
                'title': '121-180 Days'
            },
            {
                'data': 'oneeightyone_to_twoseventy_days',
                'title': '181-270 Days'
            },
            {
                'data': 'twoseventyone_to_threesixty_days',
                'title': '271-360 Days'
            },
            {
                'data': 'overdue_days',
                'title': 'Overdue Days'
            },
            {
                'data': 'turnover_this_year',
                'title': 'TurnOver This YTD',
                'render': ProjectUtils.toFixedIfNumber
            }, {
                'data': 'turnover_last_year',
                'title': 'TurnOver Last YTD'
            }
        ];
    }
}

