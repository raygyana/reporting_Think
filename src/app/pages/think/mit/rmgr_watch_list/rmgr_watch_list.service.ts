import { Injectable } from '@angular/core';
import { Constants } from '../../../shared/constant';
import { BaseService } from '../../../../core/base/base.service';

@Injectable()
export class RMGRWatchListService extends BaseService {

    getServiceURL(): string {
        return Constants.TK_RMGR_WATCH_LIST_SEARCH_URL;
    }

    addColumnsOption(dtOptions: any) {
        dtOptions['columns'] = [
            {
                'data': 'customer_id',
                'title': 'Customer ID'
            },
            {
                'data': 'name',
                'title': 'Name'
            },
            {
                'data': 'shipto_address_company',
                'title': 'Ship To Company'
            },
            {
                'data': 'shipto_address_address1',
                'title': 'Ship To Address'
            },
            {
                'data': 'ship_to_country',
                'title': 'Ship To Country'
            },
            {
                'data': 'city_zip',
                'title': 'City With Zip'
            },
            {
                'data': 'order_code',
                'title': 'Order Code'
            },
            {
                'data': 'order_date',
                'title': 'Order Date',
                'type': 'datetime',
                'render': this.dateFormateMMDDYYYY
            },
            {
                'data': 'start_issue_ratio',
                'title': 'Start Issue Ratio'
            },
            {
                'data': 'issue_ratio',
                'title': 'Issue Ratio'
            },
            {
                'data': 'order_category_description',
                'title': 'Order Category Description'
            },
            {
                'data': 'order_status',
                'title': 'Order Status'
            },
            {
                'data': 'renewal_status',
                'title': 'Renewal Status'
            }

        ];
    }
}

