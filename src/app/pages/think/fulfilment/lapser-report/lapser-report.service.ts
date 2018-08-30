import { Injectable } from '@angular/core';
import { Constants } from '../../../shared/constant';
import { BaseService } from '../../../../core/base/base.service';
import { ProjectUtils } from '../../../shared/project-utils';
import { HttpService } from '../../../../core/http.service';


const salesByCatJSON = 'assets/json/salesbycat.json';

@Injectable()
export class LapserReportService extends BaseService {

    constructor(
        protected httpService: HttpService
    ) {
        super(httpService)
    }


    getServiceURL(): string {
        return Constants.TK_LAPSER_REPORT_URL;
    }

    // loadData(): any {
    //    return this.loadJSONData(salesByCatJSON);
    // }

    addColumnsOption(dtOptions: any) {
        dtOptions['columns'] = [

            {
                'data': 'billToCustomerID',
                'title': 'Bill to Customer ID'
            }, {
                'data': 'billToCustomerName',
                'title': 'Bill To Customer Name'
            }, {
                'data': 'billtoCompany',
                'title': 'Bill to Company'
            }, {
                'data': 'billtoCountry',
                'title': 'Bill to Country'
            }, {
                'data': 'shiptoCustId',
                'title': 'Ship to Cust Id'
            }, {
                'data': 'shiptoCustName',
                'title': 'Ship to Cust Name'
            }, {
                'data': 'shiptoCompany',
                'title': 'Ship to Company'
            }, {
                'data': 'shiptoCountry',
                'title': 'Ship to Country'
            }, {
                'data': 'endUserCustId',
                'title': 'End User Cust Id'
            }, {
                'data': 'endUserCustName',
                'title': 'End User Cust Name'
            }, {
                'data': 'endUsertoCompany',
                'title': 'End User Company'
            }, {
                'data': 'endUsertoCountry',
                'title': 'End User Country'
            }, {
                'data': 'orderNumber',
                'title': 'Orderhdr Id'
            }, {
                'data': 'journal',
                'title': 'Product Name'
            }, {
                'data': 'endDate',
                'title': 'expiry_date',
                'type': 'datetime',
                'render': this.dateFormInDatatable
            }, {
                'data': 'orderDate',
                'title': 'order_date',
                'type': 'datetime',
                'render': this.dateFormInDatatable
            }, {
                'data': 'subsCategory',
                'title': 'Subscription Category'
            }, {
                'data': 'subType',
                'title': 'Sub type'
            }, {
                'data': 'currency',
                'title': 'currency'
            }, {
                'data': 'netBaseAmount',
                'title': 'Net base amount',
                'render': ProjectUtils.toFixedIfNumber
            }, {
                'data': 'netLocalAmount',
                'title': 'Net local amount',
                'render': ProjectUtils.toFixedIfNumber
            }, {
                'data': 'cancelReason',
                'title': 'Cancel Status'
            }

        ]



    }

}
