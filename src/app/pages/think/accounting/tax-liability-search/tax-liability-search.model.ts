import { BaseSearchModel } from '../../../../core/base/base-search.model';

export class TaxLiabilitySearchModel extends BaseSearchModel {
    profitCentre: any;

    constructor() {
        super();
        this.profitCentre = '';
    }
}
