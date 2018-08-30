import { BaseSearchModel } from '../../../../core/base/base-search.model';

export class DuplicateCreditNoteSearchModel extends BaseSearchModel {
    show_item_price: any;
    creditNoteNo: any;

    constructor() {
        super();
        this.show_item_price = '';
        this.creditNoteNo = '';
    }

}
