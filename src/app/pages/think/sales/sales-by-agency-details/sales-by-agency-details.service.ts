import { Injectable } from '@angular/core';
import { Constants, ProjectUtils } from '../../../shared';
import { BaseService } from '../../../../core/base/base.service';

@Injectable()
export class SalesByAgencyService extends BaseService {

    getServiceURL(): string {
        return Constants.TK_SALES_AGENCY_DETAILS_SEARCH_REPORT_URL;
    }

    addColumnsOption(dtOptions: any) {
        dtOptions['columns'] = [
            {
                'data': 'agency',
                'title': 'Agency'
            },
            {
                'data': 'endUserCustomerID',
                'title': 'End User Customer ID'
            },
            {
                'data': 'endUserCustomerName',
                'title': 'End User Customer Name'
            },
            {
                'data': 'endUserAddress',
                'title': 'End User Address'
            },
            {
                'data': 'endUserAddress2',
                'title': 'End USer Address2'
            },
            {
                'data': 'endUserAddress3',
                'title': 'End User Address3'
            },
            {
                'data': 'endUserDepartment',
                'title': 'End User Department'
            },
            {
                'data': 'endUserCompany',
                'title': 'End User Company'
            },
            {
                'data': 'endUserCity',
                'title': 'End User City'
            },
            {
                'data': 'endUserCounty',
                'title': 'End User County'
            },
            {
                'data': 'endUserCountry',
                'title': 'End User Country'
            },
            {
                'data': 'endUserZip',
                'title': 'End User Zip'
            },
            {
                'data': 'journal',
                'title': 'Product Name'
            },
            {
                'data': 'revenueMethod',
                'title': 'Revenue Method'
            },
            {
                'data': 'subscriptionCategory',
                'title': 'Subscription Category'
            },
            {
                'data': 'orderNumber',
                'title': 'Order Number'
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
                'data': 'agentRefNumber',
                'title': 'Agent Ref Number'
            },
            {
                'data': 'currency',
                'title': 'Currency'
            },
            {
                'data': 'netLocalAmount',
                'title': 'Net Local Amount',
                'render': ProjectUtils.toFixedIfNumber
            },
            {
                'data': 'netBaseAmount',
                'title': 'Net BaseAmount',
                'render': ProjectUtils.toFixedIfNumber
            },
            {
                'data': 'paymentType',
                'title': 'Payment Type'
            },
            {
                'data': 'payCurrencyAmount',
                'title': 'Pay currency Amount',
                'render': ProjectUtils.toFixedIfNumber
            },
            {
                'data': 'paymentBaseAmount',
                'title': 'Payment Base Amount',
                'render': ProjectUtils.toFixedIfNumber
            },
            {
                'data': 'discount',
                'title': 'Discount %',
                'render': ProjectUtils.toFixedIfNumber
            },
            {
                'data': 'orderType',
                'title': 'Order Type'
            },
            {
                'data': 'qty',
                'title': 'Qty'
            }
        ];
    }
}



