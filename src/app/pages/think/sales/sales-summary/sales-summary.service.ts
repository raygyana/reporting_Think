import { Injectable } from '@angular/core';
import { Constants } from '../../../shared/constant';
import { BaseService } from '../../../../core/base/base.service';

@Injectable()
export class SalesSummarySearchService extends BaseService {

      getServiceURL(): string {
            return Constants.TK_SALE_SUMMARY_REPORT_URL;
      }

      addColumnsOption(dtOptions: any) {
            // dtOptions['aaSorting'] = [];  // for disable starting sort
            // dtOptions['aoColumnDefs'] = [
            //       { 'bSortable': false, 'aTargets': [0, 1, 2, 3, 4, 5] }
            // ]
            dtOptions['columns'] = [
                  {
                        'data': 'orderDate',
                        'title': 'Order Date',
                        'type': 'datetime',
                        'render': this.dateFormInDatatable
                  },
                  {
                        'data': 'endUserCustID',
                        'title': 'End User Customer Id'
                  }, {
                        'data': 'endUserCompany',
                        'title': 'End User Company'
                  }, {
                        'data': 'orderNo',
                        'title': 'Order No.'
                  }, {
                        'data': 'product',
                        'title': 'Product'
                  }, {
                        'data': 'dollar',
                        'title': 'Dollar'
                  }, {
                        'data': 'euro',
                        'title': 'Euro'
                  }, {
                        'data': 'gbp',
                        'title': 'GBP'
                  }, {
                        'data': 'startDate',
                        'title': 'Start Date',
                        'type': 'datetime',
                        'render': this.dateFormInDatatable
                  }, {
                        'data': 'endDate',
                        'title': 'Expire Date',
                        'type': 'datetime',
                        'render': this.dateFormInDatatable
                  },
                  // {
                  //       'data': 'local_percentage',
                  //       'title': 'Sales'
                  // },
                  {
                        'data': 'salesRep',
                        'title': 'Representative'
                  }, {
                        'data': 'endUserCountry',
                        'title': 'End User Country'
                  }, {
                        'data': 'marketSector',
                        'title': 'Market Sector'
                  }, {
                        'data': 'invoiceNo',
                        'title': 'Invoice No.'
                  }, {
                        'data': 'renewal',
                        'title': 'Renewal'
                  }, {
                        'data': 'businessType',
                        'title': 'Business Type'
                  }, {
                        'data': 'distributor',
                        'title': 'Distributor'
                  }, {
                        'data': 'agency',
                        'title': 'Agency'
                  }
            ];
      }

}
