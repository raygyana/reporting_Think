import { Headers } from '@angular/http';
import { DatePipe } from '@angular/common';
import { SessionObject } from './session-object';
import { Utils } from './utils';
import { BaseSearchModel } from '../../core/base/base-search.model';
import { ChangeService } from './change-service';
import { DataDropDownOptions } from '../../components/data-drop-down/data-drop-down.model';
import { BaseComponent } from '../../core/base/base.component';
import { Constants } from './constant';
declare var $;
declare var moment;
export class ProjectUtils extends Utils {

    public static DATE_FORMAT = 'MMM DD, YYYY';

    public static tableClass = 'table row-border table-hover table-striped table-bordered';

    public static getHeaderHttp(): Headers {
        const headers: Headers = new Headers();
        // headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));
        headers.append('authorization', 'Basic aW5zaWdodHNlcnZpY2U6TXBzSW5zaWdodA==');
        headers.append('content-type', 'application/x-www-form-urlencoded');
        headers.append('cache-control', 'no-cache');
        return headers;
    }

    public static downloadfileName(fileName: string) {
        const d1 = new Date();
        const time2 = d1.getTime();
        const time1 = ProjectUtils.formatDateData(time2, 'yyyyMMMdd-HHmmss');
        return fileName + '_' + time1;
    }



    public static dtEnablePDF(dtOption, pFileName, pTitle) {
        const pdfSetting = {
            extend: 'pdf',
            footer: true,
            title: pTitle,
            filename: function () {
                return ProjectUtils.downloadfileName(pFileName || 'pdfFile');
            }
        };


        if (dtOption) {
            if (Array.isArray(dtOption['buttons'])) {
                dtOption['buttons'][1]['buttons'].push(pdfSetting);
            } else {
                dtOption['buttons'] = [pdfSetting];
            }
        }


        // dtOption['buttons'] = [
        //     {
        //         extend: 'csv',
        //         footer: true,
        //         title: pTitle,
        //         charset: 'UTF-16LE',
        //         bom: true,
        //         filename: function () {
        //             return ProjectUtils.downloadfileName(pFileName || 'csvFile');
        //         }
        //     },
        //     {
        //         extend: 'excel',
        //         footer: true,
        //         title: pTitle,
        //         filename: function () {
        //             return ProjectUtils.downloadfileName(pFileName || 'excelFile');
        //         }
        //     }
        //     ,
        //     {
        //         extend: 'pdf',
        //         footer: true,
        //         title: pTitle,
        //         filename: function () {
        //             return ProjectUtils.downloadfileName(pFileName || 'pdfFile');
        //         }
        //     }]



    }


    public static defaultPageSize(dtOption: any, pageSize: number) {

        dtOption['pageLength'] = pageSize;
    }

    public static doOptionSettings(pFileName?: string, pTitle: string = '', myFun?: any): any {
        const dtOptions: any = {
            // oLanguage: {
            //     sLengthMenu: 'Display _MENU_ records'
            // },
            pageLength: 20,
            pagingType: 'full_numbers',
            lengthChange: true,
            lengthMenu: [10, 20, 30, 40, 50],
            language: {
                infoEmpty: '',
                // emptyTable: '',
                // zeroRecords: '',
                emptyTable: 'No data available for this request!',
                zeroRecords: 'No data available for this request!',
                paginate: {
                    first: '<i class="fa fa-backward" aria-hidden="true"></i>',
                    last: '<i class="fa fa-forward" aria-hidden="true"></i>',
                    next: '<i class="fa fa-caret-right" aria-hidden="true"></i>',
                    previous: '<i class="fa fa-caret-left" aria-hidden="true"></i>'
                },
                buttons: {
                    colvis: '<i class="fa fa-bars download_class"></i>'
                },
                select: {
                    rows: ''
                }
            },




            dom: 'RBlfrtip',
            buttons: [
                {
                    extend: 'colvis',
                    text: '<i class="fa fa-bars download_class"></i>'
                },
                {
                    extend: 'collection',
                    text: '<i class="fa fa-download download_class"></i>',  // '<i class="fa fa-cloud-download download_class"></i>',
                    buttons: [
                        // {
                        //     extend: 'csv',
                        //     footer: true,
                        //     title: pTitle,
                        //     charset: 'UTF-16LE',
                        //     bom: true,
                        //     filename: function () {
                        //         return ProjectUtils.downloadfileName(pFileName || 'csvFile');
                        //     }
                        // },
                        {
                            extend: 'excel',
                            footer: true,
                            title: pTitle,
                            filename: function () {
                                return ProjectUtils.downloadfileName(pFileName || 'excelFile');
                            }
                        }
                        // ,
                        // {
                        //     extend: 'pdf',
                        //     footer: true,
                        //     title: pTitle,
                        //     filename: function () {
                        //         return ProjectUtils.downloadfileName(pFileName || 'pdfFile');
                        //     }
                        // },
                        // {
                        //     extend: 'print',
                        //     footer: true,
                        //     title: pTitle,
                        // },
                        // {
                        //     extend: 'copy',
                        //     footer: true,
                        //     title: pTitle,
                        // }
                    ]
                }

            ],
            fixedHeader: {
                header: true,
                footer: true
            }
        };


        if (typeof myFun === 'function') {
            myFun(dtOptions, pFileName, pTitle);
        }

        return dtOptions;
    }


