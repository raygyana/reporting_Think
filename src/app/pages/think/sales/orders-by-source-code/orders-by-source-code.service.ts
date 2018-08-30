import { Injectable } from '@angular/core';
import { Constants, ProjectUtils } from '../../../shared';
import { BaseService } from '../../../../core/base/base.service';

Injectable()
export class OrdersBySourceCodeService extends BaseService {

    getServiceURL(): string {
        return Constants.TK_SALE_SOURCE_CODE_SEARCH_REPORT_URL;
    }

    addColumnsOption2(dtOptions: any) {
        dtOptions['columns'] = [
            {
                'data': 'sourceCode',
                'title': 'Source Code'
            },
            {
                'data': 'customerID',
                'title': 'Customer ID'
            },
            {
                'data': 'customerName',
                'title': ' Customer Name'
            },
            {
                'data': 'address',
                'title': 'Address'
            },
            // {
            //     'data': '',
            //     'title': 'address2'
            // },
            // {
            //     'data': '',
            //     'title': 'address3'
            // },
            {
                'data': 'company',
                'title': 'Company'
            },
            {
                'data': 'department',
                'title': 'Department'
            },
            {
                'data': 'city',
                'title': 'City'
            },
            {
                'data': 'county',
                'title': 'County'
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
                'data': 'journal',
                'title': 'Product Name'
            },
            {
                'data': 'subsCategory',
                'title': 'Subscription Category'
            },
            {
                'data': 'orderCategory',
                'title': 'Order Category'
            },
            {
                'data': 'orderNumber',
                'title': 'Order Number'
            },
            {
                'data': 'orderDate',
                'title': 'Order Date',
                'type': 'datetime',
                'render': this.dateFormInDatatable
            },
            {
                'data': 'startDate',
                'title': 'Start Date',
                'type': 'datetime',
                'render': this.dateFormInDatatable
            },
            {
                'data': 'endDate',
                'title': 'End Date',
                'type': 'datetime',
                'render': this.dateFormInDatatable
            }, {
                'data': 'paymentType',
                'title': 'Payment Type'
            }, {
                'data': 'currency',
                'title': 'Currency'
            }, {
                'data': 'netLocalAmount',
                'title': 'Net Local Amount',
                'render': ProjectUtils.toFixedIfNumber
            }, {
                'data': 'netBaseAmount',
                'title': 'Net Base Amount',
                'render': ProjectUtils.toFixedIfNumber
            }, {
                'data': 'payCurrencyAmount',
                'title': 'Pay Currency Amount',
                'render': ProjectUtils.toFixedIfNumber
            }, {
                'data': 'paymentBaseAmount',
                'title': 'Payment Base Amount',
                'render': ProjectUtils.toFixedIfNumber
            }, {
                'data': 'qty',
                'title': 'Qty'
            }
        ];
    }



    addColumnsOption(dtOptions: any) {
        dtOptions['columns'] = [
            {
                'data': 'sourceCode',
                'title': 'Source Code'
            },
            {
                'data': 'customerID',
                'title': 'Customer ID'
            },
            {
                'data': 'customerName',
                'title': ' Customer Name'
            },
            // {
            //     'data': '',
            //     'title': 'address1'
            // },
            // {
            //     'data': '',
            //     'title': 'address2'
            // },
            // {
            //     'data': '',
            //     'title': 'address3'
            // },
            {
                'data': 'company',
                'title': 'Company'
            },
            // {
            //     'data': '',
            //     'title': 'department'
            // },
            // {
            //     'data': '',
            //     'title': 'city'
            // },
            // {
            //     'data': '',
            //     'title': 'county'
            // },
            // {
            //     'data': '',
            //     'title': 'state'
            // },
            // {
            //     'data': '',
            //     'title': 'zip'
            // },
            {
                'data': 'journal',
                'title': 'Product Name'
            },
            {
                'data': 'subsCategory',
                'title': 'Subscription Category'
            },
            // {
            //     'data': '',
            //     'title': 'Order Category'
            // },
            {
                'data': 'orderNumber',
                'title': 'Order Number'
            },
            {
                'data': 'orderDate',
                'title': 'Order Date',
                'type': 'datetime',
                'render': this.dateFormInDatatable
            },
            {
                'data': 'startDate',
                'title': 'Start Date',
                'type': 'datetime',
                'render': this.dateFormInDatatable
            },
            {
                'data': 'endDate',
                'title': 'End Date',
                'type': 'datetime',
                'render': this.dateFormInDatatable
            }, {
                'data': 'paymentType',
                'title': 'Payment Type'
            }, {
                'data': 'currency',
                'title': 'Currency'
            }, {
                'data': 'netLocalAmount',
                'title': 'Net Local Amount',
                'render': ProjectUtils.toFixedIfNumber
            }, {
                'data': 'netBaseAmount',
                'title': 'Net Base Amount',
                'render': ProjectUtils.toFixedIfNumber
            }, {
                'data': 'payCurrencyAmount',
                'title': 'Pay Currency Amount',
                'render': ProjectUtils.toFixedIfNumber
            }, {
                'data': 'paymentBaseAmount',
                'title': 'Payment Base Amount',
                'render': ProjectUtils.toFixedIfNumber
            }, {
                'data': 'qty',
                'title': 'Qty'
            }
        ];
    }
}
