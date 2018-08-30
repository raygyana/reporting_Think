import { Injectable } from '@angular/core';
import { Constants } from '../../../shared/constant';
import { BaseService } from '../../../../core/base/base.service';
import { ProjectUtils } from '../../../shared/project-utils';

@Injectable()
export class PriceListService extends BaseService {

    getServiceURL(): string {
        return Constants.TK_PRICE_LIST_URL;
    }

    addColumnsOption(dtOptions: any) {
        dtOptions['columns'] = [
            {
                'data': 'priceDescription',
                'title': 'Price Description'
            }, {
                'data': 'year',
                'title': 'Year'
            }, {
                'data': 'allRegion',
                'title': 'All Region',
                'render': ProjectUtils.toFixedIfNumber
            }, {
                'data': 'ukregion',
                'title': 'UK Region',
                'render': ProjectUtils.toFixedIfNumber
            }, {
                'data': 'europRegion',
                'title': 'Europe Region',
                'render': ProjectUtils.toFixedIfNumber
            }, {
                'data': 'row',
                'title': 'ROW',
                'render': ProjectUtils.toFixedIfNumber
            }, {
                'data': 'usregion',
                'title': 'US Region',
                'render': ProjectUtils.toFixedIfNumber
            }
        ];
    }
}