    public static doOptionSettingsInsight(pFileName?: string, pTitle: string = '', dtFun?: any): any {
        const dtOptions: any = {
            language: {
                infoEmpty: 'No entries to show',
                // emptyTable: '',
                // zeroRecords: '',
                emptyTable: 'No data available for this request',
                zeroRecords: 'No further records for display',

                select: {
                    rows: ''
                }
            },
            dom: 'RBlfrtip',
            fixedHeader: {
                header: false,
                footer: true
            },
            paging: false,
            bSort: false,
            // scrollX: true,
            info: false,
            buttons: [],
            //              : '450px',
            searching: false,
            data: []
        };

        if (typeof dtFun === 'function') {
            dtFun(dtOptions);
        }

        return dtOptions;
    }




    public static doOptionSettingsFull(pFileName?: string, pTitle: string = '', myTaskFn?: any): any {
        const dtOptions = ProjectUtils.doOptionSettings(pFileName, pTitle, myTaskFn);
        // dtOptions['scrollY'] = '400px';
        return dtOptions;
    }

    public static getClientCode(): string {
        const sessionObject: SessionObject = SessionObject.getSessionObject();
        console.log(sessionObject);
        return sessionObject.clientID;
    }

    public static setLapserAndRenewalSearch(sessionObject: SessionObject, newlapserAndRenewalSearch: any) {
        sessionObject.lapserAndRenewalEffortSearch = newlapserAndRenewalSearch;
        SessionObject.setSessionObject(sessionObject);
    }
    public static setCustomerSearch(sessionObject: SessionObject, newCustomerSearch: any) {
        sessionObject.customerSearch = newCustomerSearch;
        SessionObject.setSessionObject(sessionObject);
    }
    public static getCustomerSearch(sessionObject: SessionObject): BaseSearchModel {
        return sessionObject.customerSearch;
    }

    public static setProductSearch(sessionObject: SessionObject, newProductSearch: any) {
        sessionObject.productSearch = newProductSearch;
        SessionObject.setSessionObject(sessionObject);
    }

    public static setAgencySearch(sessionObject: SessionObject, newAgencySearch: any) {
        sessionObject.agencySearch = newAgencySearch;
        SessionObject.setSessionObject(sessionObject);
    }


    public static setTaxLiabilitySearch(sessionObject: SessionObject, newTaxLiabilitySearch: any) {
        sessionObject.taxLiabilitySearch = newTaxLiabilitySearch;
        SessionObject.setSessionObject(sessionObject);
    }

    public static getTaxLiabilitySearch(sessionObject: SessionObject): BaseSearchModel {
        return sessionObject.taxLiabilitySearch;
    }

    public static setEarnedDeferredIncomeSearch(sessionObject: SessionObject, newEarnedDeferredIncomeSearch: any) {
        sessionObject.earnedDeferredIncomeSearch = newEarnedDeferredIncomeSearch;
        SessionObject.setSessionObject(sessionObject);
    }
    public static getEarnedDeferredIncomeSearch(sessionObject: SessionObject): BaseSearchModel {
        return sessionObject.earnedDeferredIncomeSearch;
    }

    public static setDeferredLiabilitySummarySearch(sessionObject: SessionObject, newDeferredLiabilitySummarySearch: any) {
        sessionObject.deferredLiabilitySummarySearch = newDeferredLiabilitySummarySearch;
        SessionObject.setSessionObject(sessionObject);
    }

    public static getDeferredLiabilitySummarySearch(sessionObject: SessionObject): BaseSearchModel {
        return sessionObject.deferredLiabilitySummarySearch;
    }

    public static setSalesSummarySearch(sessionObject: SessionObject, newSalesSummarySearch: any) {
        sessionObject.salesSummarySearch = newSalesSummarySearch;
        SessionObject.setSessionObject(sessionObject);
    }

    public static setSalesSummaryDetailsSearch(sessionObject: SessionObject, newSalesSummaryDetailsSearch: any) {
        sessionObject.salesSummaryDetailsSearch = newSalesSummaryDetailsSearch;
        SessionObject.setSessionObject(sessionObject);
    }
    public static getSalesSummaryDetailsSearch(sessionObject: SessionObject): BaseSearchModel {
        return sessionObject.salesSummaryDetailsSearch;
    }
    public static setSalesSummaryForCancelOrdersSearch(sessionObject: SessionObject, newSalesSummaryForCancelOrdersSearch: any) {
        sessionObject.salesSummaryForCancelOrdersSearch = newSalesSummaryForCancelOrdersSearch;
        SessionObject.setSessionObject(sessionObject);
    }
    public static getSalesSummaryForCancelOrdersSearch(sessionObject: SessionObject): BaseSearchModel {
        return sessionObject.salesSummaryForCancelOrdersSearch;
    }

    public static setSalesSummaryPhpSearch(sessionObject: SessionObject, newSalesSummaryPhpSearch: any) {
        sessionObject.salesSummaryPhpSearch = newSalesSummaryPhpSearch;
        SessionObject.setSessionObject(sessionObject);
    }
    public static getSalesSummarySearch(sessionObject: SessionObject): BaseSearchModel {
        return sessionObject.salesSummaryPhpSearch;
    }

    public static setAtyponSubsSearch(sessionObject: SessionObject, newAtyponSubsSearch: any) {
        sessionObject.atyponSubsSearch = newAtyponSubsSearch;
        SessionObject.setSessionObject(sessionObject);
    }

    public static setSalesByCategorySearch(sessionObject: SessionObject, newSalesCategorySearch: any) {
        sessionObject.salesCategorySearch = newSalesCategorySearch;
        SessionObject.setSessionObject(sessionObject);
    }

    public static setDirectCustomerSearch(sessionObject: SessionObject, newDirectCustomerSearch: any) {
        sessionObject.directCustomerSearch = newDirectCustomerSearch;
        SessionObject.setSessionObject(sessionObject);
    }

    public static setAgencyDetailsSearch(sessionObject: SessionObject, newAgencyDetailsSearch: any) {
        sessionObject.agencyDetailsSearch = newAgencyDetailsSearch;
        SessionObject.setSessionObject(sessionObject);
    }

