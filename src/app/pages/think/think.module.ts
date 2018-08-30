import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { routing } from './think.routing';
import { CoreModule } from '../../core/core.module';
import { ComponentsModule } from '../../components/components.module';
import { ThinkDashboardModule } from './think-dashboard/think-dashboard.module';

// import { SelectModule } from '../../components/data-drop-down/ng-select';
// import { ChartModule } from 'angular-highcharts';
// import { DrilldownComponent  } from 'angular-highcharts/modules/drilldown';
import { Daterangepicker } from 'ng2-daterangepicker';
import { TabsModule } from '../../components/ngtabs';
import { ThinkComponent } from './think.component';
// import { SelectComponent } from '../../components/data-drop-down/select.component';

import { CustomerSearchComponent } from './global-search/customer-search/customer-search.component';

import { ProductSearchComponent } from './global-search/product-search/product-search.component';

import { DirectCustomerSalesComponent } from './sales/direct-customer-sales/direct-customer-sales.component';

import { SalesByAgencyDetailsComponent } from './sales/sales-by-agency-details/sales-by-agency-details.component';
import { SalesByMonthComponent } from './sales/sales-by-month/sales-by-month.component';

import { FutureExpiresComponent } from './sales/future-expires/future-expires.component';
import { AtyponCancelsComponent } from './mit/atypon-cancels/atypon-cancels.component';
import { FutureExpiresWithNewOrdersComponent } from './sales/future-expires-with-new-orders/future-expires-with-new-orders.component';

import { OrdersBySourceCodeComponent } from './sales/orders-by-source-code/orders-by-source-code.component';

import { SalesByRegionComponent } from './sales/sales-by-region/sales-by-region.component';
import { WIPComponent } from './w-i-p/w-i-p.component';
import { TaxLiabilitySearchComponent } from './accounting/tax-liability-search/tax-liability-search.component';

import { EarnedDeferredIncomeSearchComponent } from './accounting/earned-deferred-income-search/earned-deferred-income-search.component';
import { DeferredLiabilitySummarySearchComponent } from './accounting/deferred-liability-summary-search/deferred-liability-summary-search.component';

import { SalesByCategorySearchComponent } from './sales/sales-by-category-search/sales-by-category-search.component';
import { SalesSummarySearchComponent } from './sales/sales-summary-search/sales-summary-search.component';

import { ThinkDashboardComponent } from './think-dashboard/think-dashboard.component';
import { AgencySearchComponent } from './global-search/agency-search/agency-search.component';
import { AtyponTrialsComponent } from './mit/atypon-trials/atypon-trials.component';

import { TopNCustomersComponent } from './sales/top-n-customers/top-n-customers.component';
import { TopNProductsComponent } from './sales/top-n-products/top-n-products.component';
import { ComparisionComponent } from './sales/comparision/comparision.component';
import { AtyponCompsOfferCodeComponent } from './mit/atypon-comps-w-offercode/atypon-comps-w-offercode.component';

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
import { CustomerDepositSearchComponent } from './accounting/customer-deposit-search/customer-deposit-search.component';
import { CashByAccPeriodSearchComponent } from './accounting/cash-by-acc-period/cash-by-acc-period-search.component';
import { NewOrdersReconciliationSearchComponent } from './accounting/new-orders-reconciliation-search/new-orders-reconciliation-search.component';
import { CancelOrdersReconciliationSearchComponent } from './accounting/cancel-orders-reconciliation-search/cancel-orders-reconciliation-search.component';
import { RefundSearchComponent } from './accounting/refund-search/refund-search.component';
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
import { MonthlyDeferedRevenueComponent } from './accounting/monthly-defered-revenue/monthly-defered-revenue.component';
import { AgedArCustomerwiseSearchComponent } from './accounting/aged-ar-customerwise-search/aged-ar-customerwise-search.component';
import { FutureEarningComponent } from './accounting/future-earning/future-earning.component';
import { PaymentByCurrencyComponent } from './accounting/payment-by-currency/payment-by-currency.component';
import { SettingsComponent } from './settings/settings.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClaimsByCountryComponent } from './mit/claims-by-country/claims-by-country.component';
import { AtyponSubsComponent } from './mit/atypon-subs/atypon-subs.component';
import { JournalListByLabelRunDateComponent } from './mit/journal-list-by-label-run-date/journal-list-by-label-run-date.component';
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
import { AgenciesCustomerSalesComponent } from './sales/agencies-customer-sales/agencies-customer-sales.component';
import { DcierWithDocRefComponent } from './extract/dcier-with-doc-ref/dcier-with-doc-ref.component';
import { DetailsCirculationForPackComponent } from './extract/details-circulation-for-pack/details-circulation-for-pack.component';
import { SingleIssueOrdersComponent } from './extract/single-issue-orders/single-issue-orders.component';
import { CustomerDetailsComponent } from './extract/customer-details/customer-details.component';
import { AgencyDetailComponent } from './extract/agency-detail/agency-detail.component';
import { GratisOrdersComponent } from './extract/gratis-orders/gratis-orders.component';
import { GiftOrdersComponent } from './extract/gift-orders/gift-orders.component';
import { YtdAmountByStartYearComponent } from './ytd/ytd-amount-by-start-year/ytd-amount-by-start-year.component';
import { YtdOrdersByStartYearComponent } from './ytd/ytd-orders-by-start-year/ytd-orders-by-start-year.component';
import { DetailCircExcldPackComponent } from './extract/detail-circ.excld-pack/detail-circ.excld-pack.component';
import { YtdOrdersByCustomerComponent } from './ytd/ytd-orders-by-customer/ytd-orders-by-customer.component';
import { DetailCirculationforUcppackComponent } from './extract/detail-circulationfor-ucppack/detail-circulationfor-ucppack.component';
import { SalesSummaryDetailsComponent } from './sales/sales-summary-details/sales-summary-details.component';
import { SalesSummaryComponent } from './sales/sales-summary/sales-summary.component';
import { SalesSummaryForCancelOrdersComponent } from './sales/sales-summary-for-cancel-orders/sales-summary-for-cancel-orders.component';
import { DuplicateInvoicePrintViewComponent } from './credit-sales/duplicate-invoice-search/duplicate-invoice-print-view/duplicate-invoice-print-view.component';
import { DuplicateCreditNotePrintViewComponent } from './credit-sales/duplicate-credit-note-search/duplicate-credit-note-print-view/duplicate-credit-note-print-view.component';



