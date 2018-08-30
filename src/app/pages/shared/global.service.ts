import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ProjectUtils } from './project-utils';
import { Constants } from './constant';
import { BaseService } from '../../core/base/base.service';

@Injectable()
export class GlobalService extends BaseService {

    getCountryData(whichRegion: string): any {
        const body = this.setParamValue('', 'region', whichRegion);
        return this.getDataWithURL(Constants.TK_COUNTRY_SEARCH_URL, body);
    }
    // This service URL is not to use
    getServiceURL(): string {
        return Constants.TK_SALE_AGENCY_DOWNLOAD_REPORT_URL;
    }

    gettopNProducts(): any[] {
        const data = [
            {
                'id': 10,
                'value': 10
            }, {
                'id': 20,
                'value': 20
            }, {
                'id': 30,
                'value': 30
            }, {
                'id': 40,
                'value': 40
            }, {
                'id': 50,
                'value': 50
            }, {
                'id': 60,
                'value': 60
            }, {
                'id': 70,
                'value': 70
            }, {
                'id': 80,
                'value': 80
            }, {
                'id': 90,
                'value': 90
            }, {
                'id': 100,
                'value': 100
            }
        ];
        return data;
    }

    getClientData(): any[] {
        const data = [
            {
                'id': 'ucp',
                'value': 'ucp'
            }, {
                'id': 'php',
                'value': 'php'
            },
            {
                'id': 'mit',
                'value': 'mit'
            }
        ];
        return data;



    }

    getSubscriptionType(): any[] {
        const data = [
            {
                'id': 'print',
                'value': 'Print'
            }, {
                'id': 'online',
                'value': 'Online'
            }, {
                'id': 'singleIssue',
                'value': 'Single Issue'
            }, {
                'id': 'pack',
                'value': 'Print + Online Package'
            }
        ];
        return data;
    }

    getOrderStatus(): any[] {
        const data = [
            {
                'id': '0',
                'value': 'Order Placed'
            }, {
                'id': '1,2,3,4,14',
                'value': 'Canceled'
            }, {
                'id': '5',
                'value': 'Active / Shipping'
            }, {
                'id': '6',
                'value': 'Complete'
            }, {
                'id': '7',
                'value': 'Grace Period'
            }, {
                'id': '8,9',
                'value': 'Suspend'
            }, {
                'id': '10',
                'value': 'Hold for Payment'
            }, {
                'id': '11,12,13,16',
                'value': 'Suspended'
            }, {
                'id': '15',
                'value': 'Hold Until Fulfillment Date'
            }
        ];
        return data;
    }

    getTermsData(ddTriggerTerms: Subject<any>): void {
        const termsData = [
            {
                'id': '30',
                'value': '30 Days'
            }, {
                'id': '60',
                'value': '60 Days'
            }, {
                'id': '90',
                'value': '90 Days'
            }
        ];

        console.log(termsData);
        ddTriggerTerms.next(termsData);
    }


    newgetTermsData(): any {
        return [
            {
                'id': '30',
                'value': '30 Days'
            }, {
                'id': '60',
                'value': '60 Days'
            }, {
                'id': '90',
                'value': '90 Days'
            }
        ];
    }


    getFormatData(ddTriggerFormat: Subject<any>): void {
        const formatData = [
            {
                'id': 'false',
                'value': 'View Format'
            }, {
                'id': 'true',
                'value': 'Print Format'
            }
        ];

        console.log(formatData);
        ddTriggerFormat.next(formatData);
    }
    getRenewalEffortData(ddTriggerEff: Subject<any>): void {
        const data = [
            {
                'id': 1,
                'value': 'Renewal Letter'
            }, {
                'id': 2,
                'value': 'First Reminder'
            }, {
                'id': 3,
                'value': 'Second Reminder'
            },
            {
                'id': 4,
                'value': 'Third Reminder'
            },
            {
                'id': 5,
                'value': 'Fourth Reminder'
            },
        ]
        console.log(data);
        ddTriggerEff.next(data);
    }
    getCustomerIdAsData(): any[] {
        const data = [
            {
                'id': '2',
                'value': 'Bill to'
            }, {
                'id': '1',
                'value': 'Ship to'
            }, {
                'id': '0',
                'value': 'End user'
            }
        ]
        return data;
    }
    getActiveData(ddTriggerActive: Subject<any>): void {
        const data = [
            {
                'id': '100',
                'value': 'All'

            },
            {
                'id': '1',
                'value': 'Yes'
            }, {
                'id': '0',
                'value': 'No'
            }
        ]
        ddTriggerActive.next(data);
    }
    getMITActiveData(ddTriggerActive: Subject<any>): void {
        const data = [
            {
                'id': '1',
                'value': 'Active'
            }, {
                'id': '0',
                'value': 'Inactive'
            }
        ]
        ddTriggerActive.next(data);
    }
    getOrderCatData(ddTriggerOrderCatN: Subject<any>): void {
        const data = [
            {
                'id': 'ALL',
                'value': 'ALL'

            },
            {
                'id': 'CMP',
                'value': 'CMP'

            },
            {
                'id': 'CSM',
                'value': 'CSM'
            },
            {
                'id': 'MHS',
                'value': 'MHS'
            },
            {
                'id': 'SOCCOMP',
                'value': 'SOCCOMP'
            },
            {
                'id': 'TRIAL',
                'value': 'TRIAL'

            }
        ]
        ddTriggerOrderCatN.next(data);
    }