    public static setSalesMonthSearch(sessionObject: SessionObject, newSalesMonthSearch: any) {
        sessionObject.salesMonthSearch = newSalesMonthSearch;
        SessionObject.setSessionObject(sessionObject);
    }

    public static setSalesRegionSearch(sessionObject: SessionObject, newSalesRegionSearch: any) {
        sessionObject.salesRegionSearch = newSalesRegionSearch;
        SessionObject.setSessionObject(sessionObject);
    }

    public static setFutureExpireSearch(sessionObject: SessionObject, newFutureExpireSearch: any) {
        sessionObject.futureExpireSearch = newFutureExpireSearch;
        SessionObject.setSessionObject(sessionObject);
    }

    public static setAgenciesCustomerSalesSearch(sessionObject: SessionObject, newAgenciesCustomerSalesSearch: any) {
        sessionObject.agenciesCustomerSearch = newAgenciesCustomerSalesSearch;
        SessionObject.setSessionObject(sessionObject);
    }
    public static setFutureExpiresWithNewOrderSearch(sessionObject: SessionObject, newFutureExpiresWithNewOrderSearch: any) {
        sessionObject.futureExpiresWithNewOrderSearch = newFutureExpiresWithNewOrderSearch;
        SessionObject.setSessionObject(sessionObject);
    }

    public static setTopNCustomersSearch(sessionObject: SessionObject, newTopNCustomersSearch: any) {
        sessionObject.topNCustomersSearch = newTopNCustomersSearch;
        SessionObject.setSessionObject(sessionObject);
    }

    public static setTopNProductsSearch(sessionObject: SessionObject, newTopNProductsSearch: any) {
        sessionObject.topNProductsSearch = newTopNProductsSearch;
        SessionObject.setSessionObject(sessionObject);
    }

    public static setOrdersBySourceCodeSearch(sessionObject: SessionObject, newOrdersBySourceCodeSearch: any) {
        sessionObject.ordersBySourceCodeSearch = newOrdersBySourceCodeSearch;
        SessionObject.setSessionObject(sessionObject);
    }

    public static setGraceSetUpSearch(sessionObject: SessionObject, newGraceSetUpSearch: any) {
        sessionObject.graceSetUpSearch = newGraceSetUpSearch;
        SessionObject.setSessionObject(sessionObject);
    }
    public static getGraceSetupSearch(sessionObject: SessionObject): BaseSearchModel {
        return sessionObject.graceSetUpSearch;
    }
    public static setRMGRProductInvListSearch(sessionObject: SessionObject, newRMGRProductInvListSearch: any) {
        sessionObject.rmgrProductInvListSearch = newRMGRProductInvListSearch;
        SessionObject.setSessionObject(sessionObject);
    }
    public static getRMGRProductInvListSearch(sessionObject: SessionObject): BaseSearchModel {
        return sessionObject.rmgrProductInvListSearch;
    }
    public static setRMGRWatchListSearch(sessionObject: SessionObject, newRMGRWatchListSearch: any) {
        sessionObject.rmgrWatchListSearch = newRMGRWatchListSearch;
        SessionObject.setSessionObject(sessionObject);
    }
    public static getRMGRWatchListSearch(sessionObject: SessionObject): BaseSearchModel {
        return sessionObject.rmgrWatchListSearch;
    }
    public static setRMGRCreditCardTsSearch(sessionObject: SessionObject, newRMGRCreditCardTsSearch: any) {
        sessionObject.rmgrCreditCardTS230Search = newRMGRCreditCardTsSearch;
        SessionObject.setSessionObject(sessionObject);
    }
    public static getRMGRCreditCardTsSearch(sessionObject: SessionObject): BaseSearchModel {
        return sessionObject.rmgrCreditCardTS230Search;
    }
    public static setAtyponTrialsSearch(sessionObject: SessionObject, newAtyponTrialsSearch: any) {
        sessionObject.atyponTrialsSearch = newAtyponTrialsSearch;
        SessionObject.setSessionObject(sessionObject);
    }
    public static setCustomerOrderDetailsSearch(sessionObject: SessionObject, newCustomerOrderDetailsSearch: any) {
        sessionObject.customerOrderDetailsSearch = newCustomerOrderDetailsSearch;
        SessionObject.setSessionObject(sessionObject);
    }

    public static setCancelledOrderSearch(sessionObject: SessionObject, newCancelledOrderSearch: any) {
        sessionObject.cancelledOrderSearch = newCancelledOrderSearch;
        SessionObject.setSessionObject(sessionObject);
    }

    public static setRenewalsSearch(sessionObject: SessionObject, newRenewalsSearch: any) {
        sessionObject.renewalsSearch = newRenewalsSearch;
        SessionObject.setSessionObject(sessionObject);
    }

    public static setGratisOrderSearch(sessionObject: SessionObject, newGratisOrderSearch: any) {
        sessionObject.gratisOrderSearch = newGratisOrderSearch;
        SessionObject.setSessionObject(sessionObject);
    }

    public static setCirculationReportSearch(sessionObject: SessionObject, newCirculationReportSearch: any) {
        sessionObject.circulationReportSearch = newCirculationReportSearch;
        SessionObject.setSessionObject(sessionObject);
    }

    public static setRenewalsCountByMonth(sessionObject: SessionObject, newRenewalsCountByMonth: any) {
        sessionObject.renewalCountByMonthSearch = newRenewalsCountByMonth;
        SessionObject.setSessionObject(sessionObject);
    }

