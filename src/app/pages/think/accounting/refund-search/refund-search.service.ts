import { Injectable } from '@angular/core';
import { Constants } from '../../../shared/constant';
import { BaseService } from '../../../../core/base/base.service';
import { ProjectUtils } from '../../../shared/project-utils';
import { HttpService } from '../../../../core/http.service';

@Injectable()
export class RefundSearchService extends BaseService {
    constructor(
        protected httpService: HttpService
    ) {
        super(httpService)
    }

    getServiceURL(): string {
        return Constants.TK_REFUND_SEARCH_URL;
    }

    addColumnsOption(dtOptions: any) {
        ProjectUtils.dtDisableSorting(dtOptions, 0, 1, 2, 3, 4, 5, 6, 7);
        dtOptions['columns'] = [
            {
                'data': 'billToCustomerID',
                'title': 'Bill to Customer ID'
            },
            {
                'data': 'endUserCustomerID',
                'title': 'End User Customer ID'
            },
            {
                'data': 'journal',
                'title': 'Product Name'
            },
            {
                'data': 'endUserCustomerName',
                'title': ' End User Customer Name'
            },
            {
                'data': 'orderNumber',
                'title': 'Order Number'
            },
            {
                'data': 'orderDate',
                'title': 'Order Date',
                'type': 'datetime',
                'render': this.dateFormInDatatable
            },
            {
                'data': 'amount',
                'title': 'Amount'
            },
            {
                'data': 'endUserCustomerAddress',
                'title': 'End User Customer Address'
            }
        ];
    }
}
