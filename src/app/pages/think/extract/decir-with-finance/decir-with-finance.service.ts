import { Injectable } from '@angular/core';
import { Constants } from '../../../shared/constant';
import { BaseService } from '../../../../core/base/base.service';
import { ProjectUtils } from '../../../shared/project-utils';
import { HttpService } from '../../../../core/http.service';

@Injectable()
export class DecirWithFinanceService extends BaseService {

      constructor(
            protected httpService: HttpService
      ) {
            super(httpService)
      }


      getServiceURL(): string {
            return Constants.TK_DECIR_WITH_FINANCE_URL;
      }

      addColumnsOption(dtOptions: any) {
            dtOptions['aaSorting'] = [];  // for disable starting sort
            // dtOptions['aoColumnDefs'] = [
            //       { 'bSortable': false, 'aTargets': [0, 1, 2, 3, 4, 5] }
            // ]
            dtOptions['columns'] = [
                  {
                        'data': 'bill_to_old_customer_id',
                        'title': 'Bill To Old Customer ID'
                  },
                  {
                        'data': 'bill_to_customer_id',
                        'title': 'Bill To Customer ID'
                  },
                  {
                        'data': 'bill_to_fname',
                        'title': 'Bill To FName'
                  }, {
                        'data': 'bill_to_lname',
                        'title': 'Bill To LName'
                  }, {
                        'data': 'bill_to_department',
                        'title': 'Bill To Department'
                  }, {
                        'data': 'bill_to_company',
                        'title': 'Bill To Company'
                  }, {
                        'data': 'bill_to_address1',
                        'title': 'Bill To Address1'
                  }, {
                        'data': 'bill_to_address2',
                        'title': 'Bill To Address2'
                  }, {
                        'data': 'bill_to_address3',
                        'title': 'Bill To Address3'
                  }, {
                        'data': 'bill_to_city',
                        'title': 'Bill To City'
                  }, {
                        'data': 'bill_to_email',
                        'title': 'Bill To Email'
                  }, {
                        'data': 'bill_to_phone',
                        'title': 'Bill To Phone'
                  }, {
                        'data': 'bill_to_faxnbr',
                        'title': 'Bill To Faxnbr'
                  }, {
                        'data': 'bill_to_mobile',
                        'title': 'Bill To Mobile'
                  }, {
                        'data': 'bill_to_state',
                        'title': 'Bill To State'
                  }, {
                        'data': 'bill_to_country',
                        'title': 'Bill To Country'
                  },
                  {
                        'data': 'bill_to_zip',
                        'title': 'Bill To Zip'
                  },
                  {
                        'data': 'old_ship_to_id',
                        'title': 'Old Ship To ID'
                  }, {
                        'data': 'ship_to_customer_id',
                        'title': 'Ship To Customer ID'
                  }, {
                        'data': 'ship_to_fname',
                        'title': 'Ship To FName'
                  }, {
                        'data': 'ship_to_lname',
                        'title': 'Ship To LName'
                  }, {
                        'data': 'ship_to_department',
                        'title': 'Ship To Department'
                  }, {
                        'data': 'ship_to_company',
                        'title': 'Ship To Company'
                  }, {
                        'data': 'ship_to_city',
                        'title': 'Ship To City'
                  }, {
                        'data': 'ship_to_state',
                        'title': 'Ship To State'
                  }, {
                        'data': 'ship_to_address1',
                        'title': 'Ship To Address1'
                  }, {
                        'data': 'ship_to_address2',
                        'title': 'Ship To Address2'
                  }, {
                        'data': 'ship_to_address3',
                        'title': 'Ship To Address3'
                  }, {
                        'data': 'ship_to_country',
                        'title': 'Ship To Country'
                  }, {
                        'data': 'ship_to_email',
                        'title': 'Ship To Email'
                  }, {
                        'data': 'ship_to_mobile',
                        'title': 'Ship To Mobile'
                  },
                  {
                        'data': 'ship_to_faxnbr',
                        'title': 'Ship To Faxnbr'
                  },
                  {
                        'data': 'ship_to_phone',
                        'title': 'Ship To Phone'
                  }, {
                        'data': 'ship_to_zip',
                        'title': 'Ship To Zip'
                  }, {
                        'data': 'enduser_old_customer_id',
                        'title': 'EndUser Old Customer ID'
                  }, {
                        'data': 'enduser_customer_id',
                        'title': 'EndUser Customer ID'
                  }, {
                        'data': 'enduser_fname',
                        'title': 'EndUser FName'
                  }, {
                        'data': 'enduser_lname',
                        'title': 'EndUser LName'
                  }, {
                        'data': 'enduser_department',
                        'title': 'EndUser Department'
                  }, {
                        'data': 'enduser_company',
                        'title': 'EndUser Company'
                  }, {
                        'data': 'enduser_city',
                        'title': 'EndUser City'
                  }, {
                        'data': 'enduser_state',
                        'title': 'EndUser State'
                  }, {
                        'data': 'enduser_address1',
                        'title': 'EndUser Address1'
                  }, {
                        'data': 'enduser_address2',
                        'title': 'EndUser Address2'
                  }, {
                        'data': 'enduser_address3',
                        'title': 'EndUser Address3'
                  }, {
                        'data': 'enduser_country',
                        'title': 'EndUser Country'
                  },
                  {
                        'data': 'enduser_email',
                        'title': 'EndUser Email'
                  },
                  {
                        'data': 'enduser_mobile',
                        'title': 'EndUser Mobile'
                  }, {
                        'data': 'enduser_faxnbr',
                        'title': 'EndUser Faxnbr'
                  }, {
                        'data': 'enduser_phone',
                        'title': 'EndUser Phone'
                  }, {
                        'data': 'enduser_zip',
                        'title': 'EndUser Zip'
                  }, {
                        'data': 'journalName',
                        'title': 'Journal Name'
                  }, {
                        'data': 'product_code',
                        'title': 'Product Code'
                  }, {
                        'data': 'volume_year',
                        'title': 'Volume Year'
                  }, {
                        'data': 'enumeration',
                        'title': 'Enumeration'
                  }, {
                        'data': 'order_id',
                        'title': 'Order ID'
                  }, {
                        'data': 'order_date',
                        'title': 'Order Date',
                        'type': 'datetime',
                        'render': this.dateFormateMMDDYYYY
                  }, {
                        'data': 'start_date',
                        'title': 'Start Date',
                        'type': 'datetime',
                        'render': this.dateFormateMMDDYYYY
                  }, {
                        'data': 'expire',
                        'title': 'Expire Date',
                        'type': 'datetime',
                        'render': this.dateFormateMMDDYYYY
                  }, {
                        'data': 'revenue_method',
                        'title': 'Revenue Method'
                  }, {
                        'data': 'cash_credit',
                        'title': 'Cash/Credit'
                  }, {
                        'data': 'currency',
                        'title': 'Currency'
                  }, {
                        'data': 'netLocalAmt',
                        'title': 'Net Local Amt',
                        render: ProjectUtils.toFixedIfNumber
                  }, {
                        'data': 'netBaseAmt',
                        'title': 'Net Base Amt',
                        render: ProjectUtils.toFixedIfNumber
                  }, {
                        'data': 'taxAmtountBase',
                        'title': 'Tax Amount Base',
                        render: ProjectUtils.toFixedIfNumber
                  }, {
                        'data': 'grossLocalAmt',
                        'title': 'Gross Local Amt',
                        render: ProjectUtils.toFixedIfNumber
                  }, {
                        'data': 'grossBaseAmt',
                        'title': 'Gross Base Amt',
                        render: ProjectUtils.toFixedIfNumber
                  }, {
                        'data': 'order_code_description',
                        'title': 'Order Code Description'
                  }, {
                        'data': 'price_category',
                        'title': 'Price Category'
                  }, {
                        'data': 'market_sector',
                        'title': 'Market Sector'
                  }, {
                        'data': 'renewal_category',
                        'title': 'Renewal Category'
                  }, {
                        'data': 'price_type',
                        'title': 'Price Type'
                  }, {
                        'data': 'source_code',
                        'title': 'Source Code'
                  }, {
                        'data': 'agency_company',
                        'title': 'Agency Company'
                  }, {
                        'data': 'payment_type',
                        'title': 'Payment Type'
                  }, {
                        'data': 'pay_currency_amount',
                        'title': 'Pay Currency Amount',
                        render: ProjectUtils.toFixedIfNumber
                  }, {
                        'data': 'order_status',
                        'title': 'Order Status'
                  }, {
                        'data': 'payment_status',
                        'title': 'Payment Status'
                  }, {
                        'data': 'term_days',
                        'title': 'Term Days'
                  }, {
                        'data': 'agent_ref_nbr',
                        'title': 'Agent Ref Nbr'
                  }, {
                        'data': 'po_number',
                        'title': 'PO Number'
                  }, {
                        'data': 'issn',
                        'title': 'ISSN'
                  }, {
                        'data': 'bundle_qty',
                        'title': 'Qty Split'
                  }, {
                        'data': 'xps_ref',
                        'title': 'Xps Ref'
                  }, {
                        'data': 'sales_representative',
                        'title': 'Sales Representative'
                  }, {
                        'data': 'dispatch_method',
                        'title': 'Dispatch Method'
                  }, {
                        'data': 'number_of_user',
                        'title': 'Number Of User'
                  }, {
                        'data': 'cancel_date',
                        'title': 'Cancel Date',
                        'type': 'datetime',
                        'render': this.dateFormateMMDDYYYY
                  }, {
                        'data': 'cancel_reason',
                        'title': 'Cancel Reason'
                  }, {
                        'data': 'sales_invoice_date',
                        'title': 'Sales Invoice Date',
                        'type': 'datetime',
                        'render': this.dateFormateMMDDYYYY
                  }, {
                        'data': 'sales_invoice_no',
                        'title': 'Sales Invoice No'
                  }, {
                        'data': 'zzaux_credit_note_no',
                        'title': 'Zzaux Credit Note No'
                  }, {
                        'data': 'zzaux_credit_note_date',
                        'title': 'Zzaux Credit Note Date',
                        'type': 'datetime',
                        'render': this.dateFormateMMDDYYYY
                  }, {
                        'data': 'new_paid_orders',
                        'title': 'New Paid Orders'
                  }, {
                        'data': 'over_under_payment',
                        'title': 'Over Under Payment'
                  }, {
                        'data': 'adjustments',
                        'title': 'Adjustments'
                  }, {
                        'data': 'foreign_exchange_gain_loss_new_orders',
                        'title': 'Foreign Exchange Gain Loss New Orders'
                  }, {
                        'data': 'new_credit_orders',
                        'title': 'New Credit Orders'
                  }, {
                        'data': 'total_of_newOrders',
                        'title': 'Total Of New Orders'
                  }, {
                        'data': 'paid_order_refunded',
                        'title': 'Paid Order Refunded'
                  }, {
                        'data': 'credit_orders_cancelled',
                        'title': 'Credit Orders Cancelled'
                  }, {
                        'data': 'foreign_exchange_gain_loss_cancelled_orders',
                        'title': 'Foreign Exchange Gain Loss Cancelled Orders'
                  }, {
                        'data': 'reversal_refunds_for_cancelled_orders',
                        'title': 'Reversal Refunds For Cancelled Orders'
                  }, {
                        'data': 'total_of_cancelledOrder',
                        'title': 'Total Of Cancelled Order'
                  }, {
                        'data': 'final_total',
                        'title': 'Final Total'
                  }, {
                        'data': 'zzaux_order_type',
                        'title': 'Zzaux Order Type'
                  }, {
                        'data': 'zzaux_welcome_pack',
                        'title': 'Zzaux Welcome Pack'
                  }, {
                        'data': 'zzaux_distributor',
                        'title': 'Zzaux Distributor'
                  }
            ];
      }
}
