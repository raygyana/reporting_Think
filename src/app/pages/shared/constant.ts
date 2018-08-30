import { isDevMode } from '@angular/core';
import { constants } from 'os';

export class Constants {

    // Insight and THINK Dev
    public static THINK_SERVER_URL = 'https://alpha1.mpsinsight.com/';

    // Insight and THINKProd
    // public static INSIGHT_SERVER_URL = 'https://insight.mps-think.com/';
    // public static THINK_SERVER_URL = 'https://api.mps-think.com/';

    public static THINK_DOWNLOAD_URL = 'https://api.mps-think.com/Compass-API/';
    // INSIGHT URL
    public static THINK_BASE_URL = Constants.THINK_SERVER_URL + 'Compass-API/';

    // public static BASE_URL = Constants.getThinkAPIURL() + 'insightstar/services/';


    // Login URL
    //   http://alpha.mpsinsight.com/Compass-API/Login/LoginAuthentication

    // Reset URL



    // Account URL

    // SUPPORT APIs




    // SETTINGS APIs
    // manage Favs Api



    // THINK URL
    // public static THINK_BASE_URL = 'http://yahoo-bajaj:8080/REST/ThinkReport/';
    // public static THINK_BASE_URL = Constants.getThinkAPIURL() + 'Compass-API/';
    // public static THINK_BASE_URL = Constants.THINK_SERVER_URL + 'Compass-API/';
    public static LOGIN_URL = Constants.THINK_BASE_URL + 'Login/LoginAuthentication';


    // THINK Customer Search
    public static TK_CUSTOMER_LIST_URL = Constants.THINK_BASE_URL + 'ThinkReport/customerSearch';
    // public static TK_CUSTOMER_LIST_PRODUCT_URL = Constants.THINK_BASE_URL + 'ThinkReport/customerList';
    public static TK_CUSTOMER_LIST_PRODUCT_URL = Constants.THINK_BASE_URL + 'ThinkReport/productCustomerList';
    public static TK_REGION_SEARCH_URL = Constants.THINK_BASE_URL + 'SalesReport/regionSearch';
    public static TK_COUNTRY_SEARCH_URL = Constants.THINK_BASE_URL + 'SalesReport/countryRegion';

    // THINK Product Search
    public static TK_PRODUCT_SEARCH_URL = Constants.THINK_BASE_URL + 'ThinkReport/productSearch';
    public static TK_PRODUCT_CATEGORY_URL = Constants.THINK_BASE_URL + 'ProductSearch/productCategory';
    public static TK_PRODUCT_TYPE_URL = Constants.THINK_BASE_URL + 'ProductSearch/productType';
    public static TK_PRODUCT_CODE_URL = Constants.THINK_BASE_URL + 'ThinkReport/productCode';
    // Think Gratis Order
    public static TK_GRATIS_ORDER_URL = Constants.THINK_BASE_URL + 'ProductSearch/gratisOrder';
    // Think Grace Order
    public static TK_GRACE_ORDER_URL = Constants.THINK_BASE_URL + 'ProductSearch/graceOrder';

    public static TK_ORDER_DETAILS_URL = Constants.THINK_BASE_URL + 'ThinkReport/productOrderDetails';
    public static TK_PRODUCT_PRICE_LIST_URL = Constants.THINK_BASE_URL + 'ThinkReport/productPriceList';
    // THINK Agency Search
    public static TK_AGENCY_SEARCH_URL = Constants.THINK_BASE_URL + 'ThinkReport/agencySearch';
    // public static TK_AGENCY_SALES_SEARCH_URL = Constants.THINK_BASE_URL + 'ThinkReport/agencySalesReport';
    public static TK_AGENCY_SALES_SEARCH_URL = Constants.THINK_BASE_URL + 'SearchSalesReport/SearchSales';


    public static TK_ANNUAL_SALES_DOWNLOAD_URL = Constants.THINK_BASE_URL +
        'SearchSalesReport/annualSaleDownlaod';

