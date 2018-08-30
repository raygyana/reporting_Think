import { Injectable } from '@angular/core';
import { Constants, ProjectUtils } from '../../../shared';
import { BaseService } from '../../../../core/base/base.service';

@Injectable()
export class SalesByMonthListService extends BaseService {


    getServiceURL(): string {
        return Constants.TK_SALES_BY_MONTH_SEARCH_REPORT_URL;
    }


    addColumnsOption(dtOptions: any) {
        dtOptions['columns'] = [
            {
                'data': 'year',
                'title': 'Year'
            },
            {
                'data': 'month',
                'title': 'Month'
            },
            {
                'data': 'journal',
                'title': 'Product Name'
            },
            {
                'data': 'subsCategory',
                'title': 'Subscription Category '
            },
            {
                'data': 'orderCategory',
                'title': 'Order Category'
            },
            {
                'data': 'baseCurrency',
                'title': 'Base Currency',
                'render': ProjectUtils.toFixedIfNumber
            },
            {
                'data': 'baseAmount',
                'title': 'Base Amount',
                'render': ProjectUtils.toFixedIfNumber
            }
        ];
    }
}
