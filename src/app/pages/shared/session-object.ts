import { UserDetails } from './user-detail';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { SavedSearchModel } from '../../components/think-search-header/saved-search.model';
import { GlobalSettings } from './global-settings';
import { Session } from 'selenium-webdriver';
import { ThinkVsInsightSetting } from './think-vs-insight-setting.service';

export class SessionObject {

    static get liveYear(): any {
        return localStorage.getItem('liveYear');
    };

    static set liveYear(val: any) {
        localStorage.setItem('liveYear', val);
    }

    static get liveMonth(): any {
        return localStorage.getItem('liveMonth');
    };

    static set liveMonth(val: any) {
        localStorage.setItem('liveMonth', val);
    }

    static month: string[] = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    userAccess: 'insight' | 'think' | 'all';
    ProjectClinetDetails: ThinkVsInsightSetting;
    activeCurrentUser: UserDetails;
    allCurrentUser: UserDetails[];
    currentClientCode: string;
    currentClientLoginUrl: string;
    liveYear: number;
    currentClientDashBoard: string;
    arrayWebmartCode: string[];
    liveMonthChange: Subject<number> = new Subject<number>();
    customerSearch: any;
    productSearch: any;
    agencySearch: any;
    salesSummarySearch: any;
    salesSummaryPhpSearch: any;
    salesSummaryDetailsSearch: any;
    salesSummaryForCancelOrdersSearch: any;
    taxLiabilitySearch: any;
    earnedDeferredIncomeSearch: any;
    deferredLiabilitySummarySearch: any;
    salesCategorySearch: any;
    directCustomerSearch: any;
    agencyDetailsSearch: any;
    salesMonthSearch: any;
    salesRegionSearch: any;
    topNCustomersSearch: any;
    topNProductsSearch: any;
    futureExpireSearch: any;
    agenciesCustomerSearch: any;
    atyponSubsSearch: any;
    claimsByCountrySearch: any;
    futureExpiresWithNewOrderSearch: any;
    ordersBySourceCodeSearch: any;
    cancelledOrderSearch: any;
    renewalsSearch: any;
    gratisOrderSearch: any;
    circulationReportSearch: any;
    comparisonSearch: any;
    graceSetUpSearch: any;
    customerOrderDetailsSearch: any;
    renewalCountByMonthSearch: any;
    customerDepositSearch: any;
    refundSearch: any;
    cashByAccPeriodSearch: any;
    newOrdersReconciliationSearch: any;
    cancelOrdersReconciliationSearch: any;
    lapserAndRenewalEffortSearch: any;
    lapserReportSearch: any;
    priceSetupSearch: any;
    cancelledOrderfullfilmentSearch: any;
    issueListSearch: any;
    inventoryStockSearch: any;
    activeSourceCodeSearch: any;
    invoicesByTermsSearch: any;
    stopOrdersSearch: any;
    overduePaymentSearch: any;
    creditPaymentCollectionSearch: any;
    generatedSalesInvoicesSearch: any;
    generatedCreditNotesSearch: any;
    badDebtorsSearch: any;
    duplicateInvoiceSearch: any;
    duplicateCreditNoteSearch: any;
    decirWithCancelOrdersSearch: any;
    dcierWithDocRefSearch: any;
    vatExemptSearch: any;
    vatESLSearch: any;
    ecSalesSearch: any;
    intrastatSearch: any;
    decirWithFinanceSearch: any;
    agencyDetail: any;
    detailCirculationSearch: any;
    singleIssueOrdersSearch: any;
    gratisOrdersSearch: any;
    giftOrdersSearch: any;
    customerDetailsSearch: any;
    futureEarningSearch: any;
    paymentByCurrencySearch: any;
    monthlyDeferedRevenue: any;
    agedArCustomerWiseSearch: any;
    detailsCirculationReportSearch: any;
    atyponCancelsSearch: any;
    atyponCompsSearch: any;
    atyponTrialsSearch: any;
    atyponCompsOfferCodeSearch: any;
    rmgrWatchListSearch: any;
    rmgrProductInvListSearch: any;
    rmgrCreditCardTS230Search: any;
    discountSummaryReportSearch: any;
    webOrdersByMonthSearch: any;
    restsubmOrdersByMonthSearch: any;
    webOrdersByMonthNonSubsSearch: any;
    journalListSearch: any;
    notYetRenewedSearch: any;
    creditCardRefundsSearch: any;
    detailCirculationforUCPPackSearch: any;
    detailsCircExcldReportSearch: any;
    ytdAmountByStartYearSearch: any;
    ytdOrdersByStartYearSearch: any;
    ytdOrdersByCustomerSearch: any;

