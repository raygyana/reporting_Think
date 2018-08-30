import { Injectable } from '@angular/core';
import { Constants } from '../../../shared/constant';
import { BaseService } from '../../../../core/base/base.service';

@Injectable()
export class RMGRProductInvListService extends BaseService {

    getServiceURL(): string {
        return Constants.TK_RMGR_PRODUCT_INV_LIST_SEARCH_URL;
    }

    addColumnsOption(dtOptions: any) {
        dtOptions['columns'] = [
            {
                'data': 'profit_center_description',
                'title': 'Profit Center'
            },
            {
                'data': 'inven_code',
                'title': 'Inventory Code'
            },
            {
                'data': 'promotion_expire',
                'title': 'Promotion Expire'
            },
            {
                'data': 'active_or_expired',
                'title': 'Active/Expired'
            },
            {
                'data': 'inventory_act_qty',
                'title': 'Shipped'
            },
            {
                'data': 'total_available',
                'title': 'Total Available'
            }
        ];
    }
}