    public static setCustomerDepositSearch(sessionObject: SessionObject, newCustomerDepositSearch: any) {
        sessionObject.customerDepositSearch = newCustomerDepositSearch;
        SessionObject.setSessionObject(sessionObject);
    }
    public static getCustomerDepositSearch(sessionObject: SessionObject): BaseSearchModel {
        return sessionObject.customerDepositSearch;
    }
    public static setCashByAccPeriodSearch(sessionObject: SessionObject, newCashByAccPeriodSearch: any) {
        sessionObject.cashByAccPeriodSearch = newCashByAccPeriodSearch;
        SessionObject.setSessionObject(sessionObject);
    }
    public static getCashByAccPeriodSearch(sessionObject: SessionObject): BaseSearchModel {
        return sessionObject.cashByAccPeriodSearch;
    }

    public static setVatExemptSearch(sessionObject: SessionObject, newVatExemptSearch: any) {
        sessionObject.vatExemptSearch = newVatExemptSearch;
        SessionObject.setSessionObject(sessionObject);
    }
    public static getVatExemptSearch(sessionObject: SessionObject): BaseSearchModel {
        return sessionObject.vatExemptSearch;
    }
    public static setVatESLSearch(sessionObject: SessionObject, newVatESLSearch: any) {
        sessionObject.vatESLSearch = newVatESLSearch;
        SessionObject.setSessionObject(sessionObject);
    }
    public static getVatESLSearch(sessionObject: SessionObject): BaseSearchModel {
        return sessionObject.vatESLSearch;
    }
    public static setECSalesSearch(sessionObject: SessionObject, newECSalesSearch: any) {
        sessionObject.ecSalesSearch = newECSalesSearch;
        SessionObject.setSessionObject(sessionObject);
    }
    public static getECSalesSearch(sessionObject: SessionObject): BaseSearchModel {
        return sessionObject.ecSalesSearch;
    }

    public static setIntrastatSearch(sessionObject: SessionObject, newIntrastatSearch: any) {
        sessionObject.intrastatSearch = newIntrastatSearch;
        SessionObject.setSessionObject(sessionObject);
    }
    public static getIntrastatSearch(sessionObject: SessionObject): BaseSearchModel {
        return sessionObject.intrastatSearch;
    }

    public static setDecirWithFinanceSearch(sessionObject: SessionObject, newDecirWithFinanceSearch: any) {
        sessionObject.decirWithFinanceSearch = newDecirWithFinanceSearch;
        SessionObject.setSessionObject(sessionObject);
    }

    public static setAgencyDetails(sessionObject: SessionObject, newAgencyDetails: any) {
        sessionObject.agencyDetail = newAgencyDetails;
        SessionObject.setSessionObject(sessionObject);
    }

    public static setDetailCirculationSearch(sessionObject: SessionObject, newDetailCirculationSearch: any) {
        sessionObject.detailCirculationSearch = newDetailCirculationSearch;
        SessionObject.setSessionObject(sessionObject);
    }
    public static getDecirWithFinanceSearch(sessionObject: SessionObject): BaseSearchModel {
        return sessionObject.decirWithFinanceSearch;
    }

    public static setYTDAmountByStartYearSearch(sessionObject: SessionObject, newYTDAmountByStartYearSearch: any) {
        sessionObject.ytdAmountByStartYearSearch = newYTDAmountByStartYearSearch;
        SessionObject.setSessionObject(sessionObject);
    }
    public static getYTDAmountByStartYearSearch(sessionObject: SessionObject): BaseSearchModel {
        return sessionObject.ytdAmountByStartYearSearch;
    }
    public static setYTDOrdersByCustomerSearch(sessionObject: SessionObject, newYTDOrdersByCustomerSearch: any) {
        sessionObject.ytdOrdersByCustomerSearch = newYTDOrdersByCustomerSearch;
        SessionObject.setSessionObject(sessionObject);
    }
    public static setYTDOrdersByStartYearSearch(sessionObject: SessionObject, newYTDOrdersByStartYearSearch: any) {
        sessionObject.ytdOrdersByStartYearSearch = newYTDOrdersByStartYearSearch;
        SessionObject.setSessionObject(sessionObject);
    }
    public static getYTDOrdersByStartYearSearch(sessionObject: SessionObject): BaseSearchModel {
        return sessionObject.ytdOrdersByStartYearSearch;
    }

    public static setDcierWithDocRefSearch(sessionObject: SessionObject, newDcierWithDocRefSearch: any) {
        sessionObject.dcierWithDocRefSearch = newDcierWithDocRefSearch;
        SessionObject.setSessionObject(sessionObject);
    }
    public static getDcierWithDocRefSearch(sessionObject: SessionObject): BaseSearchModel {
        return sessionObject.dcierWithDocRefSearch;
    }

    public static setSingleIssueOrdersSearch(sessionObject: SessionObject, newSingleIssueOrdersSearch: any) {
        sessionObject.singleIssueOrdersSearch = newSingleIssueOrdersSearch;
        SessionObject.setSessionObject(sessionObject);
    }
    public static getSingleIssueOrdersSearch(sessionObject: SessionObject): BaseSearchModel {
        return sessionObject.singleIssueOrdersSearch;
    }
    public static setGratisOrdersSearch(sessionObject: SessionObject, newGratisOrdersSearch: any) {
        sessionObject.gratisOrdersSearch = newGratisOrdersSearch;
        SessionObject.setSessionObject(sessionObject);
    }
    public static setGiftOrdersSearch(sessionObject: SessionObject, newGiftOrdersSearch: any) {
        sessionObject.giftOrdersSearch = newGiftOrdersSearch;
        SessionObject.setSessionObject(sessionObject);
    }
    public static setCustomerDetailsSearch(sessionObject: SessionObject, newCustomerDetailsSearch: any) {
        sessionObject.customerDetailsSearch = newCustomerDetailsSearch;
        SessionObject.setSessionObject(sessionObject);
    }
    public static getCustomerDetailsSearch(sessionObject: SessionObject): BaseSearchModel {
        return sessionObject.customerDetailsSearch;
    }

