import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Constants, ProjectUtils } from '../../../shared';
import { BaseService } from '../../../../core/base/base.service';

@Injectable()
export class TopNCustomersService extends BaseService {

    getServiceURL(): string {
        return Constants.TK_SALES_TOP_N_CUSTOMERS_REPORT_URL;
    }

    addColumnsOption(dtOptions: any) {

        dtOptions['columns'] = [
            {
                'data': 'serialNumber',
                'title': 'Serial No'
            }, {
                'data': 'customerId',
                'title': 'Customer ID',
                visible: this.sessionObject.clientSettings.topNCustomer.customerId.visible
            }, /*{
                'data': 'startDate',
                'title': 'Start Date',
                'type': 'datetime',
                'render': this.dateFormInDatatable
            }, {
                'data': 'endDate',
                'title': 'End Date',
                'type': 'datetime',
                'render': this.dateFormInDatatable
            } */ {
                'data': 'currency',
                'title': 'Currency'
            }, {
                'data': 'revenueAmount',
                'title': 'Revenue Amount',
                render: ProjectUtils.toFixedIfNumber
            }, {
                'data': 'category',
                'title': 'Category'
            }, {
                'data': 'firstName',
                'title': 'First Name'
            }, {
                'data': 'lastName',
                'title': 'Last Name'
            }, {
                'data': 'company',
                'title': 'Company'
            }, {
                'data': 'department',
                'title': 'Department'
            }, {
                'data': 'address1',
                'title': 'Address1'
            }, {
                'data': 'address2',
                'title': 'Address2'
            }, {
                'data': 'address3',
                'title': 'Address3'
            }, {
                'data': 'state',
                'title': 'State'
            }, {
                'data': 'city',
                'title': 'City'
            }, {
                'data': 'zip',
                'title': 'Zip'
            }
        ];
    }
}
