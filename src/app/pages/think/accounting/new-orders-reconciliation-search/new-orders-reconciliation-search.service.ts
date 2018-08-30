import { Injectable } from '@angular/core';
import { Constants } from '../../../shared/constant';
import { BaseService } from '../../../../core/base/base.service';
import { ProjectUtils } from '../../../shared/project-utils';
import { HttpService } from '../../../../core/http.service';


@Injectable()
export class NewOrdersReconciliationSearchService extends BaseService {

    constructor(
        protected httpService: HttpService
    ) {
        super(httpService)
    }

    getServiceURL(): string {
        return Constants.TK_NEW_ORDER_RECON_SEARCH_URL;
    }
    addColumnsOption(dtOptions: any) {
        ProjectUtils.dtDisableSorting(dtOptions, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
        dtOptions['columns'] = [
            {
                'data': 'profit_center',
                'title': 'Profit Center'
            },
            {
                'data': 'oc_oc',
                'title': 'Product Name'
            },
            {
                'data': 'order_id',
                'title': 'Order Number '
            },
            {
                'data': 'order_date',
                'title': 'Order Date',
                'type': 'datetime',
                'render': this.dateFormInDatatable
            },
            {
                'data': 'earning_date',
                'title': 'Earning Date',
                'type': 'datetime',
                'render': this.dateFormInDatatable
            },
            {
                'data': 'subscription_start_date',
                'title': 'Subscription Start Date',
                'type': 'datetime',
                'render': this.dateFormInDatatable
            },
            {
                'data': 'subscription_end_date',
                'title': 'Subscription End Date',
                'type': 'datetime',
                'render': this.dateFormInDatatable
            },
            {
                'data': 'start_volume_issue_number',
                'title': 'Start Volume Issue Number'
            },
            {
                'data': 'end_volume_issue_number',
                'title': 'End  Volume Issue Number'
            },
            {
                'data': 'revenue_method',
                'title': 'Revenue Method '
            },
            {
                'data': 'order_status',
                'title': 'Order Status '
            },
            {
                'data': 'new_order',
                'title': 'New Orders '
            },
            {
                'data': 'cash_credit',
                'title': 'Cash/Credit '
            }
        ];
    }
}
