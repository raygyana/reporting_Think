import { Injectable } from '@angular/core';
import { Constants } from '../../../shared/constant';
import { BaseService } from '../../../../core/base/base.service';
import { ProjectUtils } from '../../../shared/project-utils';

@Injectable()
export class ECSalesService extends BaseService {

      getServiceURL(): string {
            return Constants.TK_EC_SALES_REPORT_URL;
      }

      addColumnsOption(dtOptions: any) {

            ProjectUtils.dtDisableSorting(dtOptions, 0, 1, 2, 3, 4, 5, 6, 7);
            dtOptions['columns'] = [

                  {
                        'data': 'branding',
                        'title': 'Branding'
                  }, {
                        'data': 'profit_center',
                        'title': 'Profit Center'
                  }, {
                        'data': 'description',
                        'title': 'Description'
                  }, {
                        'data': 'vat_id',
                        'title': 'VAT ID'
                  }, {
                        'data': 'state',
                        'title': 'State'
                  }, {
                        'data': 'country_of_destination',
                        'title': 'Destination Country'
                  }, {
                        'data': 'vat_number',
                        'title': 'VAT No.'
                  }, {
                        'data': 'order_date',
                        'title': 'Order Date',
                        'type': 'datetime',
                        'render': this.dateFormInDatatable
                  }, {
                        'data': 'order_value',
                        'title': 'Order Value'
                  }

            ];
      }

      addColumnsOption2(dtOptions: any) {
            dtOptions['columns'] = [

                  {
                        'data': 'branding',
                        'title': 'Branding'
                  }, {
                        'data': 'vat_id',
                        'title': 'VAT ID'
                  }, {
                        'data': 'country_of_destination',
                        'title': 'Destination Country'
                  }, {
                        'data': 'vat_number',
                        'title': 'VAT No.'
                  }, {
                        'data': 'order_value',
                        'title': 'Order Value'
                  }

            ];
      }

}
