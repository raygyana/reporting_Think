import { Injectable } from '@angular/core';
import { Constants } from '../../../shared/constant';
import { BaseService } from '../../../../core/base/base.service';
import { ProjectUtils } from '../../../shared/project-utils';
import { HttpService } from '../../../../core/http.service';

@Injectable()
export class TaxLiabilitySearchService extends BaseService {

    constructor(
        protected httpService: HttpService
    ) {
        super(httpService)
    }

    getServiceURL(): string {
        return Constants.TK_TAXLIABILITY_SEARCH_URL;
    }

    addColumnsOption(dtOptions: any) {
        dtOptions['aaSorting'] = [];  // for disable starting sort
        dtOptions['aoColumnDefs'] = [
            { 'bSortable': false, 'aTargets': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] }
        ]

        dtOptions['columns'] = [
            {
                'data': 'orderNo',
                'title': 'Order Number'
            },
            {
                'data': 'orderDate',
                'title': 'Order Date',
                'type': 'datetime',
                'render': this.dateFormInDatatable
            },
            {
                'data': 'publication',
                'title': 'Publication'
            },
            {
                'data': 'billToCustNumber',
                'title': 'Bill to Customer ID'
            },
            {
                'data': 'billtoStateCountry',
                'title': 'Bill to State / Country'
            },
            {
                'data': 'billToSpecialTaxID',
                'title': 'Bill to VAT ID'
            },
            {
                'data': 'shiptoCustNumber',
                'title': 'Ship to Customer ID'
            },
            {
                'data': 'shipStateCountry',
                'title': 'Ship State/Country'
            },
            {
                'data': 'currency',
                'title': 'Currency'
            },
            {
                'data': 'tax',
                'title': 'Tax',
                'render': ProjectUtils.toFixedIfNumber
            }, {
                'data': 'orderAmount',
                'title': 'Order Amount',
                'render': ProjectUtils.toFixedIfNumber
            }

        ];
    }

}
