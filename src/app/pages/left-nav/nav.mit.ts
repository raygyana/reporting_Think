
export const mitNav = [{
      title: 'Dashboard',
      fafa: 'fa fa-fw fa-dashboard',
      id: 'think_dashboard',
      childId: 'think_dashboardChildID',
      childIdHash: '#think_dashboardChildID',
      routerLink: ['think/think_dashboard'],
      disabled: false,
      visible: true,
},
{
      title: 'MIT',
      fafa: 'fa fa-file-text-o',
      id: 'headingMIT',
      childId: 'mitSubMenu2',
      childIdHash: '#mitSubMenu2',
      disabled: false,
      visible: true,
      children: [{
            title: 'Atypon Cancels Report',
            fafa: 'fa fa-angle-right',
            routerLink: ['think/atypon_cancels'],
            disabled: false,
            visible: true,
      }, {
            title: 'Atypon Comps W Offer Code',
            fafa: 'fa fa-angle-right',
            routerLink: ['think/atypon_comps_w_offercode'],
            disabled: false,
            visible: true,
      }, {
            title: 'Atypon Comps',
            fafa: 'fa fa-angle-right',
            routerLink: ['think/atypon_comps_report'],
            disabled: false,
            visible: true,
      }, {
            title: 'Atypon Subs',
            fafa: 'fa fa-angle-right',
            routerLink: ['think/atypon_subs'],
            disabled: false,
            visible: true,
      }, {
            title: 'Atypon Trials',
            fafa: 'fa fa-angle-right',
            routerLink: ['think/atypon_trials'],
            disabled: false,
            visible: true,
      }, {
            title: 'Claims For All Countries',
            fafa: 'fa fa-angle-right',
            routerLink: ['think/claims_by_country'],
            disabled: false,
            visible: true,
      }, {
            title: 'Customer Deposit Cash Report',
            fafa: 'fa fa-angle-right',
            routerLink: ['think/customer_deposit_search'],
            disabled: false,
            visible: true,
      }, {
            title: 'Discount Code Report',
            fafa: 'fa fa-angle-right',
            routerLink: ['think/discount_summary_report'],
            disabled: false,
            visible: true,
      }, {
            title: 'Journal List By Label Run Date',
            fafa: 'fa fa-angle-right',
            routerLink: ['think/journal_list_by_lable_run_date'],
            disabled: false,
            visible: true,
      }, {
            title: 'Not Yet Renewed',
            fafa: 'fa fa-angle-right',
            routerLink: ['think/not_yet_renewed'],
            disabled: false,
            visible: true,
      }, {
            title: 'REST Submission Fee Payments',
            fafa: 'fa fa-angle-right',
            routerLink: ['think/restsubm_orders_by_month'],
            disabled: false,
            visible: true,
      }, {
            title: 'Inventory List - Products',
            fafa: 'fa fa-angle-right',
            routerLink: ['think/rmgr_product_inv_list'],
            disabled: false,
            visible: true,
      }, {
            title: 'RMGR Watch List',
            fafa: 'fa fa-angle-right',
            routerLink: ['think/rmgr_watch_list'],
            disabled: false,
            visible: true,
      }, {
            title: 'Daily Credit Card REFUNDS',
            fafa: 'fa fa-angle-right',
            routerLink: ['think/rmgr_credit_card_refunds_ts_230'],
            disabled: false,
            visible: true,
      }, {
            title: 'Daily Credit Cards by Journal',
            fafa: 'fa fa-angle-right',
            routerLink: ['think/rmgr_credit_card_ts_230'],
            disabled: false,
            visible: true,
      }, {
            title: 'Web Source Code Report',
            fafa: 'fa fa-angle-right',
            routerLink: ['think/web_orders_by_month'],
            disabled: false,
            visible: true,
      }, {
            title: 'Web Source Code Report - Non Subs',
            fafa: 'fa fa-angle-right',
            routerLink: ['think/web_orders_by_month_non_subs'],
            disabled: false,
            visible: true,
      }]
}, {
      title: 'Global Search',
      fafa: 'fa fa-search',
      id: 'headingGlobalSearch',
      childId: 'globalSearchSubMenu',
      childIdHash: '#globalSearchSubMenu',
      disabled: false,
      visible: true,
      children: [{
            title: 'Customer',
            fafa: 'fa fa-angle-right',
            routerLink: ['think/customer_search'],
            disabled: false,
            visible: true
      }, {
            title: 'Product',
            fafa: 'fa fa-angle-right',
            routerLink: ['think/product_search'],
            visible: true,
            disabled: false
      }, {
            title: 'Agency',
            fafa: 'fa fa-angle-right',
            routerLink: ['think/agency_search'],
            visible: true,
            disabled: false
      }]
}, {
      title: 'Extract',
      fafa: 'fa fa-file-text-o',
      id: 'headingExtract',
      childId: 'ExtractSubMenu2',
      childIdHash: '#ExtractSubMenu2',
      disabled: false,
      visible: true,
      children: [{
            title: 'DECIR With Finance',
            fafa: 'fa fa-angle-right',
            // routerLink: ['think/decir_with_finance'],
            routerLink: ['disabledPath'],
            disabled: true,
            visible: true,
      }, {
            title: 'DCIER With Doc Ref',
            fafa: 'fa fa-angle-right',
            // routerLink: ['think/dcier_with_doc_ref'],
            routerLink: ['disabledPath'],
            disabled: true,
            visible: true,
      }, {
            title: 'Detail Circulation Report',
            fafa: 'fa fa-angle-right',
            routerLink: ['think/detail_circulation_report'],
            visible: true,
            disabled: false,
      },
      {
            title: 'Details Circulation for Pack',
            fafa: 'fa fa-angle-right',
            // routerLink: ['think/detail_circulation_for_pack'],
            routerLink: ['disabledPath'],
            disabled: true,
            visible: true,
      },
      {
            title: 'Agency Details',
            fafa: 'fa fa-angle-right',
            // routerLink: ['think/agency_details'],
            routerLink: ['disabledPath'],
            disabled: true,
            visible: true
      },
      {
            title: 'Single Issue Orders',
            fafa: 'fa fa-angle-right',
            // routerLink: ['think/single_issue_orders'],
            routerLink: ['disabledPath'],
            disabled: true,
            visible: true,
      }, {
            title: 'Customer Details',
            fafa: 'fa fa-angle-right',
            // routerLink: ['think/customer_details'],
            routerLink: ['disabledPath'],
            disabled: true,
            visible: true,
      }]
},
{
      title: 'Sales',
      fafa: 'fa fa-pie-chart',
      id: 'headingSalesSubMenu',
      childId: 'salesSubMenu2',
      childIdHash: '#salesSubMenu2',
      disabled: false,
      visible: true,
      children: [{
            title: 'Sales Report',
            fafa: 'fa fa-angle-right',
            disabled: true,
            visible: true,
            childId: 'salesReportSubMenu',
            childIdHash: '#salesReportSubMenu',
            children: [{
                  title: 'Sales Summary',
                  fafa: 'fa fa-angle-right',
                  disabled: true,
                  routerLink: ['disabledPath'],
                  visible: true,
            }, {
                  title: 'Sales By Category',
                  fafa: 'fa fa-angle-right',
                  routerLink: ['disabledPath'],
                  visible: true,
                  disabled: true,
            }, {
                  title: 'Direct Customer Sales',
                  fafa: 'fa fa-angle-right',
                  routerLink: ['disabledPath'],
                  disabled: true,
                  visible: true,
            }, {
                  title: 'Sales By Agency Details',
                  fafa: 'fa fa-angle-right',
                  routerLink: ['disabledPath'],
                  disabled: true,
                  visible: true,
            }, {
                  title: 'Sales By Month',
                  fafa: 'fa fa-angle-right',
                  routerLink: ['disabledPath'],
                  disabled: true,
                  visible: true,
            }, {
                  title: 'Sales By Region',
                  fafa: 'fa fa-angle-right',
                  routerLink: ['think/sales_by_region'],
                  disabled: true,
                  visible: true,
            }]

      }, {
            title: 'Top N Customers',
            fafa: 'fa fa-angle-right',
            routerLink: ['think/top_n_customers'],
            visible: true,
            disabled: false,
      }, {
            title: 'Top N Products',
            fafa: 'fa fa-angle-right',
            routerLink: ['disabledPath'],
            visible: true,
            disabled: true,
      }, {
            title: 'Comparison',
            fafa: 'fa fa-angle-right',
            routerLink: ['think/comparision'],
            visible: true,
            disabled: false,
      }, {
            title: 'Agencies Customer Sales',
            fafa: 'fa fa-angle-right',
            routerLink: ['think/agencies_customer_sales'],
            disabled: false,
            visible: false,
      }, {
            title: 'Future Expires',
            fafa: 'fa fa-angle-right',
            routerLink: ['disabledPath'],
            visible: true,
            disabled: true,
      }, {
            title: 'Future Expires With New Order',
            fafa: 'fa fa-angle-right',
            routerLink: ['disabledPath'],
            visible: true,
            disabled: true,
      }, {
            title: 'Orders By Source Code',
            fafa: 'fa fa-angle-right',
            routerLink: ['disabledPath'],
            visible: true,
            disabled: true,
      }]
},
{
      title: 'Accounting',
      fafa: 'fa fa-calculator',
      id: 'headingAccountingSubMenu',
      childId: 'accountingSubMenu2',
      childIdHash: '#accountingSubMenu2',
      disabled: true,
      visible: true,
      children: [{
            title: 'Tax Liability',
            fafa: 'fa fa-angle-right',
            routerLink: ['disabledPath'],
            visible: true,
            disabled: true
      }, {
            title: 'Earned & Deferred Income',
            fafa: 'fa fa-angle-right',
            routerLink: ['disabledPath'],
            visible: true,
            disabled: true
      }, {
            title: 'Deferred Liability Summary',
            fafa: 'fa fa-angle-right',
            routerLink: ['disabledPath'],
            visible: true,
            disabled: true
      }, {
            title: 'Cash By A/C Period',
            fafa: 'fa fa-angle-right',
            routerLink: ['disabledPath'],
            visible: true,
            disabled: true
      }, {
            title: 'Payment By Currency',
            fafa: 'fa fa-angle-right',
            routerLink: ['disabledPath'],
            visible: true,
            disabled: true
      }, {
            title: 'Refunds',
            fafa: 'fa fa-angle-right',
            routerLink: ['disabledPath'],
            visible: true,
            disabled: true
      }, {
            title: 'Monthly Deferred Revenue',
            fafa: 'fa fa-angle-right',
            routerLink: ['disabledPath'],
            visible: true,
            disabled: true
      }, {
            title: 'New Orders Reconciliation',
            fafa: 'fa fa-angle-right',
            routerLink: ['disabledPath'],
            visible: true,
            disabled: true
      }, {
            title: 'Cancel Orders Reconciliation',
            fafa: 'fa fa-angle-right',
            routerLink: ['disabledPath'],
            visible: true,
            disabled: true
      }, {
            title: 'Aged AR Customerwise',
            fafa: 'fa fa-angle-right',
            routerLink: ['disabledPath'],
            visible: true,
            disabled: true
      }, {
            title: 'Future Earning',
            fafa: 'fa fa-angle-right',
            routerLink: ['disabledPath'],
            visible: true,
            disabled: true
      }, {
            title: 'VAT Exempt Details',
            fafa: 'fa fa-angle-right',
            routerLink: ['disabledPath'],
            visible: true,
            disabled: true
      }, {
            title: 'VAT ESL Report',
            fafa: 'fa fa-angle-right',
            routerLink: ['disabledPath'],
            visible: true,
            disabled: true
      }, {
            title: 'EC Sales',
            fafa: 'fa fa-angle-right',
            routerLink: ['disabledPath'],
            visible: true,
            disabled: true
      }, {
            title: 'Intrastat Report',
            fafa: 'fa fa-angle-right',
            routerLink: ['disabledPath'],
            visible: true,
            disabled: true
      }]
},

{
      title: 'Fulfillment',
      fafa: 'fa fa-edit',
      id: 'headingFulfillmentSubMenu',
      childId: 'fulfillmentSubMenu2',
      childIdHash: '#fulfillmentSubMenu2',
      disabled: false,
      visible: true,
      children: [{
            title: 'Issue List',
            fafa: 'fa fa-angle-right',
            routerLink: ['disabledPath'],
            visible: true,
            disabled: true
      }, {
            title: 'Inventory Stock List',
            fafa: 'fa fa-angle-right',
            routerLink: ['disabledPath'],
            visible: true,
            disabled: true
      }, {
            title: 'Active Source Code',
            fafa: 'fa fa-angle-right',
            routerLink: ['disabledPath'],
            visible: true,
            disabled: true
      }, {
            title: 'Grace Copy Setup',
            fafa: 'fa fa-angle-right',
            routerLink: ['disabledPath'],
            visible: true,
            disabled: true
      }, {
            title: 'Customer Order Details',
            fafa: 'fa fa-angle-right',
            routerLink: ['think/customer_order_details'],
            visible: true,
            disabled: false
      }, {
            title: 'Lapser Report',
            fafa: 'fa fa-angle-right',
            routerLink: ['disabledPath'],
            visible: true,
            disabled: true
      }, {
            title: 'Cancelled Orders',
            fafa: 'fa fa-angle-right',
            routerLink: ['disabledPath'],
            visible: true,
            disabled: true
      }, {
            title: 'Price Setup',
            fafa: 'fa fa-angle-right',
            routerLink: ['disabledPath'],
            visible: true,
            disabled: true
      }, {
            title: 'Renewals Count By Month',
            fafa: 'fa fa-angle-right',
            routerLink: ['disabledPath'],
            visible: true,
            disabled: true
      }, {
            title: 'Lapser & Renewal Effort',
            fafa: 'fa fa-angle-right',
            routerLink: ['disabledPath'],
            visible: true,
            disabled: true
      }]
}, {
      title: 'Credit Sales',
      fafa: 'fa fa-credit-card',
      id: 'headingCreditSalesSubMenu',
      childId: 'creditSalesSubMenu2',
      childIdHash: '#creditSalesSubMenu2',
      disabled: true,
      visible: true,
      children: [{
            title: 'Invoices By Terms',
            fafa: 'fa fa-angle-right',
            routerLink: ['disabledPath'],
            disabled: true,
            visible: true,
      }, {
            title: 'Stop Orders',
            fafa: 'fa fa-angle-right',
            routerLink: ['disabledPath'],
            disabled: true,
            visible: true,
      }, {
            title: 'Overdue Payment',
            fafa: 'fa fa-angle-right',
            routerLink: ['disabledPath'],
            disabled: true,
            visible: true,
      }, {
            title: 'Credit Payment Collection',
            fafa: 'fa fa-angle-right',
            routerLink: ['disabledPath'],
            disabled: true,
            visible: true,
      }, {
            title: 'Generated Sales Invoices',
            fafa: 'fa fa-angle-right',
            routerLink: ['disabledPath'],
            disabled: true,
            visible: true,
      }, {
            title: 'Generated Credit Notes',
            fafa: 'fa fa-angle-right',
            routerLink: ['disabledPath'],
            disabled: true,
            visible: true,
      }, {
            title: 'Bad Debtors Notes',
            fafa: 'fa fa-angle-right',
            routerLink: ['disabledPath'],
            disabled: true,
            visible: true,
      }, {
            title: 'Duplicate Invoice',
            fafa: 'fa fa-angle-right',
            routerLink: ['disabledPath'],
            disabled: true,
            visible: true,
      }, {
            title: 'Duplicate Credit Note',
            fafa: 'fa fa-angle-right',
            routerLink: ['disabledPath'],
            disabled: true,
            visible: true,
      }, {
            title: 'DECIR with Cancel Orders',
            fafa: 'fa fa-angle-right',
            routerLink: ['disabledPath'],
            disabled: true,
            visible: true,
      }]
}];