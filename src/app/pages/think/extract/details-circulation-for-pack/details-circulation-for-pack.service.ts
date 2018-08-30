import { Injectable } from '@angular/core';
import { Constants } from '../../../shared/constant';
import { BaseService } from '../../../../core/base/base.service';
import { ProjectUtils } from '../../../shared/project-utils';
import { HttpService } from '../../../../core/http.service';

@Injectable()
export class DetailCirculationService extends BaseService {

      constructor(
            protected httpService: HttpService
      ) {
            super(httpService)
      }
      getServiceURL(): string {
            return Constants.TK_DETAILS_CIRCULATION_FOR_PACK_URL;
      }

      addColumnsOptionUCP(dtOptions: any) {
            dtOptions['columns'] = [
                  {
                        'data': 'oldBillCustId',
                        'title': ' Old Bill To Customer ID'
                  },

                  {
                        'data': 'billCustId',
                        'title': ' Bill To Customer Id'
                  },
                  {
                        'data': 'billCustAddressSeq',
                        'title': 'Bill To Customer Address Seq'
                  },
                  {
                        'data': 'billCustName',
                        'title': ' Bill To Name'
                  }, {
                        'data': 'billDepartment',
                        'title': 'Bill To Department'
                  }, {
                        'data': 'billCompany',
                        'title': 'Bill To Company'
                  }, {
                        'data': 'billAddress',
                        'title': 'Bill To Address'
                  },
                  {
                        'data': 'billEmail',
                        'title': 'Bill To Email'
                  }, {
                        'data': 'billPhone',
                        'title': 'Bill To Phone'
                  }, {
                        'data': 'billFax',
                        'title': 'Bill To Faxnbr'
                  }, {
                        'data': 'billMobile',
                        'title': 'Bill To Mobile'
                  }, {
                        'data': 'billState',
                        'title': 'Bill To State'
                  }, {
                        'data': 'billCountry',
                        'title': 'Bill To Country'
                  },
                  {
                        'data': 'billZip',
                        'title': 'Bill To Zip/Postal Code'
                  },
                  {
                        'data': 'oldShipCustId',
                        'title': 'Old Ship To ID'
                  }, {
                        'data': 'shipCustId',
                        'title': 'Ship To Customer ID'
                  }, {
                        'data': 'shipCustAddressSeq',
                        'title': 'Ship To Customer Address Seq'
                  }, {
                        'data': 'shipCustName',
                        'title': 'Ship To Name'
                  }, {
                        'data': 'shipDepartment',
                        'title': 'Ship To Department'
                  }, {
                        'data': 'shipCompany',
                        'title': 'Ship To Company'
                  }, {
                        'data': 'shipAddress',
                        'title': 'Ship To Address'
                  },

                  {
                        'data': 'shipEmail',
                        'title': 'Ship To Email'
                  }, {
                        'data': 'shipPhone',
                        'title': 'Ship To Phone'
                  }, {
                        'data': 'shipFax',
                        'title': 'Ship To Faxnbr'
                  }, {
                        'data': 'shipMobile',
                        'title': 'Ship To Mobile'
                  },
                  {
                        'data': 'shipState',
                        'title': 'Ship To State'
                  }, {
                        'data': 'shipCountry',
                        'title': 'Ship To Country'
                  },
                  {
                        'data': 'shipZip',
                        'title': 'Ship To Zip/Postal Code'
                  }, {
                        'data': 'oldEndCustId',
                        'title': 'OLd EndUser Customer ID'
                  }, {
                        'data': 'endCustId',
                        'title': 'EndUser Customer ID'
                  }, {
                        'data': 'endCustAddressSeq',
                        'title': 'End User Customer Address Seq'
                  }, {
                        'data': 'endCustName',
                        'title': 'EndUser Name'
                  },
                  {
                        'data': 'endDepartment',
                        'title': 'EndUser Department'
                  }, {
                        'data': 'endCompany',
                        'title': 'EndUser Company'
                  }, {
                        'data': 'endAddress',
                        'title': 'EndUser Address'
                  },
                  {
                        'data': 'endEmail',
                        'title': 'EndUser Email'
                  },
                  {
                        'data': 'endMobile',
                        'title': 'EndUser Mobile'
                  }, {
                        'data': 'endFax',
                        'title': 'EndUser Faxnbr'
                  }, {
                        'data': 'endPhone',
                        'title': 'EndUser Phone'
                  },
                  {
                        'data': 'endState',
                        'title': 'EndUser State'
                  }, {
                        'data': 'endCountry',
                        'title': 'EndUser Country'
                  },
                  {
                        'data': 'endZip',
                        'title': 'End User Zip/Postal Code'
                  },
                  {
                        'data': 'productName',
                        'title': 'Product Name'
                  },
                  {
                        'data': 'volYear',
                        'title': 'Volume Year'
                  }, {
                        'data': 'volIssue',
                        'title': ' Vol/Iss'
                  }, {
                        'data': 'orderNum',
                        'title': ' Order No.'
                  },
                  {
                        'data': 'orderSeq',
                        'title': 'Order Item Seq'
                  },
                  {
                        'data': 'pkgItemSeq',
                        'title': 'Package Item Seq'
                  },
                  {
                        'data': 'orderDate',
                        'title': 'Order Date',
                        'type': 'datetime',
                        'render': this.dateFormateMMDDYYYY
                  }, {
                        'data': 'orderStartDate',
                        'title': 'Start Date',
                        'type': 'datetime',
                        'render': this.dateFormateMMDDYYYY
                  }, {
                        'data': 'expDate',
                        'title': 'Expire Date',
                        'type': 'datetime',
                        'render': this.dateFormateMMDDYYYY
                  },
                  {
                        'data': 'subsId',
                        'title': 'Subscription Id'
                  }, {
                        'data': 'revMethod',
                        'title': 'Revenue Method'
                  }, {
                        'data': 'currency',
                        'title': 'Currency'
                  }, {
                        'data': 'netLocalAmt',
                        'title': ' Net Local Amount',
                        render: ProjectUtils.toFixedIfNumber
                  }, {
                        'data': 'netBaseAmt',
                        'title': 'Net Base Amount',
                        render: ProjectUtils.toFixedIfNumber
                  }, {
                        'data': 'taxAmt',
                        'title': 'Tax Amount(Base)',
                        render: ProjectUtils.toFixedIfNumber
                  }, {
                        'data': 'shipCharge',
                        'title': 'Shipping charges',
                        render: ProjectUtils.toFixedIfNumber
                  }, {
                        'data': 'grossLocalAmt',
                        'title': 'Gross Local Amount',
                        render: ProjectUtils.toFixedIfNumber
                  }, {
                        'data': 'grossBaseAmt',
                        'title': 'Gross Base Amount',
                        render: ProjectUtils.toFixedIfNumber
                  }, {
                        'data': 'orderCode',
                        'title': 'Order Code'
                  }, {
                        'data': 'prCategory',
                        'title': 'Price Category'
                  }, {
                        'data': 'marketSector',
                        'title': 'Market Sector'
                  }, {
                        'data': 'renewalCategory',
                        'title': 'Renewal Category'
                  }, {
                        'data': 'cashCredit',
                        'title': ' Cash'
                  }, {
                        'data': 'priceType',
                        'title': 'Price Type'
                  }, {
                        'data': 'agency',
                        'title': 'Agency'
                  }, {
                        'data': 'sourceCode',
                        'title': 'Source Code'
                  },

                  {
                        'data': 'paymentType',
                        'title': 'Payment Type'
                  }, {
                        'data': 'payCurrAmt',
                        'title': 'Pay Currency Amount',
                        render: ProjectUtils.toFixedIfNumber
                  }, {
                        'data': 'orderStatus',
                        'title': 'Order Status'
                  }, {
                        'data': 'paymentStatus',
                        'title': 'Payment Status'
                  }, {
                        'data': 'paymentDate',
                        'title': 'Payment Date',
                        'type': 'datetime',
                        'render': this.dateFormateMMDDYYYY
                  },
                  {
                        'data': 'salesType',
                        'title': 'Sales Type'
                  }, {
                        'data': 'termDay',
                        'title': 'Term Days'
                  }, {
                        'data': 'agentRefNbr',
                        'title': 'Agent Ref Nbr'
                  }, {
                        'data': 'poNumber',
                        'title': 'PO Number'
                  }, {
                        'data': 'quantity',
                        'title': 'Quantity'
                  }, {
                        'data': 'discountCode',
                        'title': 'Discount Code'
                  }

            ];
      }

