import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Constants } from '../../../shared/constant';
import { BaseService } from '../../../../core/base/base.service';

@Injectable()
export class SalesTabService extends BaseService {

    getServiceURL(): string {
        return Constants.TK_SALES_TAB_URL;
    }

}
