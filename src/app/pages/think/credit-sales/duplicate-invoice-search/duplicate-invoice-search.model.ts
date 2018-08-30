import { BaseSearchModel } from '../../../../core/base/base-search.model';

export class DuplicateInvoiceSearchModel extends BaseSearchModel {

    show_item_price: any;
    invoiceNumber: any;

    constructor() {
        super();
        // this.format = '';
        this.show_item_price = '';
        this.invoiceNumber = '';
    }

}
