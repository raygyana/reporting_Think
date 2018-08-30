import { BaseSearchModel } from '../../../core/base/base-search.model';

export class SettingsModel extends BaseSearchModel {

      limit: any;
      client: any;
      super() {

            this.client = 'ucp';
            this.limit = '1000';

      }

}
