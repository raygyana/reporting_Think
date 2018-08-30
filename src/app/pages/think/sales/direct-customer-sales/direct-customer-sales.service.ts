import { Injectable } from '@angular/core';
import { Constants } from '../../../shared/constant';
import { BaseService } from '../../../../core/base/base.service';
import { ProjectUtils } from '../../../shared/project-utils';
import { HttpService } from '../../../../core/http.service';

@Injectable()
export class DirectCustomerSalesListService extends BaseService {
    constructor(
        protected httpService: HttpService
    ) {
        super(httpService)
    }

    getServiceURL(): string {
        return Constants.TK_SALES_DIRECT_CUSTOMER_SEARCH_REPORT_URL;
    }

    addColumnsOption(dtOptions: any) {

        ProjectUtils.dtDisableSorting(dtOptions, 0, 1, 2, 3, 4);

        dtOptions['columns'] = [
            {
                'data': 'ocDescription',
                'title': 'Product Name'
            },
            {
                'data': 'region',
                'title': 'Region'
            },
            {
                'data': 'subDescription',
                'title': 'Subscription'
            },
            {
                'data': 'countOrderhdrId',
                'title': 'Order Count',
                render: ProjectUtils.toFixedIfNumberRev
            },
            {
                'data': 'sumNetBaseAmount',
                'title': 'Order Revenue',
                'render': ProjectUtils.toFixedIfNumber
            }
            // {
            //     'data': 'orderDate',
            //     'title': 'Order Date',
            //     'type': 'datetime',
            //     'render': this.dateFormInDatatable
            // }
        ];
    }
}
