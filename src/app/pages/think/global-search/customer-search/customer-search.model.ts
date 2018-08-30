import { BaseSearchModel } from '../../../../core/base/base-search.model';

export class CustomerSearchModel extends BaseSearchModel {
    cust_id: any;
    dept_id: any;
    f_name: any;
    l_name: any;
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
