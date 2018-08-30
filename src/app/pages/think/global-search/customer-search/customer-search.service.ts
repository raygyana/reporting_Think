import { Injectable } from '@angular/core';
import { Constants, ProjectUtils } from '../../../shared';
import { BaseService } from '../../../../core/base/base.service';

@Injectable()
export class CustomerListService extends BaseService {

    getServiceURL(): string {
        return Constants.TK_CUSTOMER_LIST_URL;
    }

    getProductCustomerList(body: string): any {
        return this.getDataWithURL(Constants.TK_CUSTOMER_LIST_PRODUCT_URL, body);
    }
    addColumnsOption(dtOptions: any) {

        //  this.dtOptionWithCustumMessageOnTop(dtOptions, 'Show', `Right click on a particular customer row for their Order Sales Summary and History `);

        dtOptions['columns'] = [
            {
                'data': 'customer_id',
                'title': 'Customer ID'
            }, {
                'data': 'title',
                'title': 'Title'
            }, {
                'data': 'fname',
                'title': 'First Name'
            }, {
                'data': 'lname',
                'title': 'Last Name'
            }, {
                'data': 'email',
                'title': 'Email ID'
            }, {
                'data': 'department',
                'title': 'Department'
            }, {
                'data': 'company',
                'title': 'Company'
            }, {
                'data': 'city',
                'title': 'City'
            }, {
                'data': 'state',
                'title': 'State'
            }, {
                'data': 'zip',
                'title': 'Zip'
            }, {
                'data': 'country',
                'title': 'Country'
            }, {
                'data': 'region',
                'title': 'Region'
            }, {
                'data': 'old_customer_id',
                'title': 'Old Customer ID'
            }, {
                'data': 'tax_id_number',
                'title': 'Vat ID'
            }
        ];
    }

    addColumnsOptionPL(dtOptions: any) {
        dtOptions['columns'] = [
            {
                'data': 'customer_id',
                'title': 'Customer ID'
            }, {
                'data': 'title',
                'title': 'Title'
            }, {
                'data': 'fname',
                'title': 'First Name'
            }, {
                'data': 'lname',
                'title': 'Last Name'
            }, {
                'data': 'department',
                'title': 'Department'
            }, {
                'data': 'company',
                'title': 'Company'
            }, {
                'data': 'email',
                'title': 'Email ID'
            }, {
                'data': 'city',
                'title': 'City'
            }, {
                'data': 'zip',
                'title': 'Zip'
            }, {
                'data': 'old_customer_id',
                'title': 'Old Customer ID'
            }, {
                'data': 'tax_id_number',
                'title': 'Vat ID'
            }

        ];
    }




}