    //INSIGHT
    publisherCounter5ReportsSearchModel: any;
    dynamicReportsSearchModel: any;
    libraryUserSearchModel: any;
    contactUsSearchModel: any;
    qaSearchModelSearch: any;
    qaAccountDetailSearch: any;
    publisherReportSearch: any;
    libraryConfigSearchModel: any;
    manageFavsSearchModel: any;
    tablefooterSearchModel: any;
    pushLiveSettingsSearchModel: any;
    dynamicUsageReportsSearch: any;
    clientID = 'mit';
    clientSettings: any;
    limit = '1000';
    savedSearches: SavedSearchModel[] = [];
    savedSearchesChange = new Subject<any>();
    // Common
    insightAllowed: boolean;
    thinkAllowed: boolean;
    userType: 'admin' | 'user';
    userStatus: any;
    public static getSessionObject(): SessionObject {
        return JSON.parse(localStorage.getItem('sessionObject'));

        // console.log(localStorage.getItem('sessionObject'));
        // let sessionObject: SessionObject = JSON.parse(localStorage.getItem('sessionObject'));

        //        console.log(sessionObject);
        // if (sessionObject === null) {
        //     sessionObject = new SessionObject();
        // }
        // //        console.log(sessionObject);
        // SessionObject.setSessionObject(sessionObject);
    }

    public static setSessionObject(sessionObject: SessionObject) {
        localStorage.setItem('sessionObject', JSON.stringify(sessionObject));
    }

    public static removeSessionObject() {
        localStorage.removeItem('sessionObject');
    }

    public static getMonthStr(iMonth: number): string {
        return this.month[iMonth];
    }

    public static getCurrentMonthStr(): string {
        console.log(this.liveMonth);
        return SessionObject.month[this.liveMonth];
    }


    public static getPreMonthStr(): string {
        console.log(this.liveMonth);
        if (this.liveMonth === 1) {
            return SessionObject.month[12];
        }
        return SessionObject.month[this.liveMonth - 1];
    }


