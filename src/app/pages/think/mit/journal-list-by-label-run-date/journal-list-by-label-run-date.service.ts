import { Injectable } from '@angular/core';
import { Constants } from '../../../shared/constant';
import { BaseService } from '../../../../core/base/base.service';

@Injectable()
export class JournalListService extends BaseService {

      getServiceURL(): string {
            return Constants.TK_JOURNAL_LIST_BY_LEBEL_RUN_DATE;
      }

      addColumnsOption(dtOptions: any) {
            dtOptions['columns'] = [
                  {
                        'data': 'title',
                        'title': 'Product Name'
                  },
                  {
                        'data': 'issueNumber',
                        'title': 'Enumeration'
                  },
                  {
                        'data': 'date',
                        'title': 'Month'
                  },
                  {
                        'data': 'labelDate',
                        'title': 'Label Date',
                        'type': 'datetime',
                        'render': this.dateFormateMMDDYYYY
                  },
                  {
                        'data': 'coverDate',
                        'title': 'Cover Date',
                        'type': 'datetime',
                        'render': this.dateFormateMMDDYYYY
                  }

            ];
      }
}
