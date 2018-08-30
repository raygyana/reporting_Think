import { Injectable } from '@angular/core';
import { Constants } from '../../../shared/constant';
import { BaseService } from '../../../../core/base/base.service';

@Injectable()
export class GraceCopySetupService extends BaseService {

    getServiceURL(): string {
        return Constants.TK_GRACECOPY_SETUP_REPORT_URL;
    }

    addColumnsOption(dtOptions: any) {
        dtOptions['columns'] = [
            {
                'data': 'ocDescription',
                'title': 'Product Name'
            },
            {
                'data': 'graceQty',
                'title': 'Grace Quantity'
            }
        ];
    }

}

