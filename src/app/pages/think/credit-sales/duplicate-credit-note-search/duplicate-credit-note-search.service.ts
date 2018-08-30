import { Injectable } from '@angular/core';
import { Constants } from '../../../shared/constant';
import { BaseService } from '../../../../core/base/base.service';
import { ProjectUtils } from '../../../shared/project-utils';
import { HttpService } from '../../../../core/http.service';

@Injectable()
export class DuplicateCreditNoteSearchService extends BaseService {
    constructor(
        protected httpService: HttpService
    ) {
        super(httpService)
    }

    getServiceURL(): string {
        return Constants.TK_DUBLICATE_CREDIT_NOTE_URL;
    }

    addColumnsOption(dtOptions: any) {
        dtOptions['columns'] = [
            // {
            //     'data': 'order_id',
            //     'title': 'Invoice To Id'
            // },
            {
                'data': 'invoice_date',
                'title': 'Invoice Date',
                'type': 'datetime',
                'render': this.dateFormInDatatable
            }, {
                'data': 'payment_term',
                'title': 'Payment Term'
            }, {
                'data': 'contact_name',
                'title': 'Contact Name'
            }, {
                'data': 'customer_id',
                'title': 'Customer Id'
            }, {
                'data': 'due_date',
                'title': 'Due Date.',
                'render': this.dateFormInDatatable
            }, {
                'data': 'phone',
                'title': 'Contact No'
            }, {
                'data': 'cust_order_ref',
                'title': 'Cust Order Ref'
            }, {
                'data': 'vat_id',
                'title': 'PHP vat no.'
            }, {
                'data': 'tax_id_number',
                'title': 'Cust VAT No.'
            }, {
                'data': 'invoice_address',
                'title': 'Invoice Address'
            }, {
                'data': 'delivery_address',
                'title': 'Delivery Address'
            },
            {
                data: 'bill_to_customer_id',
                title: 'Invoice ID'
            }, {
                'data': 'issn',
                'title': 'ISSN'
            }, {
                'data': 'title',
                'title': 'Title'
            }, {
                'data': 'type',
                'title': 'Type'
            }, {
                'data': 'sub_start_date',
                'title': 'Sub Start Date',
                'type': 'datetime',
                'render': this.dateFormInDatatable
            }, {
                'data': 'sub_end_date',
                'title': 'Sub End Date',
                'type': 'datetime',
                'render': this.dateFormInDatatable
            }, {
                'data': 'price',
                'title': 'Price'
            }, {
                'data': 'discount',
                'title': 'Discount'
            }, {
                'data': 'vat',
                'title': 'VAT'
            }, {
                'data': 'value',
                'title': 'Value'
            }

        ];
    }

}