    getMitStatusData(ddTriggerActive: Subject<any>): void {
        const data = [
            {
                'id': '1',
                'value': 'Active'
            }, {
                'id': '0',
                'value': 'Expired'
            }
        ]
        ddTriggerActive.next(data);
    }




    getOrderTypeData(clientId: string, ddTriggerFormat: Subject<any>): void {
        let orderData;
        if (clientId === 'php') {
            orderData = [
                {
                    'id': '1',
                    'value': 'Cash'
                }, {
                    'id': '2',
                    'value': 'Credit'
                }, {
                    'id': '3',
                    'value': 'Proforma Invoice'
                }
            ];
        } else {
            orderData = [
                {
                    'id': '1',
                    'value': 'Cash'
                }, {
                    'id': '2',
                    'value': 'Proforma Invoice'
                }
            ];
        }

        console.log(orderData);
        ddTriggerFormat.next(orderData);
    }



    getCreditOrdersData(): any[] {
        const data = [
            {
                'id': 3,
                'value': 'All'
            }, {
                'id': 1,
                'value': 'Cash'
            }, {
                'id': 2,
                'value': 'Credit'
            },
        ]
        return data;
    }
    getDetailsData(): any[] {
        const data = [
            {
                'id': 1,
                'value': 'Details'
            }, {
                'id': 2,
                'value': 'Summary'
            }
        ]
        return data;
    }
    getOrderDueData(): any[] {
        const data = [
            {
                'id': 1,
                'value': 'All'
            }, {
                'id': 2,
                'value': 'Over Due'
            }, {
                'id': 3,
                'value': 'Not Over Due'
            },
        ]
        return data;
    }
    getMonthData(): any[] {
        const data = [
            {
                'id': '01',
                'value': 'January'
            }, {
                'id': '02',
                'value': 'February'
            }, {
                'id': '03',
                'value': 'March'
            }, {
                'id': '04',
                'value': 'April'
            }, {
                'id': '05',
                'value': 'May'
            }, {
                'id': '06',
                'value': 'June'
            }, {
                'id': '07',
                'value': 'July'
            }, {
                'id': '08',
                'value': 'August'
            }, {
                'id': '09',
                'value': 'September'
            }, {
                'id': '10',
                'value': 'October'
            }, {
                'id': '11',
                'value': 'November'
            }, {
                'id': '12',
                'value': 'December'
            }
        ];
        return data;
    }
    getReportByData(): any {
        const data = [
            {
                'id': 0,
                'value': 'Revenue'
            }, {
                'id': 1,
                'value': 'Number of Subscriptions'
            }
        ];
        return data;
    }
    getTopNCustomers(): any[] {
        const data = [
            {
                'id': 10,
                'value': 10
            }, {
                'id': 20,
                'value': 20
            }, {
                'id': 30,
                'value': 30
            }, {
                'id': 40,
                'value': 40
            }, {
                'id': 50,
                'value': 50
            }, {
                'id': 60,
                'value': 60
            }, {
                'id': 70,
                'value': 70
            }, {
                'id': 80,
                'value': 80
            }, {
                'id': 90,
                'value': 90
            }, {
                'id': 100,
                'value': 100
            }
        ];
        return data;
    }


    getRevenueMethodData(ddTriggerRevenueMethod: Subject<any>): void {
        const revenueMethodData = [
            {
                'id': '1',
                'value': 'Print Only'
            }, {
                'id': '2',
                'value': 'Online Pack'
            }, {
                'id': '3',
                'value': 'Online Only'

            }, {
                'id': '4',
                'value': 'Print Pack'
            }, {
                'id': '5',
                'value': 'Single Issue'
            }
        ];

        ddTriggerRevenueMethod.next(revenueMethodData);
    }

