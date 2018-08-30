import { Injectable } from '@angular/core';
import { Constants } from '../../../shared/constant';
import { BaseService } from '../../../../core/base/base.service';
import { ProjectUtils } from '../../../shared/project-utils';
import { HttpService } from '../../../../core/http.service';

@Injectable()
export class GratisOrdersService extends BaseService {

      constructor(
            protected httpService: HttpService
      ) {
            super(httpService)
      }


      getServiceURL(): string {
            return Constants.TK_EXTRACT_GRATIS_ORDERS_URL;
      }

      addColumnsOption(dtOptions: any) {
            dtOptions['aaSorting'] = [];  // for disable starting sort
            // dtOptions['aoColumnDefs'] = [
            //       { 'bSortable': false, 'aTargets': [0, 1, 2, 3, 4, 5] }
            // ]
            dtOptions['columns'] = [
                  {
                        'data': 'orderNumber',
                        'title': 'Order Number'
                  }, {
                        'data': 'journal',
                        'title': 'Journal'
                  }, {
                        'data': 'endUserCustId',
                        'title': 'End User Customer ID'
                  }, {
                        'data': 'endUserCustName',
                        'title': 'End User Customer Name'
                  }, {
                        'data': 'endUsertoDept',
                        'title': 'End User Department'
                  }, {
                        'data': 'endUsertoCompany',
                        'title': 'End User Company'
                  }, {
                        'data': 'endUserAddress',
                        'title': 'End User Address'
                  }, {
                        'data': 'endUsertoCity',
                        'title': 'End User City'
                  }, {
                        'data': 'endUsertoState',
                        'title': 'End User State'
                  }, {
                        'data': 'endUsertoCountry',
                        'title': 'End User Country'
                  }, {
                        'data': 'shiptoCustId',
                        'title': 'Ship To Customer ID'
                  }, {
                        'data': 'shiptoCustName',
                        'title': 'Ship To Cust Name'
                  }, {
                        'data': 'shiptoDept',
                        'title': 'Ship To Department'
                  },
                  {
                        'data': 'shiptoCompany',
                        'title': 'Ship To Company'
                  },
                  // {
                  //       'data': 'shiptoAddress',
                  //       'title': 'Ship To Address'
                  // },
                  {
                        'data': 'shiptoState',
                        'title': 'Ship To State'
                  }, {
                        'data': 'shiptoCountry',
                        'title': 'Ship To Country'
                  }, {
                        'data': 'billToCustomerID',
                        'title': 'Bill To Customer ID'
                  }, {
                        'data': 'billToCustomerName',
                        'title': 'Bill To Customer Name'
                  },
                  // {
                  //       'data': 'billtoAddress',
                  //       'title': 'Bill To Address'
                  // },
                  {
                        'data': 'billtoCompany',
                        'title': 'Bill To Company'
                  }, {
                        'data': 'billtoDept',
                        'title': 'Bill To Department'
                  }, {
                        'data': 'billtoState',
                        'title': 'Bill To State'
                  }, {
                        'data': 'billtoCountry',
                        'title': 'Bill To Country'
                  }, {
                        'data': 'orderDate',
                        'title': 'Order Date',
                        'type': 'datetime',
                        'render': this.dateFormateMMDDYYYY
                  }, {
                        'data': 'startDate',
                        'title': 'Start Date',
                        'type': 'datetime',
                        'render': this.dateFormateMMDDYYYY
                  }, {
                        'data': 'endDate',
                        'title': 'End Date',
                        'type': 'datetime',
                        'render': this.dateFormateMMDDYYYY
                  }, {
                        'data': 'orderCode',
                        'title': 'Order Code'
                  }, {
                        'data': 'currency',
                        'title': 'Currency'
                  },
                  {
                        'data': 'netLocalAmount',
                        'title': 'Net Local Amt',
                        'render': ProjectUtils.toFixedIfNumber
                  },
                  {
                        'data': 'netBaseAmount',
                        'title': 'Net Base Amt',
                        'render': ProjectUtils.toFixedIfNumber
                  }, {
                        'data': 'qty',
                        'title': 'Quantity'
                  }
            ];
      }
}
