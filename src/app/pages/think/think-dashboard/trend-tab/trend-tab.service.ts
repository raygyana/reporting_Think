import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Constants } from '../../../shared/constant';
import { BaseService } from '../../../../core/base/base.service';

@Injectable()
export class TrendTabService extends BaseService {

	getServiceURL(): string {
		return Constants.TK_TREND_TAB_URL;
	}

}
