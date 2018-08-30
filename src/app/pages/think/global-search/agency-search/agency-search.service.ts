import { Injectable } from '@angular/core';
import { Constants } from '../../../shared/constant';
import { BaseService } from '../../../../core/base/base.service';
import { ProjectUtils } from '../../../shared';

@Injectable()
export class AgencyListService extends BaseService {

    getServiceURL(): string {
        return Constants.TK_AGENCY_SEARCH_URL;
    }
    getAgencySales(body: string): any {
        return this.getDataWithURL(Constants.TK_AGENCY_SALES_SEARCH_URL, body);
    }
    addColumnsOption(dtOptions: any) {

        // this.dtOptionWithCustumMessageOnTop(dtOptions, 'Show', `Right click on particular agent row for their Order Sale Summary and History`);

        dtOptions['columns'] = [
            {
                'data': 'customer_id',
                'title': 'Agency Customer ID'
            },
            {
                'data': 'agency_code',
                'title': 'Agency Code'
            },
            {
                'data': 'company',
                'title': 'Company Name'
            },
            {
                'data': 'email',
                'title': 'Email Id'
            },
            {
                'data': 'city',
                'title': 'City'
            },
            {
                'data': 'state',
                'title': 'State'
            },
            {
                'data': 'zip',
                'title': 'Zip'
            },
            {
                'data': 'old_customer_id',
                'title': 'Old Customer Id'
            }, {
                'data': 'tax_id_number',
                'title': 'VAT ID'
            },
            {
                'data': 'pub_id',
                'title': 'PublisherID'
            }
        ];
    }
    addColumnsOptionAgencySales(dtOptions: any) {
        dtOptions['columns'] = [
            // {
            //     'data': 'agency_customer_id',
            //     'title': 'Customer ID'
            // },
            // {
            //     'data': 'pub_id',
            //     'title': 'Publisher ID '
            // },
            // {
            //     'data': 'sum_net_base_amount',
            //     'title': 'Net Base Amount'
            // },
            // {
            //     'data': 'year',
            //     'title': 'Year'
            // }
            {
                'data': 'customerID',
                'title': 'Customer ID'
            },
            {
                'data': 'order',
                'title': 'Order'
            }, {
                'data': 'order_Date',
                'title': 'Order Date'
            }, {
                'data': 'orderAmount',
                'title': 'Order Amount',
                'render': ProjectUtils.toFixedIfNumber
            }, {
                'data': 'currency',
                'title': 'Currency'
            },
            {
                'data': 'productCode',
                'title': 'Product Code'
            }, {
                'data': 'productName',
                'title': 'Product Name'
            }, {
                'data': 'expiry_Date',
                'title': 'Expiry Date'
            }, {
                'data': 'subscriptionType',
                'title': 'Subscription Type'
            }, {
                'data': 'region',
                'title': 'Region'
            }, {
                'data': 'country',
                'title': 'Country'
            }, {
                'data': 'agencyName',
                'title': 'Agency Name'
            }, {
                'data': 'sourceCode',
                'title': 'Source Code'
            }, {
                'data': 'shipID',
                'title': 'Ship ID'
            },
            {
                'data': 'invoiceID',
                'title': 'Invoice ID'
            }, {
                'data': 'customerType',
                'title': 'Customer Type'
            }
        ];
    }
}
