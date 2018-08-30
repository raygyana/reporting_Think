import { Injectable } from '@angular/core';
import { Constants, ProjectUtils } from '../../../shared';
import { BaseService } from '../../../../core/base/base.service';

@Injectable()
export class SalesSummaryListService extends BaseService {

    getServiceURL(): string {
        return Constants.TK_SALE_SEARCH_REPORT_URL;
    }

    addColumnsOption(dtOptions: any) {
        dtOptions['columns'] = [
            {
                'data': 'customerID',
                'title': 'Customer ID'
            }, {
                'data': 'order',
                'title': 'Order#'
            }, {
                'data': 'order_Date',
                'title': 'Order Date',
                'type': 'datetime',
                'render': this.dateFormInDatatable
            }, {
                'data': 'productCode',
                'title': 'Product Code'
            },
            {
                'data': 'productName',
                'title': 'Product Name'
            }, {
                'data': 'department',
                'title': 'Department'
            }, {
                'data': 'volumeYear',
                'title': 'Terms'
            }, {
                'data': 'start_Date',
                'title': 'Start Date',
                'type': 'datetime',
                'render': this.dateFormInDatatable
            }, {
                'data': 'expiry_Date',
                'title': 'Expiry Date',
                'type': 'datetime',
                'render': this.dateFormInDatatable
            }, {
                'data': 'subscriptionType',
                'title': 'Subscription Type',
                visible: this.sessionObject.clientSettings.PRODUCT_SEARCH.salesReport.priceType.visible
            }, {
                'data': 'region',
                'title': 'Region'
            }, {
                'data': 'country',
                'title': 'Country'
            }, {
                'data': 'orderAmount',
                'title': 'Order Amount',
                render: ProjectUtils.toFixedIfNumber
            }, {
                'data': 'shipID',
                'title': 'Ship To ID'
            }, {
                'data': 'agencyName',
                'title': 'Agency Name'
            }, {
                'data': 'invoiceID',
                'title': 'Invoice ID'
            }, {
                'data': 'customerType',
                'title': 'Customer type'
            }
        ];
    }
}
