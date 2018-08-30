import { Injectable } from '@angular/core';
import { Constants } from '../../../shared/constant';
import { BaseService } from '../../../../core/base/base.service';
import { ProjectUtils } from '../../../shared/project-utils';
import { HttpService } from '../../../../core/http.service';

@Injectable()
export class GiftOrdersService extends BaseService {

      constructor(
            protected httpService: HttpService
      ) {
            super(httpService)
      }


      getServiceURL(): string {
            return Constants.TK_EXTRACT_GIFT_ORDERS_URL;
      }

      addColumnsOption(dtOptions: any) {
            dtOptions['aaSorting'] = [];  // for disable starting sort
            // dtOptions['aoColumnDefs'] = [
            //       { 'bSortable': false, 'aTargets': [0, 1, 2, 3, 4, 5] }
            // ]
            dtOptions['columns'] = [
                  {
                        'data': 'orderNum',
                        'title': 'Order Number'
                  }, {
                        'data': 'productName',
                        'title': 'Journal Name'
                  },
                  // {
                  //       'data': 'endCustId',
                  //       'title': 'End User Customer ID'
                  // }
                  {
                        'data': 'endCustName',
                        'title': 'End User Cust Name'
                  }, {
                        'data': 'endDepartment',
                        'title': 'End User Department'
                  }, {
                        'data': 'endCompany',
                        'title': 'End User Company'
                  }, {
                        'data': 'endAddress',
                        'title': 'End User Address'
                  }, {
                        'data': 'endState',
                        'title': 'End User State'
                  }, {
                        'data': 'endCountry',
                        'title': 'End User Country'
                  }, {
                        'data': 'endZip',
                        'title': 'End User Zip/Postal Code'
                  }, {
                        'data': 'endEmail',
                        'title': 'End-User Email'
                  }, {
                        'data': 'endPhone',
                        'title': 'End-User Phone'
                  },
                  //  {
                  //       'data': 'shipCustId',
                  //       'title': 'Ship To Cust ID'
                  // },
                  {
                        'data': 'shipCustName',
                        'title': 'Ship To Cust Name'
                  }, {
                        'data': 'shipDepartment',
                        'title': 'Ship To Department'
                  }, {
                        'data': 'shipCompany',
                        'title': 'Ship To Company'
                  }, {
                        'data': 'shipAddress',
                        'title': 'Ship To Address'
                  },
                  {
                        'data': 'shipState',
                        'title': 'Ship To State'
                  }, {
                        'data': 'shipCountry',
                        'title': 'Ship To Country'
                  }, {
                        'data': 'shipZip',
                        'title': 'Ship To Zip/Postal code'
                  }, {
                        'data': 'shipEmail',
                        'title': 'Ship To Email'
                  }, {
                        'data': 'shipPhone',
                        'title': 'Ship To Phone'
                  },
                  // {
                  //       'data': 'billCustId',
                  //       'title': 'Bill To Customer ID'
                  // },
                  {
                        'data': 'billCustName',
                        'title': 'Bill To Customer Name'
                  }, {
                        'data': 'billDepartment',
                        'title': 'Bill To Dept'
                  }, {
                        'data': 'billCompany',
                        'title': 'Bill To Company'
                  }, {
                        'data': 'billAddress',
                        'title': 'Bill To Address'
                  }, {
                        'data': 'billState',
                        'title': 'Bill To State'
                  }, {
                        'data': 'billCountry',
                        'title': 'Bill To Country'
                  }, {
                        'data': 'billZip',
                        'title': 'Bill To Zip/Postal code'
                  }, {
                        'data': 'billEmail',
                        'title': 'Bill To Email'
                  }, {
                        'data': 'billPhone',
                        'title': 'Bill To Phone'
                  }, {
                        'data': 'orderDate',
                        'title': 'Order Date',
                        'type': 'datetime',
                        'render': this.dateFormateMMDDYYYY
                  }, {
                        'data': 'volIssue',
                        'title': 'Start_Vol/Iss'
                  }, {
                        'data': 'startDate',
                        'title': 'Start Date',
                        'type': 'datetime',
                        'render': this.dateFormateMMDDYYYY
                  }, {
                        'data': 'expDate',
                        'title': 'Expire Date',
                        'type': 'datetime',
                        'render': this.dateFormateMMDDYYYY
                  }, {
                        'data': 'netBaseAmt',
                        'title': 'Net Base Amount'
                  }, {
                        'data': 'taxAmt',
                        'title': 'Tax Amount(Base)'
                  }, {
                        'data': 'shipCharge',
                        'title': 'Shipping charges'
                  }, {
                        'data': 'grossBaseAmt',
                        'title': 'Gross Base Amount'
                  }, {
                        'data': 'orderCode',
                        'title': 'Order Code'
                  }, {
                        'data': 'prCategory',
                        'title': 'Price Category'
                  }, {
                        'data': 'sourceCode',
                        'title': 'Source Code'
                  }, {
                        'data': 'paymentType',
                        'title': 'Payment Type'
                  }, {
                        'data': 'orderStatus',
                        'title': 'Order Status'
                  }, {
                        'data': 'paymentStatus',
                        'title': 'Payment Status'
                  }, {
                        'data': 'poNumber',
                        'title': 'PO Number'
                  }, {
                        'data': 'orderCategory',
                        'title': 'Order Category'
                  }, {
                        'data': 'discountCode',
                        'title': 'Discount code'
                  }
            ];
      }
}