    public static setClaimsByCountrySearch(sessionObject: SessionObject, newClaimsByCountrySearch: any) {
        sessionObject.claimsByCountrySearch = newClaimsByCountrySearch;
        SessionObject.setSessionObject(sessionObject);
    }

    public static setNewOrdersReconciliationSearch(sessionObject: SessionObject, newNewOrdersReconciliationSearch: any) {
        sessionObject.newOrdersReconciliationSearch = newNewOrdersReconciliationSearch;
        SessionObject.setSessionObject(sessionObject);
    }
    public static getNewOrdersReconciliationSearch(sessionObject: SessionObject): BaseSearchModel {
        return sessionObject.newOrdersReconciliationSearch;
    }
    public static setCancelOrdersReconciliationSearch(sessionObject: SessionObject, newCancelOrdersReconciliationSearch: any) {
        sessionObject.cancelOrdersReconciliationSearch = newCancelOrdersReconciliationSearch;
        SessionObject.setSessionObject(sessionObject);
    }
    public static getCancelOrdersReconciliationSearch(sessionObject: SessionObject): BaseSearchModel {
        return sessionObject.cancelOrdersReconciliationSearch;
    }
    public static setRefundSearch(sessionObject: SessionObject, newRefundSearch: any) {
        sessionObject.refundSearch = newRefundSearch;
        SessionObject.setSessionObject(sessionObject);
    }
    public static getRefundSearch(sessionObject: SessionObject): BaseSearchModel {
        return sessionObject.refundSearch;
    }

    public static setCancelledOrderfullfilmentSearch(sessionObject: SessionObject, newCancelledOrderfullfilmentSearch: any) {
        sessionObject.cancelledOrderfullfilmentSearch = newCancelledOrderfullfilmentSearch;
        SessionObject.setSessionObject(sessionObject);
    }
    public static setPriceSetupSearch(sessionObject: SessionObject, newPriceSetupSearch: any) {
        sessionObject.priceSetupSearch = newPriceSetupSearch;
        SessionObject.setSessionObject(sessionObject);
    }

    public static setLapserReportSearch(sessionObject: SessionObject, newlapserReportSearch: any) {
        sessionObject.lapserReportSearch = newlapserReportSearch;
        SessionObject.setSessionObject(sessionObject);
    }

    public static setIssueListSearch(sessionObject: SessionObject, newIssueListSearch: any) {
        sessionObject.issueListSearch = newIssueListSearch;
        SessionObject.setSessionObject(sessionObject);
    }

    public static setInventoryStockSearch(sessionObject: SessionObject, newInventoryStockSearch: any) {
        sessionObject.inventoryStockSearch = newInventoryStockSearch;
        SessionObject.setSessionObject(sessionObject);
    }

    public static setActiveSourceCodeSearch(sessionObject: SessionObject, newActiveSourceCodeSearch: any) {
        sessionObject.activeSourceCodeSearch = newActiveSourceCodeSearch;
        SessionObject.setSessionObject(sessionObject);
    }

