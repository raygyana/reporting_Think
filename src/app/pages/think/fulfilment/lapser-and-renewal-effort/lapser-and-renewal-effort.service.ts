import { Injectable } from '@angular/core';
import { Constants } from '../../../shared/constant';
import { BaseService } from '../../../../core/base/base.service';
import { ProjectUtils } from '../../../shared/project-utils';
import { HttpService } from '../../../../core/http.service';

const salesByCatJSON = 'assets/json/salesbycat.json';

@Injectable()
export class LapserAndRenewalEffortService extends BaseService {

    constructor(
        protected httpService: HttpService
    ) {
        super(httpService)
    }

    getServiceURL(): string {
        return Constants.TK_LAPSER_AND_RENEWAL_EFFORT_URL;
    }

    // loadData(): any {
    //    return this.loadJSONData(salesByCatJSON);
    // }

    addColumnsOption(dtOptions: any) {
        dtOptions['columns'] = [
            {
                'data': 'billToCustomerID',
                'title': 'Bill to Customer Id'
            },
            {
                'data': 'billToCustomerName',
                'title': 'Bill To Customer Name'
            }, {
                'data': 'billtoCompany',
                'title': 'Bill to company'
            }, {
                'data': 'billToDeparment',
                'title': 'Bill to Department'
            }, {
                'data': 'billtoAddress',
                'title': 'Bill to Address'
            }, {
                'data': 'billtophoneNumber',
                'title': 'Bill to Phone Number'
            }, {
                'data': 'billToFax',
                'title': 'Bill to Fax Number'
            }, {
                'data': 'billToMobile',
                'title': 'Bill to Mobile Number'
            }, {
                'data': 'billtoemailId',
                'title': 'Bill to Email'
            }, {
                'data': 'billtoState',
                'title': 'Bill to State'
            }, {
                'data': 'billtoCountry',
                'title': 'Bill to Country'
            },
            {
                'data': 'agencyCustomerID',
                'title': 'Agency Customer ID'
            },
            {
                'data': 'agency',
                'title': 'Agency Company'
            },
            {
                'data': 'shiptoCustId',
                'title': 'Ship to Cust Id'
            },
            {
                'data': 'shiptoCustName',
                'title': 'Ship to Cust Name'
            }, {
                'data': 'shiptoCompany',
                'title': 'Ship to Company'
            }, {
                'data': 'shipToDepartment',
                'title': 'Ship to Department'
            }, {
                'data': 'shiptoAddress',
                'title': 'Ship to Address'
            }, {
                'data': 'shiptoPhoneNumber',
                'title': 'Ship to Phone Number'
            }, {
                'data': 'shipToFax',
                'title': 'Ship to Fax Number'
            }, {
                'data': 'shipToMobile',
                'title': 'Ship to Mobile Number'
            }, {
                'data': 'shiptoemailId',
                'title': 'Ship to email'
            }, {
                'data': 'shiptoState',
                'title': 'Ship to State'
            },
            {
                'data': 'shiptoCountry',
                'title': 'Ship to Country'
            },
            {
                'data': 'endUserCustId',
                'title': 'End User Cust Id'
            }, {
                'data': 'endUserCustName',
                'title': 'End User Cust Name'
            }, {
                'data': 'endUsertoCompany',
                'title': 'End User Company'
            }, {
                'data': 'endUserToDepartment',
                'title': 'End User Department'
            }, {
                'data': 'endUserAddress',
                'title': 'End User Address'
            }, {
                'data': 'endUserPhoneNumber',
                'title': 'End User Phone Number'
            }, {
                'data': 'endUserToFax',
                'title': 'End User Fax Number'
            }, {
                'data': 'endUserToMobile',
                'title': 'End User Mobile Number'
            }, {
                'data': 'endUseremailId',
                'title': 'End User Email Id'
            }, {
                'data': 'endUsertoState',
                'title': 'End User State'
            }, {
                'data': 'endUsertoCountry',
                'title': 'End User Country'
            },
            {
                'data': 'orderNumber',
                'title': 'Orderhdr Id'
            },
            {
                'data': 'journal',
                'title': 'Product Name'
            },
            {
                'data': 'startDate',
                'title': 'Start Date',
                'type': 'datetime',
                'render': this.dateFormInDatatable
            }, {
                'data': 'endDate',
                'title': 'Expiry Date',
                'type': 'datetime',
                'render': this.dateFormInDatatable
            }, {
                'data': 'orderDate',
                'title': 'Order Date',
                'type': 'datetime',
                'render': this.dateFormInDatatable
            },
            {
                'data': 'subsCategory',
                'title': 'Subscription Category'
            },
            {
                'data': 'subType',
                'title': 'Sub Type'
            },
            {
                'data': 'currency',
                'title': 'Currency'
            }, {
                'data': 'netBaseAmount',
                'title': 'Base Amount',
                'render': ProjectUtils.toFixedIfNumber
            }, {
                'data': 'netLocalAmount',
                'title': 'Local Amount',
                'render': ProjectUtils.toFixedIfNumber
            },
            {
                'data': 'renewalReminder',
                'title': 'Renewal/Reminder'
            },
            {
                'data': 'renewalOfferCurrency',
                'title': 'Renewal Offer Currency'
            },
            {
                'data': 'renewalPrice',
                'title': 'Renewal Price',
                'render': ProjectUtils.toFixedIfNumber
            },
            {
                'data': 'reminderEffort',
                'title': 'Reminder-Effort'
            },
            {
                'data': 'renewalSubCategory',
                'title': 'Renewal Subscription Category'
            },
            {
                'data': 'notSendReason',
                'title': 'Do Not Send Renewal Reason'
            }, {
                'data': 'cancelReason',
                'title': 'Cancel Reason'
            }, {
                'data': 'agentRefNo',
                'title': 'Agent Reference Number'
            }, {
                'data': 'poNumber',
                'title': 'PO Number'
            }
        ];
    }
}
