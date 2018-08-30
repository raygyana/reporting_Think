
import { Injectable } from '@angular/core';
import { Constants } from '../../../shared/constant';
import { BaseService } from '../../../../core/base/base.service';
import { ProjectUtils } from '../../../shared/project-utils';

@Injectable()
export class MonthlyDeferedRevenueService extends BaseService {

    getServiceURL(): string {
        return Constants.TK_MONTHLY_DEFERED_REVENUE_URL;
    }

    addColumnsOption(dtOptions: any) {
        ProjectUtils.dtDisableSorting(dtOptions, 0, 1, 2);
        dtOptions['columns'] = [
            {
                'data': 'profit_center',
                'title': 'Profit Centre'
            }, {
                'data': 'description',
                'title': 'Description'
            }, {
                'data': 'month_name',
                'title': 'Month Name'
            }, {
                'data': 'liability_amount',
                'title': 'Liability Amount'
            },
        ];
    }
}