    // THINK Accounting
    // public static TK_PROFIT_CENTER_URL = Constants.THINK_BASE_URL + 'FinanceReport/phpProfitCenter';
    public static TK_ACC_PRODUCT_LIST_URL = Constants.THINK_BASE_URL + 'FinanceReport/productNameList';
    public static TK_TAXLIABILITY_SEARCH_URL = Constants.THINK_BASE_URL + 'FinanceReport/taxLiability';
    public static TK_EARNED_DEFFERED_INCOME_URL = Constants.THINK_BASE_URL + 'FinanceReport/earnedDeferredIncome';
    public static TK_DEFERRED_LIABILITY_URL = Constants.THINK_BASE_URL + 'FinanceReport/deferredLiabilitySummary';
    // public static TK_CUSTOMER_DEPOSIT_SEARCH_URL = Constants.THINK_BASE_URL + 'MITReport/customerDeposit';
    public static TK_CUSTOMER_DEPOSIT_SEARCH_URL = Constants.THINK_BASE_URL + 'FinanceReport/customerDeposit';
    public static TK_REFUND_SEARCH_URL = Constants.THINK_BASE_URL + 'FinanceReport/refundReport';
    public static TK_CASH_BY_ACC_PERIOD_SEARCH_URL = Constants.THINK_BASE_URL + 'FinanceReport/cashByAccountPeriod';
    public static TK_NEW_ORDER_RECON_SEARCH_URL = Constants.THINK_BASE_URL + 'FinanceReport/newOrderRecon';
    public static TK_CANCEL_ORDER_RECON_SEARCH_URL = Constants.THINK_BASE_URL + 'FinanceReport/cancelOrderRecon';
    public static TK_PROFITCENTER_URL = Constants.THINK_BASE_URL + 'FinanceReport/profitCenter';
    public static TK_MONTHLY_DEFERED_REVENUE_URL = Constants.THINK_BASE_URL + 'FinanceReport/monthlyDeferredRevenue';
    public static TK_FUTURE_EARNING_URL = Constants.THINK_BASE_URL + 'FinanceReport/futureEarningReport';
    public static TK_PAYMENT_BY_CURRENCY_SEARCH_URL = Constants.THINK_BASE_URL + 'FinanceReport/paymentByCurrency';
    public static TK_AGED_AR_CUSTOMERWISE_SEARCH_URL = Constants.THINK_BASE_URL + 'ExtractReport/agedArCustomerWiseNew';
    public static TK_VAT_EXEMPT_SEARCH_URL = Constants.THINK_BASE_URL + 'FinanceReport/vatExemptDetails';
    public static TK_VAT_ESL_DETAIL_REPORT_URL = Constants.THINK_BASE_URL + 'FinanceReport/vatEslDetailReport';
    public static TK_EC_SALES_REPORT_URL = Constants.THINK_BASE_URL + 'FinanceReport/ecSalesReport';
    public static TK_INTRASTAT_REPORT_URL = Constants.THINK_BASE_URL + 'FinanceReport/intrastatReport';
    public static TK_DECIR_WITH_FINANCE_URL = Constants.THINK_BASE_URL + 'ExtractReport/decirCirculationFinance';
    // ExtractReport

    public static TK_DETAILS_CIRCULATION_PACK_PRODUCT_LIST_URL = Constants.THINK_BASE_URL + 'ExtractReport/packName';
    public static TK_DETAILS_CIRCULATION_FOR_PACK_URL = Constants.THINK_BASE_URL + 'ExtractReport/detailCirculationForPack';
    public static TK_CLAIMS_BY_COUNTRY_SEARCH_REPORT_URL = Constants.THINK_BASE_URL + 'ClaimsReport/claimsByCountry';
    public static TK_JOURNAL_LIST_BY_LEBEL_RUN_DATE = Constants.THINK_BASE_URL + 'journalList/journalListLabelDate';

    // THINK Sales
    public static TK_SALE_AGENCY_LIST_URL = Constants.THINK_BASE_URL + 'SalesReport/agencySearch';
    public static TK_SALE_VOLUME_YEAR_URL = Constants.THINK_BASE_URL + 'SalesReport/volYearSearch';
    // changed as per new request from API team
    // public static TK_SALE_JOURNAL_LIST_URL = Constants.THINK_BASE_URL + 'SalesReport/journalSearch';
    public static TK_SALE_JOURNAL_LIST_URL = Constants.THINK_BASE_URL + 'ThinkReport/productCode';

    public static TK_SALE_REGION_LIST_URL = Constants.THINK_BASE_URL + 'SalesReport/regionSearch';
    public static TK_SALE_CATEGORY_DROPDOWN_URL = Constants.THINK_BASE_URL + 'SalesReport/categorySearch';
    public static TK_SALE_SOURCE_CODE_URL = Constants.THINK_BASE_URL + 'SalesReport/sourceCode';
    public static TK_CURRENCY_SEARCH_URL = Constants.THINK_BASE_URL + 'SalesReport/currencySearch';
    public static TK_CUSTOMER_CATEGORY_URL = Constants.THINK_BASE_URL + 'SearchSalesReport/customerCategory';
    public static TK_ATYPON_TRIALS_URL = Constants.THINK_BASE_URL + 'CustomiseReport/trailsReport';


