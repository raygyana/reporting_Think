import {BaseSearchModel} from '../../../../core/base/base-search.model';

export class AgencySearchModel extends BaseSearchModel {
    cust_id: any;
    agency_name: any;
    email_address: any;
    old_cust_id: any;
    region: any;
    country: any;
    city: any;
    zip: any;

    constructor() {
        super();
        this.region = '';
        this.country = '';
    }
}
