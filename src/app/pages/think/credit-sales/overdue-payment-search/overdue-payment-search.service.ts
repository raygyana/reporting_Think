import { Injectable } from '@angular/core';
import { Constants } from '../../../shared/constant';
import { BaseService } from '../../../../core/base/base.service';
import { ProjectUtils } from '../../../shared/project-utils';
import { HttpService } from '../../../../core/http.service';

@Injectable()
export class OverduePaymentSearchService extends BaseService {
    constructor(
        protected httpService: HttpService
    ) {
        super(httpService)
    }

    getServiceURL(): string {
        return Constants.TK_OVERDUE_PAYMENT_URL;
    }

    addColumnsOption(dtOptions: any) {
        dtOptions['columns'] = [
            {
                'data': 'credit_terms',
                'title': ' Credit Terms'
            }, {
                'data': 'bill_to_old_customer_id',
                'title': 'Bill To Old Customer Id'
            }, {
                'data': 'bill_to_customer_id',
                'title': 'Bill To Customer Id'
            }, {
                'data': 'bill_to_customer_name',
                'title': 'Bill To Name'
            }, {
                'data': 'bill_to_department',
                'title': 'Bill To Department'
            }, {
                'data': 'bill_to_company',
                'title': 'Bill To Company'
            }, {
                'data': 'bill_to_address1',
                'title': 'Bill To Address1'
            }, {
                'data': 'bill_to_address2',
                'title': 'Bill To Address2'
            }, {
                'data': 'bill_to_address3',
                'title': 'Bill To Address3'
            }, {
                'data': 'bill_to_phone',
                'title': 'Bill To Phone'
            }, {
                'data': 'bill_to_faxnbr',
                'title': 'BBill To Faxnbr'
            }, {
                'data': 'bill_to_email',
                'title': 'Bill To Email'
            }, {
                'data': 'bill_to_eighthundred',
                'title': ' Bill To Mobile'
            }, {
                'data': 'bill_to_city',
                'title': 'Bill To City'
            }, {
                'data': 'bill_to_state_description',
                'title': 'Bill To State'
            }, {
                'data': 'bill_to_country',
                'title': 'Bill To Country'
            }, {
                'data': 'alt_ship_customer_id',
                'title': 'Ship Customer Id'
            }, {
                'data': 'ship_to_name',
                'title': 'Ship To Name'
            }, {
                'data': 'ship_to_department',
                'title': 'Ship To Department'
            }, {
                'data': 'ship_to_company',
                'title': 'Ship To Company'
            }, {
                'data': 'ship_to_address1',
                'title': 'Ship To Address1'
            }, {
                'data': 'ship_to_address2',
                'title': 'Ship To Address2'
            }, {
                'data': 'ship_to_address3',
                'title': 'Ship To Address3'
            }, {
                'data': 'ship_to_phone',
                'title': 'Ship To Phone'
            }, {
                'data': 'ship_to_faxnbr',
                'title': 'Ship To Faxnbr'
            }, {
                'data': 'ship_to_email',
                'title': 'Ship To Email'
            }, {
                'data': 'ship_to_eighthundred',
                'title': 'Ship To Mobile'
            }, {
                'data': 'ship_to_city',
                'title': 'Ship To City'
            }, {
                'data': 'ship_to_state_description',
                'title': 'Ship To State'
            }, {
                'data': 'ship_to_country',
                'title': 'Ship To Country'
            }, {
                'data': 'orderhdr_id',
                'title': 'Order Id'
            }, {
                'data': 'sales_invoice_no',
                'title': 'Invoice Number'
            }, {
                'data': 'currency',
                'title': 'Currency'
            }, {
                'data': 'invoice_amount',
                'title': ' Invoice Amount'
            }, {
                'data': 'sales_invoice_date',
                'title': 'Invoice Date',
                'type': 'datetime',
                'render': this.dateFormInDatatable
            }, {
                'data': 'order_date',
                'title': 'Order Date',
                'type': 'datetime',
                'render': this.dateFormInDatatable
            }, {
                'data': 'due_date',
                'title': 'Due Date',
                'type': 'datetime',
                'render': this.dateFormInDatatable
            }, {
                'data': 'due_amount',
                'title': 'Due Amount'
            }, {
                'data': 'last_effort_sent',
                'title': 'Last Effort Sent'
            }, {
                'data': 'last_invoice_sent_date',
                'title': 'Last Invoice Sent Date',
                // 'type': 'datetime',
                // 'render': this.dateFormInDatatable
            }, {
                'data': 'payment_status',
                'title': 'Payment Status'
            }

        ];
    }

}

