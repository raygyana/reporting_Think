import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Constants } from '../../../shared/constant';
import { BaseService } from '../../../../core/base/base.service';

@Injectable()
export class StatsTabService extends BaseService {

	getServiceURL(): string {
		return Constants.TK_STATS_TAB_URL;
	}

}
