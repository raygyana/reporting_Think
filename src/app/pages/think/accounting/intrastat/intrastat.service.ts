import { Injectable } from '@angular/core';
import { Constants } from '../../../shared/constant';
import { BaseService } from '../../../../core/base/base.service';
import { ProjectUtils } from '../../../shared/project-utils';

@Injectable()
export class IntrastatService extends BaseService {

      getServiceURL(): string {
            return Constants.TK_INTRASTAT_REPORT_URL;
      }

      addColumnsOption(dtOptions: any) {

            ProjectUtils.dtDisableSorting(dtOptions, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12);
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
                        'data': 'commodity_Code',
                        'title': 'Commodity Code'
                  }, {
                        'data': 'order_no',
                        'title': 'Order No.'
                  }, {
                        'data': 'order_date',
                        'title': 'Order Date',
                        'type': 'datetime',
                        'render': this.dateFormInDatatable
                  }, {
                        'data': 'delivery_terms',
                        'title': 'Delivery Terms'
                  }, {
                        'data': 'nature_of_trans',
                        'title': 'Nature of Trans'
                  }, {
                        'data': 'net_mass',
                        'title': 'Net Mass'
                  }, {
                        'data': 'state',
                        'title': 'State'
                  }, {
                        'data': 'country_of_dest',
                        'title': 'Destination Country'
                  }, {
                        'data': 'mode_of_trans',
                        'title': 'Mode of Trans'
                  }, {
                        'data': 'no_of_cons',
                        'title': 'No. of Cons'
                  }, {
                        'data': 'order_value',
                        'title': 'Order Value'
                  }

            ];
      }

}
