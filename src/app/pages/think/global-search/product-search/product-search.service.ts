import { Injectable } from '@angular/core';
import { Constants } from '../../../shared/constant';
import { BaseService } from '../../../../core/base/base.service';
import { ProjectUtils } from '../../../shared';

@Injectable()
export class ProductListService extends BaseService {



    getServiceURL(): string {
        return Constants.TK_PRODUCT_SEARCH_URL;
    }

    getProductCategory(): any {
        const body = '';
        return this.getDataWithURL(Constants.TK_PRODUCT_CATEGORY_URL, body);
    }

    getProductType(): any {
        const body = '';
        return this.getDataWithURL(Constants.TK_PRODUCT_TYPE_URL, body);
    }

    getProductCode(): any {
        const body = '';
        return this.getDataWithURL(Constants.TK_PRODUCT_CODE_URL, body);
    }

    getGratisOrder(body: string): any {
        return this.getDataWithURL(Constants.TK_GRATIS_ORDER_URL, body);
    }

    getGraceOrder(body: string): any {
        return this.getDataWithURL(Constants.TK_GRACE_ORDER_URL, body);
    }
    getRateCard(body: string): any {
        return this.getDataWithURL(Constants.TK_GRATIS_ORDER_URL, body);
    }

    getOrderDetails(body: string): any {
        return this.getDataWithURL(Constants.TK_ORDER_DETAILS_URL, body);
    }

    getPriceList(body: string): any {
        return this.getDataWithURL(Constants.TK_PRODUCT_PRICE_LIST_URL, body);
    }

    addColumnsOption(dtOptions: any, whichClient?: any) {
        console.log('whichClient******', whichClient);

        //     this.dtOptionWithCustumMessageOnTop(dtOptions, 'Show', `Right click on a particular product row for associated Price List, Sales Report,        Customer List, Order Details`);

        //       if (whichClient === 'php') {



        dtOptions['columns'] = [
            {
                'data': 'title',
                'title': 'Title'
            }, {
                'data': 'oc_id',
                'title': 'OC ID'
            }, {
                'data': 'oc',
                'title': 'Product Code'
            }, {
                'data': 'oc_product_type',
                'title': 'Product Type'
            }, {
                'data': 'oc_category',
                'title': 'Product Category',
                visible: this.sessionObject.clientSettings.PRODUCT_SEARCH.FirstSearch.productCatg.visible
            }
            , {
                'data': 'enum_volume_nbr',
                'title': 'Volume'
            }
            , {
                'data': 'enum_issue_nbr',
                'title': 'Issue Number'
            }
            , {
                'data': 'issn_no',
                'title': 'ISSN Number',
                visible: this.sessionObject.clientSettings.PRODUCT_SEARCH.salesReport.ISSNNumber.visible
            }
        ];

        // } else {
        //     dtOptions['columns'] = [
        //         {
        //             'data': 'title',
        //             'title': 'Title'
        //         }, {
        //             'data': 'oc_id',
        //             'title': 'OC ID'
        //         }, {
        //             'data': 'oc',
        //             'title': 'Product Code'
        //         }, {
        //             'data': 'oc_product_type',
        //             'title': 'Product Type'
        //         }, {
        //             'data': 'oc_category',
        //             'title': 'Product Category'
        //         }
        //         , {
        //             'data': 'enum_volume_nbr',
        //             'title': 'Volume'
        //         }
        //         , {
        //             'data': 'enum_issue_nbr',
        //             'title': 'Issue Number'
        //         }
        //     ];
        // }
    }

    addColumnsOptionGC(dtOptions: any) {
        dtOptions['columns'] = [

            {
                'data': 'orderNo',
                'title': 'Order NO'
            }, {
                'data': 'customerID',
                'title': 'Customer ID'
            }, {
                'data': 'firstName',
                'title': 'First Name'
            }, {
                'data': 'lastName',
                'title': 'Last Name'
            }, {
                'data': 'initialName',
                'title': 'Initial Name'
            }, {
                'data': 'department',
                'title': 'Department'
            }, {
                'data': 'company',
                'title': 'Company'
            }, {
                'data': 'startDate',
                'title': 'Start Date'
            }, {
                'data': 'expireDate',
                'title': 'Expire Date'
            }, {
                'data': 'orderStatus',
                'title': 'Order Status'
            }
        ];
    }

