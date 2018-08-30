import { BaseSearchModel } from '../../../../core/base/base-search.model';

export class DecirWithCancelOrdersSearchModel extends BaseSearchModel {
    product_id: any;
    volume_year: any;
    order_type: any;
    price_category_id: any;
    sale_reps_id: any;

    constructor() {
        super();
        this.product_id = '';
        this.volume_year = '';
        this.order_type = '';
        this.price_category_id = '';
        this.sale_reps_id = '';
    }
}
