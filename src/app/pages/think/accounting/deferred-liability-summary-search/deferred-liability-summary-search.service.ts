import { Injectable } from '@angular/core';
import { Constants } from '../../../shared/constant';
import { BaseService } from '../../../../core/base/base.service';
import { ProjectUtils } from '../../../shared/project-utils';

@Injectable()
export class DeferredLiabilitySummarySearchService extends BaseService {

    getServiceURL(): string {
        return Constants.TK_DEFERRED_LIABILITY_URL;
    }
    addColumnsOption(dtOptions: any) {

        ProjectUtils.dtDisableSorting(dtOptions, 0, 1, 2, 3, 4, 5);

        dtOptions['columns'] = [
            {
                'data': 'description',
                'title': 'Subscription or Product Name'
            },
            {
                'data': 'credit_liability',
                'title': 'Credit Liability',
            }, {
                'data': 'cash_liability',
                'title': 'Cash Liability',
            }, {
                'data': 'total_liability',
                'title': 'Total Liability',
            },

            {
                'data': 'total_remaining_copies',
                'title': 'Total Remaining # Copies',
            }, {
                'data': 'average_liability_copy',
                'title': 'Average Liability/Copy',
            }
        ];
    }

}