    public static setComparisonSearch(sessionObject: SessionObject, newComparisonSearch: any) {
        sessionObject.comparisonSearch = newComparisonSearch;
        SessionObject.setSessionObject(sessionObject);
    }
    public static setInvoicesByTermsSearch(sessionObject: SessionObject, newInvoicesByTermsSearch: any) {
        sessionObject.invoicesByTermsSearch = newInvoicesByTermsSearch;
        SessionObject.setSessionObject(sessionObject);
    }
    public static getInvoicesByTermsSearch(sessionObject: SessionObject): BaseSearchModel {
        return sessionObject.invoicesByTermsSearch;
    }
    public static setStopOrdersSearch(sessionObject: SessionObject, newStopOrdersSearch: any) {
        sessionObject.stopOrdersSearch = newStopOrdersSearch;
        SessionObject.setSessionObject(sessionObject);
    }
    public static getStopOrdersSearch(sessionObject: SessionObject): BaseSearchModel {
        return sessionObject.stopOrdersSearch;
    }
    public static setOverduePaymentSearch(sessionObject: SessionObject, newOverduePaymentSearch: any) {
        sessionObject.overduePaymentSearch = newOverduePaymentSearch;
        SessionObject.setSessionObject(sessionObject);
    }
    public static getOverduePaymentSearch(sessionObject: SessionObject): BaseSearchModel {
        return sessionObject.overduePaymentSearch;
    }
    public static setCreditPaymentCollectionSearch(sessionObject: SessionObject, newCreditPaymentCollectionSearch: any) {
        sessionObject.creditPaymentCollectionSearch = newCreditPaymentCollectionSearch;
        SessionObject.setSessionObject(sessionObject);
    }
    public static getCreditPaymentCollectionSearch(sessionObject: SessionObject): BaseSearchModel {
        return sessionObject.creditPaymentCollectionSearch;
    }
    public static setGeneratedSalesInvoicesSearch(sessionObject: SessionObject, newGeneratedSalesInvoicesSearch: any) {
        sessionObject.generatedSalesInvoicesSearch = newGeneratedSalesInvoicesSearch;
        SessionObject.setSessionObject(sessionObject);
    }
    public static getGeneratedSalesInvoicesSearch(sessionObject: SessionObject): BaseSearchModel {
        return sessionObject.generatedSalesInvoicesSearch;
    }
    public static setGeneratedCreditNotesSearch(sessionObject: SessionObject, newGeneratedCreditNotesSearch: any) {
        sessionObject.generatedCreditNotesSearch = newGeneratedCreditNotesSearch;
        SessionObject.setSessionObject(sessionObject);
    }
    public static getGeneratedCreditNotesSearch(sessionObject: SessionObject): BaseSearchModel {
        return sessionObject.generatedCreditNotesSearch;
    }
    public static setBadDebtorsSearch(sessionObject: SessionObject, newBadDebtorsSearch: any) {
        sessionObject.badDebtorsSearch = newBadDebtorsSearch;
        SessionObject.setSessionObject(sessionObject);
    }
    public static getBadDebtorsSearch(sessionObject: SessionObject): BaseSearchModel {
        return sessionObject.badDebtorsSearch;
    }
    public static setDuplicateInvoiceSearch(sessionObject: SessionObject, newDuplicateInvoiceSearch: any) {
        sessionObject.duplicateInvoiceSearch = newDuplicateInvoiceSearch;
        SessionObject.setSessionObject(sessionObject);
    }
    public static getDuplicateInvoiceSearch(sessionObject: SessionObject): BaseSearchModel {
        return sessionObject.duplicateInvoiceSearch;
    }
    public static setDuplicateCreditNoteSearch(sessionObject: SessionObject, newDuplicateCreditNoteSearch: any) {
        sessionObject.duplicateCreditNoteSearch = newDuplicateCreditNoteSearch;
        SessionObject.setSessionObject(sessionObject);
    }
    public static getDuplicateCreditNoteSearch(sessionObject: SessionObject): BaseSearchModel {
        return sessionObject.duplicateCreditNoteSearch;
    }
    public static setDecirWithCancelOrdersSearch(sessionObject: SessionObject, newDecirWithCancelOrdersSearch: any) {
        sessionObject.decirWithCancelOrdersSearch = newDecirWithCancelOrdersSearch;
        SessionObject.setSessionObject(sessionObject);
    }
    public static getDecirWithCancelOrdersSearch(sessionObject: SessionObject): BaseSearchModel {
        return sessionObject.decirWithCancelOrdersSearch;
    }
    public static setFutureEarningSearch(sessionObject: SessionObject, newFutureEarningSearch: any) {
        sessionObject.futureEarningSearch = newFutureEarningSearch;
        SessionObject.setSessionObject(sessionObject);
    }
    public static setPaymentByCurrencySearch(sessionObject: SessionObject, newPaymentByCurrencySearch: any) {
        sessionObject.paymentByCurrencySearch = newPaymentByCurrencySearch;
        SessionObject.setSessionObject(sessionObject);
    }
    public static getPaymentByCurrencySearch(sessionObject: SessionObject): BaseSearchModel {
        return sessionObject.paymentByCurrencySearch;
    }

    public static setMonthlyDeferedRevenue(sessionObject: SessionObject, newMonthlyDeferedRevenue: any) {
        sessionObject.monthlyDeferedRevenue = newMonthlyDeferedRevenue;
        SessionObject.setSessionObject(sessionObject);
    }
    public static setAgedArCustomerWiseSearch(sessionObject: SessionObject, newAgedArCustomerWiseSearch: any) {
        sessionObject.agedArCustomerWiseSearch = newAgedArCustomerWiseSearch;
        SessionObject.setSessionObject(sessionObject);
    }
    public static getAgedArCustomerWiseSearch(sessionObject: SessionObject): BaseSearchModel {
        return sessionObject.agedArCustomerWiseSearch;
    }
    public static setdetailsCirculationReportSearch(sessionObject: SessionObject, newDetailsCirculationReportSearch: any) {
        sessionObject.detailsCirculationReportSearch = newDetailsCirculationReportSearch;
        SessionObject.setSessionObject(sessionObject);
    }
    public static setDetailsCircExcldReportSearch(sessionObject: SessionObject, newDetailsCircExcldReportSearch: any) {
        sessionObject.detailsCircExcldReportSearch = newDetailsCircExcldReportSearch;
        SessionObject.setSessionObject(sessionObject);
    }
    public static setDetailCirculationforUCPPackSearch(sessionObject: SessionObject, newDetailCirculationforUCPPackSearch: any) {
        sessionObject.detailCirculationforUCPPackSearch = newDetailCirculationforUCPPackSearch;
        SessionObject.setSessionObject(sessionObject);
    }
    public static setAtyponCancelsSearch(sessionObject: SessionObject, newAtyponCancelsSearch: any) {
        sessionObject.atyponCancelsSearch = newAtyponCancelsSearch;
        SessionObject.setSessionObject(sessionObject);
    }

    public static setAtyponCompsSearch(sessionObject: SessionObject, newAtyponCompsSearch: any) {
        sessionObject.atyponCompsSearch = newAtyponCompsSearch;
        SessionObject.setSessionObject(sessionObject);
    }
    public static getAtyponCompsSearch(sessionObject: SessionObject): BaseSearchModel {
        return sessionObject.atyponCompsSearch;
    }

    public static setDiscountSummaryReportSearch(sessionObject: SessionObject, newDiscountSummaryReportSearch: any) {
        sessionObject.discountSummaryReportSearch = newDiscountSummaryReportSearch;
        SessionObject.setSessionObject(sessionObject);
    }

