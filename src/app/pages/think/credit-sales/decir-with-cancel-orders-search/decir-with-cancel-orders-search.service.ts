import { Injectable } from '@angular/core';
import { Constants } from '../../../shared/constant';
import { BaseService } from '../../../../core/base/base.service';
import { ProjectUtils } from '../../../shared/project-utils';
import { HttpService } from '../../../../core/http.service';

@Injectable()
export class DecirWithCancelOrdersSearchService extends BaseService {

    constructor(
        protected httpService: HttpService
    ) {
        super(httpService)
    }

    getServiceURL(): string {
        return Constants.TK_DECIR_CANCEL_ORDERS_URL;
    }
    addColumnsOption(dtOptions: any) {
        dtOptions['columns'] = [
            {
                'data': 'bill_to_old_customer_id',
                'title': 'Old Bill To Customer ID'
            }, {
                'data': 'bill_to_customer_id',
                'title': ' Bill To Customer Id'
            }, {
                'data': 'bill_to_fname',
                'title': 'Bill To Name'
            }, {
                'data': 'bill_to_lname',
                'title': 'Bill To LName'
            }, {
                'data': 'bill_to_department',
                'title': 'Bill To Department'
            },
            {
                data: 'price_category',
                title: 'Price Category'
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
                'title': 'Bill To Fax number'
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
                'data': 'bill_to_state',
                'title': 'Bill To State'
            }, {
                'data': 'bill_to_country',
                'title': 'Bill To Country'
            }, {
                'data': 'old_ship_to_id',
                'title': 'Old Ship To ID'
            }, {
                'data': 'ship_to_customer_id',
                'title': 'Ship To Customer Id'
            }, {
                'data': 'ship_to_fname',
                'title': 'Ship To FName'
            }, {
                'data': 'ship_to_lname',
                'title': 'Ship To LName'
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
                'title': 'Ship To FaxNumber'
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
                'data': 'ship_to_state',
                'title': 'Ship To State'
            }, {
                'data': 'ship_to_country',
                'title': 'Ship To Country'
            }, {
                'data': 'enduser_old_customer_id',
                'title': 'Old End User Customer ID'
            }, {
                'data': 'enduser_customer_id',
                'title': 'End User Customer Id'
            }, {
                'data': 'enduser_fname',
                'title': 'End User FName'
            }, {
                'data': 'enduser_lname',
                'title': 'End User LName'
            }, {
                'data': 'enduser_department',
                'title': 'End User Department'
            }, {
                'data': 'enduser_company',
                'title': 'End User Company'
            }, {
                'data': 'enduser_address1',
                'title': 'End User Address1'
            }, {
                'data': 'enduser_address2',
                'title': 'End User Address2'
            }, {
                'data': 'enduser_address3',
                'title': 'End User Address3'
            }, {
                'data': 'enduser_phone',
                'title': 'End User Phone'
            }, {
                'data': 'enduser_faxnbr',
                'title': 'End User FaxNumber'
            }, {
                'data': 'enduser_email',
                'title': 'End User Email'
            }, {
                'data': 'enduser_eighthundred',
                'title': 'End User Mobile'
            }, {
                'data': 'enduser_city',
                'title': 'End User City'
            }, {
                'data': 'enduser_state',
                'title': 'End User State'
            }, {
                'data': 'enduser_country',
                'title': 'End User Country'
            }, /*{
                'data': 'order_id',
                'title': 'Journal Name'
            }, */{
                'data': 'product_code',
                'title': 'Product Code'
            }, {
                'data': 'oc_description',
                'title': 'Product Name'
            },
            // {
            //     'data': 'product_code',
            //     'title': 'Product Category'
            // },
            {
                'data': 'volume_year',
                'title': 'Volume Year'
            }, {
                'data': 'enumeration',
                'title': 'Vol/Iss'
            }, {
                'data': 'order_id',
                'title': 'Order No.'
            }, {
                'data': 'order_date',
                'title': 'Order Date',
                'type': 'datetime',
                'render': this.dateFormInDatatable
            }, {
                'data': 'start_date',
                'title': 'Start Date',
                'type': 'datetime',
                'render': this.dateFormInDatatable
            }, {
                'data': 'expire',
                'title': 'Expire Date',
                'type': 'datetime',
                'render': this.dateFormInDatatable
            }, {
                'data': 'revenue_method',
                'title': 'Revenue Method'
            }, {
                'data': 'currency',
                'title': 'Currency'
            }, {
                'data': 'cancel_net_local_amt',
                'title': 'Net Local Amount'
            }, {
                'data': 'cancel_net_base_amt',
                'title': 'Net Base Amount'
            }, {
                'data': 'cancel_tax_base_amt',
                'title': 'Tax Amount(Base)'
            }, {
                'data': 'cancel_gross_local_amt',
                'title': 'Gross Local Amt'
            }, {
                'data': 'cancel_gross_base_amt',
                'title': 'Gross Base Amount'
            }, {
                'data': 'order_code_description',
                'title': 'Order Code'
            }, {
                'data': 'market_sector',
                'title': 'Market Sector'
            }, {
                'data': 'renewal_category',
                'title': 'Renewal Category'
            }, {
                'data': 'cash_credit',
                'title': 'Cash/credit'
            }, {
                'data': 'subscription_category_description',
                'title': 'Price Type'
            }, {
                'data': 'agency_company',
                'title': 'Agency'
            }, /*{
                'data': 'payment_type',
                'title': 'Source Code'
            }, */{
                'data': 'payment_type',
                'title': 'Payment Type'
            }, {
                'data': 'pay_currency_amount',
                'title': 'Pay Currency Amount'
            }, {
                'data': 'order_status',
                'title': 'Order Status'
            }, {
                'data': 'payment_status',
                'title': 'Payment Status'
            }, {
                'data': 'term_days',
                'title': 'Term Days'
            }, {
                'data': 'agent_ref_nbr',
                'title': 'Agent Ref Nbr'
            }, {
                'data': 'po_number',
                'title': 'PO Number'
            }, {
                'data': 'issn',
                'title': 'Issn'
            }, /*{
                'data': 'bundle_qty',
                'title': 'Qty Split'
            },*/ {
                'data': 'bundle_qty',
                'title': 'Quantity'
            }, {
                'data': 'xps_ref',
                'title': ' XPS Ref'
            }, {
                'data': 'sales_representative',
                'title': 'Sales Representative'
            }, {
                'data': 'dispatch_method',
                'title': 'Dispatch Method'
            }, {
                'data': 'number_of_user',
                'title': 'Number of Users'
            }, {
                'data': 'sales_invoice_no',
                'title': 'Invoice Number'
            }, {
                'data': 'sales_invoice_date',
                'title': 'Invoice Date',
                'type': 'datetime',
                'render': this.dateFormInDatatable
            }, {
                'data': 'cancel_reason',
                'title': 'Cancel Reason'
            }

        ];
    }

}

