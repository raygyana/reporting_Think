import { Routes, RouterModule } from '@angular/router';
import { ThinkComponent } from './think.component';

import { ThinkDashboardComponent } from './think-dashboard/think-dashboard.component';

import { CustomerSearchComponent } from './global-search/customer-search/customer-search.component';

import { ProductSearchComponent } from './global-search/product-search/product-search.component';

import { AgencySearchComponent } from './global-search/agency-search/agency-search.component';

import { DirectCustomerSalesComponent } from './sales/direct-customer-sales/direct-customer-sales.component';

import { SalesByAgencyDetailsComponent } from './sales/sales-by-agency-details/sales-by-agency-details.component';

import { SalesByMonthComponent } from './sales/sales-by-month/sales-by-month.component';

import { FutureExpiresComponent } from './sales/future-expires/future-expires.component';
import { AtyponCancelsComponent } from './mit/atypon-cancels/atypon-cancels.component';
import { FutureExpiresWithNewOrdersComponent } from './sales/future-expires-with-new-orders/future-expires-with-new-orders.component';

import { OrdersBySourceCodeComponent } from './sales/orders-by-source-code/orders-by-source-code.component';

import { SalesByRegionComponent } from './sales/sales-by-region/sales-by-region.component';

import { SalesByCategorySearchComponent } from './sales/sales-by-category-search/sales-by-category-search.component';

import { SalesSummarySearchComponent } from './sales/sales-summary-search/sales-summary-search.component';

import { TopNCustomersComponent } from './sales/top-n-customers/top-n-customers.component';

import { TopNProductsComponent } from './sales/top-n-products/top-n-products.component';

import { ComparisionComponent } from './sales/comparision/comparision.component';
import { AtyponTrialsComponent } from './mit/atypon-trials/atypon-trials.component';

import { AtyponCompsOfferCodeComponent } from './mit/atypon-comps-w-offercode/atypon-comps-w-offercode.component';

import { AtyponSubsComponent } from './mit/atypon-subs/atypon-subs.component';
import { TaxLiabilitySearchComponent } from './accounting/tax-liability-search/tax-liability-search.component';
import { EarnedDeferredIncomeSearchComponent } from './accounting/earned-deferred-income-search/earned-deferred-income-search.component';

import { DeferredLiabilitySummarySearchComponent } from './accounting/deferred-liability-summary-search/deferred-liability-summary-search.component';
import { CustomerDepositSearchComponent } from './accounting/customer-deposit-search/customer-deposit-search.component';
import { CashByAccPeriodSearchComponent } from './accounting/cash-by-acc-period/cash-by-acc-period-search.component';
import { NewOrdersReconciliationSearchComponent } from './accounting/new-orders-reconciliation-search/new-orders-reconciliation-search.component';
import { CancelOrdersReconciliationSearchComponent } from './accounting/cancel-orders-reconciliation-search/cancel-orders-reconciliation-search.component';
import { RefundSearchComponent } from './accounting/refund-search/refund-search.component';
import { MonthlyDeferedRevenueComponent } from './accounting/monthly-defered-revenue/monthly-defered-revenue.component';

import { ClaimsByCountryComponent } from './mit/claims-by-country/claims-by-country.component';

import { WIPComponent } from './w-i-p/w-i-p.component';

