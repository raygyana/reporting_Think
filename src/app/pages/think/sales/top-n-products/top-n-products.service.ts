import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Constants, ProjectUtils } from '../../../shared';
import { BaseService } from '../../../../core/base/base.service';

@Injectable()
export class TopNProductsService extends BaseService {

    getServiceURL(): string {
        return Constants.TK_SALES_TOP_N_PRODUCTS_REPORT_URL;
    }

    addColumnsOption(dtOptions: any) {
        dtOptions['columns'] = [
            {
                'data': 'serialNumber',
                'title': 'Serial No.'
            }, {
                'data': 'description',
                'title': 'Description'
            }, {
                'data': 'currency',
                'title': 'Currency'
            }, {
                'data': 'revenueAmount',
                'title': 'Sales Amount',
                'render': ProjectUtils.toFixedIfNumber
            }
        ];
    }
}
