import { Injectable } from '@angular/core';
import { Constants } from '../../../shared/constant';
import { BaseService } from '../../../../core/base/base.service';
import { ProjectUtils } from '../../../shared/project-utils';
import { HttpService } from '../../../../core/http.service';

@Injectable()
export class CustomerOrderDetailsService extends BaseService {

    constructor(
        protected httpService: HttpService
    ) {
        super(httpService)
    }

    getServiceURL(): string {
        return Constants.TK_CUSTOMER_ORDER_DETAIL_REPORT_URL;
    }


    addColumnsOption(dtOptions: any) {
        dtOptions['columns'] = [
            {
                'data': 'endUserCustomerId',
                'title': 'End User Customer_Id'
            },
            {
                'data': 'endUserOldCustomerId',
                'title': 'End User Old Customer Id'
            },
            {
                'data': 'endUserCustomerName',
                'title': 'End User  Customer Name'
            },
            {
                'data': 'endUserAddress1',
                'title': 'End User  address1'
            },
            {
                'data': 'endUserAddress2',
                'title': 'End User address2'
            },
            {
                'data': 'endUserAddress3',
                'title': 'End User address3'
            },
            {
                'data': 'endUserDepartment',
                'title': 'End User department'
            },
            {
                'data': 'endUserCompany',
                'title': 'End User company'
            },
            {
                'data': 'endUserCity',
                'title': 'End User city'
            },
            {
                'data': 'endUserState',
                'title': 'End User state'
            },
            {
                'data': 'endUserCountry',
                'title': 'End User country'
            },
            {
                'data': 'shipToOldCustId',
                'title': 'Ship To Old Cust Id'
            },
            {
                'data': 'shipToCustId',
                'title': 'Ship To Cust Id'
            },
            {
                'data': 'shipToName',
                'title': 'Ship To Name'
            },
            {
                'data': 'shipToDepartment',
                'title': 'Ship To Department'
            },
            {
                'data': 'shipToCompany',
                'title': 'Ship To Company'
            },

            {
                'data': 'shipToAddress1',
                'title': 'Ship To Address1'
            },
            {
                'data': 'shipToAddress2',
                'title': 'Ship To Address2'
            },
            {
                'data': 'shipToState',
                'title': 'Ship To State'
            },
            {
                'data': 'shipToCountry',
                'title': 'Ship To Country'
            },
            {
                'data': 'shipToAddress3',
                'title': 'Ship To Address3'
            },
            {
                'data': 'shipToCity',
                'title': 'Ship To City'
            },
            {
                'data': 'billToOldCustId',
                'title': 'Bill To Old Customer Id'
            },
            {
                'data': 'billToCustId',
                'title': 'Bill To Customer Id'
            },
            {
                'data': 'billToName',
                'title': 'Bill To Name'
            },
            {
                'data': 'billToDepartment',
                'title': 'Bill To Department'
            },
            {
                'data': 'billToCompany',
                'title': 'Bill To Company'
            },
            {
                'data': 'billToAddress1',
                'title': 'Bill To Address1'
            },
            {
                'data': 'billToAddress2',
                'title': 'Bill To Address2'
            },
            {
                'data': 'billToAddress3',
                'title': 'Bill To Address3'
            },
            {
                'data': 'billToCity',
                'title': 'Bill To City'
            },
            {
                'data': 'billToState',
                'title': 'Bill To State'
            },
            {
                'data': 'billToCountry',
                'title': 'Bill To Country'
            },
            {
                'data': 'orderNo',
                'title': 'Order No.'
            },
            {
                'data': 'journalName',
                'title': 'Product Name'
            },
            {
                'data': 'orderDate',
                'title': 'Order Date',
                'type': 'datetime',
                'render': this.dateFormateMMDDYYYY
            },
            {
                'data': 'startDate',
                'title': 'Start Date',
            },
            {
                'data': 'endDate',
                'title': 'End Date',
            },
            {
                'data': 'currency',
                'title': 'Currency'
            },
            {
                'data': 'localOrderAmount',
                'title': 'Local Order Amount',
                'render': this.decimaltwoplace
            },
            {
                'data': 'baseOrderAmount',
                'title': 'Base Order Amount',
                'render': this.decimaltwoplace
            },
            {
                'data': 'localItemAmount',
                'title': 'Local Item Amount',
                'render': this.decimaltwoplace
            },
            {
                'data': 'baseItemamount',
                'title': 'Base Item Amount',
                'render': this.decimaltwoplace
            },
            {
                'data': 'quantity',
                'title': 'Quantity'
            }

        ];
    }

}
