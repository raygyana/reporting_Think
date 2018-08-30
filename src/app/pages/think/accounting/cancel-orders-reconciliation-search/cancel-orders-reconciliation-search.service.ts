import { Injectable } from '@angular/core';
import { Constants } from '../../../shared/constant';
import { BaseService } from '../../../../core/base/base.service';
import { ProjectUtils } from '../../../shared/project-utils';
import { HttpService } from '../../../../core/http.service';

@Injectable()
export class CancelOrdersReconciliationSearchService extends BaseService {

    constructor(
        protected httpService: HttpService
    ) {
        super(httpService)
    }

    getServiceURL(): string {
        return Constants.TK_CANCEL_ORDER_RECON_SEARCH_URL;
    }
    addColumnsOption(dtOptions: any) {
        ProjectUtils.dtDisableSorting(dtOptions, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
        dtOptions['columns'] = [
            {
                'data': 'profitCenter',
                'title': 'Profit Center'
            }, {
                'data': 'journal',
                'title': 'Journal'

            }, {
                'data': 'orderNumber',
                'title': 'Order Number'

            }, {
                'data': 'orderDate',
                'title': 'Order Date',
                'type': 'datetime',
                'render': this.dateFormInDatatable
            }, {
                'data': 'earningsDate',
                'title': 'Earnings Date',
                'type': 'datetime',
                'render': this.dateFormInDatatable
            }, {
                'data': 'subscriptionStartDate',
                'title': 'Subscription Start Date',
                'type': 'datetime',
                'render': this.dateFormInDatatable
            }, {
                'data': 'subscriptionEndDate',
                'title': 'Subscription End Date',
                'type': 'datetime',
                'render': this.dateFormInDatatable
            }, {
                'data': 'subscriptionCancelDate',
                'title': 'Subscription Cancel Date',
                'type': 'datetime',
                'render': this.dateFormInDatatable
            }, {
                'data': 'startVolumeIssueNumber',
                'title': 'Start Volume Issue Number'
            }, {
                'data': 'endVolumeIssueNumber',
                'title': 'End  Volume Issue Number'
            }, {
                'data': 'revenueMethod',
                'title': 'Revenue Method '
            }, {
                'data': 'cancelledOrders',
                'title': 'Cancelled Orders '
            }, {
                'data': 'cashCredit',
                'title': 'Cash/Credit'
            }

        ];
    }

}

