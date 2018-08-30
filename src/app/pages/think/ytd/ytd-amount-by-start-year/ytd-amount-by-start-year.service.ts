import { Injectable } from '@angular/core';
import { Constants } from '../../../shared/constant';
import { BaseService } from '../../../../core/base/base.service';
import { ProjectUtils } from '../../../shared/project-utils';
import { HttpService } from '../../../../core/http.service';
import { SessionObject } from 'app/pages/shared/session-object';


const salesByCatJSON = 'assets/json/salesbycat.json';

@Injectable()
export class YTDAmountByStartYearService extends BaseService {

      constructor(
            protected httpService: HttpService
      ) {
            super(httpService)
      }

      getServiceURL(): string {
            return Constants.TK_YTD_AMOUNT_BY_START_YEAR_URL;
      }

      toSearchData(body: any): any {
            return this.getDataWithURL(Constants.TK_YTD_AMOUNT_BY_FULL_YEAR_URL, body);
      }


      addSourceCodeColumnsOption(dtOptions: any) {
            dtOptions['columns'] = [
                  {
                        'data': 'journal_name',
                        'title': 'Journal Name'
                  },
                  {
                        'data': 'revenue_method',
                        'title': 'Revenue Method'
                  },
                  {
                        'data': 'market_sector',
                        'title': 'Market Sector'
                  },
                  {
                        'data': 'order_status',
                        'title': 'Order Status'
                  },
                  {
                        'data': 'payment_status',
                        'title': 'Payment Status'
                  },
                  {
                        'data': 'year',
                        'title': 'Year'
                  },
                  {
                        'data': 'orderQty',
                        'title': 'Order Qty'
                  },
                  {
                        'data': 'netAmt',
                        'title': 'Amount '
                  },
                  {
                        'data': 'orderNo',
                        'title': 'Order No'
                  },
                  {
                        'data': 'order_itemSeq',
                        'title': 'Order Itm Seq'
                  },
                  {
                        'data': 'orderdate',
                        'title': 'Order Date'
                  },
                  {
                        'data': 'cash_proforma',
                        'title': 'Cash Proforma'
                  },
                  {
                        'data': 'salesType',
                        'title': 'Sales Type'
                  },
                  {
                        'data': 'priceCategory',
                        'title': 'Price Category'
                  },
                  {
                        'data': 'enduserFname',
                        'title': 'First Name'
                  },
                  {
                        'data': 'enduserLname',
                        'title': 'Last Name'
                  },
                  {
                        'data': 'enduserCompany',
                        'title': 'Company'
                  },
                  {
                        'data': 'enduserCountry',
                        'title': 'Country'
                  },
                  {
                        'data': 'agency',
                        'title': 'Agency'

                  },
                  {
                        'data': 'renewal_category',
                        'title': 'Renewal Category'
                  }

            ]
      }

}