    // THINK Sales by Agency
    public static TK_SALE_AGENCY_DOWNLOAD_REPORT_URL = Constants.THINK_BASE_URL + 'SalesReport/salesAgencyDetails';
    // THINK Sales Future Expires
    public static TK_SALE_FUTURE_EXP_DOWNLOAD_REPORT_URL = Constants.THINK_BASE_URL + 'SalesReport/salesFutureExpire';
    public static TK_SALE_AGENCY_CUSTOMER_SALE_REPORT_URL = Constants.THINK_BASE_URL + 'SalesReport/agenciesCustomerSales';

    // THINK php Sales
    public static TK_SALE_SUMMARY_DETAILS_REPORT_URL = Constants.THINK_BASE_URL + 'SalesSummary/salesSummaryDetail';
    public static TK_SALE_SUMMARY_FOR_CANCEL_ORDER_REPORT_URL = Constants.THINK_BASE_URL + 'SalesSummary/salesSummaryCancelOrder';
    public static TK_SALE_SUMMARY_REPORT_URL = Constants.THINK_BASE_URL + 'SalesSummary/salesSummaryReport';

    // THINK Sales Future Expires with New Orders
    public static TK_SALE_FTRE_EXP_NEW_ORDR_DOWNLOAD_REPORT_URL = Constants.THINK_BASE_URL + 'SalesReport/salesFutureExpNewOrder';
    // THINK Sales Source Code
    public static TK_SALE_SOURCE_CODE_SEARCH_REPORT_URL = Constants.THINK_BASE_URL + 'SalesReport/salesSourceCode';

    // THINK Sales Search Report Code
    public static TK_SALE_SEARCH_REPORT_URL = Constants.THINK_BASE_URL + 'SearchSalesReport/SearchSales';

    // THINK Sales Catogery Search
    public static TK_SALE_CATEGORY_SEARCH_REPORT_URL = Constants.THINK_BASE_URL + 'SalesReport/salesByCategory';

    // THINK Sales Future Expire Search
    public static TK_FUTURE_EXPIRES_SEARCH_REPORT_URL = Constants.THINK_BASE_URL + 'SalesReport/salesFutureExpire';

    // THINK Sales Future Expire with new model Search
    public static TK_FUTURE_EXPIRES_NEW_MODEL_SEARCH_REPORT_URL = Constants.THINK_BASE_URL + 'SalesReport/salesFutureExpNewOrder';

    // THINK Sales Future Expire with new model Search
    public static TK_SALES_DIRECT_CUSTOMER_SEARCH_REPORT_URL = Constants.THINK_BASE_URL + 'SalesReport/salesDirectCustomer';

    // THINK Sales Future Expire with new model Search
    public static TK_SALES_AGENCY_DETAILS_SEARCH_REPORT_URL_OLD = Constants.THINK_BASE_URL + 'SalesReport/agenciesCustomerSales';

    public static TK_SALES_AGENCY_DETAILS_SEARCH_REPORT_URL = Constants.THINK_BASE_URL + 'SalesReport/salesAgencyDetails';

    // THINK Sales By Month Search
    public static TK_SALES_BY_MONTH_SEARCH_REPORT_URL = Constants.THINK_BASE_URL + 'SalesReport/salesByMonth';

    // THINK Sales By Region Search
    public static TK_SALES_BY_REGION_SEARCH_REPORT_URL = Constants.THINK_BASE_URL + 'SalesReport/salesByRegion';

    // THINK Sales By Region Search
    public static TK_SALES_RENEWAL_SEARCH_REPORT_URL = Constants.THINK_BASE_URL + 'SalesReport/salesRenewal';


    //  THINK  atypon Comps Search
    public static TK_SALES_ATYPON_COMPS_REPORT_URL = Constants.THINK_BASE_URL + 'CustomiseReport/compsReport';


    // THINK Price Setup Search
    public static TK_PRICE_LIST_URL = Constants.THINK_BASE_URL + 'fulfilmentreport/pricesetup';

