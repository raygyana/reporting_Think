import { BaseSearchModel } from '../../../../core/base/base-search.model';

export class CreditPaymentCollectionSearchModel extends BaseSearchModel{
	terms:any;

    constructor() {
        super();
        this.terms = '';
    }
    
}
