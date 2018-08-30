import { Injectable } from '@angular/core';
import { Constants } from '../../../shared/constant';
import { BaseService } from '../../../../core/base/base.service';

@Injectable()
export class AtyponCompsService extends BaseService {


      getServiceURL(): string {
            return Constants.TK_SALES_ATYPON_COMPS_REPORT_URL;
      }


      addColumnsOption(dtOptions: any) {
            dtOptions['columns'] = [
                  {
                        'data': 'customerId',
                        'title': 'Customer Id'
                  },
                  {
                        'data': 'initial',
                        'title': 'Initial'
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
                        'title': 'Company Name'
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
                  },
                  {
                        'data': 'state',
                        'title': 'State'
                  },
                  {
                        'data': 'country',
                        'title': 'Country'
                  },
                  {
                        'data': 'zip',
                        'title': 'Zip'
                  },
                  {
                        'data': 'email',
                        'title': 'Email'
                  },
                  {
                        'data': 'issn',
                        'title': 'ISSN'
                  },
                  {
                        'data': 'startIssVol',
                        'title': 'Start Iss Vol'
                  },
                  {
                        'data': 'startIssEnum',
                        'title': 'Start Iss Enum'
                  },
                  {
                        'data': 'expIssVol',
                        'title': 'Exp Iss Vol'
                  },
                  {
                        'data': 'expIssEnum',
                        'title': 'Exp Iss Enum'
                  },
                  {
                        'data': 'issExpireDate',
                        'title': 'Iss-Expire Date',
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
                  },
                  {
                        'data': 'orderDate',
                        'title': 'Order Date',
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
