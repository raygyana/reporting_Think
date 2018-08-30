import { Injectable } from '@angular/core';
import { Constants } from '../../../shared/constant';
import { BaseService } from '../../../../core/base/base.service';

@Injectable()
export class AtyponSubsService extends BaseService {

      getServiceURL(): string {
            return Constants.TK_ATYPON_SUBS_REPORT_URL;
      }

      addColumnsOption(dtOptions: any) {
            dtOptions['columns'] = [
                  {
                        'data': 'customerId',
                        'title': 'CustomerID'
                  },
                  {
                        'data': 'orderCategory',
                        'title': 'Order Category'
                  },
                  {
                        'data': 'fName',
                        'title': 'First Name'
                  },
                  {
                        'data': 'lName',
                        'title': 'Last Name'
                  },
                  {
                        'data': 'company',
                        'title': 'Company'
                  },
                  {
                        'data': 'address1',
                        'title': 'Address1'
                  },
                  {
                        'data': 'address2',
                        'title': 'Address2'
                  },
                  {
                        'data': 'city',
                        'title': 'City'
                  }, {
                        'data': 'state',
                        'title': 'State'
                  }, {
                        'data': 'country',
                        'title': 'Country'
                  },
                  {
                        'data': 'zip',
                        'title': 'Zip'
                  },
                  {
                        'data': 'email',
                        'title': 'Email Address'
                  },
                  {
                        'data': 'issn',
                        'title': 'ISSN'
                  },
                  {
                        'data': 'startIssEnum',
                        'title': 'Start Issue Enum'
                  },
                  {
                        'data': 'expIssEnum',
                        'title': 'Expire Issue Enum'
                  },
                  {
                        'data': 'startIssVol',
                        'title': 'Start Issue Volume'
                  },
                  {
                        'data': 'expIssVol',
                        'title': 'Expire Issue Volume'
                  },
                  {
                        'data': 'issExpireDate',
                        'title': 'Iss Expire Date',
                        'type': 'datetime',
                        'render': this.dateFormateMMDDYYYY
                  },
                  {
                        'data': 'offer',
                        'title': 'Offer'
                  },
                  {
                        'data': 'status',
                        'title': 'Status'
                  }
                  ,
                  {
                        'data': 'orderDate',
                        'title': 'Creation Date',
                        'type': 'datetime',
                        'render': this.dateFormateMMDDYYYY
                  },
                  {
                        'data': 'startDate',
                        'title': 'Start Date',
                        'type': 'datetime',
                        'render': this.dateFormateMMDDYYYY
                  },
                  {
                        'data': 'endDate',
                        'title': 'Expire Date',
                        'type': 'datetime',
                        'render': this.dateFormateMMDDYYYY
                  }

            ];
      }

}
