import { Injectable } from '@angular/core';
import { Constants } from '../../../shared/constant';
import { BaseService } from '../../../../core/base/base.service';

//const salesByCatJSON = 'assets/json/salesbycat.json';

@Injectable()
export class SalesByCategoryService extends BaseService {

    getServiceURL(): string {
        return Constants.TK_SALE_CATEGORY_SEARCH_REPORT_URL;
    }

    addColumnsOption(dtOptions: any) {
        dtOptions['columns'] = [
            {
                'data': 'subscriptionCategory',
                'title': 'Subscription Category'
            }, {
                'data': 'orderNo',
                'title': 'Order No.'
            }, {
                'data': 'endUserCustomerId',
                'title': 'End User Customer ID'
            }, {
                'data': 'endUserCustomerName',
                'title': 'End User Customer Name'
            }, {
                'data': 'endUserAddress1',
                'title': 'End User Address1'
            }, {
                'data': 'endUserAddress2',
                'title': 'End User Address2'
            }, {
                'data': 'endUserAddress3',
                'title': 'End User Address3'
            }, {
                'data': 'endUserDepartment',
                'title': 'End User Department'
            }, {
                'data': 'endUserCompany',
                'title': 'End User Company'
            }, {
                'data': 'endUserCity',
                'title': 'End User City'
            }, {
                'data': 'endUserCounty',
                'title': 'End User County'
            }, {
                'data': 'endUserCountry',
                'title': 'End User Country'
            }, {
                'data': 'shipToCustId',
                'title': 'Ship to Cust Id'
            }, {
                'data': 'shipToCustName',
                'title': 'Ship to Cust Name'
            }, {
                'data': 'shipTocompany',
                'title': 'Ship to company'
            }, {
                'data': 'shipToState',
                'title': 'Ship to State'
            }, {
                'data': 'shipToCountry',
                'title': 'Ship to Country'
            }, {
                'data': 'billToCustId',
                'title': 'Bill to Cust Id'
            }, {
                'data': 'billToCustName',
                'title': 'Bill to Cust Name'
            }, {
                'data': 'billToCompany',
                'title': 'Bill to Company'
            }, {
                'data': 'billToState',
                'title': 'Bill to State'
            }, {
                'data': 'billToCountry',
                'title': 'Bill to Country'
            }, {
                'data': 'taxCode',
                'title': 'Tax Code'
            }, {
                'data': 'orderDate',
                'title': 'Order Date',
                'type': 'datetime',
                'render': this.dateFormInDatatable
            }, {
                'data': 'journal',
                'title': 'Product Name'
            }, {
                'data': 'revenueMethod',
                'title': 'Revenue Method'
            }, {
                'data': 'startDate',
                'title': 'Start Date',
                'type': 'datetime',
                'render': this.dateFormInDatatable
            }, {
                'data': 'endDate',
                'title': 'End Date',
                'type': 'datetime',
                'render': this.dateFormInDatatable
            }, {
                'data': 'paymentType',
                'title': 'Payment Type'
            }, {
                'data': 'currency',
                'title': 'Currency'
            }, {
                'data': 'orderAmount',
                'title': 'Order Amount'
            }, {
                'data': 'netBaseAmount',
                'title': 'Net Base Amount'
            }, {
                'data': 'paymentAmount',
                'title': 'Payment Amount'
            }, {
                'data': 'paymentBaseAmount',
                'title': 'Payment Base Amount'
            }, {
                'data': 'qty',
                'title': 'Qty'
            }
        ];
    }

}
