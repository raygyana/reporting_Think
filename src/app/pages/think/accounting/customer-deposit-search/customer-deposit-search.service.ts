import { Injectable } from '@angular/core';
import { Constants } from '../../../shared/constant';
import { BaseService } from '../../../../core/base/base.service';
import { ProjectUtils } from '../../../shared/project-utils';
import { HttpService } from '../../../../core/http.service';


@Injectable()
export class CustomerDepositSearchService extends BaseService {

    constructor(
        protected httpService: HttpService
    ) {
        super(httpService)
    }

    getServiceURL(): string {
        return Constants.TK_CUSTOMER_DEPOSIT_SEARCH_URL;
    }
    addColumnsOption(dtOptions: any) {

        ProjectUtils.dtDisableSorting(dtOptions, 0, 1, 2, 3, 4, 5, 6);
        dtOptions['columns'] =
            [
                {
                    'data': 'currency',
                    'title': 'Currency'
                },
                {
                    'data': 'description',
                    'title': 'Description'
                },
                {
                    'data': 'creation_date',
                    'title': 'Creation Date',
                    'type': 'datetime',
                    'render': this.dateFormateMMDDYYYY
                },
                {
                    'data': 'customer_id',
                    'title': 'Customer Id'
                },
                {
                    'data': 'name',
                    'title': 'Customer Name'
                },
                {
                    'data': 'payment_type',
                    'title': 'Payment Type'
                },
                {
                    'data': 'payment_amount',
                    'title': ' Payment Amount',
                    'render': ProjectUtils.toFixedIfNumber
                },
                {
                    'data': 'total_cust_dep_amount',
                    'title': ' Cust. Dep Amount',
                    'render': ProjectUtils.toFixedIfNumber
                },
                {
                    'data': 'user_code',
                    'title': 'User Code'
                }
            ];
    }

}

