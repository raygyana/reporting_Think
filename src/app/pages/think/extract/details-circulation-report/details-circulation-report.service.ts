import { Injectable } from '@angular/core';
import { Constants } from '../../../shared/constant';
import { BaseService } from '../../../../core/base/base.service';
import { ProjectUtils } from '../../../shared/project-utils';
import { HttpService } from '../../../../core/http.service';
import { SessionObject } from 'app/pages/shared/session-object';


const salesByCatJSON = 'assets/json/salesbycat.json';

@Injectable()
export class DetailsCirculationReportService extends BaseService {

    constructor(
        protected httpService: HttpService
    ) {
        super(httpService)
    }


    getServiceURL(): string {

        return Constants.TK_DETAIL_CIRCULATION_URL;
    }


    addColumnsOptionUCP(dtOptions: any) {
        dtOptions['columns'] = [
            {
                'data': 'oldBillCustId',
                'title': 'Old Bill To Customer ID'
            },
            {
                'data': 'billCustId',
                'title': 'Bill To Customer Id'
            },
            {
                'data': 'billCustAddressSeq',
                'title': 'Bill To Customer Address Seq'
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
                'title': 'Bill To Address'
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
                'title': 'Bill To Fax number'
            },
            {
                'data': 'billMobile',
                'title': 'Bill To Mobile',
            },
            {
                'data': 'billState',
                'title': 'Bill To State',
            },
            {
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
            },
            {
                'data': 'shipCustId',
                'title': 'Ship To Customer Id'
            },
            {
                'data': 'shipCustAddressSeq',
                'title': 'Ship To Customer Address Seq'
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
                'title': 'Ship To Address'
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
                'title': 'Ship To Fax number'
            },
            {
                'data': 'shipMobile',
                'title': 'Ship To Mobile',
            },
            {
                'data': 'shipState',
                'title': 'Ship To State',
            },
            {
                'data': 'shipCountry',
                'title': 'Ship To Country'
            },
            {
                'data': 'shipZip',
                'title': 'Ship To Zip/Postal Code'
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
                'data': 'endCustAddressSeq',
                'title': 'End User Customer Address Seq'
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
                'title': 'End User Fax number'
            },
            {
                'data': 'endMobile',
                'title': 'End User Mobile',
            },
            {
                'data': 'endState',
                'title': 'End User State',
            },
            {
                'data': 'endCountry',
                'title': 'End User Country'
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
                'title': 'Expire Date',
                'type': 'datetime',
                'render': this.dateFormInDatatable
            },
            {
                'data': 'subsId',
                'title': 'Subscription Id'
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
                'title': 'Net Local Amount'
            },
            {
                'data': 'netBaseAmt',
                'title': 'Net Base Amount',
            },
            {
                'data': 'taxAmt',
                'title': 'Tax Amount(Base)',
                render: ProjectUtils.toFixedIfNumber
            },
            {
                'data': 'shipAmt',
                'title': 'Shipping Charges',
                render: ProjectUtils.toFixedIfNumber
            },
            {
                'data': 'grossLocalAmt',
                'title': 'Gross Local Amt',
                render: ProjectUtils.toFixedIfNumber
            },
            {
                'data': 'grossBaseAmt',
                'title': 'Gross Base Amount',
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
                'title': 'Order Type',
            },
            {
                'data': 'priceType',
                'title': 'Price Type',
            },
            {
                'data': 'agency',
                'title': 'Agency',
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
                'render': ProjectUtils.toFixedIfNumber
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
                'data': 'paymentDate',
                'title': 'Payment Date',
                'type': 'datetime',
                'render': this.dateFormInDatatable
            },
            {
                'data': 'termDay',
                'title': 'Term Days'
            },
            {
                'data': 'agentRefNbr',
                'title': 'Agent Ref Nbr'
            },
            {
                'data': 'poNumber',
                'title': 'PO Number'
            },
            {
                'data': 'quantity',
                'title': 'Quantity'
            },
            {
                'data': 'discountCode',
                'title': 'Discount Code'
            },
            {
                'data': 'salesType',
                'title': 'Sales Type'
            },
            {
                'data': 'orderCategory',
                'title': 'Order Category'
            }

        ]
    }


    addColumnsOption(dtOptions: any) {
        dtOptions['columns'] = [
            {
                'data': 'oldBillCustId',
                'title': 'Old Bill To Customer ID'
            },
            {
                'data': 'billCustId',
                'title': 'Bill To Customer Id'
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
                'title': 'Bill To Address'
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
                'title': 'Bill To Fax number'
            },
            {
                'data': 'billMobile',
                'title': 'Bill To Mobile',
            },
            {
                'data': 'billState',
                'title': 'Bill To State',
            },
            {
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
            },
            {
                'data': 'shipCustId',
                'title': 'Ship To Customer Id'
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
                'title': 'Ship To Address'
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
                'title': 'Ship To Fax number'
            },
            {
                'data': 'shipMobile',
                'title': 'Ship To Mobile',
            },
            {
                'data': 'shipState',
                'title': 'Ship To State',
            },
            {
                'data': 'shipCountry',
                'title': 'Ship To Country'
            },
            {
                'data': 'shipZip',
                'title': 'Ship To Zip/Postal Code'
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
                'title': 'End User Fax number'
            },
            {
                'data': 'endMobile',
                'title': 'End User Mobile',
            },
            {
                'data': 'endState',
                'title': 'End User State',
            },
            {
                'data': 'endCountry',
                'title': 'End User Country'
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
                'title': 'Expire Date',
                'type': 'datetime',
                'render': this.dateFormInDatatable
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
            // {
            //     'data': 'shipAmt',
            //     'title': 'Shipping Charges',
            //     render: ProjectUtils.toFixedIfNumber
            // },
            {
                'data': 'grossLocalAmt',
                'title': 'Gross Local Amt',
                render: ProjectUtils.toFixedIfNumber
            },
            {
                'data': 'grossBaseAmt',
                'title': 'Gross Base Amount',
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
                'data': 'userLic',
                'title': 'User License'
            },
            {
                'data': 'renewalCategory',
                'title': 'Renewal Category'
            },
            {
                'data': 'cashCredit',
                'title': 'Cash/credit'
            },
            {
                'data': 'priceType',
                'title': 'Price Type',
            },
            {
                'data': 'agency',
                'title': 'Agency',
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
                'title': 'Agent Ref Nbr'
            },
            {
                'data': 'poNumber',
                'title': 'PO Number'
            },
            {
                'data': 'issn',
                'title': 'ISSN'
            },
            {
                'data': 'quantity',
                'title': 'Qty Split'
            },
            {
                'data': 'qtySplit',
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
                'title': 'Number of Users'
            },
            {
                'data': 'invoiceNo',
                'title': 'Invoice Number'
            },
            {
                'data': 'invoiceDate',
                'title': 'Invoice Date'
            },
            {
                'data': 'orderType',
                'title': 'Order Type',
            },
            {
                'data': 'welcomePack',
                'title': 'Welcome Pack '
            },
            {
                'data': 'distributor',
                'title': 'Distributor '
            }
        ]
    }

}
