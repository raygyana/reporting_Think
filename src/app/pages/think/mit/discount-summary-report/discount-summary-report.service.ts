import { Injectable } from '@angular/core';
import { Constants } from '../../../shared/constant';
import { BaseService } from '../../../../core/base/base.service';

@Injectable()
export class DiscountSummaryReportService extends BaseService {

    getServiceURL(): string {
        return Constants.TK_DISCOUNT_SUMMARY_REPORT_URL;
    }

    addColumnsOption(dtOptions: any) {
        dtOptions['columns'] = [
            {
                'data': 'descriptin',
                'title': 'Subscription Definition'
            },
            {
                'data': 'bundleQty',
                'title': 'Orders'
            },
            {
                'data': 'offer',
                'title': 'Offer'
            },
            {
                'data': 'state',
                'title': 'State'
            },
            {
                'data': 'price',
                'title': 'Price',
                'render': this.decimaltwoplace
            },
            {
                'data': 'delPrice',
                'title': 'Delivery',
                'render': this.decimaltwoplace
            },
            {
                'data': 'taxPrice',
                'title': 'Tax',
                'render': this.decimaltwoplace
            },
            {
                'data': 'total',
                'title': 'Total',
                'render': this.decimaltwoplace
            },
            {
                'data': 'discountStatus',
                'title': 'Discount Status'
            },
            {
                'data': 'startDate',
                'title': 'Discount Offer Start Date',
                'type': 'datetime',
                'render': this.dateFormateMMDDYYYY
            },
            {
                'data': 'endDate',
                'title': 'Discount Offer Expire Date',
                'type': 'datetime',
                'render': this.dateFormateMMDDYYYY
            }
        ];
    }
}

