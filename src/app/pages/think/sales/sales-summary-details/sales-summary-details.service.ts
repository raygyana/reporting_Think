import { Injectable } from '@angular/core';
import { Constants } from '../../../shared/constant';
import { BaseService } from '../../../../core/base/base.service';
import { ProjectUtils } from '../../../shared';

@Injectable()
export class SalesSummaryDetailsSearchService extends BaseService {

      getServiceURL(): string {
            return Constants.TK_SALE_SUMMARY_DETAILS_REPORT_URL;
      }


      addColumnsOption(dtOptions: any) {
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
                        'title': 'Dollar',
                        render: ProjectUtils.toFixedIfNumber
                  }, {
                        'data': 'euro',
                        'title': 'Euro',
                        render: ProjectUtils.toFixedIfNumber
                  }, {
                        'data': 'gbp',
                        'title': 'GBP',
                        render: ProjectUtils.toFixedIfNumber
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