      addColumnsOption(dtOptions: any) {
            dtOptions['columns'] = [
                  {
                        'data': 'oldBillCustId',
                        'title': ' Old Bill To Customer ID'
                  },
                  // {
                  //       'data': 'subsId',
                  //       'title': 'Subscription Id'
                  // },
                  {
                        'data': 'billCustId',
                        'title': ' Bill To Customer Id'
                  },
                  {
                        'data': 'billCustName',
                        'title': ' Bill To Name'
                  }, {
                        'data': 'billDepartment',
                        'title': 'Bill To Department'
                  }, {
                        'data': 'billCompany',
                        'title': 'Bill To Company'
                  }, {
                        'data': 'billAddress',
                        'title': 'Bill To Address'
                  },
                  {
                        'data': 'billEmail',
                        'title': 'Bill To Email'
                  }, {
                        'data': 'billPhone',
                        'title': 'Bill To Phone'
                  }, {
                        'data': 'billFax',
                        'title': 'Bill To Faxnbr'
                  }, {
                        'data': 'billMobile',
                        'title': 'Bill To Mobile'
                  }, {
                        'data': 'billState',
                        'title': 'Bill To State'
                  }, {
                        'data': 'billCountry',
                        'title': 'Bill To Country'
                  },
                  {
                        'data': 'billZip',
                        'title': 'Bill To Zip/Postal Code'
                  },
                  {
                        'data': 'oldShipCustId',
                        'title': 'Old Ship To ID'
                  }, {
                        'data': 'shipCustId',
                        'title': 'Ship To Customer ID'
                  }, {
                        'data': 'shipCustName',
                        'title': 'Ship To Name'
                  },
                  {
                        'data': 'shipDepartment',
                        'title': 'Ship To Department'
                  }, {
                        'data': 'shipCompany',
                        'title': 'Ship To Company'
                  }, {
                        'data': 'shipAddress',
                        'title': 'Ship To Address'
                  },
                  // {
                  //       'data': 'shipCharge',
                  //       'title': 'Shipping charges',
                  // },
                  {
                        'data': 'shipEmail',
                        'title': 'Ship To Email'
                  }, {
                        'data': 'shipPhone',
                        'title': 'Ship To Phone'
                  }, {
                        'data': 'shipFax',
                        'title': 'Ship To Faxnbr'
                  }, {
                        'data': 'shipMobile',
                        'title': 'Ship To Mobile'
                  },
                  {
                        'data': 'shipState',
                        'title': 'Ship To State'
                  }, {
                        'data': 'shipCountry',
                        'title': 'Ship To Country'
                  },
                  {
                        'data': 'shipZip',
                        'title': 'Ship To Zip/Postal Code'
                  }, {
                        'data': 'oldEndCustId',
                        'title': 'OLd EndUser Customer ID'
                  }, {
                        'data': 'endCustId',
                        'title': 'EndUser Customer ID'
                  }, {
                        'data': 'endCustName',
                        'title': 'EndUser Name'
                  },
                  {
                        'data': 'endDepartment',
                        'title': 'EndUser Department'
                  }, {
                        'data': 'endCompany',
                        'title': 'EndUser Company'
                  }, {
                        'data': 'endAddress',
                        'title': 'EndUser Address'
                  },
                  {
                        'data': 'endEmail',
                        'title': 'EndUser Email'
                  },
                  {
                        'data': 'endMobile',
                        'title': 'EndUser Mobile'
                  }, {
                        'data': 'endFax',
                        'title': 'EndUser Faxnbr'
                  }, {
                        'data': 'endPhone',
                        'title': 'EndUser Phone'
                  },
                  {
                        'data': 'endState',
                        'title': 'EndUser State'
                  }, {
                        'data': 'endCountry',
                        'title': 'EndUser Country'
                  },
                  //            {
                  //       'data': 'endZip',
                  //       'title': 'End User Zip/Postal Code'
                  // },
                  {
                        'data': 'productName',
                        'title': 'Product Name'
                  },
                  {
                        'data': 'productCode',
                        'title': 'Product Code'
                  },
                  {
                        'data': 'volYear',
                        'title': 'Volume Year'
                  }, {
                        'data': 'volIssue',
                        'title': ' Vol/Iss'
                  }, {
                        'data': 'orderNum',
                        'title': ' Order No.'
                  },
                  // {
                  //       'data': 'orderSeq',
                  //       'title': 'Order Item Seq'
                  // },
                  // {
                  //       'data': 'pkgItemSeq',
                  //       'title': 'Package Item Seq'
                  // },

                  {
                        'data': 'orderDate',
                        'title': 'Order Date',
                        'type': 'datetime',
                        'render': this.dateFormateMMDDYYYY
                  }, {
                        'data': 'orderStartDate',
                        'title': 'Start Date',
                        'type': 'datetime',
                        'render': this.dateFormateMMDDYYYY
                  }, {
                        'data': 'expDate',
                        'title': 'Expire Date',
                        'type': 'datetime',
                        'render': this.dateFormateMMDDYYYY
                  }, {
                        'data': 'revMethod',
                        'title': 'Revenue Method'
                  }, {
                        'data': 'currency',
                        'title': 'Currency'
                  }, {
                        'data': 'netLocalAmt',
                        'title': ' Net Local Amount',
                        render: ProjectUtils.toFixedIfNumber
                  }, {
                        'data': 'netBaseAmt',
                        'title': 'Net Base Amount',
                        render: ProjectUtils.toFixedIfNumber
                  }, {
                        'data': 'taxAmt',
                        'title': 'Tax Amount(Base)',
                        render: ProjectUtils.toFixedIfNumber
                  }, {
                        'data': 'grossLocalAmt',
                        'title': 'Gross Local Amount',
                        render: ProjectUtils.toFixedIfNumber
                  }, {
                        'data': 'grossBaseAmt',
                        'title': 'Gross Base Amount',
                        render: ProjectUtils.toFixedIfNumber
                  }, {
                        'data': 'orderCode',
                        'title': 'Order Code'
                  }, {
                        'data': 'prCategory',
                        'title': 'Price Category'
                  }, {
                        'data': 'marketSector',
                        'title': 'Market Sector'
                  }, {
                        'data': 'renewalCategory',
                        'title': 'Renewal Category'
                  }, {
                        'data': 'cashCredit',
                        'title': ' Cash'
                  }, {
                        'data': 'priceType',
                        'title': 'Price Type'
                  }, {
                        'data': 'agency',
                        'title': 'Agency'
                  }, {
                        'data': 'sourceCode',
                        'title': 'Source Code'
                  },
                  //  {
                  //       'data': 'discountCode',
                  //       'title': 'Discount Code'
                  // },
                  // {
                  //       'data': 'paymentDate',
                  //       'title': 'Payment Date'
                  // },
                  {
                        'data': 'paymentType',
                        'title': 'Payment Type'
                  }, {
                        'data': 'payCurrAmt',
                        'title': 'Pay Currency Amount',
                        render: ProjectUtils.toFixedIfNumber
                  }, {
                        'data': 'orderStatus',
                        'title': 'Order Status'
                  }, {
                        'data': 'paymentStatus',
                        'title': 'Payment Status'
                  },
                  // {
                  //       'data': 'salesType',
                  //       'title': 'Sales Type'
                  // }
                  {
                        'data': 'termDay',
                        'title': 'Term Days'
                  }, {
                        'data': 'agentRefNbr',
                        'title': 'Agent Ref Nbr'
                  }, {
                        'data': 'poNumber',
                        'title': 'PO Number'
                  },
                  {
                        'data': 'issn',
                        'title': 'ISSN'
                  },
                  {
                        'data': 'quantity',
                        'title': 'Quantity'
                  },
                  {
                        'data': 'xpsRef',
                        'title': 'Xps Ref'
                  },
                  {
                        'data': 'salesRep',
                        'title': 'Sales Representative'
                  },
                  {
                        'data': 'dispatchMethod',
                        'title': 'Dispatch Method'
                  },
                  {
                        'data': 'usersNumb',
                        'title': 'Number Of User'
                  },
                  {
                        'data': 'invoiceDate',
                        'title': 'Invoice Date',
                        'type': 'datetime',
                        'render': this.dateFormateMMDDYYYY
                  },
                  {
                        'data': 'invoiceNo',
                        'title': 'Invoice No'
                  },
                  {
                        'data': 'creditTerm',
                        'title': ' Credit Term'
                  },
                  {
                        'data': 'orderType',
                        'title': 'Order Type',

                  },
                  {
                        'data': 'welcomePack',
                        'title': 'Welcome Pack'
                  },
                  {
                        'data': 'userLic',
                        'title': 'User License'
                  }
            ];
      }
}
