import { BaseSearchModel } from '../../../../core/base/base-search.model';

export class OverduePaymentSearchModel extends BaseSearchModel{
	terms:any;

    constructor() {
        super();
        this.terms = '';
    }
    
}