    public static setWebOrdersByMonthSearch(sessionObject: SessionObject, newWebOrdersByMonthSearch: any) {
        sessionObject.webOrdersByMonthSearch = newWebOrdersByMonthSearch;
        SessionObject.setSessionObject(sessionObject);
    }
    public static setWebOrdersByMonthNonSubsSearch(sessionObject: SessionObject, newWebOrdersByMonthNonSubsSearch: any) {
        sessionObject.webOrdersByMonthNonSubsSearch = newWebOrdersByMonthNonSubsSearch;
        SessionObject.setSessionObject(sessionObject);
    }
    public static setRestsubmOrdersByMonthSearch(sessionObject: SessionObject, newRestsubmOrdersByMonthSearch: any) {
        sessionObject.restsubmOrdersByMonthSearch = newRestsubmOrdersByMonthSearch;
        SessionObject.setSessionObject(sessionObject);
    }
    public static setJournalListSearch(sessionObject: SessionObject, newJournalListSearch: any) {
        sessionObject.journalListSearch = newJournalListSearch;
        SessionObject.setSessionObject(sessionObject);
    }
    public static getJournalListSearch(sessionObject: SessionObject): BaseSearchModel {
        return sessionObject.journalListSearch;
    }
    public static setNotYetRenewedSearch(sessionObject: SessionObject, newNotYetRenewedSearch: any) {
        sessionObject.notYetRenewedSearch = newNotYetRenewedSearch;
        SessionObject.setSessionObject(sessionObject);
    }
    public static setAtyponCompsOfferCodeSearch(sessionObject: SessionObject, newAtyponCompsOfferCodeSearch: any) {
        sessionObject.atyponCompsOfferCodeSearch = newAtyponCompsOfferCodeSearch;
        SessionObject.setSessionObject(sessionObject);
    }
    public static getNotYetRenewedSearch(sessionObject: SessionObject): BaseSearchModel {
        return sessionObject.notYetRenewedSearch;
    }
    public static setCreditCardRefundsSearch(sessionObject: SessionObject, newCreditCardRefundsSearch: any) {
        sessionObject.creditCardRefundsSearch = newCreditCardRefundsSearch;
        SessionObject.setSessionObject(sessionObject);
    }
    public static setQaSearch(sessionObject: SessionObject, newQaSearchModelSearch: any) {
        sessionObject.qaSearchModelSearch = newQaSearchModelSearch;
        SessionObject.setSessionObject(sessionObject);
    }
    public static setQaAccountDetail(sessionObject: SessionObject, newQaAccountDetailSearch: any) {
        sessionObject.qaAccountDetailSearch = newQaAccountDetailSearch;
        SessionObject.setSessionObject(sessionObject);
    }
    public static getQaAccountDetail(sessionObject: SessionObject): BaseSearchModel {
        return sessionObject.qaAccountDetailSearch;
    }
    public static setPublisherReport(sessionObject: SessionObject, newPublisherReportSearch: any) {
        sessionObject.publisherReportSearch = newPublisherReportSearch;
        SessionObject.setSessionObject(sessionObject);
    }
    public static getPublisherReport(sessionObject: SessionObject): BaseSearchModel {
        return sessionObject.publisherReportSearch;
    }


    //INSIGHT 


    public static setDynamicReportsSearchModel(sessionObject: SessionObject, newDynamicReportsSearchModel: any) {
        sessionObject.dynamicReportsSearchModel = newDynamicReportsSearchModel;
        SessionObject.setSessionObject(sessionObject);
    }

    public static setPublisherCounter5ReportsSearchModel(sessionObject: SessionObject, newPublisherCounter5ReportsSearchModel: any) {
        sessionObject.publisherCounter5ReportsSearchModel = newPublisherCounter5ReportsSearchModel;
        SessionObject.setSessionObject(sessionObject);
    }
    public static setLibraryUserSearchModel(sessionObject: SessionObject, newLibraryUserSearchModel: any) {
        sessionObject.libraryUserSearchModel = newLibraryUserSearchModel;
        SessionObject.setSessionObject(sessionObject);
    }
    public static setContactUsSearchModel(sessionObject: SessionObject, newContactUsSearchModel: any) {
        sessionObject.contactUsSearchModel = newContactUsSearchModel;
        SessionObject.setSessionObject(sessionObject);
    }
    public static setLibraryConfigSearchModel(sessionObject: SessionObject, newLibraryConfigSearchModel: any) {
        sessionObject.libraryConfigSearchModel = newLibraryConfigSearchModel;
        SessionObject.setSessionObject(sessionObject);
    }
    public static setManageFavsSearch(sessionObject: SessionObject, newManageFavsSearchModel: any) {
        sessionObject.manageFavsSearchModel = newManageFavsSearchModel;
        SessionObject.setSessionObject(sessionObject);
    }
    public static setDynamicUsageReportsSearch(sessionObject: SessionObject, newDynamicReportsSearch: any) {
        sessionObject.dynamicUsageReportsSearch = newDynamicReportsSearch;
        SessionObject.setSessionObject(sessionObject);
    }

    public static getPushLiveSettingsSearch(sessionObject: SessionObject): BaseSearchModel {
        return sessionObject.pushLiveSettingsSearchModel;
    }

    public static setPushLiveSettingsSearch(sessionObject: SessionObject, newPushLiveSettingsSearchModel: any) {
        sessionObject.pushLiveSettingsSearchModel = newPushLiveSettingsSearchModel;
        SessionObject.setSessionObject(sessionObject);
    }


    public static getOptionTerms(baseComponent: BaseComponent): DataDropDownOptions {
        const ddOptionsTerms = new DataDropDownOptions();
        // ddOptionsTerms.serviceURL = Constants.TK_PRODUCT_CATEGORY_URL;
        ddOptionsTerms.keyName = 'id';
        ddOptionsTerms.keyDesc = 'value';
        ddOptionsTerms.baseComponent = baseComponent;
        ddOptionsTerms.modelName = 'term';
        ddOptionsTerms.multipleState = true;
        ddOptionsTerms.sizeCount = 3;
        return ddOptionsTerms;
    }



