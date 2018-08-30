import { BaseSearchModel } from '../../../../core/base/base-search.model';

export class BadDebtorsSearchModel extends BaseSearchModel {
    terms: any;

    constructor() {
        super();
        this.terms = '';
    }

}