@NgModule({
    imports: [
        TabsModule,
        CommonModule,
        FormsModule,
        CoreModule,
        ComponentsModule,
        ThinkDashboardModule,
        DataTablesModule,
        // ChartModule,
        Daterangepicker,
        // SelectModule,
        routing,
        ReactiveFormsModule
    ],
    declarations: [
        AgencyDetailComponent,
        ThinkComponent,
        CustomerSearchComponent,
        ProductSearchComponent,
        DirectCustomerSalesComponent,
        SalesByAgencyDetailsComponent,
        SalesByMonthComponent,
        FutureExpiresComponent,
        AtyponCancelsComponent,
        FutureExpiresWithNewOrdersComponent,
        OrdersBySourceCodeComponent,
        SalesByRegionComponent,
        WIPComponent,
        TaxLiabilitySearchComponent,
        EarnedDeferredIncomeSearchComponent,
        DeferredLiabilitySummarySearchComponent,
        SalesByCategorySearchComponent,
        SalesSummarySearchComponent,
        ThinkDashboardComponent,
        AgencySearchComponent,
        IssueListComponent,
        InventoryStockListComponent,
        ActiveSourceCodeComponent,
        GraceCopySetupComponent,
        CustomerOrderDetailsComponent,
        LapserReportComponent,
        CancelledOrdersComponent,
        PriceSetupComponent,
        RenewalsCountByMonthComponent,
        LapserAndRenewalEffortComponent,
        TopNCustomersComponent,
        TopNProductsComponent,
        ComparisionComponent,
        AtyponCompsOfferCodeComponent,
        CustomerDepositSearchComponent,
        CashByAccPeriodSearchComponent,
        NewOrdersReconciliationSearchComponent,
        CancelOrdersReconciliationSearchComponent,
        RefundSearchComponent,
        InvoicesByTermsSearchComponent,
        StopOrdersSearchComponent,
        OverduePaymentSearchComponent,
        CreditPaymentCollectionSearchComponent,
        GeneratedSalesInvoicesSearchComponent,
        GeneratedCreditNotesSearchComponent,
        BadDebtorsSearchComponent,
        DuplicateInvoiceSearchComponent,
        DuplicateCreditNoteSearchComponent,
        DecirWithCancelOrdersSearchComponent,
        VatExemptComponent,
        MonthlyDeferedRevenueComponent,
        AgedArCustomerwiseSearchComponent,
        FutureEarningComponent,
        PaymentByCurrencyComponent,
        SettingsComponent,
        DetailsCirculationReportComponent,
        ClaimsByCountryComponent,
        AtyponSubsComponent,
        AtyponTrialsComponent,
        JournalListByLabelRunDateComponent,
        AtyponCompsComponent,
        DiscountSummaryReportComponent,
        NotYetRenewedComponent,
        RMGRCreditCardRefundsTS230Component,
        RMGRCreditCardTS230Component,
        RMGRProductInvListComponent,
        RMGRWatchListComponent,
        RestsubmOrdersByMonthComponent,
        WebOrdersByMonthNonSubsComponent,
        WebOrdersByMonthComponent,
        VatEslComponent,
        EcSalesComponent,
        IntrastatComponent,
        AgenciesCustomerSalesComponent,
        DcierWithDocRefComponent,
        DetailsCirculationForPackComponent,
        DecirWithFinanceComponent,
        SingleIssueOrdersComponent,
        CustomerDetailsComponent,
        GratisOrdersComponent,
        YtdAmountByStartYearComponent,
        YtdOrdersByStartYearComponent,
        GiftOrdersComponent,
        YtdOrdersByCustomerComponent,
        DetailCircExcldPackComponent,
        DetailCirculationforUcppackComponent,
        SalesSummaryDetailsComponent,
        SalesSummaryComponent,
        SalesSummaryForCancelOrdersComponent,
        DuplicateInvoicePrintViewComponent,
        DuplicateCreditNotePrintViewComponent
        // SelectComponent
    ],
    providers: [
        DatePipe
    ]
})

export class ThinkModule { }