    constructor() {

        this.clientID = 'mit';
        //  this.clientSettings = GlobalSettings.MIT_UI_SETTING;
        this.limit = '1000';
        this.customerSearch = null;
        this.productSearch = null;
        this.agencySearch = null;
        this.salesSummarySearch = null;
        this.salesSummaryPhpSearch = null;
        this.salesSummaryDetailsSearch = null;
        this.salesSummaryForCancelOrdersSearch = null;
        this.taxLiabilitySearch = null;
        this.earnedDeferredIncomeSearch = null;
        this.deferredLiabilitySummarySearch = null;
        this.salesCategorySearch = null;
        this.directCustomerSearch = null;
        this.agencyDetailsSearch = null;
        this.salesMonthSearch = null;
        this.salesRegionSearch = null;
        this.topNCustomersSearch = null;
        this.topNProductsSearch = null;
        this.futureExpireSearch = null;
        this.agenciesCustomerSearch = null;
        this.futureExpiresWithNewOrderSearch = null;
        this.ordersBySourceCodeSearch = null;
        this.cancelledOrderSearch = null;
        this.renewalsSearch = null;
        this.gratisOrderSearch = null;
        this.circulationReportSearch = null;
        this.comparisonSearch = null;
        this.graceSetUpSearch = null;
        this.customerOrderDetailsSearch = null;
        this.topNCustomersSearch = null;
        this.renewalCountByMonthSearch = null;
        this.customerDepositSearch = null;
        this.refundSearch = null;
        this.cashByAccPeriodSearch = null;
        this.newOrdersReconciliationSearch = null;
        this.cancelOrdersReconciliationSearch = null;
        this.lapserAndRenewalEffortSearch = null;
        this.lapserReportSearch = null;
        this.priceSetupSearch = null;
        this.cancelledOrderfullfilmentSearch = null;
        this.issueListSearch = null;
        this.inventoryStockSearch = null;
        this.activeSourceCodeSearch = null;
        this.invoicesByTermsSearch = null;
        this.stopOrdersSearch = null;
        this.overduePaymentSearch = null;
        this.creditPaymentCollectionSearch = null;
        this.generatedSalesInvoicesSearch = null
        this.generatedCreditNotesSearch = null;
        this.badDebtorsSearch = null;
        this.duplicateInvoiceSearch = null;
        this.duplicateCreditNoteSearch = null;
        this.decirWithCancelOrdersSearch = null;
        this.dcierWithDocRefSearch = null;
        this.paymentByCurrencySearch = null;
        this.futureEarningSearch = null;
        this.monthlyDeferedRevenue = null;
        this.agedArCustomerWiseSearch = null;
        this.vatExemptSearch = null;
        this.vatESLSearch = null;
        this.ecSalesSearch = null;
        this.gratisOrdersSearch = null;
        this.giftOrdersSearch = null;
        this.customerDetailsSearch = null;
        this.intrastatSearch = null;
        this.decirWithFinanceSearch = null;
        this.singleIssueOrdersSearch = null;
        this.detailsCirculationReportSearch = null;
        this.atyponCancelsSearch = null;
        this.atyponSubsSearch = null;
        this.atyponCompsSearch = null;
        this.claimsByCountrySearch = null;
        this.discountSummaryReportSearch = null;
        this.journalListSearch = null;
        this.webOrdersByMonthSearch = null;
        this.webOrdersByMonthNonSubsSearch = null;
        this.rmgrWatchListSearch = null;
        this.rmgrProductInvListSearch = null;
        this.rmgrCreditCardTS230Search = null;
        this.atyponTrialsSearch = null;
        this.restsubmOrdersByMonthSearch = null;
        this.notYetRenewedSearch = null;
        this.creditCardRefundsSearch = null;
        this.atyponCompsOfferCodeSearch = null;
        this.detailCirculationSearch = null;
        this.detailCirculationforUCPPackSearch = null;
        this.detailsCircExcldReportSearch = null;
        this.ytdAmountByStartYearSearch = null;
        this.ytdOrdersByStartYearSearch = null;
        this.ytdOrdersByCustomerSearch = null;
        // INSIGHT
        this.dynamicReportsSearchModel = null;
        this.libraryUserSearchModel = null;
        this.tablefooterSearchModel = null;
        this.contactUsSearchModel = null;
        this.qaSearchModelSearch = null;
        this.qaAccountDetailSearch = null;
        this.publisherReportSearch = null;
        this.libraryConfigSearchModel = null;
        this.manageFavsSearchModel = null;
        this.insightAllowed = false;
        this.thinkAllowed = false;
        this.pushLiveSettingsSearchModel = null;
        this.dynamicUsageReportsSearch = null;
        this.publisherCounter5ReportsSearchModel = null;
        this.userType = null;
    }


    changeLiveMonth(newLiveMonth: number) {
        SessionObject.liveMonth = newLiveMonth;
        this.liveMonthChange.next(SessionObject.liveMonth);
    }

    // changeSavedSearches() {
    //     this.savedSearchesChange.next(0);
    // }

    // triggerSavedSearchesChange() {
    //     console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaa');
    //     this.savedSearchesChange.next();
    // }

    // changeSavedSearches(): Observable<any> {
    //     return this.savedSearchesChange.asObservable();
    // }
}

