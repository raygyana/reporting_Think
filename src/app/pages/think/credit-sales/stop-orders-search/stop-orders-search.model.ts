import { BaseSearchModel } from '../../../../core/base/base-search.model';

export class StopOrdersSearchModel extends BaseSearchModel {
    term: any;

    constructor() {
        super();
        this.term = '';
    }

}
