import { Injectable } from '@angular/core';
import { Constants } from '../../../shared/constant';
import { BaseService } from '../../../../core/base/base.service';
import { ProjectUtils } from '../../../shared/project-utils';
import { HttpService } from '../../../../core/http.service';

@Injectable()
export class EarnedDeferredIncomeSearchService extends BaseService {

    constructor(
        protected httpService: HttpService
    ) {
        super(httpService)
    }

    getServiceURL(): string {
        return Constants.TK_EARNED_DEFFERED_INCOME_URL;
    }
    addColumnsOption(dtOptions: any) {
        ProjectUtils.dtDisableSorting(dtOptions, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9);

        dtOptions['columns'] = [
            {
                'data': 'profit_center',
                'title': 'Profit Center'
            }, {
                'data': 'oc_description',
                'title': 'Product Name'
            }, {
                'data': 'orderhdr_id',
                'title': 'Order Number'
            }, {
                'data': 'order_date',
                'title': 'Order Date',
                'type': 'datetime',
                'render': this.dateFormInDatatable
            }, {
                'data': 'start_date',
                'title': 'Subscription Start Date',
                'type': 'datetime',
                'render': this.dateFormInDatatable
            }, {
                'data': 'subscription_end_date',
                'title': 'Subscription End Date',
                'type': 'datetime',
                'render': this.dateFormInDatatable
            }, {
                'data': 'end_date',
                'title': 'Earnings Date',
                'type': 'datetime',
                'render': this.dateFormInDatatable
            }, {
                'data': 'start_vol_issue',
                'title': 'Start Volume Issue Number'
            }, {
                'data': 'end_vol_issue',
                'title': 'End  Volume Issue Number'
            }, {
                'data': 'revenue_method',
                'title': 'Revenue Method '
            }, {
                'data': 'deferred_liability',
                'title': 'Deferred Liability'
            }, {
                'data': 'earned_revenue',
                'title': 'Earned Revenue'
            }, {
                'data': 'total_liability',
                'title': 'Total Order Amount'
            },
            // {
            //     'data': '',
            //     'title': 'Total Order Amt'
            // },
            {
                'data': 'qty_ordered',
                'title': 'QTY Ordered'
            }, {
                'data': 'qty_earned',
                'title': 'QTY Earned'
            }, {
                'data': 'qty_deferred',
                'title': 'QTY Deferred'
            }

        ];
    }

}
