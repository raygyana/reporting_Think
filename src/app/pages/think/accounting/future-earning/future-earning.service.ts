import { Injectable } from '@angular/core';
import { Constants } from '../../../shared/constant';
import { BaseService } from '../../../../core/base/base.service';
import { ProjectUtils } from '../../../shared/project-utils';
import { HttpService } from '../../../../core/http.service';

@Injectable()
export class FutureEarningService extends BaseService {
    data: any;
    constructor(
        protected httpService: HttpService
    ) {
        super(httpService)
    }

    getServiceURL(): string {
        return Constants.TK_FUTURE_EARNING_URL;
    }
    getProductData(): any {
        // let body = '';
        return this.getDataWithURL(Constants.TK_ACC_PRODUCT_LIST_URL, '');
    }


    addColumnsOption(dtOptions: any) {
        dtOptions['columns'] = [
            {
                'data': 'profitCenterName',
                'title': 'Profit Center'
            }, {
                'data': 'journalName',
                'title': 'Product Name'
            }, {
                'data': 'customerId',
                'title': 'Customer Id'
            }, {
                'data': 'customerName',
                'title': 'Customer Name'
            }, {
                'data': 'companyName',
                'title': 'Company Name'
            }, {
                'data': 'orderId',
                'title': 'Order Number'
            }, {
                'data': 'orderDate',
                'title': 'Order Date',
                'type': 'datetime',
                'render': this.dateFormInDatatable
            }, {
                'data': 'month',
                'title': 'Earning Month'
            }, {
                'data': 'subscriptionStartDate',
                'title': 'Subscription Start Date',
                'type': 'datetime',
                'render': this.dateFormInDatatable
            }, {
                'data': 'subscriptionStopDate',
                'title': 'Subscription End Date',
                'type': 'datetime',
                'render': this.dateFormInDatatable
            }, {
                'data': 'issueId',
                'title': 'Volume Issue Number'
            }, {
                'data': 'revenueMethod',
                'title': 'Revenue Method'
            }, {
                'data': 'deferredAmount',
                'title': 'Deferred Liability'
            }, {
                'data': 'currentAmount',
                'title': 'Current Month Earning'
            }, {
                'data': 'totalDeferred',
                'title': 'Total Deferred Liability'
            }, {
                'data': 'totalEarned',
                'title': 'Total Earned Revenue'
            }
        ];
    }
}
