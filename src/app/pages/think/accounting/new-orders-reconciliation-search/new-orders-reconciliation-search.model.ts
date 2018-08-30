import { BaseSearchModel } from '../../../../core/base/base-search.model';

export class NewOrdersReconciliationSearchModel extends BaseSearchModel {
    profitCentre: any;
    includeTax: any;

    constructor() {
        super();
        this.includeTax = '';
        this.profitCentre = '';
    }
}