    // THINK Sales By TOP N CUSTOMERS
    public static TK_SALES_TOP_N_CUSTOMERS_REPORT_URL = Constants.THINK_BASE_URL + 'SalesReport/topNCustomers';

    // THINK Sales By TOP N Products
    public static TK_SALES_TOP_N_PRODUCTS_REPORT_URL = Constants.THINK_BASE_URL + 'SearchSalesReport/topNproducts';

    // THINK Sales By TOP N Products ProductCategory
    public static TK_SALES_TOP_N_PRODUCTS_PRODUCT_CATEGORY_URL = Constants.THINK_BASE_URL + 'ProductSearch/productCategory';

    // THINK Sales By TOP N Products ProductType
    public static TK_SALES_TOP_N_PRODUCTS_PRODUCT_TYPE_URL = Constants.THINK_BASE_URL + 'ProductSearch/productType';

    // THINK Sales By TOP N Products ProductType
    public static TK_COMPARISION_REPORT_URL = Constants.THINK_BASE_URL + 'SalesComparison/monthlyComparison';

    // THINK sale Atyon Comps w offer Code
    public static TK_ATYPONOFFERCOEDE_REPORT_URL = Constants.THINK_BASE_URL + 'CustomiseReport/offerCodeReport';


    public static TK_ATYPON_SUBS_REPORT_URL = Constants.THINK_BASE_URL + 'CustomiseReport/subsReport';
    public static TK_RMGR_PRODUCT_INV_LIST_SEARCH_URL = Constants.THINK_BASE_URL + 'MITReport/RMGRInventoryList';
    public static TK_RMGR_WATCH_LIST_SEARCH_URL = Constants.THINK_BASE_URL + 'MITReport/RMGRWatchList';
    public static TK_RESTSUBM_ORDERS_BY_MONTH_URL = Constants.THINK_BASE_URL + 'MITReport/restSubmissionByMonth';

    // THINK Save Search
    // Get Saved Searches
    public static TK_SS_GET_SAVE_SEARCHES_URL = Constants.THINK_BASE_URL + 'SaveSearch/getSaveSearches';
    // Save Search
    public static TK_SS_SAVE_SEARCH_URL = Constants.THINK_BASE_URL + 'SaveSearch/saveSearch';
    // Update Search
    public static TK_SS_UPDATE_SEARCH_URL = Constants.THINK_BASE_URL + 'SaveSearch/updateSearch';
    // Delete Search
    public static TK_SS_DELETE_SEARCH_URL = Constants.THINK_BASE_URL + 'SaveSearch/deleteSearch';


    // Think Fullfilment
    public static TK_CUSTOMER_ORDER_DETAIL_REPORT_URL = Constants.THINK_BASE_URL + 'fulfilmentreport/customerorderDetail';
    public static TK_FULFILMENTREPORT_COUNTRY_URL = Constants.THINK_BASE_URL + 'fulfilmentreport/country';
    public static TK_ISSUE_LIST_REPORT_URL = Constants.THINK_BASE_URL + 'IssueFulfilment/issueList';
    public static TK_GRACECOPY_SETUP_REPORT_URL = Constants.THINK_BASE_URL + 'GraceCopyFulfilments/graceList';
    public static TK_INVENTORY_STOCK_LIST_REPORT_URL = Constants.THINK_BASE_URL + 'fulfilmentreport/inventoryStockList';
    public static TK_ACTIVE_SOURCE_CODE_REPORT_URL = Constants.THINK_BASE_URL + 'fulfilmentreport/activeSourceCode';
    public static TK_LAPSER_AND_RENEWAL_EFFORT_URL = Constants.THINK_BASE_URL + 'LapserFulfilment/lapserRenewalEffort';
    public static TK_FULFILMENTREPORT_FORMAT_URL = Constants.THINK_BASE_URL + 'fulfilmentreport/format';
    public static TK_FULFILMENT_RENEWAL_COUNT_BY_MONTH_REPORT_URL = Constants.THINK_BASE_URL + 'fulfilmentReport/renewalsCountbymonth';
    public static TK_LAPSER_REPORT_URL = Constants.THINK_BASE_URL + 'LapserFulfilment/lapserReport';

    // Think ExtractReport
    public static TK_DETAIL_CIRCULATION_URL = Constants.THINK_BASE_URL + 'ExtractReport/detailCirculation';
    public static TK_DETAIL_CIRCULATION_EXCLD_PACK_URL = Constants.THINK_BASE_URL + 'ExtractGratisReport/decirExcludePack';

