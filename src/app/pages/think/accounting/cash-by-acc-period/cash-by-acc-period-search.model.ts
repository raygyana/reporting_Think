import { BaseSearchModel } from '../../../../core/base/base-search.model';

export class CashByAccPeriodSearchModel extends BaseSearchModel {
    profitCentre: any;

    constructor() {
        super();
        this.profitCentre = '';
    }
}
