import { Injectable } from '@angular/core';
import { Constants } from '../../../shared/constant';
import { BaseService } from '../../../../core/base/base.service';
import { ProjectUtils } from '../../../shared/project-utils';
import { HttpService } from '../../../../core/http.service';

@Injectable()
export class CashByAccPeriodSearchService extends BaseService {

    constructor(
        protected httpService: HttpService
    ) {
        super(httpService)
    }

    getServiceURL(): string {
        return Constants.TK_CASH_BY_ACC_PERIOD_SEARCH_URL;
    }
    addColumnsOption(dtOptions: any) {
        ProjectUtils.dtDisableSorting(dtOptions, 0, 1, 2, 3, 4, 5, 6, 7);
        dtOptions['columns'] = [
            {
                'data': 'order_item_seq',
                'title': 'Order Item-Seq'
            }, {
                'data': 'order_control',
                'title': 'Journal'
            }, {
                'data': 'journal_date',
                'title': 'Journal Date',
                'type': 'datetime',
                'render': this.dateFormInDatatable
            }, {
                'data': 'net',
                'title': 'Net'
            }, {
                'data': 'tax',
                'title': 'Tax'
            }, {
                'data': 'delivery',
                'title': 'Delivery'
            }, {
                'data': 'commission',
                'title': 'Commission'
            }, {
                'data': 'total',
                'title': 'Total',
                'render': ProjectUtils.toFixedIfNumber
            }

        ];
    }

}

