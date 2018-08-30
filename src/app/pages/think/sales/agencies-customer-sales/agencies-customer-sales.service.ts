import { Injectable } from '@angular/core';
import { Constants, ProjectUtils } from '../../../shared';
import { BaseService } from '../../../../core/base/base.service';

@Injectable()
export class AgenciesCustomerSalesService extends BaseService {

      getServiceURL(): string {
            return Constants.TK_SALE_AGENCY_CUSTOMER_SALE_REPORT_URL;
      }

      addColumnsOption(dtOptions: any) {
            dtOptions['columns'] = [
                  // {
                  //       'data': 'startDate',
                  //       'title': 'Start Date',
                  //       'type': 'datetime',
                  //       'render': this.dateFormInDatatable
                  // },
                  // {
                  //       'data': 'endDate',
                  //       'title': 'End Date',
                  //       'type': 'datetime',
                  //       'render': this.dateFormInDatatable
                  // },
                  // {
                  //       'data': 'oc_id',
                  //       'title': 'Product ID'
                  // },
                  {
                        'data': 'agency',
                        'title': 'Agency'
                  },
                  {
                        'data': 'journal',
                        'title': 'Journal'
                  },
                  {
                        'data': 'volumeYear',
                        'title': 'Volume year'
                  },
                  {
                        'data': 'subscriptionCategory',
                        'title': 'Subscription Category'
                  },
                  {
                        'data': 'region',
                        'title': 'Region'
                  },
                  {
                        'data': 'orderNumberCount',
                        'title': 'Count'
                  },
                  {
                        'data': 'netBaseAmount',
                        'title': 'Amount',
                        'render': ProjectUtils.toFixedIfNumber
                  }
                  // {
                  //       'data': 'endUserCustomerID',
                  //       'title': 'Wnd User Customer ID'
                  // },
                  // {
                  //       'data': 'endUserCustomerName',
                  //       'title': 'End User Customer Name'
                  // },
                  // {
                  //       'data': 'endUserAddress',
                  //       'title': 'End User Address'
                  // },
                  // {
                  //       'data': 'endUserDepartment',
                  //       'title': 'End User Department'
                  // },
                  // {
                  //       'data': 'endUserCompany',
                  //       'title': 'End User Company'
                  // },
                  // {
                  //       'data': 'endUserCity',
                  //       'title': 'End User City'
                  // },
                  // {
                  //       'data': 'endUserCountry',
                  //       'title': 'End User Country'
                  // },
                  // {
                  //       'data': 'endUserZip',
                  //       'title': 'End User Zip'
                  // },
                  // {
                  //       'data': 'revenueMethod',
                  //       'title': 'Revenue Method'
                  // },
                  // {
                  //       'data': 'orderNumber',
                  //       'title': 'Order Number'
                  // },
                  // {
                  //       'data': 'orderDate',
                  //       'title': 'Order Date'
                  // },
                  // {
                  //       'data': 'agentRefNumber',
                  //       'title': 'Agentr Ref. Number'
                  // },
                  // {
                  //       'data': 'currency',
                  //       'title': 'Currency'
                  // },
                  // {
                  //       'data': 'netLocalAmount',
                  //       'title': 'Net Local Amount'
                  // },
                  // {
                  //       'data': 'paymentType',
                  //       'title': 'Payment Type'
                  // },
                  // {
                  //       'data': 'payCurrencyAmount',
                  //       'title': 'Pay Currency Amount'
                  // },
                  // {
                  //       'data': 'paymentBaseAmount',
                  //       'title': 'Payment Base Amount'
                  // },
                  // {
                  //       'data': 'discount',
                  //       'title': 'discount'
                  // },
                  // {
                  //       'data': 'orderType',
                  //       'title': 'Order Type'
                  // },
                  // {
                  //       'data': 'qty',
                  //       'title': 'Qty.'
                  // },
                  // {
                  //       'data': 'subscriptionCategoryId',
                  //       'title': 'Subscription Category ID'
                  // },
                  // {
                  //       'data': 'regionList',
                  //       'title': 'Region List'
                  // },
                  // {
                  //       'data': 'description',
                  //       'title': 'Description'
                  // },
                  // {
                  //       'data': 'order',
                  //       'title': 'Order'
                  // }
            ];
      }
}

