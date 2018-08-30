import { Injectable } from '@angular/core';
import { Constants } from '../../../shared/constant';
import { BaseService } from '../../../../core/base/base.service';

@Injectable()
export class VatESLService extends BaseService {

      getServiceURL(): string {
            return Constants.TK_VAT_ESL_DETAIL_REPORT_URL;
      }

      addColumnsOption(dtOptions: any) {
            dtOptions['columns'] = [

                  {
                        'data': 'bill_to_vat_regID',
                        'title': 'Bill To VAT RegID'
                  }, {
                        'data': 'tax_id_prefix',
                        'title': 'Tax Id Prefix'
                  }, {
                        'data': 'order_date',
                        'title': 'Order Date'
                  }, {
                        'data': 'bill_to_customer_number',
                        'title': 'Bill to Customer Number'
                  }, {
                        'data': 'bill_to_customer_name',
                        'title': 'Bill To Customer Name'
                  }, {
                        'data': 'net_amt',
                        'title': 'Net Amount'
                  }, {
                        'data': 'del_amt',
                        'title': 'Delivery Amount'
                  }, {
                        'data': 'tax_amt',
                        'title': 'Tax Amount'
                  }, {
                        'data': 'commission_amt',
                        'title': 'Commission Amount'
                  }, {
                        'data': 'total_amt',
                        'title': 'Total Amount'
                  }
                  //  {
                  //       'data': 'order_code',
                  //       'title': 'Order Code'
                  // }, {
                  //       'data': 'commission_amt',
                  //       'title': 'Commission Amount'
                  // }, {
                  //       'data': 'tax_amt',
                  //       'title': 'Tax Amount'
                  // }, {
                  //       'data': 'del_amt',
                  //       'title': 'Del Amount'
                  // }, {
                  //       'data': 'net_amt',
                  //       'title': 'Net Amount'
                  // }, {
                  //       'data': 'total_amt',
                  //       'title': 'Total Amount'
                  // }

            ];
      }

}