    public static makeSelectDownloadList(data: Array<any>, firstLabel: string, otherLabelsKey: string, valuesKey: string, id: string): string {
        const selectStart = `<select id ="${id}" onclick="console.log('abc')"   onChange="download(this.value)">`;
        const selectEnd = `</select>`;
        let Output = '';

        const FirstChain = `<option value="">${firstLabel}</option>`;
        Output += selectStart + FirstChain;
        data.forEach((item) => {
            Output += `<option value="${item[valuesKey]}">${item[otherLabelsKey]}</option>`
        })
        Output += selectEnd;
        return Output;
    }

    public static makeSingleDownloadLink(lablel: string, link: string, cssClass?: string): string {
        return `<a class="${cssClass}" href="${link}" target="_black">${lablel}</a>`
    }


    public static makeRouterLink(lablel: string, link: string, cssClass?: string): string {
        return `<a class="${cssClass}" routerLink="['${link}']">${lablel}</a>`
    }


    public static dtGetCheckBoxValuesFromDT(event: any, data: any, obj: any, key): boolean {
        {
            const checked = event.target.checked;
            if (checked !== undefined) {
                return ProjectUtils.setCheckBoxValue(checked, data, obj, key);
            }
        }
    }

    public static setCheckBoxValue(checked: boolean, value, obj: any, key): boolean {

        if (!Array.isArray(obj[key])) {
            obj[key] = [];
        }
        if (checked) {
            if (!obj[key].includes(value)) {
                obj[key].push(value)
            }

        } else {
            const index = obj[key].indexOf(value);
            if (index > -1) {
                obj[key].splice(index, 1);
            }
        }
        if (obj[key].length) {
            return true;
        } else {
            return false;
        }
    }


    // public static makeDownloadUrl_IN(params: any, year: string = '0') {

    //     const sessionObject: SessionObject = SessionObject.getSessionObject();
    //     console.log('SessionObject.getCurrentMonthStr()', SessionObject.getCurrentMonthStr())

    //     const token = sessionObject.activeCurrentUser.token;

    //     let liveMonth = null;
    //     const liveYear = SessionObject.liveYear;
    //     if (parseInt(year, 10) < liveYear || 2017) {
    //         liveMonth = '12'
    //     } else {
    //         liveMonth = ('0' + SessionObject.getCurrentMonthStr()).slice(-4);
    //     }

    //     let url = Constants.IN_PUBLISHER_REPORT_DOWNLOAD + 'report?token=' + token
    //         + '&reporturl=' + ProjectUtils.getClientCode() + '/' + year + '/' + liveMonth

    //     Object.keys(params)
    //         .forEach((key) => {
    //             url += `&${key}=${params[key]}`
    //         });
    //     return url;
    // }


    public static getValueFromAutoCompleteStr(value: string, accCode: boolean): string {

        // if (accCode) {
        //     if (value && value.includes('{') && value.includes('}')) {
        //         value = value.split('{')[1].split('}')[0];
        //         return value;
        //     }

        //     if (value && value.includes('#')) {
        //         value = '' + parseInt(value.split('#')[1], 10);
        //         return value;
        //     }
        // }

        return value;
    }


    public static getValueFromAutoCompleteControl(value: string): string {
        if (value && value.includes('-') && value.includes('{') && value.includes('}')) {
            value = value.split('-')[1].split('{')[1].split('}')[0];
            return value;
        } else {
            if (value && value.includes('{') && value.includes('}')) {
                value = value.split('{')[1].split('}')[0];
                return value;
            }

            if (value && value.includes('#')) {
                value = '' + parseInt(value.split('#')[1], 10);
                return value;
            }
        }


        return value;
    }

    public static initToolTip() {
        const options = {
            animation: true,
            delay: 100,
            placement: 'auto',
            trigger: 'hover focus'
        }
        console.log($('.tooltipInfo').tooltip(options))
    }

    public static checkBoxClicked(event: any): Promise<any> {
        return new Promise((resolve, reject) => {
            const value = event.target.checked;
            if (value === undefined) {
                reject()
            } else {
                resolve(value);
            }
        });
    }

    public static dtNoDataAvailable(arr) {
        if (!arr[0]) {
            arr[0] = {
                'No Data Available': 'No Data Available',
                'No Data Available ': 'No Data Available'
                , 'No Data Available  ': 'No Data Available'
            }
        }
    }

    public static setDashBoardItems(val: any) {

        const temp = btoa(JSON.stringify(val));
        const name = btoa('dashboard');
        localStorage.setItem(name, temp);
    }

    public static getDashBoardItems() {
        const name = btoa('dashboard');
        const val = localStorage.getItem(name);
        return JSON.parse(atob(val));
    }

    public static setInsightMenuItems(val: any) {
        const temp = btoa(JSON.stringify(val));
        const name = btoa('leftNav');
        localStorage.setItem(name, temp);
    }

    public static getInsightMenuItems() {
        const name = btoa('leftNav');
        const val = localStorage.getItem(name);
        return JSON.parse(atob(val));
    }

    public static loadCss(url: string, id: string) {

        if (!document.getElementById(id)) {
            const head = document.getElementsByTagName('head')[0];
            const link = document.createElement('link');
            link.id = id;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = url;
            link.media = 'all';
            head.appendChild(link);
            console.log('myDynamicCss Path', link.href);
        }
    }


    public static getMinDateForDatePicker(month: number, year: number) {
        const monthStr = ('0' + month).slice(-2);
        const minDate = moment(year + '-' + monthStr + '-01', 'YYYY-MM-DD');
        return minDate;
    }


    public static getMaxDateForDatePicker(month: number, year: number) {
        const monthStr = ('0' + (month + 1)).slice(-2);
        const maxDate = moment(year + '-' + monthStr + '-01', 'YYYY-MM-DD').subtract(1, 'days');
        return maxDate;
    }

}
