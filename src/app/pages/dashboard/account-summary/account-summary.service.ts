import { Injectable } from '@angular/core';
import { Constants } from '../../shared/constant';
import { BaseService } from '../../../core/base/base.service';

@Injectable()
export class AccountSummaryService extends BaseService {

    getServiceURL(): string {
        return '';
        // return Constants.ACCOUNTSSUMMARY_URL;
    }

}