import { IssueListComponent } from './fulfilment/issue-list/issue-list.component';
import { InventoryStockListComponent } from './fulfilment/inventory-stock-list/inventory-stock-list.component';
import { ActiveSourceCodeComponent } from './fulfilment/active-source-code/active-source-code.component';
import { GraceCopySetupComponent } from './fulfilment/grace-copy-setup/grace-copy-setup.component';
import { CustomerOrderDetailsComponent } from './fulfilment/customer-order-details/customer-order-details.component';
import { LapserReportComponent } from './fulfilment/lapser-report/lapser-report.component';
import { CancelledOrdersComponent } from './fulfilment/cancelled-orders/cancelled-orders.component';
import { PriceSetupComponent } from './fulfilment/price-setup/price-setup.component';
import { RenewalsCountByMonthComponent } from './fulfilment/renewals-count-by-month/renewals-count-by-month.component';
import { LapserAndRenewalEffortComponent } from './fulfilment/lapser-and-renewal-effort/lapser-and-renewal-effort.component';
import { DetailsCirculationReportComponent } from './extract/details-circulation-report/details-circulation-report.component';
import { InvoicesByTermsSearchComponent } from './credit-sales/invoices-by-terms-search/invoices-by-terms-search.component';
import { StopOrdersSearchComponent } from './credit-sales/stop-orders-search/stop-orders-search.component';
import { OverduePaymentSearchComponent } from './credit-sales/overdue-payment-search/overdue-payment-search.component';
import { CreditPaymentCollectionSearchComponent } from './credit-sales/credit-payment-collection-search/credit-payment-collection-search.component';
import { GeneratedSalesInvoicesSearchComponent } from './credit-sales/generated-sales-invoices-search/generated-sales-invoices-search.component';
import { GeneratedCreditNotesSearchComponent } from './credit-sales/generated-credit-notes-search/generated-credit-notes-search.component';
import { BadDebtorsSearchComponent } from './credit-sales/bad-debtors-search/bad-debtors-search.component';
import { DuplicateInvoiceSearchComponent } from './credit-sales/duplicate-invoice-search/duplicate-invoice-search.component';
import { DuplicateCreditNoteSearchComponent } from './credit-sales/duplicate-credit-note-search/duplicate-credit-note-search.component';
import { DecirWithCancelOrdersSearchComponent } from './credit-sales/decir-with-cancel-orders-search/decir-with-cancel-orders-search.component';
import { VatExemptComponent } from './accounting/vat-exempt/vat-exempt.component';
import { JournalListByLabelRunDateComponent } from './mit/journal-list-by-label-run-date/journal-list-by-label-run-date.component';
import { AgedArCustomerwiseSearchComponent } from './accounting/aged-ar-customerwise-search/aged-ar-customerwise-search.component';


import { ModuleWithProviders } from '@angular/core';
import { FutureEarningComponent } from './accounting/future-earning/future-earning.component';
import { PaymentByCurrencyComponent } from './accounting/payment-by-currency/payment-by-currency.component';
import { SettingsComponent } from './settings/settings.component';
import { AtyponCompsComponent } from './mit/atypon-comps/atypon-comps.component';
import { DiscountSummaryReportComponent } from './mit/discount-summary-report/discount-summary-report.component';

import { NotYetRenewedComponent } from './mit/not_yet_renewed/not_yet_renewed.component';
import { RMGRCreditCardRefundsTS230Component } from './mit/rmgr_credit_card_refunds_ts_230/rmgr_credit_card_refunds_ts_230.component';
import { RMGRCreditCardTS230Component } from './mit/rmgr_credit_card_ts_230/rmgr_credit_card_ts_230.component';
import { RMGRProductInvListComponent } from './mit/rmgr_product_inv_list/rmgr_product_inv_list.component';
import { RMGRWatchListComponent } from './mit/rmgr_watch_list/rmgr_watch_list.component';
import { RestsubmOrdersByMonthComponent } from './mit/restsubm_orders_by_month/restsubm_orders_by_month.component';
import { WebOrdersByMonthNonSubsComponent } from './mit/web_orders_by_month_non_subs/web_orders_by_month_non_subs.component';
import { WebOrdersByMonthComponent } from './mit/web_orders_by_month/web_orders_by_month.component';
import { VatEslComponent } from './accounting/vat-esl/vat-esl.component';
import { EcSalesComponent } from './accounting/ec-sales/ec-sales.component';
import { IntrastatComponent } from './accounting/intrastat/intrastat.component';
import { DecirWithFinanceComponent } from './extract/decir-with-finance/decir-with-finance.component';
import { DetailsCirculationForPackComponent } from '../../pages/think/extract/details-circulation-for-pack/details-circulation-for-pack.component'
import { SingleIssueOrdersComponent } from './extract/single-issue-orders/single-issue-orders.component';
import { DetailCircExcldPackComponent } from './extract/detail-circ.excld-pack/detail-circ.excld-pack.component';
import { CustomerDetailsComponent } from './extract/customer-details/customer-details.component';
import { AgenciesCustomerSalesComponent } from './sales/agencies-customer-sales/agencies-customer-sales.component';
import { DcierWithDocRefComponent } from './extract/dcier-with-doc-ref/dcier-with-doc-ref.component';
import { AgencyDetailComponent } from './extract/agency-detail/agency-detail.component';
import { GratisOrdersComponent } from './extract/gratis-orders/gratis-orders.component';
import { GiftOrdersComponent } from './extract/gift-orders/gift-orders.component';
import { YtdAmountByStartYearComponent } from './ytd/ytd-amount-by-start-year/ytd-amount-by-start-year.component';
import { YtdOrdersByStartYearComponent } from './ytd/ytd-orders-by-start-year/ytd-orders-by-start-year.component';
import { YtdOrdersByCustomerComponent } from './ytd/ytd-orders-by-customer/ytd-orders-by-customer.component';
import { MyClientAuthGuard } from '../../core';
import { DetailCirculationforUcppackComponent } from './extract/detail-circulationfor-ucppack/detail-circulationfor-ucppack.component';
import { SalesSummaryDetailsComponent } from './sales/sales-summary-details/sales-summary-details.component';
import { SalesSummaryComponent } from './sales/sales-summary/sales-summary.component';
import { SalesSummaryForCancelOrdersComponent } from './sales/sales-summary-for-cancel-orders/sales-summary-for-cancel-orders.component';


