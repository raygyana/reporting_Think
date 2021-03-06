import { Injectable } from '@angular/core';
import { Constants, ProjectUtils } from '../../../shared';
import { BaseService } from '../../../../core/base/base.service';

@Injectable()
export class FutureExpiresNewOrderService extends BaseService {

    getServiceURL(): string {
        return Constants.TK_SALE_FTRE_EXP_NEW_ORDR_DOWNLOAD_REPORT_URL;
    }

    addColumnsOption(dtOptions: any) {
        dtOptions['columns'] = [
            {
                'data': 'billToCustomerID',
                'title': 'Bill To Customer ID'
            },
            {
                'data': 'billToCustomerName',
                'title': ' Bill To Customer Name'
            },
            {
                'data': 'billtoCompany',
                'title': 'Bill To Company'
            },
            {
                'data': 'billtoAddress',
                'title': 'Bill To Address'
            },
            {
                'data': 'billtophoneNumber',
                'title': 'Bill To Phone Number'
            },
            {
                'data': 'billtoemailId',
                'title': 'Bill To Email Id'
            },
            {
                'data': 'billtoState',
                'title': 'Bill To State'
            },
            {
                'data': 'billtoCountry',
                'title': 'Bill To Country'
            },
            {
                'data': 'endUserCustId',
                'title': 'End User Cust Id'
            },
            {
                'data': 'endUserCustName',
                'title': 'End User Cust Name'
            },
            {
                'data': 'endUsertoCompany',
                'title': 'End User To Company'
            },
            {
                'data': 'endUserAddress',
                'title': 'End User Address'
            },
            {
                'data': 'endUserPhoneNumber',
                'title': 'End User Phone Number'
            },
            {
                'data': 'endUseremailId',
                'title': 'End User Email Id'
            },
            {
                'data': 'endUsertoState',
                'title': 'End User to State'
            },
            {
                'data': 'endUsertoCountry',
                'title': 'End User to Country'
            },
            {
                'data': 'shiptoCustId',
                'title': 'Ship to Cust Id'
            },
            {
                'data': 'shiptoCustName',
                'title': 'Ship to Cust Name'
            },
            {
                'data': 'shiptoCompany',
                'title': 'Ship to Company'
            },
            {
                'data': 'shiptoAddress',
                'title': 'Ship to Address'
            },
            {
                'data': 'shiptoPhoneNumber',
                'title': 'Ship to Phone Number'
            },
            {
                'data': 'shiptoemailId',
                'title': 'Ship to email Id'
            },
            {
                'data': 'shiptoState',
                'title': 'Ship to State'
            },
            {
                'data': 'shiptoCountry',
                'title': 'Ship to Country'
            },
            {
                'data': 'journal',
                'title': 'Product Name'
            },
            {
                'data': 'subscriptionCategory',
                'title': 'Subscription Category'
            },
            {
                'data': 'orderNumber',
                'title': 'OrderNumber'
            },
            {
                'data': 'orderDate',
                'title': 'Order Date',
                'type': 'datetime',
                'render': this.dateFormInDatatable
            },
            {
                'data': 'startDate',
                'title': 'Start Date',
                'type': 'datetime',
                'render': this.dateFormInDatatable
            },
            {
                'data': 'endDate',
                'title': 'End Date',
                'type': 'datetime',
                'render': this.dateFormInDatatable
            },
            {
                'data': 'salesRep',
                'title': 'Sales Rep'
            },
            {
                'data': 'cashCredit',
                'title': 'Cash_Credit'
            },
            {
                'data': 'paymentType',
                'title': 'Payment Type'
            },
            {
                'data': 'currency',
                'title': 'Currency'
            },
            // {
            //     'data': 'netLocalAmount',
            //     'title': 'Net Local Amount'
            // },
            // {
            //     'data': 'netBaseAmount',
            //     'title': 'Net Base  Amount'
            // },
            {
                'data': 'payCurrencyAmount',
                'title': 'Pay Currency Amount',
                'render': ProjectUtils.toFixedIfNumber
            },
            {
                'data': 'paymentBaseAmount',
                'title': 'Payment Base Amount',
                'render': ProjectUtils.toFixedIfNumber
            },
            {
                'data': 'qty',
                'title': 'Qty'
            },
            {
                'data': 'renewalStatus',
                'title': 'Renewal Status'
            },
            {
                'data': 'renewalOrderNumber',
                'title': 'Renewal Order Numbe'
            },
            {
                'data': 'renewalDate',
                'title': 'Renewal Date',
                'type': 'datetime',
                'render': this.dateFormInDatatable
            }
        ];
    }


}

