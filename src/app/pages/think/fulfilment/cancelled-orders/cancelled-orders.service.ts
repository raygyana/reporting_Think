import { Injectable } from '@angular/core';
import { Constants, GlobalSettings, SessionObject } from '../../../shared';
import { BaseService } from '../../../../core/base/base.service';
import { ProjectUtils } from '../../../shared/project-utils';
import { HttpService } from '../../../../core/http.service';

@Injectable()
export class CancelledOrdersService extends BaseService {

    constructor(
        protected httpService: HttpService
    ) {
        super(httpService)
    }


    getServiceURL(): string {
        if (this.sessionObject.clientSettings.CANCELLED_ORDERS.
            diffrentUrl) {
            return Constants.TK_FULLFILLMENT_CANCELLED_ORDERS_LIST_URL_SPECIAL_UCP
        } else {
            return Constants.TK_FULLFILLMENT_CANCELLED_ORDERS_LIST_URL;
        }
    }


    addColumnsOption() {
        if (this.sessionObject.clientSettings.CANCELLED_ORDERS.
            diffrentUrl) {
            return this.addColumsOptionUCP();
        } else {
            return this.addColumnsOptionOther();
        }
    }


    addColumnsOptionOther() {
        return [
            {
                'data': 'billToCustomerId',
                'title': 'Bill To Customer Id'
            },
            {
                'data': 'billToFname',
                'title': 'Bill To First Name'
            },
            {
                'data': 'billToLname',
                'title': 'Bill To Last Name'
            },
            {
                'data': 'billToCompany',
                'title': 'Bill To Company'
            },
            {
                'data': 'billToState',
                'title': 'Bill To State'
            },
            {
                'data': 'stateBillToCountry',
                'title': 'Bill To Country'
            },
            {
                'data': 'shipToCustomerId',
                'title': 'Ship To Customer Id'
            },
            {
                'data': 'shipToFname',
                'title': 'Ship To First Name'
            },
            {
                'data': 'shipToLname',
                'title': 'Ship To Last Name'
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
                'data': 'shipToState',
                'title': 'Ship To State'
            },
            {
                'data': 'stateShipToCountry',
                'title': 'Ship To Country'
            },
            {
                'data': 'endUserCustomerId',
                'title': 'End User Customer Id'
            },
            {
                'data': 'endUserFname',
                'title': 'End User First Name'
            },
            {
                'data': 'endUserLname',
                'title': 'End User Last Name'
            },
            {
                'data': 'endUserCompany',
                'title': 'End User Company'
            },
            {
                'data': 'endUserState',
                'title': 'End User State'
            },
            {
                'data': 'stateEndUserCountry',
                'title': 'End User Country'
            },
            {
                'data': 'agencyCompany',
                'title': 'Agency'
            },
            {
                'data': 'ocDescription',
                'title': 'Product Name'
            },
            {
                'data': 'revenueMethod',
                'title': 'Revenue Method'
            },
            {
                'data': 'volume',
                'title': 'Volume Year'
            },
            {
                'data': 'orderhdrId',
                'title': 'Order No.'
            },
            {
                'data': 'orderDate',
                'title': 'Order Date',
                'type': 'datetime',
                'render': this.dateFormInDatatable
            },
            {
                'data': 'viewStartDate',
                'title': 'Start Date',
                'type': 'datetime',
                'render': this.dateFormInDatatable
            },
            {
                'data': 'expireDate',
                'title': 'Expiry Date',
                'type': 'datetime',
                'render': this.dateFormInDatatable
            },
            {
                'data': 'bundleQty',
                'title': 'Split Qty'
            },
            {
                'data': 'bundleQty',
                'title': 'Qty'
            },
            {
                'data': 'priceCategory',
                'title': 'Price Category'
            },
            {
                'data': 'priceType',
                'title': 'Price Type'
            },
            {
                'data': 'agentRefNo',
                'title': 'Agent Ref Nbr'
            },
            {
                'data': 'poNumber',
                'title': 'PO Number'
            },
            {
                'data': 'currency',
                'title': 'Currency'
            },
            {
                'data': 'editTrailLocalAmount',
                'title': 'Order Local Amount',
                'render': ProjectUtils.toFixedIfNumber
            },
            {
                'data': 'editTrailBaseAmount',
                'title': 'Order Base Amount',
                'render': ProjectUtils.toFixedIfNumber
            },
            {
                'data': 'cancelDate',
                'title': 'Cancel Date',
                'type': 'datetime',
                'render': this.dateFormInDatatable
            },
            {
                'data': 'cancelReasonDescription',
                'title': 'Cancel Reason'
            },
            {
                'data': 'paymentType',
                'title': 'Payment Type'
            },
            {
                'data': 'payCurrencyAmount',
                'title': 'Pay currency amount',
                'render': ProjectUtils.toFixedIfNumber
            },
            {
                'data': 'refundAmount',
                'title': 'Refund Amount',
                'render': ProjectUtils.toFixedIfNumber
            },
            {
                'data': 'salesRepresentative',
                'title': 'Sales Representative'
            }
        ];
    }


    addColumsOptionUCP() {
        return [
            {
                data: 'customerID',
                title: 'Customer ID'
            },
            {
                data: 'name',
                title: 'Name'
            },
            {
                data: 'orderNo',
                title: 'Order ID'
            },
            {
                data: 'orderCode',
                title: 'Order Code'
            },
            {
                data: 'cancelDate',
                title: 'Cancel Date'
            },
            {
                data: 'cancelReason',
                title: 'Cancel Reason'
            },
            {
                data: 'paymentStatus',
                title: 'Payment Status'
            },
            {
                data: 'totalIssues',
                title: 'Total Issues'
            },
            {
                data: 'issuesServed',
                title: 'Issues Served'
            }, {
                data: 'orderAmount',
                title: 'Order Amount',
                'render': ProjectUtils.toFixedIfNumber
            }, {
                data: 'servedAmount',
                title: 'Served Amount',
                'render': ProjectUtils.toFixedIfNumber
            }, {
                data: 'billTo',
                title: 'Bill To'
            },
            {
                data: 'billCustomerID',
                title: 'Bill Customer ID'
            }, {
                data: 'billName',
                title: 'Bill Name'
            }
        ];
    }

}
