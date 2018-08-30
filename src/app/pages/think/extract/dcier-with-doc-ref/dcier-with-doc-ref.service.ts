import { Injectable } from '@angular/core';
import { Constants } from '../../../shared/constant';
import { BaseService } from '../../../../core/base/base.service';
import { ProjectUtils } from '../../../shared/project-utils';
import { HttpService } from '../../../../core/http.service';
import { SessionObject } from 'app/pages/shared/session-object';


const salesByCatJSON = 'assets/json/salesbycat.json';

@Injectable()
export class DCIERWithDocRefService extends BaseService {

      constructor(
            protected httpService: HttpService
      ) {
            super(httpService)
      }

      getServiceURL(): string {
            return Constants.TK_DETAIL_CIRCULATION_DOC_REF_URL;
      }

      addColumnsOption(dtOptions: any) {
            dtOptions['columns'] = [
                  {
                        'data': 'oldBillCustId',
                        'title': 'Old Bill To Customer ID'
                  },
                  {
                        'data': 'billCustId',
                        'title': 'Bill To Customer ID'
                  },
                  {
                        'data': 'billCustName',
                        'title': 'Bill To Customer Name'
                  },
                  {
                        'data': 'billDepartment',
                        'title': 'Bill To Department'
                  },
                  {
                        'data': 'billCompany',
                        'title': 'Bill To Company'
                  },
                  {
                        'data': 'billAddress',
                        'title': 'Bill To Customer Address'
                  },
                  {
                        'data': 'billEmail',
                        'title': 'Bill To Email'
                  },
                  {
                        'data': 'billPhone',
                        'title': 'Bill To Phone'
                  },
                  {
                        'data': 'billFax',
                        'title': 'Bill To Fax Number'
                  },
                  {
                        'data': 'billMobile',
                        'title': 'Bill To Mobile'
                  },
                  {
                        'data': 'billState',
                        'title': 'Bill To State'
                  },
                  {
                        'data': 'billCountry',
                        'title': 'Bill To Country'
                  },
                  {
                        'data': 'oldShipCustId',
                        'title': 'Old Ship To Customer ID'
                  },
                  {
                        'data': 'shipCustId',
                        'title': 'Ship To Customer ID'
                  },
                  {
                        'data': 'shipCustName',
                        'title': 'Ship To Customer Name'
                  },
                  {
                        'data': 'shipDepartment',
                        'title': 'Ship To Department'
                  },
                  {
                        'data': 'shipCompany',
                        'title': 'Ship To Company'
                  },
                  {
                        'data': 'shipAddress',
                        'title': 'Ship To Customer Address'
                  },
                  {
                        'data': 'shipEmail',
                        'title': 'Ship To Email'
                  },
                  {
                        'data': 'shipPhone',
                        'title': 'Ship To Phone'
                  },
                  {
                        'data': 'shipFax',
                        'title': 'Ship To Fax'
                  },
                  {
                        'data': 'shipMobile',
                        'title': 'Ship To Mobile'
                  },
                  {
                        'data': 'shipState',
                        'title': 'Ship To State'
                  },
                  {
                        'data': 'shipCountry',
                        'title': 'Ship To Country'
                  },
                  {
                        'data': 'oldEndCustId',
                        'title': 'Old End User Customer ID'
                  },
                  {
                        'data': 'endCustId',
                        'title': 'End User Customer Id'
                  },
                  {
                        'data': 'endCustName',
                        'title': 'End User Customer Name'
                  },
                  {
                        'data': 'endDepartment',
                        'title': 'End User Department'
                  },
                  {
                        'data': 'endCompany',
                        'title': 'End User Company'
                  },
                  {
                        'data': 'endAddress',
                        'title': 'End User Address'
                  },
                  {
                        'data': 'endEmail',
                        'title': 'End User Email'
                  },
                  {
                        'data': 'endPhone',
                        'title': 'End User Phone'
                  },
                  {
                        'data': 'endFax',
                        'title': 'End User Fax Number'
                  },
                  {
                        'data': 'endState',
                        'title': 'End User State'
                  },
                  {
                        'data': 'endCountry',
                        'title': 'End User Country'
                  },
                  {
                        'data': 'productName',
                        'title': 'Journal Name'
                  },
                  {
                        'data': 'productCode',
                        'title': 'Product Code'
                  },
                  {
                        'data': 'volYear',
                        'title': 'Volume Year'
                  },
                  {
                        'data': 'volIssue',
                        'title': 'Vol/Iss'
                  },
                  {
                        'data': 'orderNum',
                        'title': 'Order No.'
                  },
                  {
                        'data': 'orderDate',
                        'title': 'Order Date',
                        'type': 'datetime',
                        'render': this.dateFormInDatatable
                  },
                  {
                        'data': 'orderStartDate',
                        'title': 'Start Date',
                        'type': 'datetime',
                        'render': this.dateFormInDatatable
                  },
                  {
                        'data': 'expDate',
                        'title': 'Expire Date'
                  },
                  {
                        'data': 'revMethod',
                        'title': 'Revenue Method'
                  },
                  {
                        'data': 'currency',
                        'title': 'Currency'
                  },
                  {
                        'data': 'netLocalAmt',
                        'title': 'Net Local Amount',
                        render: ProjectUtils.toFixedIfNumber
                  },
                  {
                        'data': 'netBaseAmt',
                        'title': 'Net Base Amount',
                        render: ProjectUtils.toFixedIfNumber
                  },
                  {
                        'data': 'taxAmt',
                        'title': 'Tax Amount(Base)',
                        render: ProjectUtils.toFixedIfNumber
                  },
                  {
                        'data': 'grossBaseAmt',
                        'title': 'Gross Base Amount',
                        render: ProjectUtils.toFixedIfNumber
                  },
                  {
                        'data': 'grossLocalAmt',
                        'title': 'Gross Local Amount',
                        render: ProjectUtils.toFixedIfNumber
                  },
                  {
                        'data': 'orderCode',
                        'title': 'Order Code'
                  },
                  {
                        'data': 'prCategory',
                        'title': 'Price Category'
                  },
                  {
                        'data': 'marketSector',
                        'title': 'Market Sector'
                  },
                  {
                        'data': 'renewalCategory',
                        'title': 'Renewal Category'
                  },
                  {
                        'data': 'orderType',
                        'title': 'Cash/Credit'
                  },
                  {
                        'data': 'priceType',
                        'title': 'Price Type'
                  },
                  {
                        'data': 'agency',
                        'title': 'Agency'
                  },
                  {
                        'data': 'sourceCode',
                        'title': 'Source Code'
                  },
                  {
                        'data': 'paymentType',
                        'title': 'Payment Type'
                  },
                  {
                        'data': 'payCurrAmt',
                        'title': 'Pay Currency Amount',
                        render: ProjectUtils.toFixedIfNumber
                  },
                  {
                        'data': 'orderStatus',
                        'title': 'Order Status'
                  },
                  {
                        'data': 'paymentStatus',
                        'title': 'Payment Status'
                  },
                  {
                        'data': 'termDay',
                        'title': 'Term Days'
                  },
                  {
                        'data': 'agentRefNbr',
                        'title': 'Agency Refernece Number'
                  },
                  {
                        'data': 'poNumber',
                        'title': 'PO Number'
                  },
                  {
                        'data': 'issn',
                        'title': 'Issn'
                  },
                  {
                        'data': 'qtySplit',
                        'title': 'Qty Split'
                  },
                  {
                        'data': 'quantity',
                        'title': 'Quantity'
                  },
                  {
                        'data': 'xpsRef',
                        'title': 'XPS Ref'
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
                        'title': 'Number of User'
                  },
                  {
                        'data': 'invoiceNo',
                        'title': 'Invoice No.'
                  },
                  {
                        'data': 'invoiceDate',
                        'title': 'Invoice Date',
                        'type': 'datetime',
                        'render': this.dateFormInDatatable
                  },
                  {
                        'data': 'docRef',
                        'title': 'DOC Refernece ID'
                  },
                  {
                        'data': 'batchID',
                        'title': 'Batch ID'
                  }

                  // {
                  //       'data': 'billAddress',
                  //       'title': 'Bill To Address'
                  // },
                  // {
                  //       'data': 'paymentDate',
                  //       'title': 'Payment Date',
                  //       'type': 'datetime',
                  //       'render': this.dateFormInDatatable
                  // },
                  // {
                  //       'data': 'salesType',
                  //       'title': 'Sales Type'
                  // },
                  // {
                  //       'data': 'orderCategory',
                  //       'title': 'Order Category'
                  // },
                  // {
                  //       'data': 'shipCustAddressSeq',
                  //       'title': 'Ship Customer Address'
                  // },
                  // {
                  //       'data': 'xpsRef',
                  //       'title': 'XPS Ref'
                  // },
                  //   {
                  //       'data': 'endDate',
                  //       'title': 'End Date',
                  // },
            ]
      }

}
