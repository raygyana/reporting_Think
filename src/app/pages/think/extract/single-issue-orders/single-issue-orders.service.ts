import { Injectable } from '@angular/core';
import { Constants } from '../../../shared/constant';
import { BaseService } from '../../../../core/base/base.service';
import { ProjectUtils } from '../../../shared/project-utils';
import { HttpService } from '../../../../core/http.service';

@Injectable()
export class SingleIssueOrdersService extends BaseService {

      constructor(
            protected httpService: HttpService
      ) {
            super(httpService)
      }


      getServiceURL(): string {
            return Constants.TK_SINGLE_ISSUE_ORDERS_URL;
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
                        'title': 'Product Name'
                  }, {
                        'data': 'endCustId',
                        'title': 'End User Customer ID'
                  }, {
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
                        'data': 'endCity',
                        'title': 'End User City'
                  }, {
                        'data': 'endState',
                        'title': 'End User State'
                  }, {
                        'data': 'endCountry',
                        'title': 'End User Country'
                  }, {
                        'data': 'shipCustId',
                        'title': 'Ship To Customer ID'
                  }, {
                        'data': 'shipCustName',
                        'title': 'Ship To Cust Name'
                  }, {
                        'data': 'shipDepartment',
                        'title': 'Ship To Department'
                  },
                  {
                        'data': 'shipCompany',
                        'title': 'Ship To Company'
                  },
                  {
                        'data': 'shipState',
                        'title': 'Ship To State'
                  }, {
                        'data': 'shipCountry',
                        'title': 'Ship To Country'
                  }, {
                        'data': 'billCustId',
                        'title': 'Bill To Cust ID'
                  }, {
                        'data': 'billCustName',
                        'title': 'Bill To Cust Name'
                  }, {
                        'data': 'billDepartment',
                        'title': 'Bill To Department'
                  }, {
                        'data': 'billCompany',
                        'title': 'Bill To Company'
                  }, {
                        'data': 'billState',
                        'title': 'Bill To State'
                  }, {
                        'data': 'billCountry',
                        'title': 'Bill To Country'
                  }, {
                        'data': 'orderDate',
                        'title': 'Order Date',
                        'type': 'datetime',
                        'render': this.dateFormateMMDDYYYY
                  }, {
                        'data': 'volIssue',
                        'title': 'Vol/Issue'
                  }, {
                        'data': 'issueDate',
                        'title': 'Issue Date',
                        'type': 'datetime',
                        'render': this.dateFormateMMDDYYYY
                  }, {
                        'data': 'paidClaim',
                        'title': 'Paid/Claim'
                  }, {
                        'data': 'orderCode',
                        'title': 'Order Code'
                  }, {
                        'data': 'discountCode',
                        'title': 'Discount Code'
                  }, {
                        'data': 'currency',
                        'title': 'Currency'
                  },
                  {
                        'data': 'netLocalAmt',
                        'title': 'Net Local Amount',
                        render: ProjectUtils.toFixedIfNumber
                  },
                  {
                        'data': 'netBaseAmt',
                        'title': 'Net Base Amount',
                        render: ProjectUtils.toFixedIfNumber
                  }, {
                        'data': 'quantity',
                        'title': 'Quantity'
                  }
            ];
      }
      addColumnsOptionPhp(dtOptions: any) {
            dtOptions['aaSorting'] = [];  // for disable starting sort
            dtOptions['columns'] = [
                  {
                        'data': 'orderNum',
                        'title': 'Order Number'
                  }, {
                        'data': 'productName',
                        'title': 'Product Name'
                  }, {
                        'data': 'endCustId',
                        'title': 'End User Customer ID'
                  }, {
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
                        'data': 'endCity',
                        'title': 'End User City'
                  }, {
                        'data': 'endState',
                        'title': 'End User State'
                  }, {
                        'data': 'endCountry',
                        'title': 'End User Country'
                  }, {
                        'data': 'shipCustId',
                        'title': 'Ship To Customer ID'
                  }, {
                        'data': 'shipCustName',
                        'title': 'Ship To Cust Name'
                  }, {
                        'data': 'shipDepartment',
                        'title': 'Ship To Department'
                  },
                  {
                        'data': 'shipCompany',
                        'title': 'Ship To Company'
                  },
                  {
                        'data': 'shipState',
                        'title': 'Ship To State'
                  }, {
                        'data': 'shipCountry',
                        'title': 'Ship To Country'
                  }, {
                        'data': 'billCustId',
                        'title': 'Bill To Cust ID'
                  }, {
                        'data': 'billCustName',
                        'title': 'Bill To Cust Name'
                  }, {
                        'data': 'billDepartment',
                        'title': 'Bill To Department'
                  }, {
                        'data': 'billCompany',
                        'title': 'Bill To Company'
                  }, {
                        'data': 'billState',
                        'title': 'Bill To State'
                  }, {
                        'data': 'billCountry',
                        'title': 'Bill To Country'
                  }, {
                        'data': 'orderDate',
                        'title': 'Order Date',
                        'type': 'datetime',
                        'render': this.dateFormateMMDDYYYY
                  }, {
                        'data': 'volIssue',
                        'title': 'Vol/Issue'
                  }, {
                        'data': 'issueDate',
                        'title': 'Issue Date',
                        'type': 'datetime',
                        'render': this.dateFormateMMDDYYYY
                  }, {
                        'data': 'paidClaim',
                        'title': 'Paid/Claim'
                  }, {
                        'data': 'orderCode',
                        'title': 'Order Code'
                  }, {
                        'data': 'currency',
                        'title': 'Currency'
                  },
                  {
                        'data': 'netLocalAmt',
                        'title': 'Net Local Amount',
                        render: ProjectUtils.toFixedIfNumber
                  },
                  {
                        'data': 'netBaseAmt',
                        'title': 'Net Base Amount',
                        render: ProjectUtils.toFixedIfNumber
                  }, {
                        'data': 'quantity',
                        'title': 'Quantity'
                  }
            ];
      }
}
