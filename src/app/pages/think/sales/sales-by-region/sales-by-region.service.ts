import { Injectable } from '@angular/core';
import { Constants, ProjectUtils } from '../../../shared';
import { BaseService } from '../../../../core/base/base.service';

@Injectable()
export class SalesByRegionService extends BaseService {

    getServiceURL(): string {
        return Constants.TK_SALES_BY_REGION_SEARCH_REPORT_URL;
    }
    addColumnsOption(dtOptions: any) {

        dtOptions['columns'] = [
            {
                'data': 'region',
                'title': 'Region'
            },
            {
                'data': 'journal',
                'title': 'Product Name'
            },
            {
                'data': 'shipCustomerID',
                'title': 'Ship Customer ID'
            },
            {
                'data': 'shiptoCustomerName',
                'title': 'Ship to Customer Name'
            },
            {
                'data': 'shiptoAddress1',
                'title': 'Ship To Address 1'
            },
            {
                'data': 'shiptoAddress2',
                'title': 'Ship To Address 2'
            },
            {
                'data': 'shiptoAddress3',
                'title': 'Ship To Address 3'
            },
            {
                'data': 'shiptoDepartment',
                'title': 'Ship To Department'
            },
            {
                'data': 'shiptoCompany',
                'title': 'Ship to Company'
            },
            {
                'data': 'shiptoCounty',
                'title': 'Ship to County'
            },
            {
                'data': 'shiptoCity',
                'title': 'Ship To City'
            },
            {
                'data': 'shiptoCountry',
                'title': 'Ship To Country'
            },
            {
                'data': 'shiptoZip',
                'title': 'Ship To Zip'
            },
            {
                'data': 'subscriptionCategory',
                'title': 'Subscription Category'
            },
            {
                'data': 'orderCategory',
                'title': 'Order Category'
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
                'data': 'paymentType',
                'title': 'Payment Type'
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
                'title': 'Net Base Amount',
                'render': ProjectUtils.toFixedIfNumber
            },
            {
                'data': 'payCurrencyAmount',
                'title': 'Pay Currency Amount ',
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
            }
        ];
    }
}

