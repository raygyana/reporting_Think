import { Injectable, OnInit } from '@angular/core';
import { Constants } from '../../../shared/constant';
import { BaseService } from '../../../../core/base/base.service';
import { ProjectUtils } from '../../../shared/project-utils';
import { HttpService } from '../../../../core/http.service';

@Injectable()
export class AgencyDetailService extends BaseService {

      constructor(
            protected httpService: HttpService
      ) {
            super(httpService)
      }


      getServiceURL(): string {
            return Constants.TK_AGENCY_DETAIL;
      }

      addColumnsOption2(dtOptions: any) {
            dtOptions['aaSorting'] = [];
            dtOptions['columns'] = [
                  {
                        'data': 'oldCustId',
                        'title': 'Old Customer ID'
                  }, {
                        'data': 'custId',
                        'title': 'Customer ID'
                  }, {
                        'data': 'agencyCode',
                        'title': 'Agency Code'
                  }, {
                        'data': 'accountStatus',
                        'title': 'Account Status'
                  }, {
                        'data': 'addressType',
                        'title': 'Address Type'
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
                  },
                  //  {
                  //       'data': 'customerStatus',
                  //       'title': 'Customer Status'
                  // }, 
                  {
                        'data': 'quals',
                        'title': 'Quals'
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
                        'data': 'city',
                        'title': 'City'
                  }, {
                        'data': 'state',
                        'title': 'State'
                  }, {
                        'data': 'zip',
                        'title': 'Zip'
                  }, {
                        'data': 'stateDescript',
                        'title': 'State Description'
                  }, {
                        'data': 'county',
                        'title': 'Country'
                  }, {
                        'data': 'email',
                        'title': 'Email'
                  }, {
                        'data': 'phone',
                        'title': 'Phone'
                  }, {
                        'data': 'fax',
                        'title': 'Fax'
                  }, {
                        'data': 'phone1',
                        'title': 'Phone1'
                  }, {
                        'data': 'spclTaxId',
                        'title': 'Special Tax ID'
                  }, {
                        'data': 'vatIDNumb',
                        'title': 'VAT ID Number'
                  }, {
                        'data': 'disJournal',
                        'title': 'Journal'
                  }, {
                        'data': 'disNew',
                        'title': 'Dis New'
                  }, {
                        'data': 'disRenew',
                        'title': 'Dis Renewal'
                        // }, {
                        //       'data': 'discount',
                        //       'title': 'Discount'
                        // }, {
                        //       'data': 'institutional_identifier',
                        //       'title': 'Institutional Identifier'
                  }, {
                        'data': 'disMCNew',
                        'title': 'MC New'
                  }, {
                        'data': 'disMCRenew',
                        'title': 'MC Renew'
                  }, {
                        'data': 'isBadDebtor',
                        'title': 'Is Bad Debtor'
                  }, {
                        'data': 'creditTerm',
                        'title': 'Credit Term'
                  }, {
                        'data': 'creditCurr',
                        'title': 'Current Credit'
                  }, {
                        'data': 'creditLimit',
                        'title': 'Credit Limit'
                  }
            ];
      }


      addColumnsOptionUcp(dtOptions: any) {
            dtOptions['aaSorting'] = [];
            dtOptions['columns'] = [
                  // {
                  //       'data': 'institutional_identifier',
                  //       'title': 'Institutional Identifier'
                  // },
                  {
                        'data': 'oldCustId',
                        'title': 'Old Customer ID'
                  },
                  {
                        'data': 'custId',
                        'title': 'Customer ID'
                  },
                  {
                        'data': 'agencyCode',
                        'title': 'Agency Code'
                  },
                  {
                        'data': 'accountStatus',
                        'title': 'Account Status'
                  },
                  {
                        'data': 'addressType',
                        'title': 'Address Type'
                  },
                  {
                        'data': 'salutation',
                        'title': 'Salutation'
                  },
                  {
                        'data': 'custName',
                        'title': 'Customer Name'
                  },
                  {
                        'data': 'quals',
                        'title': 'Quals'
                  },
                  {
                        'data': 'title',
                        'title': 'Title'
                  },
                  {
                        'data': 'company',
                        'title': 'Company'
                  },
                  {
                        'data': 'department',
                        'title': 'Department'
                  },
                  {
                        'data': 'address',
                        'title': 'Address'
                  },
                  //  {
                  //       'data': 'county',
                  //       'title': 'County'
                  // },
                  {
                        'data': 'city',
                        'title': 'City'
                  }, {
                        'data': 'state',
                        'title': 'State'
                  }, {
                        'data': 'zip',
                        'title': 'Zip'
                  },
                  {
                        'data': 'stateDescript',
                        'title': 'State Description'
                  },
                  {
                        'data': 'country',
                        'title': 'Country'
                  },
                  // {
                  //       'data': 'creditCurr',
                  //       'title': 'Current Credit'
                  // }, {
                  //       'data': 'creditLimit',
                  //       'title': 'Credit Limit'
                  // }, {
                  //       'data': 'creditTerm',
                  //       'title': 'Credit Term'
                  // }, {
                  //       'data': 'customerStatus',
                  //       'title': 'Customer Status'
                  // }, {
                  //       'data': 'disJournal',
                  //       'title': 'Journal'
                  // },
                  // {
                  //       'data': 'disMCNew',
                  //       'title': 'MC New'
                  // },
                  // {
                  //       'data': 'disMCRenew',
                  //       'title': 'MC Renew'
                  // }, {
                  //       'data': 'disNew',
                  //       'title': 'Dis New'
                  // }, {
                  //       'data': 'disRenew',
                  //       'title': 'Renew'
                  // },
                  {
                        'data': 'email',
                        'title': 'Email'
                  },
                  {
                        'data': 'phone',
                        'title': 'Phone'
                  }, {
                        'data': 'fax',
                        'title': 'Fax'
                  }, {
                        'data': 'phone1',
                        'title': 'Phone1'
                  }, {
                        'data': 'discount',
                        'title': 'Discount'
                  }, {
                        'data': 'spclTaxId',
                        'title': 'Special Tax ID'
                  }
            ];
      }
}