    addColumnsOptionGT(dtOptions: any) {
        dtOptions['columns'] = [

            {
                'data': 'orderNo',
                'title': 'Order NO'
            }, {
                'data': 'customerID',
                'title': 'Customer ID'
            }, {
                'data': 'firstName',
                'title': 'First Name'
            }, {
                'data': 'lastName',
                'title': 'Last Name'
            }, {
                'data': 'initialName',
                'title': 'Initial Name'
            }, {
                'data': 'department',
                'title': 'Department'
            }, {
                'data': 'company',
                'title': 'Company'
            }, {
                'data': 'startDate',
                'title': 'Start Date'
            }, {
                'data': 'expireDate',
                'title': 'Expire Date'
            }, {
                'data': 'orderStatus',
                'title': 'Order Status'
            }
        ];
    }

    addColumnsOptionRC(dtOptions: any) {



        dtOptions['columns'] = [
            {
                'data': 'orderNo',
                'title': 'Order NO'
            }, {
                'data': 'customerID',
                'title': 'Customer ID'
            }, {
                'data': 'firstName',
                'title': 'First Name'
            }, {
                'data': 'lastName',
                'title': 'Last Name'
            }, {
                'data': 'initialName',
                'title': 'Initial Name'
            }, {
                'data': 'department',
                'title': 'Department'
            }, {
                'data': 'company',
                'title': 'Company'
            }, {
                'data': 'startDate',
                'title': 'Start Date'
            }, {
                'data': 'expireDate',
                'title': 'Expire Date'
            }, {
                'data': 'orderStatus',
                'title': 'Order Status'
            }
        ];
    }
    addColumnsOptionOD(dtOptions: any) {
        dtOptions['columns'] = [
            {
                'data': 'order_id',
                'title': 'Order ID'
            },
            {
                'data': 'agency_id',
                'title': 'Agency ID'
            },
            {
                'data': 'bill_to_id',
                'title': 'Bill To ID'
            },
            {
                'data': 'end_user_id',
                'title': 'End User ID'
            },
            {
                'data': 'product_name',
                'title': 'Product Name'
            },
            {
                'data': 'product_code',
                'title': 'Product Code'
            },
            {
                'data': 'productcategory',
                'title': 'Product Category'
            },
            {
                'data': 'currency',
                'title': ' Currency'
            },
            {
                'data': 'invoice_id',
                'title': 'Invoice ID'
            },
            {
                'data': 'order_amount',
                'title': 'Order Amount',
                'render': ProjectUtils.toFixedIfNumber
            },
            {
                'data': 'order_code',
                'title': 'Order Code'
            },
            {
                'data': 'order_date',
                'title': 'Order Date',
                'type': 'datetime',
                'render': this.dateFormInDatatable
            },
            {
                'data': 'start_date',
                'title': 'Start Date',
                'type': 'datetime',
                'render': this.dateFormInDatatable
            },
            {
                'data': 'ship_to_id',
                'title': 'Ship To ID'
            },
            {
                'data': 'expire_date',
                'title': 'Expiry Date',
                'type': 'datetime',
                'render': this.dateFormInDatatable
            },
            {
                'data': 'source',
                'title': 'Source'
            },
            {
                'data': 'term',
                'title': 'Term'
            }
        ];
    }
    addColumnsOptionPL(dtOptions: any) {
        dtOptions['aaSorting'] = [];
        dtOptions['columns'] = [
            {
                'data': 'basic_price',
                'title': 'Basic Price',
                'render': ProjectUtils.toFixedIfNumber
            },
            {
                'data': 'price',
                'title': 'Price',
                'render': ProjectUtils.toFixedIfNumber
            },
            {
                'data': 'currency',
                'title': 'Currency'
            },
            {
                'data': 'description',
                'title': 'Description'
            },
            {
                'data': 'oc_id',
                'title': 'Oc ID'
            },
            {
                'data': 'price_type',
                'title': 'Price Type',
                visible: this.sessionObject.clientSettings.PRODUCT_SEARCH.priceList.pubscriptionType.visible
            },
            {
                'data': 'pub_id',
                'title': 'Pub Id'
            },
            {
                'data': 'region',
                'title': 'Region'
            }
            , {
                'data': 'year',
                'title': 'Year'
            }
            , {
                'data': 'effective_date',
                'title': 'Effective Date',
                'type': 'datetime',
                'render': this.dateFormInDatatable
            }

        ];
    }


}