    getRevenueMethod1Data(ddTriggerRevenueMethod: Subject<any>): void {
        const revenueMethodData = [
            {
                'id': '1',
                'value': 'Print Only'
            }, {
                'id': '2',
                'value': 'Online Pack'
            }, {
                'id': '3',
                'value': 'Online Only'

            }, {
                'id': '4',
                'value': 'Print Pack'
            }, {
                'id': '5',
                'value': 'Single Issue'
            }, {
                'id': '6',
                'value': 'Pack'
            }
        ];

        ddTriggerRevenueMethod.next(revenueMethodData);
    }

    getOrderStatusData(ddTriggerOrderStatusMethod: Subject<any>): void {
        const data = [
            {
                'id': '0',
                'value': 'Order Placed'
            }, {
                'id': '1',
                'value': 'Canceled - Nonpayment'
            }, {
                'id': '2',
                'value': 'Canceled - Customer Request'

            }, {
                'id': '3',
                'value': 'Canceled - Credit Card Not Authorized'

            }, {
                'id': '4',
                'value': 'Canceled - Audit Information Problem'
            }, {
                'id': '5',
                'value': 'Active / Shipping'
            }, {
                'id': '6',
                'value': 'Complete'
            }, {
                'id': '7',
                'value': 'Grace Period'
            }, {
                'id': '8',
                'value': 'Suspend - Nonpayment'
            }, {
                'id': '9',
                'value': 'Suspend - Temporary'
            }, {
                'id': '10',
                'value': 'Hold for Payment'
            }, {
                'id': '11',
                'value': 'Suspended - Delivery Problem'
            }, {
                'id': '12',
                'value': 'Suspended - Distribution Problem'
            }, {
                'id': '13',
                'value': 'Suspended - Audit Information Problem'
            }, {
                'id': '14',
                'value': 'Canceled - Audit Information Problem'
            }, {
                'id': '15',
                'value': 'Hold Until Fulfillment Date'
            }, {
                'id': '16',
                'value': 'Suspended - Back Order'
            }
        ];

        ddTriggerOrderStatusMethod.next(data);
    }

    getOrderTypeSalesData(): any {
        const data = [
            {
                'id': 'newOrder',
                'value': 'New Orders'
            }, {
                'id': 'renewal',
                'value': 'Renewed Orders'
            }, {
                'id': 'all',
                'value': 'All Orders'
            }
        ];
        return data;
    }
    getOrdersData(): any[] {
        const data = [
            {
                'id': 1,
                'value': 'Cash'
            }, {
                'id': 2,
                'value': 'Credit'
            }
        ]
        return data;
    }
    getCustomerStatusData(): any[] {
        const data = [
            {
                'id': 0,
                'value': 'All'
            }, {
                'id': 1,
                'value': 'Active'
            }, {
                'id': 2,
                'value': 'Expired'
            }, {
                'id': 3,
                'value': 'No Orders Placed'
            }
        ]
        return data;
    }

    getPaymentStatusData(ddTriggerPaymentStatus: Subject<any>): void {
        const data = [
            {
                'id': '-1',
                'value': 'All'
            }, {
                'id': '1',
                'value': 'Paid'
            }, {
                'id': '2',
                'value': 'Overpayment'
            }, {
                'id': '3',
                'value': 'Underpayment'
            }, {
                'id': '5',
                'value': 'Partial Payment'
            }
        ]
        ddTriggerPaymentStatus.next(data)
    }

    getYTDOrderStatusData(ddTriggerOrderStatus: Subject<any>): void {
        const data = [
            {
                'id': '-1',
                'value': 'All'
            }, {
                'id': '0',
                'value': 'Order Placed'
            }, {
                'id': '5',
                'value': 'Active / Shipping'
            }, {
                'id': '6',
                'value': 'Complete'
            }, {
                'id': '7',
                'value': 'Grace Period'
            }, {
                'id': '9',
                'value': 'Suspend - Temporary'
            }
        ]
        ddTriggerOrderStatus.next(data)
    }

    getMarketSectorData(ddTriggerMarketSector: Subject<any>): void {
        const data = [
            {
                'id': '0',
                'value': 'Institutional & Library'
            }, {
                'id': '2',
                'value': 'Individual'
            }, {
                'id': '3',
                'value': 'Student'
            }, {
                'id': '7',
                'value': 'Gratis'
            }
        ]

        ddTriggerMarketSector.next(data)
    }

    getYTDRevenueMethodData(ddTriggerRevenueMethod: Subject<any>): void {
        const data = [
            {
                'id': '0',
                'value': 'All'
            }, {
                'id': '1',
                'value': 'Print Only'
            }, {
                'id': '2',
                'value': 'Online Pack'

            }, {
                'id': '3',
                'value': 'Online Only'

            }
        ]

        ddTriggerRevenueMethod.next(data)
    }


}