export const routes: Routes = [
    {
        path: '',
        component: ThinkComponent,
        children: [
            {
                path: '', component: ThinkDashboardComponent
                , canActivate: []
            },
            {
                path: 'think_dashboard', component: ThinkDashboardComponent
                , canActivate: []
            },
            // for Global Search - Customer Search
            {
                path: 'customer_search', component: CustomerSearchComponent
                , canActivate: [MyClientAuthGuard]
            },
            // for Global Search - Product Search
            {
                path: 'product_search', component: ProductSearchComponent
                , canActivate: [MyClientAuthGuard]
            },
            // for Global Search - Agency Search
            {
                path: 'agency_search', component: AgencySearchComponent
                , canActivate: [MyClientAuthGuard]
            },
            // for Sales - Sales by Category Search
            {
                path: 'sales_by_category_search', component: SalesByCategorySearchComponent
                , canActivate: [MyClientAuthGuard]
            },

            {
                path: 'sales_summary_search', component: SalesSummarySearchComponent
                , canActivate: [MyClientAuthGuard]
            },

            {
                path: 'direct_customer_sales', component: DirectCustomerSalesComponent
                , canActivate: [MyClientAuthGuard]
            },

            {
                path: 'sales_by_agency', component: SalesByAgencyDetailsComponent
                , canActivate: [MyClientAuthGuard]
            },

            {
                path: 'sales_by_month', component: SalesByMonthComponent
                , canActivate: [MyClientAuthGuard]
            },

            {
                path: 'sales_by_region', component: SalesByRegionComponent
                , canActivate: [MyClientAuthGuard]
            },

            {
                path: 'top_n_customers', component: TopNCustomersComponent
                , canActivate: [MyClientAuthGuard]
            },

            {
                path: 'top_n_products', component: TopNProductsComponent
                , canActivate: [MyClientAuthGuard]
            },

            {
                path: 'comparision', component: ComparisionComponent
                , canActivate: [MyClientAuthGuard]
            },
            {
                path: 'sales_summary_details', component: SalesSummaryDetailsComponent
                , canActivate: [MyClientAuthGuard]
            },
            {
                path: 'sales_summary_for_cancel_orders', component: SalesSummaryForCancelOrdersComponent
                , canActivate: [MyClientAuthGuard]
            },
            {
                path: 'sales_summary', component: SalesSummaryComponent
                , canActivate: [MyClientAuthGuard]
            },
            {
                path: 'agencies_customer_sales', component: AgenciesCustomerSalesComponent
                , canActivate: [MyClientAuthGuard]
            },
            {
                path: 'atypon_comps_w_offercode', component: AtyponCompsOfferCodeComponent
                , canActivate: []
            },

            {
                path: 'atypon_comps_report', component: AtyponCompsComponent
                , canActivate: []
            },

            {
                path: 'future_expires', component: FutureExpiresComponent
                , canActivate: [MyClientAuthGuard]
            },

            {
                path: 'atypon_cancels', component: AtyponCancelsComponent
                , canActivate: []
            },
            {
                path: 'future_expires_with_new_order', component: FutureExpiresWithNewOrdersComponent
                , canActivate: [MyClientAuthGuard]
            },

            {
                path: 'order_by_source_code', component: OrdersBySourceCodeComponent
                , canActivate: [MyClientAuthGuard]
            },
            {
                path: 'atypon_subs', component: AtyponSubsComponent
                , canActivate: []
            },
            {
                path: 'taxliability_search', component: TaxLiabilitySearchComponent
                , canActivate: [MyClientAuthGuard]
            },
            {
                path: 'earned_deferred_search', component: EarnedDeferredIncomeSearchComponent
                , canActivate: [MyClientAuthGuard]
            },
            {
                path: 'deferred_liability_search', component: DeferredLiabilitySummarySearchComponent
                , canActivate: [MyClientAuthGuard]
            },

            {
                path: 'customer_deposit_search', component: CustomerDepositSearchComponent
                , canActivate: []
            },
            {
                path: 'cash_acc_period_search', component: CashByAccPeriodSearchComponent
                , canActivate: [MyClientAuthGuard]
            },
            {
                path: 'new_orders_reconciliation_search', component: NewOrdersReconciliationSearchComponent
                , canActivate: [MyClientAuthGuard]
            },
            {
                path: 'cancel_orders_reconciliation_search', component: CancelOrdersReconciliationSearchComponent
                , canActivate: [MyClientAuthGuard]
            },
            {
                path: 'refund_search', component: RefundSearchComponent
                , canActivate: [MyClientAuthGuard]
            },
            {
                path: 'monthly_deferred_revenue', component: MonthlyDeferedRevenueComponent
                , canActivate: [MyClientAuthGuard]
            },
            {
                path: 'aged_ar_customerwise_search', component: AgedArCustomerwiseSearchComponent
                , canActivate: [MyClientAuthGuard]
            },
            {
                path: 'future_earning', component: FutureEarningComponent
                , canActivate: [MyClientAuthGuard]
            },
            {
                path: 'atypon_trials', component: AtyponTrialsComponent
                , canActivate: []
            },
            {
                path: 'payment_by_currency', component: PaymentByCurrencyComponent
                , canActivate: [MyClientAuthGuard]
            },
            {
                path: 'claims_by_country', component: ClaimsByCountryComponent
                , canActivate: []
            },
            {
                path: 'journal_list_by_lable_run_date', component: JournalListByLabelRunDateComponent
                , canActivate: []
            },

            {
                path: 'issue_list', component: IssueListComponent
                , canActivate: [MyClientAuthGuard]
            },
            {
                path: 'inventory_stock_list', component: InventoryStockListComponent
                , canActivate: [MyClientAuthGuard]
            },
            {
                path: 'active_source_code', component: ActiveSourceCodeComponent
                , canActivate: [MyClientAuthGuard]
            },
            {
                path: 'grace_copy_setup', component: GraceCopySetupComponent
                , canActivate: [MyClientAuthGuard]
            },
            {
                path: 'customer_order_details', component: CustomerOrderDetailsComponent
                , canActivate: [MyClientAuthGuard]
            },
            {
                path: 'lapser_report', component: LapserReportComponent
                , canActivate: [MyClientAuthGuard]
            },
            {
                path: 'cancelled_orders', component: CancelledOrdersComponent
                , canActivate: [MyClientAuthGuard]
            },
            {
                path: 'price_setup', component: PriceSetupComponent
                , canActivate: [MyClientAuthGuard]
            },
            {
                path: 'renewals_count_month', component: RenewalsCountByMonthComponent
                , canActivate: [MyClientAuthGuard]
            },
            {
                path: 'lapser_renewal_effort', component: LapserAndRenewalEffortComponent
                , canActivate: [MyClientAuthGuard]
            },
            {
                path: 'detail_circulation_report', component: DetailsCirculationReportComponent
                , canActivate: [MyClientAuthGuard]
            },
            {
                path: 'invoices_by_terms_search', component: InvoicesByTermsSearchComponent
                , canActivate: [MyClientAuthGuard]
            },
            {
                path: 'stop_orders_search', component: StopOrdersSearchComponent
                , canActivate: [MyClientAuthGuard]
            },
            {
                path: 'overdue_payment_search', component: OverduePaymentSearchComponent
                , canActivate: [MyClientAuthGuard]
            },
            {
                path: 'credit_payment_collection', component: CreditPaymentCollectionSearchComponent
                , canActivate: [MyClientAuthGuard]
            },
            {
                path: 'generated_sales_invoices', component: GeneratedSalesInvoicesSearchComponent
                , canActivate: [MyClientAuthGuard]
            },
            {
                path: 'generated_credit_notes', component: GeneratedCreditNotesSearchComponent
                , canActivate: [MyClientAuthGuard]
            },
            {
                path: 'bad_debtors', component: BadDebtorsSearchComponent
                , canActivate: [MyClientAuthGuard]
            },
            {
                path: 'duplicate_invoice', component: DuplicateInvoiceSearchComponent
                , canActivate: [MyClientAuthGuard]
            },
            {
                path: 'duplicate_credit_note', component: DuplicateCreditNoteSearchComponent
                , canActivate: [MyClientAuthGuard]
            },
            {
                path: 'decir_with_cancel_orders', component: DecirWithCancelOrdersSearchComponent
                , canActivate: [MyClientAuthGuard]
            },

            {
                path: 'wip', component: WIPComponent
                , canActivate: [MyClientAuthGuard]
            },
            {
                path: 'vatExempt',
                component: VatExemptComponent

                , canActivate: [MyClientAuthGuard]
            },
            {
                path: 'settings', component: SettingsComponent
                , canActivate: []
            },
            {
                path: 'discount_summary_report', component: DiscountSummaryReportComponent
                , canActivate: []
            },
            {
                path: 'not_yet_renewed', component: NotYetRenewedComponent
                , canActivate: []
            },
            {
                path: 'rmgr_credit_card_refunds_ts_230', component: RMGRCreditCardRefundsTS230Component
                , canActivate: []
            },
            {
                path: 'rmgr_credit_card_ts_230', component: RMGRCreditCardTS230Component
                , canActivate: []
            },
            {
                path: 'rmgr_product_inv_list', component: RMGRProductInvListComponent
                , canActivate: []
            },
            {
                path: 'rmgr_watch_list', component: RMGRWatchListComponent
                , canActivate: []
            },

            {
                path: 'restsubm_orders_by_month', component: RestsubmOrdersByMonthComponent
                , canActivate: []
            },

            {
                path: 'web_orders_by_month_non_subs', component: WebOrdersByMonthNonSubsComponent
                , canActivate: []
            },

            {
                path: 'web_orders_by_month', component: WebOrdersByMonthComponent
                , canActivate: []
            },

            {
                path: 'vatESL', component: VatEslComponent
                , canActivate: []
            },

            {
                path: 'ecSales', component: EcSalesComponent
                , canActivate: []
            },

            {
                path: 'intrastat', component: IntrastatComponent
                , canActivate: []
            },
            {
                path: 'decir_with_finance', component: DecirWithFinanceComponent
                , canActivate: []
            },
            {
                path: 'dcier_with_doc_ref', component: DcierWithDocRefComponent
                , canActivate: []
            },
            {
                path: 'detail_circulation_for_pack', component: DetailsCirculationForPackComponent
                , canActivate: []
            },
            {
                path: 'detail_circ_excld_report', component: DetailCircExcldPackComponent
                , canActivate: []
            },
            {
                path: 'detail_circ_ucp_pack', component: DetailCirculationforUcppackComponent
                , canActivate: []
            },
            {
                path: 'single_issue_orders', component: SingleIssueOrdersComponent
                , canActivate: []
            },
            {
                path: 'customer_details', component: CustomerDetailsComponent
                , canActivate: []
            },
            {
                path: 'agency_details', component: AgencyDetailComponent
                , canActivate: []
            },
            {
                path: 'ytd_amount_by_start_year', component: YtdAmountByStartYearComponent
                , canActivate: []
            },
            {
                path: 'ytd_orders_by_start_year', component: YtdOrdersByStartYearComponent
                , canActivate: []
            },
            {
                path: 'ytd_orders_by_customer', component: YtdOrdersByCustomerComponent
                , canActivate: []
            },
            {
                path: 'gratis_orders', component: GratisOrdersComponent
                , canActivate: []
            }, {
                path: 'gift_orders', component: GiftOrdersComponent
                , canActivate: []
            }
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
