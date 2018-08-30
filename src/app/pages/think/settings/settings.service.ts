import { Injectable } from '@angular/core';
import { Constants } from '../../shared/constant';
import { BaseService } from '../../../core/base/base.service';

const salesByCatJSON = 'assets/json/salesbycat.json';

@Injectable()
export class SettingsService extends BaseService {


    getServiceURL(): string {
        return '';
    }

    // loadData(): any {
    //    return this.loadJSONData(salesByCatJSON);
    // }


}
