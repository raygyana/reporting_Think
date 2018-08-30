import { BaseSearchModel } from '../../../../core/base/base-search.model';

export class AgedArCustomerWiseSearchModel extends BaseSearchModel {
    cashorcredit: any;
    over_due: any;
    detail_or_summary: any;

    constructor() {
        super();
        this.cashorcredit = '';
        this.over_due = '';
        this.detail_or_summary = '';
    }
}



export const keysToSum = ['amount_due', 'nintyone_to_onetwenty_days', 'oneeightyone_to_twoseventy_days', 'onetwentyone_to_oneeighty_days', 'original_order_amount', 'over_threesixty_days', 'overdue_days', 'sixtyone_to_ninty_days', 'thirtyone_to_sixty_days', 'turnover_last_year', 'turnover_this_year', 'twoseventyone_to_threesixty_days', 'zero_to_thirty_days'];
