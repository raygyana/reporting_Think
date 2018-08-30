import { Injectable } from '@angular/core';
import { Constants } from '../../../shared/constant';
import { BaseService } from '../../../../core/base/base.service';
import { ProjectUtils } from '../../../shared/project-utils';
import { HttpService } from '../../../../core/http.service';

@Injectable()
export class CustomerDetailsService extends BaseService {

      constructor(
            protected httpService: HttpService
      ) {
            super(httpService)
      }


      getServiceURL(): string {
            return Constants.TK_CUSTOMER_DETAILS_URL;
      }

      addColumnsOption(dtOptions: any) {
            dtOptions['aaSorting'] = [];  // for disable starting sort
            // dtOptions['aoColumnDefs'] = [
            //       { 'bSortable': false, 'aTargets': [0, 1, 2, 3, 4, 5] }
            // ]
            dtOptions['columns'] = [
                  {
                        'data': 'identifier',
                        'title': 'Institutional  Identifier'
                  },
                  {
                        'data': 'oldCustId',
                        'title': 'Old Customer ID'
                  }, {
                        'data': 'custId',
                        'title': 'Customer ID'
                  }, {
                        'data': 'accountStatus',
                        'title': 'Account Status'
                  }, {
                        'data': 'addressType',
                        'title': ' Address Type'
                  }, {
                        'data': 'salutation',
                        'title': 'Salutation'
                  }, {
                        'data': 'custName',
                        'title': 'Customer Name'
                  }, {
                        'data': 'initial',
                        'title': 'Initial Name'
                  }, {
                        'data': 'suffix',
                        'title': 'Suffix'
                  }, {
                        'data': 'title',
                        'title': 'Title'
                  }, {
                        'data': 'company',
                        'title': 'Company'
                  }, {
                        'data': 'department',
                        'title': 'Department'
                  }, {
                        'data': 'address',
                        'title': 'Address'
                  }, {
                        'data': 'county',
                        'title': 'County'
                  }, {
                        'data': 'city',
                        'title': 'City'
                  }, {
                        'data': 'state',
                        'title': 'State'
                  }, {
                        'data': 'stateDescript',
                        'title': 'State Description'
                  }, {
                        'data': 'zip',
                        'title': 'Zip'
                  }, {
                        'data': 'country',
                        'title': 'Country'
                  }, {
                        'data': 'email',
                        'title': 'Email'
                  }, {
                        'data': 'phone',
                        'title': 'Phone'
                  }, {
                        'data': 'fax',
                        'title': 'Faxnbr'
                  }, {
                        'data': 'phone1',
                        'title': 'Phone1'
                  }, {
                        'data': 'spclTaxId',
                        'title': 'Special Tax ID'
                  }
                  //  {
                  //       'data': 'vatIDNumb',
                  //       'title': 'VAT ID Number'
                  // },
                  //  {
                  //       'data': 'disJournal',
                  //       'title': 'Dis Journals'
                  // },
                  // {
                  //       'data': 'disNew',
                  //       'title': 'Dis New'
                  // },
                  // {
                  //       'data': 'disRenew',
                  //       'title': 'Dis Renewal'
                  // }, {
                  //       'data': 'disMCNew',
                  //       'title': 'Dis MC New'
                  // }, {
                  //       'data': 'disMCRenew',
                  //       'title': 'Dis MC Renewals'
                  // }, {
                  //       'data': 'isBadDebtor',
                  //       'title': 'Is Bad Debtor'
                  // }, {
                  //       'data': 'creditTerm',
                  //       'title': 'Credit Terms'
                  // },
                  // {
                  //       'data': 'creditCurr',
                  //       'title': 'Credit Currency'
                  // },
                  // {
                  //       'data': 'creditLimit',
                  //       'title': 'Credit Limit'
                  // }
            ];
      }

      addColumnsOptionPhp(dtOptions: any) {
            dtOptions['aaSorting'] = [];  // for disable starting sort
            dtOptions['columns'] = [
                  {
                        'data': 'oldCustId',
                        'title': 'Old Customer ID'
                  }, {
                        'data': 'custId',
                        'title': 'Customer ID'
                  }, {
                        'data': 'accountStatus',
                        'title': 'Account Status'
                  }, {
                        'data': 'addressType',
                        'title': ' Address Type'
                  }, {
                        'data': 'salutation',
                        'title': 'Salutation'
                  }, {
                        'data': 'custName',
                        'title': 'Customer Name'
                  }, {
                        'data': 'initial',
                        'title': 'Initial Name'
                  }, {
                        'data': 'suffix',
                        'title': 'Suffix'
                  }, {
                        'data': 'title',
                        'title': 'Title'
                  }, {
                        'data': 'company',
                        'title': 'Company'
                  }, {
                        'data': 'department',
                        'title': 'Department'
                  }, {
                        'data': 'address',
                        'title': 'Address'
                  }, {
                        'data': 'county',
                        'title': 'County'
                  }, {
                        'data': 'city',
                        'title': 'City'
                  }, {
                        'data': 'state',
                        'title': 'State'
                  }, {
                        'data': 'stateDescript',
                        'title': 'State Description'
                  }, {
                        'data': 'zip',
                        'title': 'Zip'
                  }, {
                        'data': 'country',
                        'title': 'Country'
                  }, {
                        'data': 'email',
                        'title': 'Email'
                  }, {
                        'data': 'phone',
                        'title': 'Phone'
                  }, {
                        'data': 'fax',
                        'title': 'Faxnbr'
                  }, {
                        'data': 'phone1',
                        'title': 'Phone1'
                  }, {
                        'data': 'spclTaxId',
                        'title': 'Special Tax ID'
                  },
                  {
                        'data': 'vatIDNumb',
                        'title': 'VAT ID Number'
                  },
                  {
                        'data': 'disJournal',
                        'title': 'Dis Journals'
                  },
                  {
                        'data': 'disNew',
                        'title': 'Dis New'
                  },
                  {
                        'data': 'disRenew',
                        'title': 'Dis Renewal'
                  }, {
                        'data': 'disMCNew',
                        'title': 'Dis MC New'
                  }, {
                        'data': 'disMCRenew',
                        'title': 'Dis MC Renewals'
                  }, {
                        'data': 'isBadDebtor',
                        'title': 'Is Bad Debtor'
                  }, {
                        'data': 'creditTerm',
                        'title': 'Credit Terms'
                  },
                  {
                        'data': 'creditCurr',
                        'title': 'Credit Currency'
                  },
                  {
                        'data': 'creditLimit',
                        'title': 'Credit Limit'
                  }
            ];
      }
}
