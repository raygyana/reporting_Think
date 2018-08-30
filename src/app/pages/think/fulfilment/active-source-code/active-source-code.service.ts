import { Injectable } from '@angular/core';
import { Constants } from '../../../shared/constant';
import { BaseService } from '../../../../core/base/base.service';

@Injectable()
export class ActiveSourceCodeService extends BaseService {

    getServiceURL(): string {
        return Constants.TK_ACTIVE_SOURCE_CODE_REPORT_URL;
    }



    addColumnsOption(dtOptions: any) {
        dtOptions['columns'] = [
            {
                'data': 'id',
                'title': 'ID'
            }, {
                'data': 'sourceCode',
                'title': 'Source Code'
            }, {
                'data': 'format',
                'title': 'Format'
            }, {
                'data': 'active',
                'title': 'Active'
            }, {
                'data': 'description',
                'title': 'Description'
            }
        ];
    }
}