    public static TK_DETAIL_CIRCULATION_UCP_PACK_URL = Constants.THINK_BASE_URL + 'ExtractGratisReport/decirUCPPack';

    public static TK_DETAIL_CIRCULATION_DOC_REF_URL = Constants.THINK_BASE_URL + 'ExtractReport/detailCirculationDocRef'
    public static TK_AGENCY_DETAIL = Constants.THINK_BASE_URL + 'ExtractDetailReport/agencyDetail';
    public static TK_ER_SALES_REP_URL = Constants.THINK_BASE_URL + 'ExtractReport/salesRep';
    public static TK_SINGLE_ISSUE_ORDERS_URL = Constants.THINK_BASE_URL + 'ExtractDetailReport/singleIssueOrder';
    public static TK_SINGLE_ISSUE_PRODUCT_URL = Constants.THINK_BASE_URL + 'ExtractDetailReport/singleIssueProduct';
    public static TK_CUSTOMER_DETAILS_URL = Constants.THINK_BASE_URL + 'ExtractDetailReport/customerDetail';
    public static TK_DECIR_CANCEL_ORDERS_URL = Constants.THINK_BASE_URL + 'ExtractReport/detailCirculationWithCancelOrders';
    public static TK_EXTRACT_GRATIS_ORDERS_URL = Constants.THINK_BASE_URL + 'ExtractGratisReport/gratisOrders';
    public static TK_EXTRACT_GIFT_ORDERS_URL = Constants.THINK_BASE_URL + 'ExtractGratisReport/giftOrders';

    // Think YTD Report
    public static TK_YTD_AMOUNT_BY_START_YEAR_URL = Constants.THINK_BASE_URL + 'YTDReport/ytdAmountbyStartYear';
    public static TK_YTD_AMOUNT_BY_FULL_YEAR_URL = Constants.THINK_BASE_URL + 'YTDReport/ytdAmountbyStartYearSourceCode';
    public static TK_YTD_ORDER_BY_FULL_YEAR_URL = Constants.THINK_BASE_URL + 'YTDReport/ytdOrdersbyStartYearSourceCode';
    public static TK_YTD_ORDERS_BY_START_YEAR_URL = Constants.THINK_BASE_URL + 'YTDReport/ytdOrdersbyStartYear';
    public static TK_YTD_ORDERS_BY_CUSTOMER_URL = Constants.THINK_BASE_URL + 'YTDReport/ytdOrdersbyCustomer';

    // Think Credit sales
    public static TK_INVOICES_BY_TERMS_URL = Constants.THINK_BASE_URL + 'CreditSalesReports/invoiceByTerm';
    public static TK_STOP_ORDERS_URL = Constants.THINK_BASE_URL + 'CreditSalesReports/stopOrders';
    public static TK_OVERDUE_PAYMENT_URL = Constants.THINK_BASE_URL + 'CreditSalesReports/overduePayment';
    public static TK_CREDIT_PAYMENT_URL = Constants.THINK_BASE_URL + 'CreditSalesReports/creditPaymentCollection';
    public static TK_GENTRATED_SALES_INOICE_URL = Constants.THINK_BASE_URL + 'CreditSalesReports/generatedSalesInvoice';
    public static TK_GENRATED_CREDIT_NOTES_URL = Constants.THINK_BASE_URL + 'CreditSalesReports/generatedCreditNotes';
    public static TK_BAD_DEBTORS_URL = Constants.THINK_BASE_URL + 'CreditSalesReports/badDebtors';
    public static TK_DUBLICATE_INVOICE_URL = Constants.THINK_BASE_URL + 'CreditSalesReports/duplicateInvoice';
    public static TK_DUBLICATE_CREDIT_NOTE_URL = Constants.THINK_BASE_URL + 'CreditSalesReports/duplicateCreditNotes';
    public static TK_PRODUCT_NAME_URL = Constants.THINK_BASE_URL + 'CreditSalesReports/productNameList';
    public static TK_PRICE_CATEGORY_URL = Constants.THINK_BASE_URL + 'CreditSalesReports/priceCategoryList';
    public static TK_SALES_REP_URL = Constants.THINK_BASE_URL + 'CreditSalesReports/salesRepsList';

