import { BaseSearchModel } from '../../../../core/base/base-search.model';

export class GeneratedSalesInvoicesSearchModel extends BaseSearchModel{
	terms:any;

    constructor() {
        super();
        this.terms = '';
    }
    
}