    // For display heading
    public static HIGHEST_IP_DETAILS_MESSAGE = 'Top %d Highest Accessing IPs ';
    public static UNIDENTIFIED_IP_DETAIL_MESSAGE = 'Top %d Unidentified Full-Text Requests';
    public static LICENCE_DENIAL_MESSAGE = 'Identified Licence Denial';
    public static TK_FULLFILLMENT_CANCELLED_ORDERS_LIST_URL = Constants.THINK_BASE_URL + 'CancelOrderFulfilments/cancelOrderDetails';
    public static TK_FULLFILLMENT_CANCELLED_ORDERS_LIST_URL_SPECIAL_UCP = Constants.THINK_BASE_URL +
        'CancelOrderFulfilments/cancelledOrders';
    // Think-Dashboard APIs
    public static TK_SALES_TAB_URL = Constants.THINK_BASE_URL + 'SalesDashboard/sales';
    public static TK_TREND_TAB_URL = Constants.THINK_BASE_URL + 'SalesDashboard/trend';
    public static TK_STATS_TAB_URL = Constants.THINK_BASE_URL + 'SalesDashboard/stats';
    public static TK_ANNUAL_SALES_REVENUE_GRAPH_URL = Constants.THINK_BASE_URL + 'SalesDashboard/annualSalesOrderRevenue';
    public static TK_SALES_BY_JOURNAL_GRAPH_URL = Constants.THINK_BASE_URL + 'SalesDashboard/salesByJournal';
    public static TK_SALES_BY_REGION_GRAPH_URL = Constants.THINK_BASE_URL + 'SalesDashboard/salesByRegion';
    public static TK_ATYPON_CANCELS_URL = Constants.THINK_BASE_URL + 'CustomiseReport/cancelsReport';
    public static TK_DISCOUNT_SUMMARY_REPORT_URL = Constants.THINK_BASE_URL + 'DiscountReport/discountSummary';
    public static TK_WEB_ORDER_BY_MONTH_URL = Constants.THINK_BASE_URL + 'MITReport/webOrderByMonth';
    public static TK_NOT_YET_RENEWED_URL = Constants.THINK_BASE_URL + 'MITReport/notYetRenewed';
    public static TK_CREDIT_CARD_REFUNDS_URL = Constants.THINK_BASE_URL + 'MITReport/RMGRCreditCardRefund';
    public static TK_RMGR_CREDIT_CARD_URL = Constants.THINK_BASE_URL + 'MITReport/RMGRCreditCardTs';
    public static TK_WEB_ORDER_BY_MONTH_NON_SUBS_URL = Constants.THINK_BASE_URL + 'MITReport/webOrderByMonthNonSubs';



    public static MIT_COUNTRY_LIST_URL = Constants.THINK_BASE_URL + 'CustomiseReport/country'
    public static MIT_REGION_LIST_URL = Constants.THINK_BASE_URL + 'CustomiseReport/regionList'
    public static MIT_STATE_LIST_URL = Constants.THINK_BASE_URL + 'ClaimsReport/state';


    public static THK_ANNUAL_SALE_DOWNLOAD = Constants.THINK_DOWNLOAD_URL + 'SearchSalesReport/annualSaleDownlaod';
    public static THK_SALES_DOWNLOAD = Constants.THINK_DOWNLOAD_URL + '/DownloadReport/salesDownlaod?clientID=';
    public static THK_STATS_DOWNLOAD = Constants.THINK_DOWNLOAD_URL +
        'DownloadReport/statsDownlaod?clientID=';
    public static THK_TREND_DOWNLOAD = Constants.THINK_DOWNLOAD_URL +
        'DownloadReport/trendsDownlaod?clientID='




    // Original Link  'https://api.mps-think.com/Compass-API/SearchSalesReport/annualSaleDownlaod';


    public static getInsightAPIURL() {
        if (isDevMode()) {
            return 'https://alpha.mpsinsight.com/';
        } else {
            return 'https://insight.mps-think.com/';
        }
    }

    public static getThinkAPIURL() {
        if (isDevMode()) {
            return 'https://alpha.mpsinsight.com/';
        } else {
            return 'https://api.mps-think.com/';
        }
    }


    // used in Insight Dashboard HTML

    getHigheshIPDetailMsg(): string {
        return Constants.HIGHEST_IP_DETAILS_MESSAGE;
    }
    getUnidentifiedIPDetailMsg(): string {
        return Constants.UNIDENTIFIED_IP_DETAIL_MESSAGE;
    }
    getLicenceDenialMsg(): string {
        return Constants.LICENCE_DENIAL_MESSAGE;
    }
}
